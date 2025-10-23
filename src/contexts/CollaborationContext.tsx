import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useCollaborationWebSocket } from '../services/collaborationWebSocket';

// Types
export interface CollaborationUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  isOnline: boolean;
  lastSeen: string;
  cursor?: { x: number; y: number; color: string };
  selection?: { elementId: string; start: number; end: number };
  color: string;
  isSpeaking?: boolean;
  isHandRaised?: boolean;
  permissions: {
    canEdit: boolean;
    canComment: boolean;
    canShare: boolean;
    canInvite: boolean;
  };
}

export interface CollaborationMessage {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system' | 'action';
  elementId?: string;
  position?: { x: number; y: number };
}

export interface CollaborationActivity {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  action: string;
  timestamp: string;
  type: 'create' | 'edit' | 'delete' | 'move' | 'style' | 'comment';
  elementId?: string;
  details?: any;
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
  settings: {
    allowGuestAccess: boolean;
    requireApproval: boolean;
    maxParticipants: number;
    enableVideo: boolean;
    enableAudio: boolean;
    enableScreenShare: boolean;
  };
}

interface CollaborationState {
  session: CollaborationSession | null;
  participants: CollaborationUser[];
  messages: CollaborationMessage[];
  activity: CollaborationActivity[];
  isConnected: boolean;
  isInSession: boolean;
  currentUser: CollaborationUser | null;
  sessionCode: string;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  error: string | null;
}

type CollaborationAction =
  | { type: 'SET_SESSION'; payload: CollaborationSession }
  | { type: 'SET_PARTICIPANTS'; payload: CollaborationUser[] }
  | { type: 'ADD_PARTICIPANT'; payload: CollaborationUser }
  | { type: 'REMOVE_PARTICIPANT'; payload: string }
  | { type: 'UPDATE_PARTICIPANT'; payload: CollaborationUser }
  | { type: 'SET_MESSAGES'; payload: CollaborationMessage[] }
  | { type: 'ADD_MESSAGE'; payload: CollaborationMessage }
  | { type: 'SET_ACTIVITY'; payload: CollaborationActivity[] }
  | { type: 'ADD_ACTIVITY'; payload: CollaborationActivity }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_IN_SESSION'; payload: boolean }
  | { type: 'SET_CURRENT_USER'; payload: CollaborationUser }
  | { type: 'SET_SESSION_CODE'; payload: string }
  | { type: 'SET_VIDEO_ENABLED'; payload: boolean }
  | { type: 'SET_AUDIO_ENABLED'; payload: boolean }
  | { type: 'SET_SCREEN_SHARING'; payload: boolean }
  | { type: 'SET_HAND_RAISED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_CURSOR'; payload: { userId: string; x: number; y: number; color: string } }
  | { type: 'UPDATE_SELECTION'; payload: { userId: string; elementId: string; start: number; end: number } }
  | { type: 'RESET_STATE' };

const initialState: CollaborationState = {
  session: null,
  participants: [],
  messages: [],
  activity: [],
  isConnected: false,
  isInSession: false,
  currentUser: null,
  sessionCode: '',
  isVideoEnabled: false,
  isAudioEnabled: false,
  isScreenSharing: false,
  isHandRaised: false,
  error: null,
};

