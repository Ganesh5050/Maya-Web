import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  Shield, 
  Key,
  CheckCircle,
  AlertCircle,
  Github,
  Chrome,
  Smartphone,
  Monitor,
  Globe,
  Settings,
  LogOut,
  Crown,
  Star,
  Zap,
  Fingerprint,
  Smartphone as Phone,
  ShieldCheck,
  AlertTriangle,
  Clock,
  MapPin,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  X,
  Plus,
  Search,
  Filter,
  Calendar,
  Activity,
  BarChart3,
  TrendingUp,
  Users,
  Database,
  Server,
  Cloud,
  Lock as LockIcon,
  Unlock,
  RefreshCw,
  Copy,
  ExternalLink,
  Bell,
  BellOff,
  Mail as MailIcon,
  MessageSquare,
  HelpCircle,
  Info,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

// Enhanced Authentication Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  twoFactorEnabled: boolean;
  lastLogin: string;
  createdAt: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    emailUpdates: boolean;
    twoFactor: boolean;
    sessionTimeout: number;
  };
  stats: {
    projects: number;
    templates: number;
    exports: number;
    collaborations: number;
  };
  security: {
    passwordStrength: 'weak' | 'medium' | 'strong';
    lastPasswordChange: string;
    loginAttempts: number;
    blockedUntil?: string;
  };
}

interface LoginSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'two_factor_enabled' | 'suspicious_activity';
  description: string;
  timestamp: string;
  location: string;
  ipAddress: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface TwoFactorSetup {
  qrCode: string;
  secret: string;
  backupCodes: string[];
}

