import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Video, 
  MessageCircle, 
  Share2, 
  Plus,
  Crown,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Clock,
  Zap,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Settings,
  Send,
  Smile,
  Paperclip,
  AlertCircle,
  Wifi,
  WifiOff,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  ScreenShare,
  ScreenShareOff,
  Hand
} from 'lucide-react';

// Enhanced Collaboration Types
interface CollaborationUser {
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

interface CollaborationSession {
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

interface CollaborationMessage {
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

interface CollaborationActivity {
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

// Mock data for demonstration
const mockUsers: CollaborationUser[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: '/avatars/sarah.jpg',
    role: 'owner',
    isOnline: true,
    lastSeen: new Date().toISOString(),
    cursor: { x: 100, y: 200, color: '#ff6b6b' },
    color: '#ff6b6b',
    isSpeaking: false,
    isHandRaised: false,
    permissions: {
      canEdit: true,
      canComment: true,
      canShare: true,
      canInvite: true,
    }
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    avatar: '/avatars/alex.jpg',
    role: 'editor',
    isOnline: true,
    lastSeen: new Date().toISOString(),
    cursor: { x: 300, y: 150, color: '#4ecdc4' },
    color: '#4ecdc4',
    isSpeaking: true,
    isHandRaised: false,
    permissions: {
      canEdit: true,
      canComment: true,
      canShare: false,
      canInvite: false,
    }
  },
  {
    id: '3',
    name: 'Lisa Park',
    email: 'lisa@example.com',
    avatar: '/avatars/lisa.jpg',
    role: 'viewer',
    isOnline: false,
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    color: '#45b7d1',
    isSpeaking: false,
    isHandRaised: true,
    permissions: {
      canEdit: false,
      canComment: true,
      canShare: false,
      canInvite: false,
    }
  }
];

const mockMessages: CollaborationMessage[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Chen',
    userColor: '#ff6b6b',
    content: 'Welcome everyone! Let\'s start building this amazing website together.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    type: 'text'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Alex Rodriguez',
    userColor: '#4ecdc4',
    content: 'I love the hero section design! Should we add some animations?',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    type: 'text',
    elementId: 'hero-section'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Lisa Park',
    userColor: '#45b7d1',
    content: 'The color scheme looks great. Maybe we could try a darker theme?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: 'text'
  }
];

const mockActivity: CollaborationActivity[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Chen',
    userColor: '#ff6b6b',
    action: 'created a new hero section',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    type: 'create',
    elementId: 'hero-section'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Alex Rodriguez',
    userColor: '#4ecdc4',
    action: 'updated the hero section background',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    type: 'edit',
    elementId: 'hero-section'
  },
  {
    id: '3',
    userId: '1',
    userName: 'Sarah Chen',
    userColor: '#ff6b6b',
    action: 'changed the color scheme to dark theme',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    type: 'style'
  },
  {
    id: '4',
    userId: '3',
    userName: 'Lisa Park',
    userColor: '#45b7d1',
    action: 'added a comment on the hero section',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: 'comment',
    elementId: 'hero-section'
  }
];

const EnhancedRealTimeCollaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('session');
  const [sessionCode, setSessionCode] = useState('');
  const [isInSession, setIsInSession] = useState(false);
  const [participants, setParticipants] = useState<CollaborationUser[]>(mockUsers);
  const [messages, setMessages] = useState<CollaborationMessage[]>(mockMessages);
  const [activity, setActivity] = useState<CollaborationActivity[]>(mockActivity);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [sessionSettings, setSessionSettings] = useState({
    allowGuestAccess: true,
    requireApproval: false,
    maxParticipants: 10,
    enableVideo: true,
    enableAudio: true,
    enableScreenShare: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate real-time updates
  useEffect(() => {
    if (isInSession) {
      const interval = setInterval(() => {
        // Simulate cursor movement
        setParticipants(prev => prev.map(user => ({
          ...user,
          cursor: user.isOnline ? {
            x: Math.random() * 800,
            y: Math.random() * 600,
            color: user.color
          } : user.cursor
        })));

        // Simulate speaking status
        setParticipants(prev => prev.map(user => ({
          ...user,
          isSpeaking: user.isOnline && Math.random() > 0.7
        })));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isInSession]);

  const handleJoinSession = () => {
    if (sessionCode.trim()) {
      setIsInSession(true);
      setIsConnected(true);
    }
  };

  const handleCreateSession = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSessionCode(newCode);
    setIsInSession(true);
    setIsConnected(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: CollaborationMessage = {
        id: Date.now().toString(),
        userId: '1', // Current user
        userName: 'You',
        userColor: '#ff6b6b',
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleInviteUser = () => {
    if (inviteEmail.trim()) {
      // Simulate invitation
      const newUser: CollaborationUser = {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: 'editor',
        isOnline: false,
        lastSeen: new Date().toISOString(),
        color: '#96ceb4',
        isSpeaking: false,
        isHandRaised: false,
        permissions: {
          canEdit: true,
          canComment: true,
          canShare: false,
          canInvite: false,
        }
      };
      setParticipants(prev => [...prev, newUser]);
      setInviteEmail('');
      setShowInviteModal(false);
    }
  };

  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const handleToggleHand = () => {
    setIsHandRaised(!isHandRaised);
  };

  const handleRemoveUser = (userId: string) => {
    setParticipants(prev => prev.filter(user => user.id !== userId));
  };

  const handleChangeRole = (userId: string, newRole: 'owner' | 'editor' | 'viewer') => {
    setParticipants(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  if (!isInSession) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <Users className="w-4 h-4 mr-2" />
              Real-time Collaboration
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Build Together, Build Better
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Collaborate in real-time with your team. Share sessions, edit together, 
              and create amazing websites with seamless teamwork.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Join Session */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Share2 className="w-6 h-6 mr-3 text-blue-400" />
                    Join Session
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Enter a session code to join an existing collaboration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter session code (e.g., ABC123)"
                      value={sessionCode}
                      onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                      className="bg-black/30 border-blue-500/30 text-white placeholder-gray-400 text-center text-lg tracking-widest"
                    />
                    <Button
                      onClick={handleJoinSession}
                      disabled={!sessionCode.trim()}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Join Session
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-900 px-2 text-gray-400">Or</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateSession}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Session
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="w-6 h-6 mr-3 text-purple-400" />
                    Collaboration Features
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Everything you need for seamless teamwork
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: <Users className="w-5 h-5" />, text: 'Real-time editing with live cursors' },
                    { icon: <Video className="w-5 h-5" />, text: 'Built-in video calling' },
                    { icon: <MessageCircle className="w-5 h-5" />, text: 'Live chat and comments' },
                    { icon: <ScreenShare className="w-5 h-5" />, text: 'Screen sharing capabilities' },
                    { icon: <Hand className="w-5 h-5" />, text: 'Raise hand for attention' },
                    { icon: <Settings className="w-5 h-5" />, text: 'Role-based permissions' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="text-purple-400">{feature.icon}</div>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Main Collaboration Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-xl border-b border-blue-500/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-white font-semibold">
                  Session: <span className="font-mono text-green-400">{sessionCode}</span>
                </span>
              </div>
              <Badge className="bg-blue-500/20 text-blue-300">
                {participants.filter(p => p.isOnline).length} online
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {/* Video Controls */}
              <Button
                size="sm"
                variant={isVideoEnabled ? "default" : "outline"}
                onClick={handleToggleVideo}
                className={isVideoEnabled ? "bg-green-600 hover:bg-green-700" : "border-gray-600 text-gray-300"}
              >
                {isVideoEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </Button>

              <Button
                size="sm"
                variant={isAudioEnabled ? "default" : "outline"}
                onClick={handleToggleAudio}
                className={isAudioEnabled ? "bg-green-600 hover:bg-green-700" : "border-gray-600 text-gray-300"}
              >
                {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>

              <Button
                size="sm"
                variant={isScreenSharing ? "default" : "outline"}
                onClick={handleToggleScreenShare}
                className={isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300"}
              >
                {isScreenSharing ? <ScreenShareOff className="w-4 h-4" /> : <ScreenShare className="w-4 h-4" />}
              </Button>

              <Button
                size="sm"
                variant={isHandRaised ? "default" : "outline"}
                onClick={handleToggleHand}
                className={isHandRaised ? "bg-yellow-600 hover:bg-yellow-700" : "border-gray-600 text-gray-300"}
              >
                {isHandRaised ? <Hand className="w-4 h-4" /> : <Hand className="w-4 h-4" />}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowInviteModal(true)}
                className="border-gray-600 text-gray-300"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsInSession(false)}
                className="border-red-600 text-red-300 hover:bg-red-600/20"
              >
                Leave
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Visual Editor Area */}
          <div className="flex-1 bg-black/10 relative">
            {/* Live Cursors */}
            {participants.filter(p => p.isOnline && p.cursor).map(user => (
              <motion.div
                key={user.id}
                className="absolute pointer-events-none z-50"
                style={{
                  left: user.cursor?.x || 0,
                  top: user.cursor?.y || 0,
                }}
                animate={{
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: user.color }}
                />
                <div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name}
                  {user.isSpeaking && <Volume2 className="w-3 h-3 ml-1 inline" />}
                  {user.isHandRaised && <Hand className="w-3 h-3 ml-1 inline" />}
                </div>
              </motion.div>
            ))}

            {/* Placeholder for Visual Editor */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">Live Collaboration</h3>
                <p className="text-gray-400">Visual editor will appear here</p>
                <p className="text-gray-500 text-sm mt-2">
                  {participants.filter(p => p.isOnline).length} users online
                </p>
              </div>
            </div>
          </div>

          {/* Collaboration Sidebar */}
          <div className="w-80 bg-black/20 backdrop-blur-xl border-l border-blue-500/20 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3 m-4">
                <TabsTrigger value="session">Session</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="session" className="flex-1 flex flex-col">
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-4">Participants</h3>
                  <div className="space-y-3">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback 
                              className="text-white text-xs"
                              style={{ backgroundColor: participant.color }}
                            >
                              {participant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white text-sm font-medium">{participant.name}</span>
                              {participant.role === 'owner' && <Crown className="w-3 h-3 text-yellow-400" />}
                              {participant.isSpeaking && <Volume2 className="w-3 h-3 text-green-400" />}
                              {participant.isHandRaised && <Hand className="w-3 h-3 text-yellow-400" />}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                                style={{ borderColor: participant.color, color: participant.color }}
                              >
                                {participant.role}
                              </Badge>
                              <div className={`w-2 h-2 rounded-full ${participant.isOnline ? 'bg-green-400' : 'bg-gray-500'}`} />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveUser(participant.id)}
                            className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                          >
                            <UserMinus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chat" className="flex-1 flex flex-col">
                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="text-white font-semibold">Live Chat</h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: message.userColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium">{message.userName}</span>
                            <span className="text-gray-400 text-xs">{new Date(message.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-gray-700">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-black/30 border-gray-600 text-white placeholder-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  <h3 className="text-white font-semibold mb-4">Activity Feed</h3>
                  <div className="space-y-3">
                    {activity.map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            item.type === 'create' ? 'bg-green-400' :
                            item.type === 'edit' ? 'bg-blue-400' :
                            item.type === 'delete' ? 'bg-red-400' :
                            item.type === 'move' ? 'bg-yellow-400' :
                            item.type === 'style' ? 'bg-purple-400' :
                            'bg-gray-400'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm">
                            <span className="font-medium" style={{ color: item.userColor }}>
                              {item.userName}
                            </span> {item.action}
                          </p>
                          <p className="text-gray-400 text-xs">{new Date(item.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-800 border-slate-700 w-96">
            <CardHeader>
              <CardTitle className="text-white">Invite User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleInviteUser}
                  disabled={!inviteEmail.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Send Invite
                </Button>
                <Button
                  onClick={() => setShowInviteModal(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedRealTimeCollaboration;
