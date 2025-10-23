import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Zap
} from 'lucide-react';

const RealTimeCollaboration = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const [sessionCode, setSessionCode] = useState('');
  const [isInSession, setIsInSession] = useState(false);

  const mockSessions = [
    {
      id: '1',
      name: 'Portfolio Website Design',
      owner: 'Sarah Chen',
      participants: 3,
      lastActivity: '2 minutes ago',
      status: 'active'
    },
    {
      id: '2',
      name: 'E-commerce Landing Page',
      owner: 'Mike Johnson',
      participants: 5,
      lastActivity: '1 hour ago',
      status: 'active'
    },
    {
      id: '3',
      name: 'Blog Template Creation',
      owner: 'Emma Wilson',
      participants: 2,
      lastActivity: '3 hours ago',
      status: 'paused'
    }
  ];

  const mockParticipants = [
    { id: '1', name: 'Sarah Chen', role: 'owner', avatar: '/avatars/sarah.jpg', isOnline: true },
    { id: '2', name: 'Alex Rodriguez', role: 'editor', avatar: '/avatars/alex.jpg', isOnline: true },
    { id: '3', name: 'Lisa Park', role: 'viewer', avatar: '/avatars/lisa.jpg', isOnline: false }
  ];

  const mockActivity = [
    { id: '1', user: 'Sarah Chen', action: 'created a new component', time: '2 min ago', type: 'create' },
    { id: '2', user: 'Alex Rodriguez', action: 'updated the hero section', time: '5 min ago', type: 'edit' },
    { id: '3', user: 'Lisa Park', action: 'added a comment', time: '8 min ago', type: 'comment' },
    { id: '4', user: 'Sarah Chen', action: 'changed the color scheme', time: '12 min ago', type: 'edit' }
  ];

  const handleJoinSession = () => {
    if (sessionCode.trim()) {
      setIsInSession(true);
    }
  };

  const handleCreateSession = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSessionCode(newCode);
    setIsInSession(true);
  };

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

        {!isInSession ? (
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

            {/* Active Sessions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="w-6 h-6 mr-3 text-purple-400" />
                    Active Sessions
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Join ongoing collaborations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSessions.map((session) => (
                    <div key={session.id} className="p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{session.name}</h4>
                        <Badge className={session.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Owner: {session.owner}</span>
                        <span>{session.participants} participants</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{session.lastActivity}</span>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Collaboration Area */}
            <div className="lg:col-span-2">
              <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Collaboration Session</CardTitle>
                      <CardDescription className="text-gray-300">
                        Session Code: <span className="font-mono text-green-400">{sessionCode}</span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Video className="w-4 h-4 mr-2" />
                        Video Call
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black/50 rounded-lg border border-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-white text-lg font-semibold mb-2">Live Collaboration</h3>
                      <p className="text-gray-400">Website editor will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Participants */}
              <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Participants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback className="bg-purple-600 text-white text-xs">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <span className="text-white text-sm">{participant.name}</span>
                            {participant.role === 'owner' && <Crown className="w-3 h-3 ml-1 text-yellow-400" />}
                          </div>
                          <div className="flex items-center">
                            <Badge className="text-xs bg-blue-500/20 text-blue-300">
                              {participant.role}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full ml-2 ${participant.isOnline ? 'bg-green-400' : 'bg-gray-500'}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Activity Feed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'create' ? 'bg-green-400' :
                        activity.type === 'edit' ? 'bg-blue-400' :
                        'bg-purple-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-gray-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-time Editing</h3>
                <p className="text-gray-400 text-sm">
                  See changes as they happen with live cursor tracking and instant updates
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Video Calls</h3>
                <p className="text-gray-400 text-sm">
                  Built-in video calling for face-to-face collaboration and communication
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-green-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Live Comments</h3>
                <p className="text-gray-400 text-sm">
                  Add comments and feedback directly on elements for better communication
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RealTimeCollaboration;