const EnhancedUserAuthentication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isSettingUpTwoFactor, setIsSettingUpTwoFactor] = useState(false);
  
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg',
    plan: 'pro',
    role: 'user',
    isVerified: true,
    twoFactorEnabled: false,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-15T00:00:00Z',
    preferences: {
      theme: 'dark',
      notifications: true,
      emailUpdates: true,
      twoFactor: false,
      sessionTimeout: 30
    },
    stats: {
      projects: 12,
      templates: 8,
      exports: 24,
      collaborations: 6
    },
    security: {
      passwordStrength: 'strong',
      lastPasswordChange: '2024-01-01T00:00:00Z',
      loginAttempts: 0
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sessions, setSessions] = useState<LoginSession[]>([
    {
      id: '1',
      device: 'MacBook Pro',
      browser: 'Chrome 120',
      location: 'New York, US',
      ipAddress: '192.168.1.100',
      lastActive: new Date().toISOString(),
      isCurrent: true
    },
    {
      id: '2',
      device: 'iPhone 15',
      browser: 'Safari 17',
      location: 'New York, US',
      ipAddress: '192.168.1.101',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isCurrent: false
    }
  ]);

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'login',
      description: 'Successful login from Chrome on MacBook Pro',
      timestamp: new Date().toISOString(),
      location: 'New York, US',
      ipAddress: '192.168.1.100',
      severity: 'low'
    },
    {
      id: '2',
      type: 'password_change',
      description: 'Password changed successfully',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      location: 'New York, US',
      ipAddress: '192.168.1.100',
      severity: 'medium'
    },
    {
      id: '3',
      type: 'suspicious_activity',
      description: 'Multiple failed login attempts detected',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Unknown',
      ipAddress: '203.0.113.1',
      severity: 'high'
    }
  ]);

  const [twoFactorSetup, setTwoFactorSetup] = useState<TwoFactorSetup>({
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    secret: 'JBSWY3DPEHPK3PXP',
    backupCodes: ['12345678', '87654321', '11223344', '44332211', '55667788']
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (authMode === 'register') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (authMode === 'login') {
      // Demo login - accept any email/password for demo
      setIsAuthenticated(true);
    } else if (authMode === 'register') {
      // Demo registration
      setUser(prev => ({
        ...prev,
        name: formData.name,
        email: formData.email
      }));
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  };

  const handleTwoFactorSubmit = async () => {
    if (!twoFactorCode) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo - accept any 6-digit code
    if (twoFactorCode.length === 6) {
      setIsAuthenticated(true);
      setShowTwoFactor(false);
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthMode('login');
    setFormData({ 
      name: '', 
      email: '', 
      password: '', 
      confirmPassword: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    setShowTwoFactor(false);
  };

  const handlePasswordChange = async () => {
    if (!formData.currentPassword || !formData.newPassword) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate password change
    setUser(prev => ({
      ...prev,
      security: {
        ...prev.security,
        lastPasswordChange: new Date().toISOString()
      }
    }));
    
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }));
    
    setIsLoading(false);
  };

  const handleTwoFactorToggle = async () => {
    setIsSettingUpTwoFactor(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
      preferences: {
        ...prev.preferences,
        twoFactor: !prev.preferences.twoFactor
      }
    }));
    
    setIsSettingUpTwoFactor(false);
  };

  const handleSessionRevoke = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handleDownloadBackupCodes = () => {
    const codesText = twoFactorSetup.backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const authMethods = [
    { id: 'google', name: 'Google', icon: Chrome, color: 'from-red-500 to-yellow-500' },
    { id: 'github', name: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900' },
    { id: 'apple', name: 'Apple', icon: Monitor, color: 'from-gray-800 to-gray-900' }
  ];

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <User className="w-4 h-4 mr-2" />
              User Dashboard
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Welcome Back, {user.name}!
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Manage your account, security settings, and monitor your activity from your personal dashboard.
            </p>
          </motion.div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-xl">
              <TabsTrigger value="profile" className="data-[state=active]:bg-green-600">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="sessions" className="data-[state=active]:bg-purple-600">
                <Monitor className="w-4 h-4 mr-2" />
                Sessions
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-orange-600">
                <Activity className="w-4 h-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-green-600 text-white text-xl">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white">{user.name}</CardTitle>
                          <CardDescription className="text-gray-300">{user.email}</CardDescription>
                          <div className="flex gap-2 mt-2">
                            <Badge className={`${
                              user.plan === 'pro' ? 'bg-purple-500/20 text-purple-300' : 
                              user.plan === 'enterprise' ? 'bg-gold-500/20 text-gold-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              <Crown className="w-3 h-3 mr-1" />
                              {user.plan.toUpperCase()} Plan
                            </Badge>
                            {user.isVerified && (
                              <Badge className="bg-green-500/20 text-green-300">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-black/30 rounded-lg">
                          <div className="text-2xl font-bold text-white">{user.stats.projects}</div>
                          <div className="text-sm text-gray-400">Projects</div>
                        </div>
                        <div className="text-center p-3 bg-black/30 rounded-lg">
                          <div className="text-2xl font-bold text-white">{user.stats.templates}</div>
                          <div className="text-sm text-gray-400">Templates</div>
                        </div>
                        <div className="text-center p-3 bg-black/30 rounded-lg">
                          <div className="text-2xl font-bold text-white">{user.stats.exports}</div>
                          <div className="text-sm text-gray-400">Exports</div>
                        </div>
                        <div className="text-center p-3 bg-black/30 rounded-lg">
                          <div className="text-2xl font-bold text-white">{user.stats.collaborations}</div>
                          <div className="text-sm text-gray-400">Collaborations</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-300"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Account Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-2"
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Account Settings</CardTitle>
                      <CardDescription className="text-gray-300">
                        Update your profile information and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">Full Name</label>
                          <Input
                            value={user.name}
                            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                            className="bg-black/30 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">Email</label>
                          <Input
                            value={user.email}
                            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                            className="bg-black/30 border-gray-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-medium">Preferences</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Email Notifications</span>
                            <Button
                              size="sm"
                              variant={user.preferences.emailUpdates ? "default" : "outline"}
                              onClick={() => setUser(prev => ({
                                ...prev,
                                preferences: { ...prev.preferences, emailUpdates: !prev.preferences.emailUpdates }
                              }))}
                              className={user.preferences.emailUpdates ? "bg-green-600" : "border-gray-600"}
                            >
                              {user.preferences.emailUpdates ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Push Notifications</span>
                            <Button
                              size="sm"
                              variant={user.preferences.notifications ? "default" : "outline"}
                              onClick={() => setUser(prev => ({
                                ...prev,
                                preferences: { ...prev.preferences, notifications: !prev.preferences.notifications }
                              }))}
                              className={user.preferences.notifications ? "bg-green-600" : "border-gray-600"}
                            >
                              {user.preferences.notifications ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Password Security */}
                <Card className="bg-black/20 backdrop-blur-xl border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Password Security</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage your password and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Current Password</label>
                        <Input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                          className="bg-black/30 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">New Password</label>
                        <Input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className="bg-black/30 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Confirm New Password</label>
                        <Input
                          type="password"
                          value={formData.confirmNewPassword}
                          onChange={(e) => handleInputChange('confirmNewPassword', e.target.value)}
                          className="bg-black/30 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handlePasswordChange}
                      disabled={isLoading}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
                      Change Password
                    </Button>
                    <div className="text-sm text-gray-400">
                      Last changed: {new Date(user.security.lastPasswordChange).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>

                {/* Two-Factor Authentication */}
                <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
                    <CardDescription className="text-gray-300">
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-white font-medium">2FA Status</div>
                          <div className="text-sm text-gray-400">
                            {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </div>
                        </div>
                      </div>
                      <Badge className={user.twoFactorEnabled ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}>
                        {user.twoFactorEnabled ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    <Button
                      onClick={handleTwoFactorToggle}
                      disabled={isSettingUpTwoFactor}
                      variant={user.twoFactorEnabled ? "outline" : "default"}
                      className={user.twoFactorEnabled ? "border-red-600 text-red-300 hover:border-red-500" : "bg-purple-600 hover:bg-purple-700 text-white"}
                    >
                      {isSettingUpTwoFactor ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 
                       user.twoFactorEnabled ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                      {user.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </Button>

                    {user.twoFactorEnabled && (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-400">Backup Codes</div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-300">
                          {twoFactorSetup.backupCodes.map((code, index) => (
                            <div key={index} className="p-2 bg-black/30 rounded text-center">
                              {code}
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={handleDownloadBackupCodes}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Codes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions" className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Active Sessions</CardTitle>
                  <CardDescription className="text-gray-300">
                    Manage your active login sessions across devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Monitor className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{session.device}</div>
                            <div className="text-gray-400 text-sm">{session.browser}</div>
                            <div className="text-gray-500 text-xs">
                              {session.location} • {session.ipAddress}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {session.isCurrent && (
                            <Badge className="bg-green-500/20 text-green-300">
                              Current Session
                            </Badge>
                          )}
                          <div className="text-sm text-gray-400">
                            {new Date(session.lastActive).toLocaleString()}
                          </div>
                          {!session.isCurrent && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSessionRevoke(session.id)}
                              className="border-red-600 text-red-300 hover:border-red-500"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-8">
              <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Security Events</CardTitle>
                  <CardDescription className="text-gray-300">
                    Monitor your account security and recent activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityEvents.map((event) => (
                      <div key={event.id} className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-gray-700">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          event.severity === 'critical' ? 'bg-red-500/20' :
                          event.severity === 'high' ? 'bg-orange-500/20' :
                          event.severity === 'medium' ? 'bg-yellow-500/20' :
                          'bg-green-500/20'
                        }`}>
                          {event.type === 'login' ? <LogIn className="w-5 h-5 text-green-400" /> :
                           event.type === 'logout' ? <LogOut className="w-5 h-5 text-gray-400" /> :
                           event.type === 'password_change' ? <Lock className="w-5 h-5 text-blue-400" /> :
                           event.type === 'two_factor_enabled' ? <Shield className="w-5 h-5 text-purple-400" /> :
                           <AlertTriangle className="w-5 h-5 text-red-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{event.description}</div>
                          <div className="text-gray-400 text-sm">
                            {new Date(event.timestamp).toLocaleString()} • {event.location}
                          </div>
                        </div>
                        <Badge className={`${
                          event.severity === 'critical' ? 'bg-red-500/20 text-red-300' :
                          event.severity === 'high' ? 'bg-orange-500/20 text-orange-300' :
                          event.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {event.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Two-Factor Authentication Modal
  if (showTwoFactor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 w-96">
            <CardHeader>
              <CardTitle className="text-white text-center">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Enter the 6-digit code from your authenticator app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Fingerprint className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-300 text-sm">
                  Open your authenticator app and enter the code for this account
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="000000"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl font-mono bg-black/30 border-blue-500/30 text-white placeholder-gray-400"
                  maxLength={6}
                />
                
                <Button
                  onClick={handleTwoFactorSubmit}
                  disabled={isLoading || twoFactorCode.length !== 6}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  Verify Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Login/Register Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <Shield className="w-4 h-4 mr-2" />
            Secure Authentication
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Welcome to Aura Builder
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sign in to your account or create a new one to access all features. 
            Your data is protected with enterprise-grade security.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
              <CardHeader>
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={authMode === 'login' ? 'default' : 'outline'}
                    onClick={() => setAuthMode('login')}
                    className={authMode === 'login' ? 'bg-blue-600 text-white' : 'border-gray-600 text-gray-300'}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    variant={authMode === 'register' ? 'default' : 'outline'}
                    onClick={() => setAuthMode('register')}
                    className={authMode === 'register' ? 'bg-blue-600 text-white' : 'border-gray-600 text-gray-300'}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
                <CardTitle className="text-white">
                  {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {authMode === 'login' 
                    ? 'Sign in to your account to continue' 
                    : 'Join thousands of creators building amazing websites'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {authMode === 'register' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="pl-10 bg-black/30 border-blue-500/30 text-white placeholder-gray-400"
                            />
                          </div>
                          {errors.name && (
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 bg-black/30 border-blue-500/30 text-white placeholder-gray-400"
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10 bg-black/30 border-blue-500/30 text-white placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {authMode === 'register' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className="pl-10 bg-black/30 border-blue-500/30 text-white placeholder-gray-400"
                            />
                          </div>
                          {errors.confirmPassword && (
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              {errors.confirmPassword}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : authMode === 'login' ? (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-900 px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  {authMethods.map((method) => (
                    <Button
                      key={method.id}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:border-gray-500"
                    >
                      <method.icon className="w-5 h-5" />
                    </Button>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Demo credentials: <span className="text-blue-400">admin@aura.com</span> / <span className="text-blue-400">password</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedUserAuthentication;
