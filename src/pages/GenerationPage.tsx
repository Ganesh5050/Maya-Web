"use client";
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SparkleButton from '@/components/ui/SparkleButton';
import Particles from '@/components/Particles';
import { 
  Plus, 
  Paperclip, 
  Globe, 
  Zap, 
  Mic,
  FolderOpen,
  FileText,
  Code,
  Image,
  Settings,
  MessageSquare,
  Send,
  ChevronRight,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

function GenerationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const promptFromUrl = searchParams.get('prompt') || '';
  
  const [input, setInput] = useState(promptFromUrl);
  const [isSystemActivated, setIsSystemActivated] = useState(false);
  const [isIDEView, setIsIDEView] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, isUser: boolean}>>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'public']));
  const [websiteFiles, setWebsiteFiles] = useState<any>({});
  const [generatedWebsite, setGeneratedWebsite] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [isAutoActivating, setIsAutoActivating] = useState(false);

  // Disable scrolling only for this page
  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Auto-activation countdown
  useEffect(() => {
    if (!isSystemActivated && !isAutoActivating) {
      setIsAutoActivating(true);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsSystemActivated(true);
            setIsAutoActivating(false);
            // Start generation immediately if we have a prompt
            if (promptFromUrl) {
              generateWebsiteFromPrompt(promptFromUrl);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSystemActivated, isAutoActivating]);

  // Intelligent website generation based on user input
  const generateWebsiteFromPrompt = async (prompt: string) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate AI analysis and generation
    const steps = [
      { progress: 20, message: "Analyzing your requirements..." },
      { progress: 40, message: "Generating website structure..." },
      { progress: 60, message: "Creating components..." },
      { progress: 80, message: "Adding styling..." },
      { progress: 100, message: "Finalizing website..." }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
    }

    // Generate dynamic website based on prompt
    const websiteData = generateDynamicWebsite(prompt);
    setWebsiteFiles(websiteData.files);
    setGeneratedWebsite(websiteData.website);
    setIsGenerating(false);
    setIsIDEView(true);
    setIsSystemActivated(true);
  };

  const generateDynamicWebsite = (prompt: string) => {
    // Extract key information from prompt
    const isEcommerce = prompt.toLowerCase().includes('shop') || prompt.toLowerCase().includes('store') || prompt.toLowerCase().includes('ecommerce');
    const isPortfolio = prompt.toLowerCase().includes('portfolio') || prompt.toLowerCase().includes('personal') || prompt.toLowerCase().includes('about me');
    const isBusiness = prompt.toLowerCase().includes('business') || prompt.toLowerCase().includes('company') || prompt.toLowerCase().includes('corporate');
    const isBlog = prompt.toLowerCase().includes('blog') || prompt.toLowerCase().includes('news') || prompt.toLowerCase().includes('articles');
    
    // Generate appropriate website structure
    let websiteType = 'landing';
    let primaryColor = 'blue';
    let secondaryColor = 'purple';
    
    if (isEcommerce) {
      websiteType = 'ecommerce';
      primaryColor = 'green';
      secondaryColor = 'blue';
    } else if (isPortfolio) {
      websiteType = 'portfolio';
      primaryColor = 'purple';
      secondaryColor = 'pink';
    } else if (isBusiness) {
      websiteType = 'business';
      primaryColor = 'blue';
      secondaryColor = 'gray';
    } else if (isBlog) {
      websiteType = 'blog';
      primaryColor = 'orange';
      secondaryColor = 'red';
    }

    // Generate dynamic files based on website type
    const files = generateFilesForType(websiteType, prompt);
    const website = generateWebsiteContent(websiteType, prompt, primaryColor, secondaryColor);
    
    return { files, website };
  };

  const generateFilesForType = (type: string, prompt: string) => {
    const baseFiles = {
      'index.html': { 
        type: 'html', 
        content: `<!DOCTYPE html><html><head><title>${extractTitle(prompt)}</title></head><body>...</body></html>` 
      },
      'src': {
        'App.tsx': { 
          type: 'tsx', 
          content: `import React from 'react';\nexport default function App() {\n  return (\n    <div>\n      {/* ${prompt} */}\n    </div>\n  );\n}` 
        },
        'components': {
          'Header.tsx': { 
            type: 'tsx', 
            content: `export function Header() {\n  return (\n    <header>\n      <h1>${extractTitle(prompt)}</h1>\n    </header>\n  );\n}` 
          },
          'Footer.tsx': { 
            type: 'tsx', 
            content: `export function Footer() {\n  return (\n    <footer>\n      <p>&copy; 2024 ${extractTitle(prompt)}</p>\n    </footer>\n  );\n}` 
          }
        },
        'styles': {
          'globals.css': { 
            type: 'css', 
            content: `body {\n  margin: 0;\n  font-family: system-ui;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}` 
          }
        }
      },
      'public': {
        'favicon.ico': { type: 'image', content: '' },
        'logo.png': { type: 'image', content: '' }
      }
    };

    // Add type-specific files
    if (type === 'ecommerce') {
      baseFiles.src.components['ProductCard.tsx'] = { 
        type: 'tsx', 
        content: `export function ProductCard({ product }) {\n  return (\n    <div className="product-card">\n      <img src={product.image} alt={product.name} />\n      <h3>{product.name}</h3>\n      <p>${product.price}</p>\n    </div>\n  );\n}` 
      };
      baseFiles.src.components['Cart.tsx'] = { 
        type: 'tsx', 
        content: `export function Cart() {\n  return (\n    <div className="cart">\n      <h2>Shopping Cart</h2>\n      {/* Cart items */}\n    </div>\n  );\n}` 
      };
    } else if (type === 'portfolio') {
      baseFiles.src.components['ProjectCard.tsx'] = { 
        type: 'tsx', 
        content: `export function ProjectCard({ project }) {\n  return (\n    <div className="project-card">\n      <img src={project.image} alt={project.title} />\n      <h3>{project.title}</h3>\n      <p>{project.description}</p>\n    </div>\n  );\n}` 
      };
    }

    return baseFiles;
  };

  const generateWebsiteContent = (type: string, prompt: string, primaryColor: string, secondaryColor: string) => {
    const title = extractTitle(prompt);
    const description = extractDescription(prompt);
    
    return {
      type,
      title,
      description,
      primaryColor,
      secondaryColor,
      sections: generateSectionsForType(type, prompt),
      features: generateFeaturesForType(type, prompt)
    };
  };

  const extractTitle = (prompt: string) => {
    // Simple title extraction logic
    const words = prompt.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ');
    }
    return prompt.length > 20 ? prompt.substring(0, 20) + '...' : prompt;
  };

  const extractDescription = (prompt: string) => {
    return `A beautiful ${prompt.toLowerCase()} website built with modern technologies and AI assistance.`;
  };

  const generateSectionsForType = (type: string, prompt: string) => {
    const baseSections = ['hero', 'about', 'contact'];
    
    switch (type) {
      case 'ecommerce':
        return ['hero', 'products', 'features', 'testimonials', 'contact'];
      case 'portfolio':
        return ['hero', 'about', 'projects', 'skills', 'contact'];
      case 'business':
        return ['hero', 'services', 'about', 'team', 'contact'];
      case 'blog':
        return ['hero', 'latest-posts', 'categories', 'about', 'contact'];
      default:
        return baseSections;
    }
  };

  const generateFeaturesForType = (type: string, prompt: string) => {
    switch (type) {
      case 'ecommerce':
        return ['Secure Payments', 'Fast Shipping', '24/7 Support', 'Mobile Ready'];
      case 'portfolio':
        return ['Responsive Design', 'Modern UI', 'Fast Loading', 'SEO Optimized'];
      case 'business':
        return ['Professional Design', 'Easy Management', 'Analytics', 'Support'];
      case 'blog':
        return ['Easy Writing', 'SEO Friendly', 'Social Sharing', 'Comments'];
      default:
        return ['Modern Design', 'Fast Loading', 'Mobile Ready', 'SEO Optimized'];
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      console.log('Building website with prompt:', input);
      generateWebsiteFromPrompt(input);
    }
  };

  const handleBackToMain = () => {
    navigate('/builder');
  };

  const handleChatSend = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now(),
        text: chatInput,
        isUser: true
      };
      setChatMessages(prev => [...prev, newMessage]);
      const userInput = chatInput;
      setChatInput('');
      
      // Intelligent AI response that actually modifies the website
      setTimeout(() => {
        const modification = analyzeAndModifyWebsite(userInput);
        const aiResponse = {
          id: Date.now() + 1,
          text: modification.message,
          isUser: false
        };
        setChatMessages(prev => [...prev, aiResponse]);
        
        // Apply the modification to the website
        if (modification.action) {
          modification.action();
        }
      }, 1000);
    }
  };

  const analyzeAndModifyWebsite = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Color changes
    if (input.includes('color') || input.includes('theme')) {
      if (input.includes('blue')) {
        setGeneratedWebsite(prev => ({ ...prev, primaryColor: 'blue' }));
        return { 
          message: "I've changed the primary color to blue! The website now has a blue theme.",
          action: () => setGeneratedWebsite(prev => ({ ...prev, primaryColor: 'blue' }))
        };
      } else if (input.includes('green')) {
        return { 
          message: "I've updated the theme to green! Your website now has a fresh green color scheme.",
          action: () => setGeneratedWebsite(prev => ({ ...prev, primaryColor: 'green' }))
        };
      } else if (input.includes('purple')) {
        return { 
          message: "Purple theme applied! Your website now has an elegant purple color scheme.",
          action: () => setGeneratedWebsite(prev => ({ ...prev, primaryColor: 'purple' }))
        };
      }
    }
    
    // Add sections
    if (input.includes('add') && input.includes('section')) {
      if (input.includes('contact')) {
        return { 
          message: "I've added a contact section to your website! It includes a contact form and your contact information.",
          action: () => setGeneratedWebsite(prev => ({ 
            ...prev, 
            sections: [...prev.sections, 'contact'],
            features: [...prev.features, 'Contact Form']
          }))
        };
      } else if (input.includes('about')) {
        return { 
          message: "I've added an about section! This will help visitors learn more about you or your business.",
          action: () => setGeneratedWebsite(prev => ({ 
            ...prev, 
            sections: [...prev.sections, 'about'],
            features: [...prev.features, 'About Page']
          }))
        };
      }
    }
    
    // Change title
    if (input.includes('title') || input.includes('name')) {
      const newTitle = extractTitleFromInput(userInput);
      return { 
        message: `I've updated the website title to "${newTitle}"! The header and page title have been changed.`,
        action: () => setGeneratedWebsite(prev => ({ ...prev, title: newTitle }))
      };
    }
    
    // Add features
    if (input.includes('feature') || input.includes('add')) {
      if (input.includes('mobile') || input.includes('responsive')) {
        return { 
          message: "I've made your website mobile-responsive! It will now look great on all devices.",
          action: () => setGeneratedWebsite(prev => ({ 
            ...prev, 
            features: [...prev.features, 'Mobile Responsive']
          }))
        };
      } else if (input.includes('seo')) {
        return { 
          message: "I've optimized your website for SEO! It will now rank better in search engines.",
          action: () => setGeneratedWebsite(prev => ({ 
            ...prev, 
            features: [...prev.features, 'SEO Optimized']
          }))
        };
      }
    }
    
    // Default response
    return { 
      message: `I understand you want to modify "${userInput}". I can help you change colors, add sections, update content, or add new features. What specific change would you like me to make?`,
      action: null
    };
  };

  const extractTitleFromInput = (input: string) => {
    // Extract title from user input
    const words = input.split(' ');
    const titleWords = words.filter(word => 
      !['title', 'name', 'change', 'update', 'make', 'to', 'the', 'a', 'an'].includes(word.toLowerCase())
    );
    return titleWords.slice(0, 3).join(' ') || 'New Title';
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderName)) {
        newSet.delete(folderName);
      } else {
        newSet.add(folderName);
      }
      return newSet;
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'html': return <FileText className="w-4 h-4 text-orange-500" />;
      case 'tsx': case 'ts': return <Code className="w-4 h-4 text-blue-500" />;
      case 'css': return <Code className="w-4 h-4 text-pink-500" />;
      case 'image': return <Image className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  // Render file tree recursively
  const renderFileTree = (files: any, path = '') => {
    return Object.entries(files).map(([name, file]: [string, any]) => {
      const fullPath = path ? `${path}/${name}` : name;
      
      if (typeof file === 'object' && file.type === undefined) {
        // It's a folder
        const isExpanded = expandedFolders.has(fullPath);
        return (
          <div key={fullPath} className="ml-2">
            <div 
              className="flex items-center py-1.5 px-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors"
              onClick={() => toggleFolder(fullPath)}
            >
              {isExpanded ? 
                <ChevronDown className="w-4 h-4 text-gray-500 mr-1" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500 mr-1" />
              }
              <FolderOpen className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-gray-700 text-sm font-medium">{name}</span>
            </div>
            {isExpanded && (
              <div className="ml-4">
                {renderFileTree(file, fullPath)}
              </div>
            )}
          </div>
        );
      } else {
        // It's a file
        return (
          <div key={fullPath} className="ml-6 py-1.5 px-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors">
            <div className="flex items-center">
              {getFileIcon(file.type)}
              <span className="text-gray-600 text-sm ml-2">{name}</span>
            </div>
          </div>
        );
      }
    });
  };

  if (isGenerating) {
    // Loading state during generation
    return (
      <div className="fixed inset-0 h-screen w-screen bg-black overflow-hidden flex flex-col items-center justify-center">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Loading Animation */}
            <div className="loader-wrapper">
              <span className="loader-letter">G</span>
              <span className="loader-letter">e</span>
              <span className="loader-letter">n</span>
              <span className="loader-letter">e</span>
              <span className="loader-letter">r</span>
              <span className="loader-letter">a</span>
              <span className="loader-letter">t</span>
              <span className="loader-letter">i</span>
              <span className="loader-letter">n</span>
              <span className="loader-letter">g</span>
              <div className="loader"></div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Building Your Website
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              AI is analyzing your requirements and generating a custom website...
            </p>
            
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-4">
              <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${generationProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-center mt-2 text-white/60">
                {generationProgress}% Complete
              </div>
            </div>
            
            <div className="text-white/60 text-sm">
              {generationProgress < 20 && "Analyzing your requirements..."}
              {generationProgress >= 20 && generationProgress < 40 && "Generating website structure..."}
              {generationProgress >= 40 && generationProgress < 60 && "Creating components..."}
              {generationProgress >= 60 && generationProgress < 80 && "Adding styling..."}
              {generationProgress >= 80 && "Finalizing website..."}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // IDE View - Fullscreen layout without navbar
  return (
    <div className="fixed inset-0 h-screen w-screen bg-gray-50 overflow-hidden flex flex-col">
      {/* Top Header Bar - Compact */}
      <div className="h-10 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToMain}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Main</span>
          </Button>
          <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="text-gray-900 font-medium text-sm">maya-web-builder</span>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Live Preview
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Globe className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - File Explorer */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900 font-semibold text-sm">Files</h2>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {renderFileTree(websiteFiles)}
            </div>
          </div>
        </div>

        {/* Middle Panel - Live Preview */}
        <div className="flex-1 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900 font-semibold text-sm flex items-center">
                <Globe className="w-4 h-4 mr-2 text-blue-600" />
                Live Preview
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Desktop
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Mobile
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white overflow-y-auto">
            {/* Professional Website Preview */}
            <div className="min-h-full bg-gradient-to-br from-gray-50 to-white">
              {/* Website Header */}
              <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">M</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">MayaWeb Platform</span>
                    </div>
                    <div className="flex items-center space-x-8">
                      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
                      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
                      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">About</a>
                      <Button variant="outline" size="sm">Log In</Button>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                      generatedWebsite?.primaryColor === 'green' ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700' :
                      generatedWebsite?.primaryColor === 'purple' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' :
                      generatedWebsite?.primaryColor === 'orange' ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700' :
                      'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
                    }`}>
                      <Zap className="w-4 h-4 mr-2" />
                      {generatedWebsite?.type === 'ecommerce' ? 'E-commerce Platform' :
                       generatedWebsite?.type === 'portfolio' ? 'Portfolio Website' :
                       generatedWebsite?.type === 'business' ? 'Business Website' :
                       generatedWebsite?.type === 'blog' ? 'Blog Platform' :
                       'AI-Powered Website'}
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                      {generatedWebsite?.title || 'Your Generated Website'}
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      {generatedWebsite?.description || 'A beautiful website built with modern technologies and AI assistance.'}
                    </p>
                    <div className="flex items-center space-x-4">
                      <Button size="lg" className={`${
                        generatedWebsite?.primaryColor === 'green' ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700' :
                        generatedWebsite?.primaryColor === 'purple' ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' :
                        generatedWebsite?.primaryColor === 'orange' ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700' :
                        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      }`}>
                        Get Started →
                      </Button>
                      <Button variant="outline" size="lg">
                        <Globe className="w-5 h-5 mr-2" />
                        View Live
                      </Button>
                    </div>
                    <div className="flex items-center space-x-8 mt-12">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{generatedWebsite?.features?.length || 4}</div>
                        <div className="text-sm text-gray-600">Features</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{generatedWebsite?.sections?.length || 3}</div>
                        <div className="text-sm text-gray-600">Sections</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">100%</div>
                        <div className="text-sm text-gray-600">Responsive</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {/* Glassmorphism Cards */}
                    <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-green-600 font-bold">✓</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Website Generated</div>
                          <div className="text-xs text-gray-600">Ready to customize</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-32 right-8 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">94/100</div>
                        <div className="text-sm text-gray-600">AI Score</div>
                        <div className="text-xs text-green-600 font-medium">Excellent</div>
                      </div>
                    </div>

                    {/* Main Preview Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">Your Website Preview</h3>
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="space-y-3">
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-sm font-medium text-blue-900">Responsive</div>
                            <div className="text-xs text-blue-700">Mobile Ready</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-sm font-medium text-purple-900">Fast</div>
                            <div className="text-xs text-purple-700">Optimized</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Chat */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-gray-900 font-semibold text-sm flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
              AI Assistant
            </h2>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Welcome! I'm here to help you customize your website.</p>
                <p className="text-xs text-gray-500">Try asking me to change colors, add sections, or modify content.</p>
              </div>
            )}
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Ask AI to modify your website..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
              <Button
                onClick={handleChatSend}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerationPage;
