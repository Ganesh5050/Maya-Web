// WebSocket Service for Real-time Collaboration
import { io, Socket } from 'socket.io-client';

export interface CollaborationEvent {
  type: 'user_joined' | 'user_left' | 'cursor_update' | 'selection_update' | 'component_change' | 'message' | 'activity';
  data: any;
  userId: string;
  timestamp: number;
}

export interface CollaborationUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  isOnline: boolean;
  cursor?: { x: number; y: number; color: string };
  selection?: { elementId: string; start: number; end: number };
  color: string;
  isSpeaking?: boolean;
  isHandRaised?: boolean;
}

export interface CollaborationSession {
  id: string;
  projectId: string;
  name: string;
  participants: CollaborationUser[];
  activeUsers: string[];
  cursors: Record<string, { x: number; y: number; color: string }>;
  selections: Record<string, { elementId: string; start: number; end: number }>;
  lastActivity: string;
  isLocked: boolean;
}

class CollaborationWebSocketService {
  private socket: Socket | null = null;
  private sessionId: string | null = null;
  private projectId: string | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Setup default event listeners
    this.addEventListener('connect', () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('Collaboration WebSocket connected');
    });

    this.addEventListener('disconnect', () => {
      this.isConnected = false;
      console.log('Collaboration WebSocket disconnected');
      this.attemptReconnect();
    });

    this.addEventListener('error', (error: any) => {
      console.error('Collaboration WebSocket error:', error);
    });
  }

  // Initialize WebSocket connection
  async initialize(projectId: string, sessionId?: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.projectId = projectId;
      
      // Use provided sessionId or generate new one
      this.sessionId = sessionId || this.generateSessionId();

      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
      
      this.socket = io(wsUrl, {
        auth: {
          sessionId: this.sessionId,
          projectId: this.projectId,
        },
        transports: ['websocket'],
        timeout: 20000,
      });

      this.setupSocketEventHandlers();

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to initialize WebSocket connection' };
    }
  }

  private setupSocketEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.emit('connect');
    });

    this.socket.on('disconnect', () => {
      this.emit('disconnect');
    });

    this.socket.on('error', (error) => {
      this.emit('error', error);
    });

    this.socket.on('user_joined', (data) => {
      this.emit('user_joined', data);
    });

    this.socket.on('user_left', (data) => {
      this.emit('user_left', data);
    });

    this.socket.on('cursor_update', (data) => {
      this.emit('cursor_update', data);
    });

    this.socket.on('selection_update', (data) => {
      this.emit('selection_update', data);
    });

    this.socket.on('component_change', (data) => {
      this.emit('component_change', data);
    });

    this.socket.on('message', (data) => {
      this.emit('message', data);
    });

    this.socket.on('activity', (data) => {
      this.emit('activity', data);
    });

    this.socket.on('session_state', (data) => {
      this.emit('session_state', data);
    });
  }

  // Join collaboration session
  async joinSession(userId: string, userName: string, userEmail: string, role: 'owner' | 'editor' | 'viewer' = 'editor') {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('join_session', {
      sessionId: this.sessionId,
      projectId: this.projectId,
      userId,
      userName,
      userEmail,
      role,
    });
  }

  // Leave collaboration session
  async leaveSession(userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('leave_session', {
      sessionId: this.sessionId,
      userId,
    });
  }

  // Update cursor position
  updateCursor(x: number, y: number, userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('cursor_move', {
      sessionId: this.sessionId,
      userId,
      x,
      y,
    });
  }

  // Update selection
  updateSelection(elementId: string, start: number, end: number, userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('selection_change', {
      sessionId: this.sessionId,
      userId,
      elementId,
      start,
      end,
    });
  }

  // Broadcast component change
  broadcastComponentChange(componentId: string, changes: any, userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('component_change', {
      sessionId: this.sessionId,
      projectId: this.projectId,
      userId,
      componentId,
      changes,
    });
  }

  // Send message
  sendMessage(content: string, userId: string, userName: string, userColor: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('message', {
      sessionId: this.sessionId,
      userId,
      userName,
      userColor,
      content,
      timestamp: new Date().toISOString(),
    });
  }

  // Broadcast activity
  broadcastActivity(action: string, userId: string, userName: string, userColor: string, elementId?: string, details?: any) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('activity', {
      sessionId: this.sessionId,
      userId,
      userName,
      userColor,
      action,
      elementId,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  // Video/Audio controls
  toggleVideo(enabled: boolean, userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('video_toggle', {
      sessionId: this.sessionId,
      userId,
      enabled,
    });
  }

  toggleAudio(enabled: boolean, userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('audio_toggle', {
      sessionId: this.sessionId,
      userId,
      enabled,
    });
  }

  toggleScreenShare(enabled: boolean, userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('screen_share_toggle', {
      sessionId: this.sessionId,
      userId,
      enabled,
    });
  }

  toggleHandRaised(raised: boolean, userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('hand_raised', {
      sessionId: this.sessionId,
      userId,
      raised,
    });
  }

  // Invite user
  inviteUser(email: string, role: 'editor' | 'viewer', userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('invite_user', {
      sessionId: this.sessionId,
      email,
      role,
      invitedBy: userId,
    });
  }

  // Change user role
  changeUserRole(targetUserId: string, newRole: 'owner' | 'editor' | 'viewer', userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('change_role', {
      sessionId: this.sessionId,
      targetUserId,
      newRole,
      changedBy: userId,
    });
  }

  // Remove user
  removeUser(targetUserId: string, userId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('remove_user', {
      sessionId: this.sessionId,
      targetUserId,
      removedBy: userId,
    });
  }

  // Event listener management
  addEventListener(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  removeEventListener(event: string, callback: Function) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // Attempt to reconnect
  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      setTimeout(() => {
        if (this.sessionId && this.projectId) {
          this.initialize(this.projectId, this.sessionId);
        }
      }, delay);
    }
  }

  // Generate session ID
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Get connection status
  getStatus() {
    return {
      isConnected: this.isConnected,
      sessionId: this.sessionId,
      projectId: this.projectId,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  // Disconnect and cleanup
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnected = false;
    this.sessionId = null;
    this.projectId = null;
    this.eventListeners.clear();
  }
}

// Create singleton instance
export const collaborationWebSocketService = new CollaborationWebSocketService();

// React hook for collaboration
export const useCollaborationWebSocket = () => {
  const initialize = async (projectId: string, sessionId?: string) => {
    return collaborationWebSocketService.initialize(projectId, sessionId);
  };

  const joinSession = async (userId: string, userName: string, userEmail: string, role: 'owner' | 'editor' | 'viewer' = 'editor') => {
    return collaborationWebSocketService.joinSession(userId, userName, userEmail, role);
  };

  const leaveSession = async (userId: string) => {
    return collaborationWebSocketService.leaveSession(userId);
  };

  const updateCursor = (x: number, y: number, userId: string) => {
    return collaborationWebSocketService.updateCursor(x, y, userId);
  };

  const updateSelection = (elementId: string, start: number, end: number, userId: string) => {
    return collaborationWebSocketService.updateSelection(elementId, start, end, userId);
  };

  const broadcastComponentChange = (componentId: string, changes: any, userId: string) => {
    return collaborationWebSocketService.broadcastComponentChange(componentId, changes, userId);
  };

  const sendMessage = (content: string, userId: string, userName: string, userColor: string) => {
    return collaborationWebSocketService.sendMessage(content, userId, userName, userColor);
  };

  const broadcastActivity = (action: string, userId: string, userName: string, userColor: string, elementId?: string, details?: any) => {
    return collaborationWebSocketService.broadcastActivity(action, userId, userName, userColor, elementId, details);
  };

  const toggleVideo = (enabled: boolean, userId: string) => {
    return collaborationWebSocketService.toggleVideo(enabled, userId);
  };

  const toggleAudio = (enabled: boolean, userId: string) => {
    return collaborationWebSocketService.toggleAudio(enabled, userId);
  };

  const toggleScreenShare = (enabled: boolean, userId: string) => {
    return collaborationWebSocketService.toggleScreenShare(enabled, userId);
  };

  const toggleHandRaised = (raised: boolean, userId: string) => {
    return collaborationWebSocketService.toggleHandRaised(raised, userId);
  };

  const inviteUser = (email: string, role: 'editor' | 'viewer', userId: string) => {
    return collaborationWebSocketService.inviteUser(email, role, userId);
  };

  const changeUserRole = (targetUserId: string, newRole: 'owner' | 'editor' | 'viewer', userId: string) => {
    return collaborationWebSocketService.changeUserRole(targetUserId, newRole, userId);
  };

  const removeUser = (targetUserId: string, userId: string) => {
    return collaborationWebSocketService.removeUser(targetUserId, userId);
  };

  const addEventListener = (event: string, callback: Function) => {
    return collaborationWebSocketService.addEventListener(event, callback);
  };

  const removeEventListener = (event: string, callback: Function) => {
    return collaborationWebSocketService.removeEventListener(event, callback);
  };

  const getStatus = () => {
    return collaborationWebSocketService.getStatus();
  };

  const disconnect = () => {
    return collaborationWebSocketService.disconnect();
  };

  return {
    initialize,
    joinSession,
    leaveSession,
    updateCursor,
    updateSelection,
    broadcastComponentChange,
    sendMessage,
    broadcastActivity,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    toggleHandRaised,
    inviteUser,
    changeUserRole,
    removeUser,
    addEventListener,
    removeEventListener,
    getStatus,
    disconnect,
  };
};
