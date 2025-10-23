import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Home,
  Zap,
  Palette,
  Workflow,
  Users,
  Info,
  Rocket,
  Menu,
  X,
  Sparkles,
  Brain,
  Film,
  Code,
  Settings,
  Globe,
  Star,
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: 'AI Tools',
      href: '/ai-tools',
      icon: <Zap className="w-4 h-4" />,
      badge: '9 AI Models',
      submenu: [
        { label: 'AI Co-Pilot', href: '/ai-tools#ai-copilot', icon: <Brain className="w-4 h-4" /> },
        { label: 'Working AI Generator', href: '/ai-tools#working-ai-generator', icon: <Sparkles className="w-4 h-4" /> },
        { label: 'Gemini Test', href: '/ai-tools#gemini-test', icon: <Brain className="w-4 h-4" /> },
        { label: 'Perplexity Test', href: '/ai-tools#perplexity-test', icon: <Globe className="w-4 h-4" /> },
        { label: 'ElevenLabs Voice AI', href: '/ai-tools#elevenlabs-test', icon: <Settings className="w-4 h-4" /> },
        { label: 'Stability AI Image Gen', href: '/ai-tools#stability-ai-test', icon: <Star className="w-4 h-4" /> },
        { label: 'Supabase Integration', href: '/ai-tools#supabase-test', icon: <Code className="w-4 h-4" /> },
        { label: 'Multi-Model AI Demo', href: '/ai-tools#multi-model-ai-demo', icon: <Brain className="w-4 h-4" /> },
        { label: 'Advanced AI Integration', href: '/ai-tools#advanced-ai-integration', icon: <Settings className="w-4 h-4" /> },
      ],
    },
    {
      label: 'Design & Animation',
      href: '/design-animation',
      icon: <Palette className="w-4 h-4" />,
      badge: '200+ Effects',
      submenu: [
        { label: 'Animation Timeline Editor', href: '/design-animation#animation-timeline-editor', icon: <Film className="w-4 h-4" /> },
        { label: 'Animation Library Demo', href: '/design-animation#animation-library-demo', icon: <Palette className="w-4 h-4" /> },
        { label: 'Revolutionary Features Demo', href: '/design-animation#revolutionary-features-demo', icon: <Sparkles className="w-4 h-4" /> },
        { label: 'Layout Optimizer', href: '/design-animation#layout-optimizer', icon: <Settings className="w-4 h-4" /> },
        { label: 'Design System Extractor', href: '/design-animation#design-system-extractor', icon: <Code className="w-4 h-4" /> },
        { label: 'Working 3D Scene Editor', href: '/design-animation#working-scene-3d-editor', icon: <Star className="w-4 h-4" /> },
      ],
    },
    {
      label: 'Workflow & Development',
      href: '/workflow-development',
      icon: <Workflow className="w-4 h-4" />,
      badge: '20+ Platforms',
      submenu: [
        { label: 'Workflow Demo', href: '/workflow-development#workflow-demo', icon: <Workflow className="w-4 h-4" /> },
        { label: 'Workflow Manager', href: '/workflow-development#workflow-manager', icon: <Settings className="w-4 h-4" /> },
        { label: 'Development Workflow', href: '/workflow-development#development-workflow', icon: <Code className="w-4 h-4" /> },
        { label: 'Template Marketplace', href: '/workflow-development#template-marketplace', icon: <Star className="w-4 h-4" /> },
        { label: 'Analytics Dashboard', href: '/workflow-development#analytics-dashboard', icon: <Settings className="w-4 h-4" /> },
        { label: 'Deployment Automation', href: '/workflow-development#deployment-automation', icon: <Rocket className="w-4 h-4" /> },
        { label: 'Deployment Dashboard', href: '/workflow-development#deployment-dashboard', icon: <Settings className="w-4 h-4" /> },
      ],
    },
    {
      label: 'User & Integration',
      href: '/user-integration',
      icon: <Users className="w-4 h-4" />,
      badge: '25+ APIs',
      submenu: [
        { label: 'User Authentication', href: '/user-integration#user-authentication', icon: <Users className="w-4 h-4" /> },
        { label: 'API Integration', href: '/user-integration#api-integration', icon: <Code className="w-4 h-4" /> },
        { label: 'Status Checker', href: '/user-integration#status-checker', icon: <Settings className="w-4 h-4" /> },
        { label: 'Feature Test Suite', href: '/user-integration#feature-test-suite', icon: <Star className="w-4 h-4" /> },
        { label: 'Feature Tester', href: '/user-integration#feature-tester', icon: <Settings className="w-4 h-4" /> },
      ],
    },
    {
      label: 'About',
      href: '/about',
      icon: <Info className="w-4 h-4" />,
    },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-lg border-b border-slate-700/50'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">Maya-Web</span>
              <span className="text-xs text-gray-400 -mt-1">AI 3D Website Builder</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-slate-800/50 text-white data-[state=open]:bg-slate-800/50 px-4 py-2 rounded-lg">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-slate-800/95 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 min-w-[400px]">
                          <div className="grid grid-cols-1 gap-2">
                            {item.submenu.map((subItem) => (
                              <NavigationMenuLink key={subItem.label} asChild>
                                <Link
                                  to={subItem.href}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group"
                                >
                                  <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-purple-500/20 transition-colors duration-200">
                                    {subItem.icon}
                                  </div>
                                  <span className="text-white group-hover:text-purple-300 transition-colors duration-200">
                                    {subItem.label}
                                  </span>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                            isActive(item.href)
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'text-white hover:bg-slate-800/50 hover:text-purple-300'
                          }`}
                        >
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              asChild
            >
              <Link to="/ai-tools">
                <Rocket className="w-4 h-4 mr-2" />
                Launch Builder
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-slate-800/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'text-white hover:bg-slate-800/50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs ml-auto px-2 py-1">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                    {item.submenu && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-slate-800/50 hover:text-white transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.icon}
                            <span className="text-sm">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-700/50">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl"
                    asChild
                  >
                    <Link to="/ai-tools" onClick={() => setIsMobileMenuOpen(false)}>
                      <Rocket className="w-4 h-4 mr-2" />
                      Launch Builder
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;