import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import Balatro from '@/components/Balatro';
import BalatroSettings from '@/components/BalatroSettings';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(location.state?.signUp || false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Balatro settings
  const [pixelFilter, setPixelFilter] = useState(2000);
  const [mouseInteraction, setMouseInteraction] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [color1, setColor1] = useState('#1a1a1a');
  const [color2, setColor2] = useState('#2d2d2d');
  const [color3, setColor3] = useState('#0a0a0a');

  const from = location.state?.from?.pathname || '/builder';

  // Initial page load animation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 300); // 0.3 second delay before showing the page

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleModeChange = (newMode: boolean) => {
    if (newMode !== isSignUp) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsSignUp(newMode);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500); // 0.5 second delay before showing new content
      }, 150); // Half of the animation duration
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Registration validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }

        const result = await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        
        if (result.user && !result.error) {
          navigate(from, { replace: true });
        } else {
          setError(result.error?.message || 'Registration failed. Please try again.');
        }
      } else {
        // Login
        const result = await signIn({
          email: formData.email,
          password: formData.password,
        });
        
        if (result.user && !result.error) {
          navigate(from, { replace: true });
        } else {
          setError(result.error?.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Balatro Background */}
      <div className="absolute inset-0 z-0">
        <Balatro
          isRotate={isRotate}
          mouseInteraction={mouseInteraction}
          pixelFilter={pixelFilter}
          color1={color1}
          color2={color2}
          color3={color3}
          contrast={2.5}
          lighting={0.3}
          spinAmount={0.2}
          spinSpeed={3.0}
        />
      </div>

      {/* Settings Panel */}
      <BalatroSettings
        pixelFilter={pixelFilter}
        setPixelFilter={setPixelFilter}
        mouseInteraction={mouseInteraction}
        setMouseInteraction={setMouseInteraction}
        isRotate={isRotate}
        setIsRotate={setIsRotate}
        color1={color1}
        setColor1={setColor1}
        color2={color2}
        setColor2={setColor2}
        color3={color3}
        setColor3={setColor3}
      />
      
      {/* Login Form */}
      <div className={`relative z-10 w-full max-w-md bg-black/90 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl transition-all duration-500 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-serif font-semibold text-white">Welcome to Aura Builder</h1>
            <p className="text-gray-400 text-base">Sign in to your account or create a new one</p>
          </div>
          
          {/* Auth Mode Tabs */}
          <div className="flex bg-gray-800 border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => handleModeChange(false)}
              className={`flex-1 text-center py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                !isSignUp 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleModeChange(true)}
              className={`flex-1 text-center py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                isSignUp 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {/* Name Field - Only for Sign Up */}
            {isSignUp && (
              <div className={`space-y-2 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: isAnimating ? '0ms' : '200ms' }}>
                <label htmlFor="name" className="text-white text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0 rounded-md px-3 py-3 text-sm"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className={`space-y-2 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: isAnimating ? '0ms' : '300ms' }}>
              <label htmlFor="email" className="text-white text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0 rounded-md px-3 py-3 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={`space-y-2 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: isAnimating ? '0ms' : '400ms' }}>
              <label htmlFor="password" className="text-white text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0 rounded-md px-3 py-3 pr-10 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field - Only for Sign Up */}
            {isSignUp && (
              <div className={`space-y-2 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: isAnimating ? '0ms' : '500ms' }}>
                <label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 focus:ring-0 rounded-md px-3 py-3 pr-10 text-sm"
                    required={isSignUp}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-md p-3">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-white text-gray-900 hover:bg-gray-100 font-medium py-3 rounded-md transition-all duration-500 flex items-center justify-center space-x-2 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDelay: isAnimating ? '0ms' : '600ms' }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                  <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                </>
              ) : (
                <>
                  {isSignUp ? <User className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          {/* Forgot Password Link - Only for Sign In */}
          {!isSignUp && (
            <div className={`text-right transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: isAnimating ? '0ms' : '700ms' }}>
              <Link
                to="/forgot-password"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          {/* Terms and Privacy - Only for Sign Up */}
          {isSignUp && (
            <div className={`text-center transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: isAnimating ? '0ms' : '700ms' }}>
              <p className="text-gray-400 text-sm">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-gray-400 hover:text-white underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-gray-400 hover:text-white underline">Privacy Policy</a>.
              </p>
            </div>
          )}

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 rounded-md py-3 flex items-center justify-center space-x-2 transition-colors">
              <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xs">G</span>
              </div>
              <span className="text-sm">GitHub</span>
            </button>
            <button className="bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 rounded-md py-3 flex items-center justify-center space-x-2 transition-colors">
              <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xs">G</span>
              </div>
              <span className="text-sm">Google</span>
            </button>
            <button className="bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 rounded-md py-3 flex items-center justify-center space-x-2 transition-colors">
              <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xs">M</span>
              </div>
              <span className="text-sm">Microsoft</span>
            </button>
            <button className="bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 rounded-md py-3 flex items-center justify-center space-x-2 transition-colors">
              <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xs">D</span>
              </div>
              <span className="text-sm">Discord</span>
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
            <h4 className="text-white font-medium mb-2 text-sm">Demo Credentials:</h4>
            <p className="text-gray-400 text-sm">Email: admin@aura.com</p>
            <p className="text-gray-400 text-sm">Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
