import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Zap
} from 'lucide-react';

const UserAuthentication = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'profile'
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg',
    plan: 'pro',
    projects: 12,
    templates: 8,
    joinedDate: '2024-01-15'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (authMode === 'login') {
        setIsAuthenticated(true);
      } else if (authMode === 'register') {
        setIsAuthenticated(true);
        setUser({
          ...user,
          name: formData.name,
          email: formData.email
        });
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthMode('login');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const authMethods = [
    { id: 'google', name: 'Google', icon: Chrome, color: 'from-red-500 to-yellow-500' },
    { id: 'github', name: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900' },
    { id: 'apple', name: 'Apple', icon: Monitor, color: 'from-gray-800 to-gray-900' }
  ];

  const securityFeatures = [
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: Shield,
      enabled: true
    },
    {
      title: 'Password Manager',
      description: 'Generate and store secure passwords',
      icon: Key,
      enabled: false
    },
    {
      title: 'Session Management',
      description: 'Monitor and control active sessions',
      icon: Monitor,
      enabled: true
    },
    {
      title: 'Login Notifications',
      description: 'Get notified of new login attempts',
      icon: Smartphone,
      enabled: true
    }
  ];

  const recentActivity = [
    { action: 'Logged in from Chrome', time: '2 hours ago', location: 'New York, US' },
    { action: 'Created new project', time: '1 day ago', location: 'New York, US' },
    { action: 'Downloaded template', time: '3 days ago', location: 'New York, US' },
    { action: 'Updated profile', time: '1 week ago', location: 'New York, US' }
  ];

  if (isAuthenticated) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <User className="w-4 h-4 mr-2" />
              User Dashboard
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Welcome Back!
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Manage your account, projects, and security settings from your personal dashboard.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
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
                      <Badge className={`mt-2 ${
                        user.plan === 'pro' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        <Crown className="w-3 h-3 mr-1" />
                        {user.plan.toUpperCase()} Plan
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-black/30 rounded-lg">
                      <div className="text-2xl font-bold text-white">{user.projects}</div>
                      <div className="text-sm text-gray-400">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-black/30 rounded-lg">
                      <div className="text-2xl font-bold text-white">{user.templates}</div>
                      <div className="text-sm text-gray-400">Templates</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Member since {new Date(user.joinedDate).toLocaleDateString()}
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

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Security Settings</CardTitle>
                  <CardDescription className="text-gray-300">
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <feature.icon className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-white font-medium">{feature.title}</div>
                          <div className="text-sm text-gray-400">{feature.description}</div>
                        </div>
                      </div>
                      <Badge className={feature.enabled ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}>
                        {feature.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your latest actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="p-3 bg-black/30 rounded-lg">
                      <div className="text-white text-sm font-medium">{activity.action}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {activity.time} • {activity.location}
                      </div>
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <Shield className="w-4 h-4 mr-2" />
            User Authentication
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Secure Access
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sign in to your account or create a new one to access all features. 
            Your data is protected with enterprise-grade security.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    {authMode === 'login' ? (
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
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UserAuthentication;
