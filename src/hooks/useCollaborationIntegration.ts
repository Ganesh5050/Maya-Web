import { useEffect, useCallback, useRef } from 'react';
import { useCollaboration } from '../contexts/CollaborationContext';

interface UseCollaborationIntegrationProps {
  projectId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole?: 'owner' | 'editor' | 'viewer';
  onComponentChange?: (componentId: string, changes: any) => void;
  onCursorMove?: (x: number, y: number) => void;
  onSelectionChange?: (elementId: string, start: number, end: number) => void;
}

export const useCollaborationIntegration = ({
  projectId,
  userId,
  userName,
  userEmail,
  userRole = 'editor',
  onComponentChange,
  onCursorMove,
  onSelectionChange,
}: UseCollaborationIntegrationProps) => {
  const { state, dispatch, initialize, joinSession, leaveSession, updateCursor, updateSelection, broadcastComponentChange, sendMessage, broadcastActivity } = useCollaboration();
  
  const isInitialized = useRef(false);
  const lastCursorPosition = useRef({ x: 0, y: 0 });
  const cursorThrottleRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize collaboration
  useEffect(() => {
    if (!isInitialized.current && projectId) {
      initialize(projectId).then((result) => {
        if (result.success) {
          joinSession(userId, userName, userEmail, userRole);
          dispatch({ type: 'SET_IN_SESSION', payload: true });
          dispatch({ type: 'SET_CURRENT_USER', payload: {
            id: userId,
            name: userName,
            email: userEmail,
            role: userRole,
            isOnline: true,
            lastSeen: new Date().toISOString(),
            color: '#ff6b6b',
            isSpeaking: false,
            isHandRaised: false,
            permissions: {
              canEdit: userRole === 'owner' || userRole === 'editor',
              canComment: true,
              canShare: userRole === 'owner',
              canInvite: userRole === 'owner',
            }
          }});
        }
      });
      isInitialized.current = true;
    }

    return () => {
      if (isInitialized.current) {
        leaveSession(userId);
        dispatch({ type: 'RESET_STATE' });
        isInitialized.current = false;
      }
    };
  }, [projectId, userId, userName, userEmail, userRole, initialize, joinSession, leaveSession, dispatch]);

  // Handle cursor movement with throttling
  const handleCursorMove = useCallback((x: number, y: number) => {
    // Throttle cursor updates to avoid too many WebSocket messages
    if (cursorThrottleRef.current) {
      clearTimeout(cursorThrottleRef.current);
    }

    cursorThrottleRef.current = setTimeout(() => {
      const distance = Math.sqrt(
        Math.pow(x - lastCursorPosition.current.x, 2) + 
        Math.pow(y - lastCursorPosition.current.y, 2)
      );

      // Only update if cursor moved significantly (more than 10 pixels)
      if (distance > 10) {
        lastCursorPosition.current = { x, y };
        updateCursor(x, y, userId);
        
        if (onCursorMove) {
          onCursorMove(x, y);
        }
      }
    }, 100); // Throttle to 10 updates per second
  }, [updateCursor, userId, onCursorMove]);

  // Handle selection changes
  const handleSelectionChange = useCallback((elementId: string, start: number, end: number) => {
    updateSelection(elementId, start, end, userId);
    
    if (onSelectionChange) {
      onSelectionChange(elementId, start, end);
    }
  }, [updateSelection, userId, onSelectionChange]);

  // Handle component changes
  const handleComponentChange = useCallback((componentId: string, changes: any) => {
    broadcastComponentChange(componentId, changes, userId);
    
    // Broadcast activity
    broadcastActivity(
      `updated ${componentId}`,
      userId,
      userName,
      '#ff6b6b',
      componentId,
      changes
    );
    
    if (onComponentChange) {
      onComponentChange(componentId, changes);
    }
  }, [broadcastComponentChange, broadcastActivity, userId, userName, onComponentChange]);

  // Handle component creation
  const handleComponentCreate = useCallback((componentId: string, component: any) => {
    broadcastComponentChange(componentId, component, userId);
    
    broadcastActivity(
      `created ${componentId}`,
      userId,
      userName,
      '#ff6b6b',
      componentId,
      component
    );
  }, [broadcastComponentChange, broadcastActivity, userId, userName]);

  // Handle component deletion
  const handleComponentDelete = useCallback((componentId: string) => {
    broadcastComponentChange(componentId, { deleted: true }, userId);
    
    broadcastActivity(
      `deleted ${componentId}`,
      userId,
      userName,
      '#ff6b6b',
      componentId
    );
  }, [broadcastComponentChange, broadcastActivity, userId, userName]);

  // Handle component move
  const handleComponentMove = useCallback((componentId: string, newPosition: any) => {
    broadcastComponentChange(componentId, { position: newPosition }, userId);
    
    broadcastActivity(
      `moved ${componentId}`,
      userId,
      userName,
      '#ff6b6b',
      componentId,
      newPosition
    );
  }, [broadcastComponentChange, broadcastActivity, userId, userName]);

  // Handle style changes
  const handleStyleChange = useCallback((componentId: string, styles: any) => {
    broadcastComponentChange(componentId, { styles }, userId);
    
    broadcastActivity(
      `updated styles for ${componentId}`,
      userId,
      userName,
      '#ff6b6b',
      componentId,
      styles
    );
  }, [broadcastComponentChange, broadcastActivity, userId, userName]);

  // Handle animation changes
  const handleAnimationChange = useCallback((componentId: string, animations: any) => {
    broadcastComponentChange(componentId, { animations }, userId);
    
    broadcastActivity(
      `updated animations for ${componentId}`,
      userId,
      userName,
      '#ff6b6b',
      componentId,
      animations
    );
  }, [broadcastComponentChange, broadcastActivity, userId, userName]);

  // Send message
  const handleSendMessage = useCallback((content: string) => {
    sendMessage(content, userId, userName, '#ff6b6b');
  }, [sendMessage, userId, userName]);

  // Get online participants
  const getOnlineParticipants = useCallback(() => {
    return state.participants.filter(p => p.isOnline);
  }, [state.participants]);

  // Get participant by ID
  const getParticipant = useCallback((participantId: string) => {
    return state.participants.find(p => p.id === participantId);
  }, [state.participants]);

  // Check if user can edit
  const canEdit = useCallback(() => {
    return state.currentUser?.permissions.canEdit || false;
  }, [state.currentUser]);

  // Check if user can comment
  const canComment = useCallback(() => {
    return state.currentUser?.permissions.canComment || false;
  }, [state.currentUser]);

  // Check if user can share
  const canShare = useCallback(() => {
    return state.currentUser?.permissions.canShare || false;
  }, [state.currentUser]);

  // Check if user can invite
  const canInvite = useCallback(() => {
    return state.currentUser?.permissions.canInvite || false;
  }, [state.currentUser]);

  return {
    // State
    isConnected: state.isConnected,
    isInSession: state.isInSession,
    participants: state.participants,
    messages: state.messages,
    activity: state.activity,
    currentUser: state.currentUser,
    error: state.error,
    
    // Actions
    handleCursorMove,
    handleSelectionChange,
    handleComponentChange,
    handleComponentCreate,
    handleComponentDelete,
    handleComponentMove,
    handleStyleChange,
    handleAnimationChange,
    handleSendMessage,
    
    // Utilities
    getOnlineParticipants,
    getParticipant,
    canEdit,
    canComment,
    canShare,
    canInvite,
  };
};
