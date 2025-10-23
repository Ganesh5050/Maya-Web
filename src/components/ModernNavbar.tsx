import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Zap,
  Palette,
  Workflow,
  Users,
  Info,
  Rocket,
  Menu,
  X,
  Globe,
  Code,
  Brain,
  Film,
  Settings,
  Download,
  BookOpen,
  Server,
  Hexagon,
  Layers,
  Cpu,
  Database,
  Search,
  Mic,
  Image,
  Bot,
  Crown,
  Star,
  Wand2
} from 'lucide-react';

const ModernNavbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('navigated', 'true');
    navigate('/', { replace: true });
    // Clear any hash from URL and force scroll to very top
    setTimeout(() => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const advancedFeatures = [
    {
      category: "DEVELOPMENT PIPELINE",
      items: [
        {
          icon: <Code className="w-4 h-4" />,
          title: "Project Initialization",
          description: "Vite + React + TypeScript + Tailwind CSS setup",
          href: "/project-init"
        },
        {
          icon: <Palette className="w-4 h-4" />,
          title: "UI Framework Setup",
          description: "shadcn/ui + Radix UI + custom design system",
          href: "/ui-framework"
        },
        {
          icon: <Brain className="w-4 h-4" />,
          title: "AI Integration Test",
          description: "Test OpenAI, Gemini, and Perplexity APIs",
          href: "/ai-test"
        },
        {
          icon: <Brain className="w-4 h-4" />,
          title: "AI Integration Layer",
          description: "OpenAI + Gemini + Perplexity + ElevenLabs",
          href: "/ai-integration"
        },
        {
          icon: <Users className="w-4 h-4" />,
          title: "Real-time Collaboration",
          description: "WebSocket + Supabase Realtime + presence",
          href: "/collaboration"
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Visual Editor",
          description: "Drag-and-drop + live preview + code export",
          href: "/visual-editor"
        }
      ]
    },
    {
      category: "SYSTEM & INFRASTRUCTURE",
      items: [
        {
          icon: <Download className="w-4 h-4" />,
          title: "Code Export System",
          description: "React + Next.js + Astro + static export",
          href: "/code-export"
        },
        {
          icon: <Crown className="w-4 h-4" />,
          title: "Authentication & Security",
          description: "Supabase Auth + OAuth + session management",
          href: "/authentication"
        },
        {
          icon: <Database className="w-4 h-4" />,
          title: "Database Integration",
          description: "Supabase + PostgreSQL + real-time subscriptions",
          href: "/database"
        },
        {
          icon: <Zap className="w-4 h-4" />,
          title: "Performance Optimization",
          description: "Code splitting + lazy loading + caching",
          href: "/performance"
        },
        {
          icon: <Star className="w-4 h-4" />,
          title: "Testing & Quality Assurance",
          description: "Unit tests + E2E tests + Lighthouse optimization",
          href: "/testing"
        },
        {
          icon: <Rocket className="w-4 h-4" />,
          title: "Deployment & DevOps",
          description: "Vercel + Netlify + Docker + CI/CD pipelines",
          href: "/deployment"
        }
      ]
    }
  ];

  const resources = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      title: "Documentation",
      description: "Complete guides and API references"
    },
    {
      icon: <Code className="w-4 h-4" />,
      title: "Code Examples",
      description: "Ready-to-use code snippets and templates"
    },
    {
      icon: <Download className="w-4 h-4" />,
      title: "Export Formats",
      description: "React, Next.js, Astro, and more"
    },
    {
      icon: <Globe className="w-4 h-4" />,
      title: "Deployment Guide",
      description: "Deploy to 20+ platforms instantly"
    }
  ];

  const company = [
    {
      icon: <Info className="w-4 h-4" />,
      title: "About Maya-Web",
      description: "The future of website building"
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Team & Partners",
      description: "Meet the creators"
    },
    {
      icon: <Star className="w-4 h-4" />,
      title: "Roadmap",
      description: "What's coming next"
    },
    {
      icon: <Crown className="w-4 h-4" />,
      title: "Blog & Insights",
      description: "Latest updates and tutorials"
    }
  ];

  const uiComponents = [
    {
      icon: <Palette className="w-4 h-4" />,
      title: "TEXT",
      description: "Text animations and effects",
      href: "/text-animations"
    },
    {
      icon: <Settings className="w-4 h-4" />,
      title: "BACKGROUNDS", 
      description: "Background animations and effects",
      href: "/backgrounds"
    },
    {
      icon: <Wand2 className="w-4 h-4" />,
      title: "BUILDER FORM",
      description: "Customize loading and generation animations",
      href: "/builder-form"
    },
    {
      icon: <Code className="w-4 h-4" />,
      title: "UI Component 3",
      description: "Description for UI component 3"
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: "UI Component 4",
      description: "Description for UI component 4"
    },
    {
      icon: <Globe className="w-4 h-4" />,
      title: "UI Component 5",
      description: "Description for UI component 5"
    },
    {
      icon: <Brain className="w-4 h-4" />,
      title: "UI Component 6",
      description: "Description for UI component 6"
    },
    {
      icon: <Rocket className="w-4 h-4" />,
      title: "UI Component 7",
      description: "Description for UI component 7"
    },
    {
      icon: <Star className="w-4 h-4" />,
      title: "UI Component 8",
      description: "Description for UI component 8"
    }
  ];

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Gradient Top Bar */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 to-blue-500"></div>
      
      {/* Main Navbar */}
      <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-0.5 sm:px-0.5 lg:px-0.5">
          <div className="flex items-center justify-between h-16">
            
             {/* Logo */}
             <div className="flex items-center space-x-2">
               <button
                 onClick={handleLogoClick}
                 className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
               >
                 <div className="p-1 rounded-lg">
                   <img 
                     src="/favicon.ico" 
                     alt="Maya-Web Logo" 
                     className="w-8 h-8"
                   />
                 </div>
                 <span className="text-xl font-bold text-white">Maya-Web</span>
               </button>
             </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 ml-24">
              
              {/* UI Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => handleDropdownToggle('ui')}
                  className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                >
                  <span>UI</span>
                  {activeDropdown === 'ui' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'ui' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-[600px] bg-black/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                              UI Components
                            </h3>
                            <div className="space-y-4">
                              {uiComponents.slice(0, 4).map((item, index) => (
                                <Link
                                  key={index}
                                  to={item.href || "#"}
                                  className="flex items-start space-x-3 group cursor-pointer"
                                >
                                  <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors">
                                    {item.icon}
                                  </div>
                                  <div>
                                    <h4 className="text-white font-medium">{item.title}</h4>
                                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                              More Components
                            </h3>
                            <div className="space-y-4">
                              {uiComponents.slice(4, 8).map((item, index) => (
                                <Link
                                  key={index}
                                  to={item.href || "#"}
                                  className="flex items-start space-x-3 group cursor-pointer"
                                >
                                  <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors">
                                    {item.icon}
                                  </div>
                                  <div>
                                    <h4 className="text-white font-medium">{item.title}</h4>
                                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* DEACTIVATED: Advanced Dropdown - Keep for future use */}
              {/* 
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => handleDropdownToggle('advanced')}
                  className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                >
                  <span>Advanced</span>
                  {activeDropdown === 'advanced' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'advanced' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-[800px] bg-black/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-8">
                          {advancedFeatures.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                                {section.category}
                              </h3>
                              <div className="space-y-4">
                                {section.items.map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    to={item.href}
                                    className="flex items-start space-x-3 group cursor-pointer"
                                  >
                                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors">
                                      {item.icon}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-white font-medium">{item.title}</h4>
                                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              */}

              {/* DEACTIVATED: Resources Dropdown - Keep for future use */}
              {/* 
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('resources')}
                  className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                >
                  <span>Resources</span>
                  {activeDropdown === 'resources' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'resources' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl"
                    >
                      <div className="p-6">
                        <div className="space-y-4">
                          {resources.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3 group cursor-pointer">
                              <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{item.title}</h4>
                                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              */}

              {/* DEACTIVATED: Company Dropdown - Keep for future use */}
              {/* 
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('company')}
                  className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                >
                  <span>Company</span>
                  {activeDropdown === 'company' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'company' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl"
                    >
                      <div className="p-6">
                        <div className="space-y-4">
                          {company.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3 group cursor-pointer">
                              <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{item.title}</h4>
                                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              */}

              {/* Simple Links */}
              {isAuthenticated && (
                <>
                  <Link to="/my-projects" className="text-white hover:text-gray-300 transition-colors">
                    My Projects
                  </Link>
                  <Link to="/templates" className="text-white hover:text-gray-300 transition-colors">
                    Templates
                  </Link>
                </>
              )}
              <a href="#docs" className="text-white hover:text-gray-300 transition-colors">Docs</a>
              <a href="#pricing" className="text-white hover:text-gray-300 transition-colors">Pricing</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-2 ml-18">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm">
                    Welcome, {user?.name || user?.email?.split('@')[0]}
                  </span>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-gray-300 hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-gray-300 hover:bg-gray-800">
                    LOG IN
                  </Button>
                </Link>
              )}
              <Link to="/builder" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center">
                <Rocket className="w-4 h-4 mr-2" />
                LAUNCH BUILDER
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-gray-300"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800"
            >
              <div className="px-4 py-6 space-y-4">
                {/* DEACTIVATED: Advanced Mobile Menu - Keep for future use */}
                {/* 
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Advanced</h3>
                  {advancedFeatures.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="ml-4 space-y-2">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{section.category}</h4>
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          to={item.href}
                          className="flex items-center space-x-3 py-2 hover:bg-gray-800 rounded-md px-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="p-1 rounded bg-gray-800">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{item.title}</div>
                            <div className="text-gray-400 text-xs">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                */}
                
                {/* DEACTIVATED: Resources Mobile Menu - Keep for future use */}
                {/* 
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
                  {resources.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 py-2 ml-4">
                      <div className="p-1 rounded bg-gray-800">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{item.title}</div>
                        <div className="text-gray-400 text-xs">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                */}

                {/* DEACTIVATED: Company Mobile Menu - Keep for future use */}
                {/* 
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
                  {company.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 py-2 ml-4">
                      <div className="p-1 rounded bg-gray-800">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{item.title}</div>
                        <div className="text-gray-400 text-xs">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                */}

                {/* UI Components Mobile Menu */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">UI Components</h3>
                  {uiComponents.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 py-2 ml-4">
                      <div className="p-1 rounded bg-gray-800">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{item.title}</div>
                        <div className="text-gray-400 text-xs">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simple Navigation Links for Mobile */}
                <div className="space-y-2">
                  {isAuthenticated && (
                    <>
                      <Link to="/my-projects" className="block text-white hover:text-gray-300 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                        My Projects
                      </Link>
                      <Link to="/templates" className="block text-white hover:text-gray-300 transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                        Templates
                      </Link>
                    </>
                  )}
                  <a href="#docs" className="block text-white hover:text-gray-300 transition-colors py-2">Docs</a>
                  <a href="#pricing" className="block text-white hover:text-gray-300 transition-colors py-2">Pricing</a>
                </div>

                <div className="pt-4 border-t border-gray-800 space-y-3">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="text-center text-white text-sm">
                        Welcome, {user?.name || user?.email?.split('@')[0]}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full text-white hover:text-gray-300 hover:bg-gray-800"
                        onClick={handleLogout}
                      >
                        LOGOUT
                      </Button>
                    </div>
                  ) : (
                    <Link to="/login">
                      <Button variant="ghost" className="w-full text-white hover:text-gray-300 hover:bg-gray-800">
                        LOG IN
                      </Button>
                    </Link>
                  )}
                  <Link to="/builder" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-4 py-2 rounded-md shadow-lg hover:shadow-purple-500/25 transition-all duration-300 mt-4 inline-flex items-center justify-center">
                    <Rocket className="w-4 h-4 mr-2" />
                    LAUNCH BUILDER
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernNavbar;