function collaborationReducer(state: CollaborationState, action: CollaborationAction): CollaborationState {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, session: action.payload };
    
    case 'SET_PARTICIPANTS':
      return { ...state, participants: action.payload };
    
    case 'ADD_PARTICIPANT':
      return { 
        ...state, 
        participants: [...state.participants.filter(p => p.id !== action.payload.id), action.payload]
      };
    
    case 'REMOVE_PARTICIPANT':
      return { 
        ...state, 
        participants: state.participants.filter(p => p.id !== action.payload)
      };
    
    case 'UPDATE_PARTICIPANT':
      return { 
        ...state, 
        participants: state.participants.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    
    case 'SET_ACTIVITY':
      return { ...state, activity: action.payload };
    
    case 'ADD_ACTIVITY':
      return { ...state, activity: [...state.activity, action.payload] };
    
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };
    
    case 'SET_IN_SESSION':
      return { ...state, isInSession: action.payload };
    
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    
    case 'SET_SESSION_CODE':
      return { ...state, sessionCode: action.payload };
    
    case 'SET_VIDEO_ENABLED':
      return { ...state, isVideoEnabled: action.payload };
    
    case 'SET_AUDIO_ENABLED':
      return { ...state, isAudioEnabled: action.payload };
    
    case 'SET_SCREEN_SHARING':
      return { ...state, isScreenSharing: action.payload };
    
    case 'SET_HAND_RAISED':
      return { ...state, isHandRaised: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'UPDATE_CURSOR':
      return {
        ...state,
        participants: state.participants.map(p => 
          p.id === action.payload.userId 
            ? { ...p, cursor: { x: action.payload.x, y: action.payload.y, color: action.payload.color } }
            : p
        )
      };
    
    case 'UPDATE_SELECTION':
      return {
        ...state,
        participants: state.participants.map(p => 
          p.id === action.payload.userId 
            ? { ...p, selection: { elementId: action.payload.elementId, start: action.payload.start, end: action.payload.end } }
            : p
        )
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

interface CollaborationContextType {
  state: CollaborationState;
  dispatch: React.Dispatch<CollaborationAction>;
  // WebSocket methods
  initialize: (projectId: string, sessionId?: string) => Promise<{ success: boolean; error?: string }>;
  joinSession: (userId: string, userName: string, userEmail: string, role?: 'owner' | 'editor' | 'viewer') => Promise<void>;
  leaveSession: (userId: string) => Promise<void>;
  updateCursor: (x: number, y: number, userId: string) => void;
  updateSelection: (elementId: string, start: number, end: number, userId: string) => void;
  broadcastComponentChange: (componentId: string, changes: any, userId: string) => void;
  sendMessage: (content: string, userId: string, userName: string, userColor: string) => void;
  broadcastActivity: (action: string, userId: string, userName: string, userColor: string, elementId?: string, details?: any) => void;
  toggleVideo: (enabled: boolean, userId: string) => void;
  toggleAudio: (enabled: boolean, userId: string) => void;
  toggleScreenShare: (enabled: boolean, userId: string) => void;
  toggleHandRaised: (raised: boolean, userId: string) => void;
  inviteUser: (email: string, role: 'editor' | 'viewer', userId: string) => void;
  changeUserRole: (targetUserId: string, newRole: 'owner' | 'editor' | 'viewer', userId: string) => void;
  removeUser: (targetUserId: string, userId: string) => void;
  getStatus: () => { isConnected: boolean; sessionId: string | null; projectId: string | null; reconnectAttempts: number };
  disconnect: () => void;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (context === undefined) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};

interface CollaborationProviderProps {
  children: ReactNode;
}

export const CollaborationProvider: React.FC<CollaborationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(collaborationReducer, initialState);
  const webSocketService = useCollaborationWebSocket();

  // Setup WebSocket event listeners
  useEffect(() => {
    const handleConnect = () => {
      dispatch({ type: 'SET_CONNECTED', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
    };

    const handleDisconnect = () => {
      dispatch({ type: 'SET_CONNECTED', payload: false });
    };

    const handleError = (error: any) => {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'WebSocket connection error' });
    };

    const handleUserJoined = (data: any) => {
      const user: CollaborationUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email || '',
        avatar: data.user.avatar,
        role: data.user.role || 'editor',
        isOnline: true,
        lastSeen: new Date().toISOString(),
        color: data.user.color || '#4ecdc4',
        isSpeaking: false,
        isHandRaised: false,
        permissions: {
          canEdit: data.user.role === 'owner' || data.user.role === 'editor',
          canComment: true,
          canShare: data.user.role === 'owner',
          canInvite: data.user.role === 'owner',
        }
      };
      dispatch({ type: 'ADD_PARTICIPANT', payload: user });
    };

    const handleUserLeft = (data: any) => {
      dispatch({ type: 'REMOVE_PARTICIPANT', payload: data.userId });
    };

    const handleCursorUpdate = (data: any) => {
      dispatch({ 
        type: 'UPDATE_CURSOR', 
        payload: { 
          userId: data.userId, 
          x: data.cursor.x, 
          y: data.cursor.y, 
          color: data.cursor.color || '#4ecdc4' 
        } 
      });
    };

    const handleSelectionUpdate = (data: any) => {
      dispatch({ 
        type: 'UPDATE_SELECTION', 
        payload: { 
          userId: data.userId, 
          elementId: data.selection.elementId, 
          start: data.selection.start, 
          end: data.selection.end 
        } 
      });
    };

    const handleMessage = (data: any) => {
      const message: CollaborationMessage = {
        id: data.id || Date.now().toString(),
        userId: data.userId,
        userName: data.userName,
        userColor: data.userColor,
        content: data.content,
        timestamp: data.timestamp,
        type: 'text',
      };
      dispatch({ type: 'ADD_MESSAGE', payload: message });
    };

    const handleActivity = (data: any) => {
      const activity: CollaborationActivity = {
        id: data.id || Date.now().toString(),
        userId: data.userId,
        userName: data.userName,
        userColor: data.userColor,
        action: data.action,
        timestamp: data.timestamp,
        type: data.type || 'edit',
        elementId: data.elementId,
        details: data.details,
      };
      dispatch({ type: 'ADD_ACTIVITY', payload: activity });
    };

    const handleSessionState = (data: any) => {
      dispatch({ type: 'SET_PARTICIPANTS', payload: data.users || [] });
      dispatch({ type: 'SET_MESSAGES', payload: data.messages || [] });
      dispatch({ type: 'SET_ACTIVITY', payload: data.activity || [] });
    };

    // Add event listeners
    webSocketService.addEventListener('connect', handleConnect);
    webSocketService.addEventListener('disconnect', handleDisconnect);
    webSocketService.addEventListener('error', handleError);
    webSocketService.addEventListener('user_joined', handleUserJoined);
    webSocketService.addEventListener('user_left', handleUserLeft);
    webSocketService.addEventListener('cursor_update', handleCursorUpdate);
    webSocketService.addEventListener('selection_update', handleSelectionUpdate);
    webSocketService.addEventListener('message', handleMessage);
    webSocketService.addEventListener('activity', handleActivity);
    webSocketService.addEventListener('session_state', handleSessionState);

    // Cleanup
    return () => {
      webSocketService.removeEventListener('connect', handleConnect);
      webSocketService.removeEventListener('disconnect', handleDisconnect);
      webSocketService.removeEventListener('error', handleError);
      webSocketService.removeEventListener('user_joined', handleUserJoined);
      webSocketService.removeEventListener('user_left', handleUserLeft);
      webSocketService.removeEventListener('cursor_update', handleCursorUpdate);
      webSocketService.removeEventListener('selection_update', handleSelectionUpdate);
      webSocketService.removeEventListener('message', handleMessage);
      webSocketService.removeEventListener('activity', handleActivity);
      webSocketService.removeEventListener('session_state', handleSessionState);
    };
  }, [webSocketService]);

  const contextValue: CollaborationContextType = {
    state,
    dispatch,
    initialize: webSocketService.initialize,
    joinSession: webSocketService.joinSession,
    leaveSession: webSocketService.leaveSession,
    updateCursor: webSocketService.updateCursor,
    updateSelection: webSocketService.updateSelection,
    broadcastComponentChange: webSocketService.broadcastComponentChange,
    sendMessage: webSocketService.sendMessage,
    broadcastActivity: webSocketService.broadcastActivity,
    toggleVideo: webSocketService.toggleVideo,
    toggleAudio: webSocketService.toggleAudio,
    toggleScreenShare: webSocketService.toggleScreenShare,
    toggleHandRaised: webSocketService.toggleHandRaised,
    inviteUser: webSocketService.inviteUser,
    changeUserRole: webSocketService.changeUserRole,
    removeUser: webSocketService.removeUser,
    getStatus: webSocketService.getStatus,
    disconnect: webSocketService.disconnect,
  };

  return (
    <CollaborationContext.Provider value={contextValue}>
      {children}
    </CollaborationContext.Provider>
  );
};
