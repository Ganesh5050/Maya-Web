// Real-Time Collaboration System for Maya-Web
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { supabase } from '../lib/supabase';

interface CollaborationUser {
  id: string;
  name: string;
  email: string;
  cursor: { x: number; y: number };
  selection?: { elementId: string; start: number; end: number };
  color: string;
  lastSeen: Date;
}

interface CollaborationSession {
  id: string;
  projectId: string;
  users: Map<string, CollaborationUser>;
  changes: any[];
  isActive: boolean;
}

class CollaborationManager {
  private io: SocketIOServer;
  private sessions: Map<string, CollaborationSession> = new Map();
  private userSessions: Map<string, string> = new Map(); // userId -> sessionId

  constructor(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Join collaboration session
      socket.on('join-session', async (data) => {
        const { sessionId, userId, projectId } = data;
        
        try {
          // Verify user has access to project
          const { data: project } = await supabase
            .from('projects')
            .select('owner_id, collaborators')
            .eq('id', projectId)
            .single();

          if (!project) {
            socket.emit('error', { message: 'Project not found' });
            return;
          }

          // Check if user is owner or collaborator
          const isOwner = project.owner_id === userId;
          const isCollaborator = project.collaborators?.includes(userId);
          
          if (!isOwner && !isCollaborator) {
            socket.emit('error', { message: 'Access denied' });
            return;
          }

          // Get user profile
          const { data: userProfile } = await supabase
            .from('users')
            .select('name, email')
            .eq('id', userId)
            .single();

          if (!userProfile) {
            socket.emit('error', { message: 'User not found' });
            return;
          }

          // Join socket room
          socket.join(sessionId);

          // Create or get session
          let session = this.sessions.get(sessionId);
          if (!session) {
            session = {
              id: sessionId,
              projectId,
              users: new Map(),
              changes: [],
              isActive: true
            };
            this.sessions.set(sessionId, session);
          }

          // Add user to session
          const user: CollaborationUser = {
            id: userId,
            name: userProfile.name || 'Anonymous',
            email: userProfile.email,
            cursor: { x: 0, y: 0 },
            color: this.generateUserColor(),
            lastSeen: new Date()
          };

          session.users.set(userId, user);
          this.userSessions.set(userId, sessionId);

          // Notify other users
          socket.to(sessionId).emit('user-joined', {
            user: {
              id: user.id,
              name: user.name,
              color: user.color
            }
          });

          // Send current session state to new user
          socket.emit('session-state', {
            users: Array.from(session.users.values()).map(u => ({
              id: u.id,
              name: u.name,
              color: u.color,
              cursor: u.cursor,
              selection: u.selection
            })),
            changes: session.changes.slice(-50) // Last 50 changes
          });

          console.log(`User ${user.name} joined session ${sessionId}`);
        } catch (error) {
          console.error('Join session error:', error);
          socket.emit('error', { message: 'Failed to join session' });
        }
      });

      // Leave session
      socket.on('leave-session', (data) => {
        const { sessionId, userId } = data;
        const session = this.sessions.get(sessionId);
        
        if (session) {
          session.users.delete(userId);
          this.userSessions.delete(userId);
          
          socket.to(sessionId).emit('user-left', { userId });
          socket.leave(sessionId);
          
          // Clean up empty sessions
          if (session.users.size === 0) {
            this.sessions.delete(sessionId);
          }
        }
      });

      // Cursor movement
      socket.on('cursor-move', (data) => {
        const { sessionId, userId, x, y } = data;
        const session = this.sessions.get(sessionId);
        
        if (session && session.users.has(userId)) {
          const user = session.users.get(userId)!;
          user.cursor = { x, y };
          user.lastSeen = new Date();
          
          socket.to(sessionId).emit('cursor-update', {
            userId,
            cursor: { x, y }
          });
        }
      });

      // Selection change
      socket.on('selection-change', (data) => {
        const { sessionId, userId, elementId, start, end } = data;
        const session = this.sessions.get(sessionId);
        
        if (session && session.users.has(userId)) {
          const user = session.users.get(userId)!;
          user.selection = { elementId, start, end };
          user.lastSeen = new Date();
          
          socket.to(sessionId).emit('selection-update', {
            userId,
            selection: { elementId, start, end }
          });
        }
      });

      // Component changes
      socket.on('component-change', async (data) => {
        const { sessionId, userId, projectId, componentId, changes } = data;
        const session = this.sessions.get(sessionId);
        
        if (session && session.users.has(userId)) {
          try {
            // Apply change to database
            const { error } = await supabase
              .from('projects')
              .update({
                components: changes,
                updated_at: new Date().toISOString()
              })
              .eq('id', projectId);

            if (error) throw error;

            // Store change in session
            const change = {
              id: Date.now().toString(),
              userId,
              componentId,
              changes,
              timestamp: new Date().toISOString()
            };

            session.changes.push(change);

            // Broadcast to other users
            socket.to(sessionId).emit('component-updated', {
              componentId,
              changes,
              userId,
              timestamp: change.timestamp
            });

            // Update user's last seen
            const user = session.users.get(userId)!;
            user.lastSeen = new Date();

          } catch (error) {
            console.error('Component change error:', error);
            socket.emit('error', { message: 'Failed to update component' });
          }
        }
      });

      // Style changes
      socket.on('style-change', async (data) => {
        const { sessionId, userId, projectId, styles } = data;
        const session = this.sessions.get(sessionId);
        
        if (session && session.users.has(userId)) {
          try {
            // Apply style change to database
            const { error } = await supabase
              .from('projects')
              .update({
                styles,
                updated_at: new Date().toISOString()
              })
              .eq('id', projectId);

            if (error) throw error;

            // Broadcast to other users
            socket.to(sessionId).emit('styles-updated', {
              styles,
              userId,
              timestamp: new Date().toISOString()
            });

            // Update user's last seen
            const user = session.users.get(userId)!;
            user.lastSeen = new Date();

          } catch (error) {
            console.error('Style change error:', error);
            socket.emit('error', { message: 'Failed to update styles' });
          }
        }
      });

      // Animation changes
      socket.on('animation-change', async (data) => {
        const { sessionId, userId, projectId, animations } = data;
        const session = this.sessions.get(sessionId);
        
        if (session && session.users.has(userId)) {
          try {
            // Apply animation change to database
            const { error } = await supabase
              .from('projects')
              .update({
                animations,
                updated_at: new Date().toISOString()
              })
              .eq('id', projectId);

            if (error) throw error;

            // Broadcast to other users
            socket.to(sessionId).emit('animations-updated', {
              animations,
              userId,
              timestamp: new Date().toISOString()
            });

            // Update user's last seen
            const user = session.users.get(userId)!;
            user.lastSeen = new Date();

          } catch (error) {
            console.error('Animation change error:', error);
            socket.emit('error', { message: 'Failed to update animations' });
          }
        }
      });

      // AI conflict resolution
      socket.on('resolve-conflict', async (data) => {
        const { sessionId, userId, conflictId, resolution } = data;
        const session = this.sessions.get(sessionId);
        
        if (session && session.users.has(userId)) {
          try {
            // Use AI to resolve conflict
            const aiResolution = await this.resolveConflictWithAI(resolution);
            
            // Apply resolution
            const { error } = await supabase
              .from('projects')
              .update(aiResolution)
              .eq('id', session.projectId);

            if (error) throw error;

            // Broadcast resolution to all users
            this.io.to(sessionId).emit('conflict-resolved', {
              conflictId,
              resolution: aiResolution,
              resolvedBy: userId,
              timestamp: new Date().toISOString()
            });

          } catch (error) {
            console.error('Conflict resolution error:', error);
            socket.emit('error', { message: 'Failed to resolve conflict' });
          }
        }
      });

      // Disconnect
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        
        // Find and remove user from sessions
        for (const [sessionId, session] of this.sessions.entries()) {
          for (const [userId, user] of session.users.entries()) {
            if (socket.id === user.id) { // This is a simplified check
              session.users.delete(userId);
              this.userSessions.delete(userId);
              
              socket.to(sessionId).emit('user-left', { userId });
              
              // Clean up empty sessions
              if (session.users.size === 0) {
                this.sessions.delete(sessionId);
              }
              break;
            }
          }
        }
      });
    });
  }

  private generateUserColor(): string {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
      '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private async resolveConflictWithAI(conflict: any): Promise<any> {
    // Use AI to intelligently resolve conflicts
    const prompt = `Resolve this design conflict: ${JSON.stringify(conflict)}. 
    Return the best resolution that maintains design consistency and user experience.`;
    
    try {
      const { MultiModelPipeline } = await import('../services/multiModelAI');
      const resolution = await MultiModelPipeline.generateWithBestModel(prompt, 'analysis');
      
      // Parse AI response and return resolution
      return JSON.parse(resolution);
    } catch (error) {
      console.error('AI conflict resolution error:', error);
      // Fallback to simple resolution
      return conflict;
    }
  }

  // Get active sessions for a project
  public getActiveSession(projectId: string): CollaborationSession | undefined {
    for (const session of this.sessions.values()) {
      if (session.projectId === projectId && session.isActive) {
        return session;
      }
    }
    return undefined;
  }

  // Get user's current session
  public getUserSession(userId: string): CollaborationSession | undefined {
    const sessionId = this.userSessions.get(userId);
    return sessionId ? this.sessions.get(sessionId) : undefined;
  }
}

export default CollaborationManager;
