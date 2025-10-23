import { io, Socket } from 'socket.io-client';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../store';

// Types
export interface CollaborationParticipant {
  userId: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  isOnline: boolean;
  lastSeen: string;
  cursor?: { x: number; y: number };
  selection?: string[];
}

export interface CollaborationSession {
  id: string;
  projectId: string;
  participants: CollaborationParticipant[];
  activeUsers: string[];
  cursors: Record<string, { x: number; y: number; userId: string }>;
  selections: Record<string, string[]>;
  lastActivity: string;
}

export interface CollaborationChange {
  id: string;
  type: 'component_add' | 'component_update' | 'component_delete' | 'component_move' | 'style_update';
  componentId?: string;
  data: Record<string, unknown>;
  timestamp: number;
  userId: string;
}

export interface CollaborationEvent {
  type: 'user_joined' | 'user_left' | 'cursor_update' | 'selection_update' | 'change_broadcast' | 'conflict_resolution';
  data: Record<string, unknown>;
  userId: string;
  timestamp: number;
}

// Collaboration service class
export class CollaborationService {
  private socket: Socket | null = null;
  private sessionId: string | null = null;
  private projectId: string | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor() {
    this.setupSupabaseRealtime();
  }

  // Setup Supabase realtime for collaboration
  private setupSupabaseRealtime() {
    // Listen for collaboration session changes
    supabase
      .channel('collaboration-sessions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'collaboration_sessions',
      }, (payload) => {
        this.handleSupabaseChange(payload);
      })
      .subscribe();
  }

  private handleSupabaseChange(payload: Record<string, unknown>) {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    switch (eventType) {
      case 'INSERT':
        this.handleSessionCreated(newRecord);
        break;
      case 'UPDATE':
        this.handleSessionUpdated(newRecord, oldRecord);
        break;
      case 'DELETE':
        this.handleSessionDeleted(oldRecord);
        break;
    }
  }

  private handleSessionCreated(session: Record<string, unknown>) {
    if (session.project_id === this.projectId) {
      this.joinSession(session.id);
    }
  }

  private handleSessionUpdated(newSession: Record<string, unknown>, oldSession: Record<string, unknown>) {
    if (newSession.project_id === this.projectId) {
      // Update local state with new session data
      const { updateCollaborationSession } = useAppStore.getState();
      updateCollaborationSession(newSession.id, newSession);
    }
  }

  private handleSessionDeleted(session: Record<string, unknown>) {
    if (session.project_id === this.projectId) {
      this.leaveSession();
    }
  }

  // Initialize collaboration
  async initialize(projectId: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.projectId = projectId;

      // Check if session already exists
      const { data: existingSession, error } = await supabase
        .from('collaboration_sessions')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (existingSession && !error) {
        this.sessionId = existingSession.id;
        await this.joinSession(existingSession.id);
      } else {
        // Create new session
        const { data: newSession, error: createError } = await supabase
          .from('collaboration_sessions')
          .insert({
            project_id: projectId,
            participants: [],
            active_users: [],
            cursors: {},
            selections: {},
            last_activity: new Date().toISOString(),
          })
          .select()
          .single();

        if (createError) {
          return { success: false, error: createError.message };
        }

        this.sessionId = newSession.id;
        await this.joinSession(newSession.id);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to initialize collaboration' };
    }
  }

  // Join collaboration session
  private async joinSession(sessionId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Add user to session participants
      const { error } = await supabase
        .from('collaboration_sessions')
        .update({
          participants: supabase.sql`array_append(participants, ${JSON.stringify({
            userId: user.id,
            name: user.user_metadata?.name || user.email,
            avatar: user.user_metadata?.avatar_url,
            role: 'editor',
            isOnline: true,
            lastSeen: new Date().toISOString(),
          })})`,
          active_users: supabase.sql`array_append(active_users, ${user.id})`,
          last_activity: new Date().toISOString(),
        })
        .eq('id', sessionId);

      if (error) {
        console.error('Error joining session:', error);
        return;
      }

      // Update local state
      const { joinSession } = useAppStore.getState();
      const session: CollaborationSession = {
        id: sessionId,
        projectId: this.projectId!,
        participants: [],
        activeUsers: [user.id],
        cursors: {},
        selections: {},
        lastActivity: new Date().toISOString(),
      };
      joinSession(session);

      // Setup WebSocket connection for real-time updates
      this.setupWebSocket(sessionId);

    } catch (error) {
      console.error('Error joining session:', error);
    }
  }

  // Setup WebSocket connection
  private setupWebSocket(sessionId: string) {
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    
    this.socket = io(wsUrl, {
      auth: {
        sessionId,
        userId: useAppStore.getState().user?.id,
      },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('Collaboration WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('Collaboration WebSocket disconnected');
      this.attemptReconnect();
    });

    this.socket.on('user_joined', (data) => {
      this.handleUserJoined(data);
    });

    this.socket.on('user_left', (data) => {
      this.handleUserLeft(data);
    });

    this.socket.on('cursor_update', (data) => {
      this.handleCursorUpdate(data);
    });

    this.socket.on('selection_update', (data) => {
      this.handleSelectionUpdate(data);
    });

    this.socket.on('change_broadcast', (data) => {
      this.handleChangeBroadcast(data);
    });

    this.socket.on('conflict_resolution', (data) => {
      this.handleConflictResolution(data);
    });

    this.socket.on('error', (error) => {
      console.error('Collaboration WebSocket error:', error);
    });
  }

  // Attempt to reconnect WebSocket
  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      setTimeout(() => {
        if (this.sessionId) {
          this.setupWebSocket(this.sessionId);
        }
      }, delay);
    }
  }

  // Handle collaboration events
  private handleUserJoined(data: Record<string, unknown>) {
    const { addParticipant } = useAppStore.getState();
    addParticipant(data.participant);
  }

  private handleUserLeft(data: Record<string, unknown>) {
    const { removeParticipant } = useAppStore.getState();
    removeParticipant(data.userId);
  }

  private handleCursorUpdate(data: Record<string, unknown>) {
    const { updateCursor } = useAppStore.getState();
    updateCursor(data.userId, data.x, data.y);
  }

  private handleSelectionUpdate(data: Record<string, unknown>) {
    const { updateSelection } = useAppStore.getState();
    updateSelection(data.userId, data.selection);
  }

  private handleChangeBroadcast(data: Record<string, unknown>) {
    // Apply change to local state
    this.applyChange(data.change);
  }

  private handleConflictResolution(data: Record<string, unknown>) {
    // Handle conflict resolution
    console.log('Conflict resolved:', data);
  }

  // Apply collaboration change
  private applyChange(change: CollaborationChange) {
    const { currentProject, updateProject } = useAppStore.getState();
    
    if (!currentProject) return;

    switch (change.type) {
      case 'component_add': {
        // Add component to project
        const updatedComponents = [...(currentProject.components || []), change.data];
        updateProject(currentProject.id, { components: updatedComponents });
        break;
      }
        
      case 'component_update': {
        // Update component in project
        const updatedComponentsList = (currentProject.components || []).map(comp => 
          comp.id === change.componentId ? { ...comp, ...change.data } : comp
        );
        updateProject(currentProject.id, { components: updatedComponentsList });
        break;
      }
        
      case 'component_delete': {
        // Remove component from project
        const filteredComponents = (currentProject.components || []).filter(
          comp => comp.id !== change.componentId
        );
        updateProject(currentProject.id, { components: filteredComponents });
        break;
      }
        
      case 'component_move': {
        // Move component in project
        const movedComponents = (currentProject.components || []).map(comp => 
          comp.id === change.componentId ? { ...comp, ...change.data } : comp
        );
        updateProject(currentProject.id, { components: movedComponents });
        break;
      }
        
      case 'style_update': {
        // Update project styles
        updateProject(currentProject.id, { settings: { ...currentProject.settings, ...change.data } });
        break;
      }
    }
  }

  // Broadcast change to other participants
  async broadcastChange(change: Omit<CollaborationChange, 'id' | 'timestamp' | 'userId'>) {
    if (!this.socket || !this.isConnected) return;

    const { user } = useAppStore.getState();
    if (!user) return;

    const collaborationChange: CollaborationChange = {
      id: `change_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      userId: user.id,
      ...change,
    };

    this.socket.emit('change_broadcast', {
      sessionId: this.sessionId,
      change: collaborationChange,
    });

    // Update last activity
    if (this.sessionId) {
      await supabase
        .from('collaboration_sessions')
        .update({ last_activity: new Date().toISOString() })
        .eq('id', this.sessionId);
    }
  }

  // Update cursor position
  async updateCursor(x: number, y: number) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('cursor_update', {
      sessionId: this.sessionId,
      x,
      y,
    });

    // Update local state
    const { user, updateCursor } = useAppStore.getState();
    if (user) {
      updateCursor(user.id, x, y);
    }
  }

  // Update selection
  async updateSelection(selection: string[]) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('selection_update', {
      sessionId: this.sessionId,
      selection,
    });

    // Update local state
    const { user, updateSelection } = useAppStore.getState();
    if (user) {
      updateSelection(user.id, selection);
    }
  }

  // Leave collaboration session
  async leaveSession() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !this.sessionId) return;

      // Remove user from session
      await supabase
        .from('collaboration_sessions')
        .update({
          participants: supabase.sql`array_remove(participants, ${JSON.stringify({
            userId: user.id,
          })}::jsonb)`,
          active_users: supabase.sql`array_remove(active_users, ${user.id})`,
          last_activity: new Date().toISOString(),
        })
        .eq('id', this.sessionId);

      // Disconnect WebSocket
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }

      // Update local state
      const { leaveSession } = useAppStore.getState();
      leaveSession();

      this.sessionId = null;
      this.projectId = null;
      this.isConnected = false;

    } catch (error) {
      console.error('Error leaving session:', error);
    }
  }

  // Get collaboration status
  getStatus() {
    return {
      isConnected: this.isConnected,
      sessionId: this.sessionId,
      projectId: this.projectId,
    };
  }

  // Cleanup
  destroy() {
    this.leaveSession();
  }
}

// Create collaboration service instance
export const collaborationService = new CollaborationService();

// Collaboration hook
export const useCollaboration = () => {
  const { collaborationSession, isCollaborating, onlineUsers } = useAppStore();

  const initialize = async (projectId: string) => {
    return collaborationService.initialize(projectId);
  };

  const broadcastChange = async (change: Omit<CollaborationChange, 'id' | 'timestamp' | 'userId'>) => {
    return collaborationService.broadcastChange(change);
  };

  const updateCursor = async (x: number, y: number) => {
    return collaborationService.updateCursor(x, y);
  };

  const updateSelection = async (selection: string[]) => {
    return collaborationService.updateSelection(selection);
  };

  const leaveSession = async () => {
    return collaborationService.leaveSession();
  };

  const getStatus = () => {
    return collaborationService.getStatus();
  };

  return {
    session: collaborationSession,
    isCollaborating,
    onlineUsers,
    initialize,
    broadcastChange,
    updateCursor,
    updateSelection,
    leaveSession,
    getStatus,
  };
};
