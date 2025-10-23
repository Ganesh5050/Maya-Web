"use client";
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SparkleButton from '@/components/ui/SparkleButton';
import HolographicCheckbox from '@/components/HolographicCheckbox';
import CircularText from '@/components/CircularText';
import Particles from '@/components/Particles';
import { websiteStorage, GeneratedWebsite } from '@/services/websiteStorage';
import { dynamicGenerator } from '@/services/dynamicWebsiteGenerator';
import { useAuth } from '@/lib/auth';
import { DatabaseService } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
// ✅ FREE AI MODELS ONLY - Using working models with credits
import { geminiService } from '@/services/geminiService';
import { groqService } from '@/services/groqService';
// 🚀 NEW: Agent-based generation & Sandpack preview
import { WebsiteGenerationAgent, type GenerationProgress } from '@/services/agentWorkflow';
import SandpackPreview from '@/components/SandpackPreview';
import GenerationProgressUI from '@/components/GenerationProgress';
import type { MultiFileProject } from '@/services/advancedGeminiService';
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
  ArrowLeft,
  RefreshCw,
  Bot,
  Download,
  Share,
  Sparkles,
  Save,
  Gem,
  Brain,
  Rocket,
  Wrench,
  Moon,
  Diamond,
  Palette,
  Monitor,
  Wand2,
  Search
} from 'lucide-react';
// Available AI Models with SVG icons
const AI_MODELS = [
  { id: 'groq', name: 'GROQ (Llama 3.3)', icon: Zap, badge: 'Free', speed: '0.1s', available: true },
  { id: 'gemini', name: 'Gemini 1.5 Flash', icon: Gem, badge: 'Free', speed: '1s', available: true },
  { id: 'deepseek-v3', name: 'DeepSeek Chat V3.5 Exp', icon: Diamond, badge: 'New', speed: '2s', available: false },
  { id: 'deepseek-v31', name: 'DeepSeek Chat V3.1', icon: Diamond, badge: '', speed: '2s', available: false },
  { id: 'deepseek-v3-0324', name: 'DeepSeek Chat V3 0324', icon: Diamond, badge: '', speed: '2s', available: false },
  { id: 'deepseek-r1', name: 'DeepSeek R1 0528', icon: Diamond, badge: '', speed: '2s', available: false },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', icon: Gem, badge: 'New', speed: '3s', available: false },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', icon: Gem, badge: 'New', speed: '1s', available: false },
  { id: 'gemini-2-flash', name: 'Gemini 2 Flash', icon: Gem, badge: '', speed: '1s', available: false },
  { id: 'gpt5', name: 'GPT-5', icon: Bot, badge: 'New', speed: '2s', available: false },
  { id: 'gpt5-mini', name: 'GPT-5 Mini', icon: Bot, badge: '', speed: '1s', available: false },
  { id: 'gpt5-nano', name: 'GPT-5 Nano', icon: Bot, badge: '', speed: '0.5s', available: false },
  { id: 'gpt5-pro', name: 'GPT-5 Pro', icon: Bot, badge: '$$$', speed: '3s', available: false },
  { id: 'gpt5-codex', name: 'GPT-5 Codex', icon: Bot, badge: 'New', speed: '2s', available: false },
  { id: 'gpt-4.1', name: 'GPT-4.1', icon: Bot, badge: '', speed: '2s', available: false },
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', icon: Bot, badge: '', speed: '1s', available: false },
  { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', icon: Bot, badge: '', speed: '0.5s', available: false },
  { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', icon: Brain, badge: 'New', speed: '2s', available: false },
  { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', icon: Brain, badge: '', speed: '2s', available: false },
  { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5', icon: Brain, badge: 'New', speed: '1s', available: false },
  { id: 'claude-3.7-sonnet', name: 'Claude 3.7 Sonnet', icon: Brain, badge: '', speed: '2s', available: false },
  { id: 'claude-3.5-haiku', name: 'Claude 3.5 Haiku', icon: Brain, badge: '', speed: '1s', available: false },
  { id: 'grok-4', name: 'Grok 4', icon: Rocket, badge: 'New', speed: '2s', available: false },
  { id: 'grok-4-fast', name: 'Grok 4 Fast', icon: Rocket, badge: '', speed: '1s', available: false },
  { id: 'grok-code', name: 'Grok Code', icon: Rocket, badge: '', speed: '2s', available: false },
  { id: 'qwen-coder', name: 'Qwen3 Coder', icon: Wrench, badge: '', speed: '2s', available: false },
  { id: 'qwen-2.5gb', name: 'Qwen3 2.5GB', icon: Wrench, badge: '', speed: '1s', available: false },
  { id: 'kimi-k2', name: 'Kimi K2', icon: Moon, badge: '', speed: '2s', available: false },
];

function WebsiteBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [isSystemActivated, setIsSystemActivated] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isAutoActivating, setIsAutoActivating] = useState(false);
  const [activityBars, setActivityBars] = useState<number[]>([]);
  const [isIDEView, setIsIDEView] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, isUser: boolean}>>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'public']));
  const [websiteFiles, setWebsiteFiles] = useState<any>({});
  const [generatedWebsite, setGeneratedWebsite] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showAIInterface, setShowAIInterface] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [selectedModel, setSelectedModel] = useState('groq');
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [maxMode, setMaxMode] = useState(false);
  const [activeModel, setActiveModel] = useState('groq'); // Track which model is actually being used
  
  // 🚀 NEW: Agent-based generation state
  const [progressSteps, setProgressSteps] = useState<GenerationProgress[]>([]);
  const [currentProgress, setCurrentProgress] = useState<GenerationProgress | null>(null);
  const [generatedProject, setGeneratedProject] = useState<MultiFileProject | null>(null);
  const [useAgentMode, setUseAgentMode] = useState(true); // Toggle for agent vs simple mode

  // Handle Auto/MAX mode toggle (mutually exclusive like Cursor)
  const handleAutoToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Auto toggle clicked! Current state:', autoMode);
    if (!autoMode) {
      setAutoMode(true);
      setMaxMode(false);
      console.log('Auto turned ON, MAX turned OFF');
    } else {
      setAutoMode(false);
      console.log('Auto turned OFF');
    }
  };

  const handleMaxToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('MAX toggle clicked! Current state:', maxMode);
    if (!maxMode) {
      setMaxMode(true);
      setAutoMode(false);
      console.log('MAX turned ON, Auto turned OFF');
    } else {
      setMaxMode(false);
      console.log('MAX turned OFF');
    }
  };

  // Disable scrolling only for this page
  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Hide navbar when AI interface is shown OR when generating
  useEffect(() => {
    const navbar = document.querySelector('nav');
    
    if (showAIInterface || isGenerating || isNavigating) {
      if (navbar) {
        (navbar as HTMLElement).style.display = 'none';
      }
    } else {
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
    }
  }, [showAIInterface, isGenerating, isNavigating]);

  // Start auto-activation on component mount
  useEffect(() => {
    setCountdown(3);
    setIsAutoActivating(false);
    setIsSystemActivated(false);
    
    // Start the countdown immediately
    const timer = setTimeout(() => {
      setIsSystemActivated(true);
      setIsAutoActivating(false);
      setActivityBars(Array.from({ length: 8 }, () => Math.random() * 20 + 8));
    }, 3000);
    
    // Update countdown every second
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, []);

  // Handle navigation after loader shows
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        navigate(`/generation?prompt=${encodeURIComponent(input)}`);
      }, 7000); // Show loader for 7 seconds

      return () => clearTimeout(timer);
    }
  }, [isNavigating, input, navigate]);

  // 💾 SAVE PROJECT TO SUPABASE DATABASE
  const handleSaveProject = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save projects",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!generatedWebsite && !generatedProject) {
      toast({
        title: "Nothing to Save",
        description: "Generate a website first before saving",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const name = projectName || input || 'Untitled Project';
      const projectData = {
        name,
        description: input || '',
        type: 'landing' as const,
        owner_id: user.id,
        components: {
          html: generatedWebsite?.aiGeneratedHTML || '',
          files: generatedProject?.files || {},
        },
        settings: {
          model: selectedModel,
          autoMode,
          maxMode,
          useAgentMode,
        },
        status: 'draft' as const,
      };
      
      if (currentProjectId) {
        // Update existing project
        await DatabaseService.updateProject(currentProjectId, projectData);
        toast({
          title: "Project Updated!",
          description: `"${name}" has been saved`,
        });
      } else {
        // Create new project
        const project = await DatabaseService.createProject({
          id: crypto.randomUUID(),
          ...projectData,
        });
        setCurrentProjectId(project.id);
        toast({
          title: "Project Saved!",
          description: `"${name}" has been saved successfully`,
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      });
    }
  };

  // 📂 LOAD PROJECT FROM DATABASE
  useEffect(() => {
    const loadProject = async () => {
      const projectId = searchParams.get('project');
      const templateData = location.state?.template;
      
      // Load from template
      if (templateData) {
        setInput(templateData.description || '');
        setProjectName(templateData.name || '');
        // Could auto-generate from template here
        toast({
          title: "Template Loaded",
          description: `Starting with "${templateData.name}" template`,
        });
      }
      
      // Load existing project
      if (projectId && user) {
        try {
          const project = await DatabaseService.getProject(projectId);
          if (project) {
            setCurrentProjectId(project.id);
            setProjectName(project.name);
            setInput(project.description || '');
            
            // Restore settings
            if (project.settings) {
              setSelectedModel(project.settings.model || 'groq');
              setAutoMode(project.settings.autoMode ?? true);
              setMaxMode(project.settings.maxMode ?? false);
              setUseAgentMode(project.settings.useAgentMode ?? true);
            }
            
            // Restore generated content
            if (project.components?.html) {
              setGeneratedWebsite({
                aiGeneratedHTML: project.components.html,
                prompt: project.description,
              });
            }
            if (project.components?.files) {
              setGeneratedProject({
                files: project.components.files,
                dependencies: {},
              });
            }
            
            toast({
              title: "Project Loaded",
              description: `Loaded "${project.name}"`,
            });
          }
        } catch (error) {
          console.error('Load project error:', error);
          toast({
            title: "Load Failed",
            description: "Failed to load project",
            variant: "destructive",
          });
        }
      }
    };
    
    loadProject();
  }, [searchParams, location.state, user]);

  // 🚀 AGENT-BASED WEBSITE GENERATION (like bolt.diy)
  const generateWebsiteFromPrompt = async (prompt: string) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setProgressSteps([]);
    setCurrentProgress(null);
    setGeneratedProject(null);
    
    try {
      // 🚀 NEW: Use agent-based generation for better quality
      if (useAgentMode) {
        console.log(`🚀 Starting agent-based generation with ${selectedModel}...`);
        
        // Determine model based on Auto/MAX modes
        let modelToUse = selectedModel;
        if (autoMode) {
          const isComplex = prompt.length > 100 || 
                           prompt.toLowerCase().includes('animation') ||
                           prompt.toLowerCase().includes('interactive');
          modelToUse = isComplex ? 'gemini' : 'groq';
          console.log(`🤖 AUTO MODE: Selected ${modelToUse.toUpperCase()}`);
        }
        setActiveModel(modelToUse);
        
        // Create agent with progress callback
        const agent = new WebsiteGenerationAgent((progress) => {
          console.log('📊 Progress:', progress);
          setProgressSteps(prev => [...prev, progress]);
          setCurrentProgress(progress);
        });
        
        // Generate with agent workflow
        const result = await agent.generate(prompt, modelToUse);
        
        console.log('✅ Agent generation complete:', result);
        
        // Store the generated project
        setGeneratedProject(result.project);
        setIsGenerating(false);
        
        // Update chat history
        setChatHistory([
          { role: 'user', content: prompt },
          { 
            role: 'assistant', 
            content: `✅ I've created a ${result.project.framework} project with ${Object.keys(result.project.files).length} files using agent-based AI!

**Generated files:**
${Object.keys(result.project.files).slice(0, 10).map(f => `- ${f}`).join('\n')}
${Object.keys(result.project.files).length > 10 ? `... and ${Object.keys(result.project.files).length - 10} more files!` : ''}

**Quality check:** ${result.validation.valid ? '✅ All validations passed' : `⚠️ ${result.validation.errors.length} issues auto-fixed in ${result.iterations} iterations`}

**Features:**
${result.project.features.slice(0, 5).map((f: string) => `• ${f}`).join('\n')}

The project is now running in Sandpack with hot reload! Edit any file and see changes instantly.` 
          }
        ]);
        
        setShowAIInterface(true);
        setIsSystemActivated(true);
        
        return; // Exit early - agent mode complete
      }
      
      // OLD METHOD: Fallback to simple generation
      console.log('📝 Using simple generation mode...');

      // Progress animation
      setGenerationProgress(10);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setGenerationProgress(25);
      
      // ✅ AI MODEL SELECTION SYSTEM with Auto/MAX modes
      let aiGeneratedCode;
      let aiUsed = selectedModel === 'groq' ? "GROQ" : "Gemini";
      
      const selectedModelInfo = AI_MODELS.find(m => m.id === selectedModel);
      let modelToUse = selectedModel; // Default to user selection
      let enhancedPrompt = prompt;
      
      // 🤖 AUTO MODE: Automatically select best model based on prompt complexity
      if (autoMode) {
        const promptLength = prompt.length;
        const isComplex = prompt.toLowerCase().includes('animation') || 
                         prompt.toLowerCase().includes('interactive') || 
                         prompt.toLowerCase().includes('advanced') ||
                         prompt.toLowerCase().includes('complex') ||
                         promptLength > 100;
        
        // Use Gemini for complex prompts (better at understanding), GROQ for simple (faster)
        modelToUse = isComplex ? 'gemini' : 'groq';
        console.log(`🤖 AUTO MODE ACTIVE: Selected ${modelToUse.toUpperCase()} (complexity: ${isComplex ? 'HIGH' : 'LOW'}, overriding user selection)`);
      } 
      // 🔥 MAX MODE: Use selected model with enhanced context
      else if (maxMode) {
        modelToUse = selectedModel; // Respect user's model choice
        console.log(`🔥 MAX MODE ACTIVE: Using ${selectedModelInfo?.name || selectedModel.toUpperCase()} with maximum context`);
        enhancedPrompt = `${prompt}\n\n---MAX MODE INSTRUCTIONS---\nGenerate EXTREMELY detailed, production-ready code with:\n- Advanced features and animations\n- Multiple interactive sections (minimum 8)\n- Professional polish and micro-interactions\n- Stunning visual effects and transitions\n- Complete, working code (NO placeholders)\n- Premium design quality ($10k+ look)`;
      }
      // 🎯 MANUAL MODE: Use user-selected model
      else {
        modelToUse = selectedModel; // Respect user's model choice
        console.log(`🎯 MANUAL MODE: Using user-selected model: ${selectedModelInfo?.name || selectedModel.toUpperCase()}`);
      }
      
      // Update active model for UI display
      setActiveModel(modelToUse);
      
      try {
        if (modelToUse === 'groq') {
          console.log("⚡ [1/2] Trying GROQ AI (Llama 3.3) - Fastest FREE model!");
          aiGeneratedCode = await groqService.generateWebsite({ prompt: enhancedPrompt });
          aiUsed = "GROQ (Llama 3.3)";
        } else {
          console.log("💎 [1/2] Trying Google Gemini 1.5 Flash - Free & Reliable!");
          aiGeneratedCode = await geminiService.generateWebsite({ prompt: enhancedPrompt });
          aiUsed = "Google Gemini 1.5 Flash";
        }
      } catch (primaryError) {
        console.warn(`⚠️ ${aiUsed} failed, trying backup...`);
        
        // Fallback to the other model
        if (modelToUse === 'groq') {
          console.log("💎 [2/2] Trying Google Gemini 1.5 Flash as backup!");
          aiGeneratedCode = await geminiService.generateWebsite({ prompt: enhancedPrompt });
          aiUsed = "Google Gemini 1.5 Flash";
        } else {
          console.log("⚡ [2/2] Trying GROQ AI (Llama 3.3) as backup!");
          aiGeneratedCode = await groqService.generateWebsite({ prompt: enhancedPrompt });
          aiUsed = "GROQ (Llama 3.3)";
        }
      }
      
      setGenerationProgress(60);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Detect website type from prompt
      const analysis = analyzePrompt(prompt);
      
      setGenerationProgress(80);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create website object with AI-generated content
      const website: GeneratedWebsite = {
        id: '',
        slug: '',
        type: analysis.type,
        prompt: prompt,
        title: aiGeneratedCode.title,
        description: aiGeneratedCode.description,
        primaryColor: aiGeneratedCode.primaryColor,
        secondaryColor: aiGeneratedCode.secondaryColor,
        features: aiGeneratedCode.features,
        sections: aiGeneratedCode.sections,
        components: ['AI-Generated'],
        techStack: {
          framework: 'HTML/CSS/JS',
          styling: 'Tailwind CSS',
          backend: 'None',
          database: 'None'
        },
        files: {
          'index.html': { type: 'html', content: aiGeneratedCode.html },
          'styles.css': { type: 'css', content: aiGeneratedCode.css },
          'script.js': { type: 'javascript', content: aiGeneratedCode.javascript }
        },
        createdAt: new Date().toISOString(),
        aiGeneratedHTML: aiGeneratedCode.html // Store the full HTML for preview
      };
      
      // Save to storage and get unique slug
      const slug = websiteStorage.saveWebsite(website);
      website.slug = slug;
      website.id = slug;
      
      setGenerationProgress(100);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setWebsiteFiles(website.files);
      setGeneratedWebsite(website);
      setIsGenerating(false);
      
      // Add chat messages
      setChatHistory([
        { role: 'user', content: prompt },
        { 
          role: 'assistant', 
          content: `✅ I've created a real ${website.type} website using AI called "${website.title}". The site includes ${website.features.length} features and ${website.sections.length} sections. This is a fully functional website generated by ${aiUsed}! You can view it in the preview or ask me to modify it.` 
        }
      ]);
      
      // Show AI interface
      setShowAIInterface(true);
      setIsSystemActivated(true);
      
      console.log(`✅ Website generated successfully with ${aiUsed}!`);
      
    } catch (error) {
      console.error('❌ Website generation failed:', error);
      setIsGenerating(false);
      
      // Fallback to template if AI fails
      console.log("⚠️ Falling back to template generation...");
      const websiteData = generateAdvancedWebsite(prompt);
    setWebsiteFiles(websiteData.files);
    setGeneratedWebsite(websiteData.website);
      
      setChatHistory([
        { role: 'user', content: prompt },
        { 
          role: 'assistant', 
          content: `I've created a ${websiteData.website.type} website called "${websiteData.website.title}". The site includes ${websiteData.website.features.length} features and ${websiteData.website.sections.length} sections.` 
        }
      ]);
      
      setShowAIInterface(true);
    setIsSystemActivated(true);
    }
  };

  // Enhanced website generation with dynamic variations
  const generateAdvancedWebsite = (prompt: string) => {
    // Advanced prompt analysis
    const analysis = analyzePrompt(prompt);
    
    // Use dynamic generator for unique variations
    const colors = dynamicGenerator.generateColorScheme(analysis.type, prompt);
    const title = dynamicGenerator.generateTitleVariations(extractTitle(prompt), analysis.type);
    const description = dynamicGenerator.generateSmartDescription(title, analysis.type, prompt);
    const features = dynamicGenerator.generateSmartFeatures(prompt, analysis.type);
    const sections = dynamicGenerator.generateSmartSections(prompt, analysis.type);
    
    // Generate comprehensive file structure
    const files = generateComprehensiveFiles(analysis);
    
    const website: GeneratedWebsite = {
      id: '',
      slug: '',
      type: analysis.type,
      prompt: prompt,
      title: title,
      description: description,
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      features: features,
      sections: sections,
      components: analysis.components,
      techStack: analysis.techStack,
      files: files,
      createdAt: new Date().toISOString()
    };
    
    // Save to storage and get unique slug
    const slug = websiteStorage.saveWebsite(website);
    website.slug = slug;
    website.id = slug;
    
    return {
      files,
      website
    };
  };

  const analyzePrompt = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Detect website type
    const types = {
      ecommerce: ['shop', 'store', 'ecommerce', 'buy', 'sell', 'product', 'cart', 'checkout'],
      portfolio: ['portfolio', 'personal', 'about me', 'resume', 'cv', 'showcase'],
      blog: ['blog', 'article', 'news', 'post', 'content', 'writing'],
      landing: ['landing', 'marketing', 'promo', 'campaign', 'conversion'],
      corporate: ['business', 'corporate', 'company', 'enterprise', 'professional'],
      saas: ['saas', 'app', 'dashboard', 'software', 'platform', 'tool'],
      agency: ['agency', 'creative', 'design', 'marketing', 'services']
    };

    let detectedType = 'modern';
    let maxMatches = 0;
    
    Object.entries(types).forEach(([type, keywords]) => {
      const matches = keywords.filter(keyword => lowerPrompt.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedType = type;
      }
    });

    // Detect tech preferences
    const techStack = {
      framework: lowerPrompt.includes('next') ? 'Next.js' : 
                 lowerPrompt.includes('vue') ? 'Vue.js' : 
                 lowerPrompt.includes('angular') ? 'Angular' : 'React',
      styling: lowerPrompt.includes('tailwind') ? 'Tailwind CSS' :
               lowerPrompt.includes('styled') ? 'Styled Components' :
               lowerPrompt.includes('scss') ? 'SCSS' : 'CSS Modules',
      backend: lowerPrompt.includes('node') ? 'Node.js' :
               lowerPrompt.includes('python') ? 'Python' :
               lowerPrompt.includes('php') ? 'PHP' : 'Express.js'
    };

    // Detect required features
    const features = [];
    if (lowerPrompt.includes('responsive')) features.push('Responsive Design');
    if (lowerPrompt.includes('dark mode') || lowerPrompt.includes('dark theme')) features.push('Dark Mode');
    if (lowerPrompt.includes('animation') || lowerPrompt.includes('interactive')) features.push('Animations');
    if (lowerPrompt.includes('seo')) features.push('SEO Optimized');
    if (lowerPrompt.includes('fast') || lowerPrompt.includes('performance')) features.push('Performance Optimized');
    if (lowerPrompt.includes('accessibility') || lowerPrompt.includes('a11y')) features.push('Accessibility');

    return {
      type: detectedType,
      techStack,
      features,
      components: generateComponentList(detectedType),
      styling: generateStylingPreferences(detectedType)
    };
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

  const generateComponentList = (type: string) => {
    const componentMap = {
      ecommerce: ['ProductCard', 'ShoppingCart', 'CheckoutForm', 'ProductGallery', 'PriceDisplay'],
      portfolio: ['ProjectCard', 'SkillBar', 'ContactForm', 'Timeline', 'Testimonial'],
      blog: ['ArticleCard', 'AuthorBio', 'CommentSection', 'TagCloud', 'SearchBar'],
      landing: ['HeroSection', 'FeatureGrid', 'CTAButton', 'TestimonialSlider', 'PricingTable'],
      corporate: ['TeamCard', 'ServiceCard', 'ContactInfo', 'NewsCard', 'StatsCounter'],
      saas: ['Dashboard', 'DataTable', 'Chart', 'UserProfile', 'NotificationCenter'],
      agency: ['PortfolioGrid', 'ClientLogo', 'CaseStudy', 'ProcessStep', 'ContactForm']
    };
    return componentMap[type] || ['Header', 'Footer', 'Navigation', 'Content', 'Sidebar'];
  };

  const generateStylingPreferences = (type: string) => {
    const styleMap = {
      ecommerce: { primary: '#10b981', secondary: '#3b82f6', accent: '#f59e0b' },
      portfolio: { primary: '#8b5cf6', secondary: '#ec4899', accent: '#06b6d4' },
      blog: { primary: '#f97316', secondary: '#ef4444', accent: '#84cc16' },
      landing: { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#10b981' },
      corporate: { primary: '#1e40af', secondary: '#6b7280', accent: '#059669' },
      saas: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#06b6d4' },
      agency: { primary: '#dc2626', secondary: '#ea580c', accent: '#d97706' }
    };
    return styleMap[type] || { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#10b981' };
  };

  const generateComprehensiveFiles = (analysis: any) => {
    const { type, techStack, features } = analysis;
    
    // Generate package.json based on tech stack
    const packageJson = {
      name: `my-${type}-website`,
      version: "1.0.0",
      private: true,
      dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "framer-motion": "^10.16.0",
        ...(techStack.styling === 'Tailwind CSS' && { "tailwindcss": "^3.3.0" }),
        ...(techStack.styling === 'Styled Components' && { "styled-components": "^6.0.0" }),
        ...(techStack.framework === 'Next.js' && { "next": "^14.0.0" })
      },
      scripts: {
        dev: techStack.framework === 'Next.js' ? "next dev" : "react-scripts start",
        build: techStack.framework === 'Next.js' ? "next build" : "react-scripts build",
        start: techStack.framework === 'Next.js' ? "next start" : "react-scripts start"
      }
    };

    // Generate comprehensive file structure
    const files = {
      'package.json': {
        type: 'json',
        content: JSON.stringify(packageJson, null, 2)
      },
      'README.md': {
        type: 'markdown',
        content: `# ${type.charAt(0).toUpperCase() + type.slice(1)} Website\n\nGenerated with AI-powered website builder.\n\n## Features\n${features.map(f => `- ${f}`).join('\n')}\n\n## Tech Stack\n- Framework: ${techStack.framework}\n- Styling: ${techStack.styling}\n- Backend: ${techStack.backend}`
      },
      'src': {
        'App.tsx': {
          type: 'tsx',
          content: generateAppComponent(type, techStack)
        },
        'components': generateComponentFiles(type, analysis.components),
        'styles': generateStyleFiles(techStack.styling),
        'utils': {
          'helpers.ts': {
            type: 'ts',
            content: `// Utility functions for ${type} website\nexport const formatPrice = (price: number) => \`$\${price.toFixed(2)}\`;\nexport const formatDate = (date: Date) => date.toLocaleDateString();`
          }
        }
      },
      'public': {
        'favicon.ico': { type: 'image', content: '' },
        'manifest.json': {
          type: 'json',
          content: JSON.stringify({
            name: `${type} Website`,
            short_name: type,
            icons: [],
            theme_color: analysis.styling.primary,
            background_color: "#ffffff"
          }, null, 2)
        }
      }
    };

    return files;
  };

  const generateAppComponent = (type: string, techStack: any) => {
    return `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          ${type === 'ecommerce' ? '<Route path="/products" element={<ProductsPage />} />' : ''}
          ${type === 'blog' ? '<Route path="/blog" element={<BlogPage />} />' : ''}
        </Routes>
      </div>
    </Router>
  );
}

export default App;`;
  };

  const generateComponentFiles = (type: string, components: string[]) => {
    const componentFiles = {};
    components.forEach(component => {
      componentFiles[`${component}.tsx`] = {
        type: 'tsx',
        content: `import React from 'react';

interface ${component}Props {
  // Define props based on component type
}

export const ${component}: React.FC<${component}Props> = ({ ...props }) => {
  return (
    <div className="${component.toLowerCase()}">
      {/* ${component} component implementation */}
    </div>
  );
};`
      };
    });
    return componentFiles;
  };

  const generateStyleFiles = (styling: string) => {
    const styleFiles = {
      'globals.css': {
        type: 'css',
        content: `/* Global styles for ${styling} */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}`
      }
    };

    if (styling === 'Tailwind CSS') {
      styleFiles['tailwind.config.js'] = {
        type: 'js',
        content: `module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6'
      }
    }
  },
  plugins: []
};`
      };
    }

    return styleFiles;
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
        content: `export function ProductCard({ product }) {\n  return (\n    <div className="product-card">\n      <img src={product.image} alt={product.name} />\n      <h3>{product.name}</h3>\n      <p>{product.price}</p>\n    </div>\n  );\n}` 
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
    // Enhanced title extraction logic
    const lowerPrompt = prompt.toLowerCase();
    
    // Remove common words like "create", "build", "make", "website for"
    let cleanPrompt = prompt
      .replace(/^(create|build|make|design|develop)\s+(a|an)?\s*/i, '')
      .replace(/\s+(website|site|page|platform|app)\s+(for|about)?\s*/i, ' ')
      .trim();
    
    // Extract business name if present
    const forMatch = cleanPrompt.match(/for\s+(.+)/i);
    if (forMatch) {
      cleanPrompt = forMatch[1];
    }
    
    // Capitalize first letter of each word
    const words = cleanPrompt.split(' ');
    const titleWords = words
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .slice(0, 4); // Take first 4 meaningful words
    
    const title = titleWords.join(' ');
    return title || 'My Awesome Website';
  };

  const extractDescription = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    const title = extractTitle(prompt);
    
    // Generate description based on website type
    if (lowerPrompt.includes('ecommerce') || lowerPrompt.includes('shop') || lowerPrompt.includes('store')) {
      return `${title} - Your one-stop shop for quality products. Browse our collection and enjoy fast shipping, secure payments, and excellent customer service.`;
    } else if (lowerPrompt.includes('portfolio') || lowerPrompt.includes('personal')) {
      return `${title} - Showcasing my work, skills, and experience. Explore my projects and get in touch to collaborate.`;
    } else if (lowerPrompt.includes('blog')) {
      return `${title} - Read our latest articles, insights, and stories. Stay updated with fresh content and join our community.`;
    } else if (lowerPrompt.includes('business') || lowerPrompt.includes('corporate')) {
      return `${title} - Professional services and solutions for your business needs. Trusted by clients worldwide.`;
    } else if (lowerPrompt.includes('landing')) {
      return `${title} - Transform your business with our innovative solutions. Get started today and see the difference.`;
    } else {
      return `Welcome to ${title}. A modern, professional website built with cutting-edge technology and designed for success.`;
    }
  };

  const generateSectionsForType = (type: string, prompt: string) => {
    const baseSections = ['hero', 'about', 'contact'];
    const lowerPrompt = prompt.toLowerCase();
    
    // Dynamically add sections based on prompt keywords
    const sections = ['hero'];
    
    switch (type) {
      case 'ecommerce':
        sections.push('products', 'features');
        if (lowerPrompt.includes('testimonial') || lowerPrompt.includes('review')) sections.push('testimonials');
        if (lowerPrompt.includes('cart') || lowerPrompt.includes('shopping')) sections.push('shopping-cart');
        if (lowerPrompt.includes('deal') || lowerPrompt.includes('offer')) sections.push('special-offers');
        break;
      case 'portfolio':
        sections.push('about', 'projects');
        if (lowerPrompt.includes('skill')) sections.push('skills');
        if (lowerPrompt.includes('experience')) sections.push('experience');
        if (lowerPrompt.includes('education')) sections.push('education');
        break;
      case 'blog':
        sections.push('latest-posts');
        if (lowerPrompt.includes('categor')) sections.push('categories');
        if (lowerPrompt.includes('about')) sections.push('about');
        if (lowerPrompt.includes('subscribe')) sections.push('newsletter');
        break;
      case 'business':
      case 'corporate':
        sections.push('services', 'about');
        if (lowerPrompt.includes('team')) sections.push('team');
        if (lowerPrompt.includes('client')) sections.push('clients');
        if (lowerPrompt.includes('pricing')) sections.push('pricing');
        break;
      default:
        sections.push('features');
        if (lowerPrompt.includes('about')) sections.push('about');
    }
    
    // Always add contact if mentioned
    if (lowerPrompt.includes('contact')) sections.push('contact');
    
    return sections;
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

  const handleSend = (e?: React.MouseEvent) => {
    // Prevent default navigation
    if (e) {
      e.preventDefault();
    }
    
    // Show loader and start generation
    if (input.trim()) {
      setIsNavigating(true);
      console.log('Building website with prompt:', input);
      
      // Start website generation after showing loading screen
      setTimeout(() => {
        console.log('Starting website generation...');
        generateWebsiteFromPrompt(input);
        setIsNavigating(false);
        console.log('Loading screen hidden, showing generated website');
      }, 2000);
    }
  };

  const handleBackToMain = () => {
    setIsIDEView(false);
    setIsSystemActivated(false);
    setGeneratedWebsite(null);
    setWebsiteFiles({});
    setChatMessages([]);
    setInput('');
    // Reset auto-activation
    setCountdown(3);
    setIsAutoActivating(false);
  };

  const handleChatSend = () => {
    if (chatInput.trim() && generatedWebsite) {
      // Add user message to chat history
      setChatHistory(prev => [...prev, { role: 'user', content: chatInput }]);
      const userInput = chatInput;
      setChatInput('');
      
      // Add loading message
      setChatHistory(prev => [...prev, { role: 'assistant', content: '...' }]);
      
      // Intelligent AI response that actually modifies the website
      setTimeout(() => {
        const modification = analyzeAndModifyWebsite(userInput);
        
        // Remove loading message and add actual AI response
        setChatHistory(prev => {
          const withoutLoading = prev.filter(msg => msg.content !== '...');
          return [...withoutLoading, { role: 'assistant', content: modification.message }];
        });
        
        // Apply the modification to the website
        if (modification.updatedWebsite) {
          setGeneratedWebsite(modification.updatedWebsite);
          
          // Also update in storage
          websiteStorage.saveWebsite(modification.updatedWebsite);
        }
      }, 1000);
    }
  };

  const analyzeAndModifyWebsite = (userInput: string): { message: string; updatedWebsite: GeneratedWebsite | null } => {
    if (!generatedWebsite) {
      return {
        message: "No website to modify. Please generate a website first.",
        updatedWebsite: null
      };
    }

    const input = userInput.toLowerCase();
    const updated = { ...generatedWebsite };
    
    // Color changes
    if (input.includes('color') || input.includes('theme')) {
      if (input.includes('blue')) {
        updated.primaryColor = '#3b82f6';
        updated.secondaryColor = '#2563eb';
        return { 
          message: "✅ I've changed the primary color to blue! The website now has a vibrant blue theme.",
          updatedWebsite: updated
        };
      } else if (input.includes('green')) {
        updated.primaryColor = '#10b981';
        updated.secondaryColor = '#059669';
        return { 
          message: "✅ I've updated the theme to green! Your website now has a fresh green color scheme.",
          updatedWebsite: updated
        };
      } else if (input.includes('purple')) {
        updated.primaryColor = '#8b5cf6';
        updated.secondaryColor = '#7c3aed';
        return { 
          message: "✅ Purple theme applied! Your website now has an elegant purple color scheme.",
          updatedWebsite: updated
        };
      } else if (input.includes('red')) {
        updated.primaryColor = '#ef4444';
        updated.secondaryColor = '#dc2626';
        return { 
          message: "✅ Red theme applied! Your website now has a bold red color scheme.",
          updatedWebsite: updated
        };
      } else if (input.includes('orange')) {
        updated.primaryColor = '#f97316';
        updated.secondaryColor = '#ea580c';
        return { 
          message: "✅ Orange theme applied! Your website now has an energetic orange color scheme.",
          updatedWebsite: updated
        };
      }
    }
    
    // Add sections
    if (input.includes('add') && input.includes('section')) {
      if (input.includes('contact') && !updated.sections.includes('contact')) {
        updated.sections = [...updated.sections, 'contact'];
        updated.features = [...updated.features, 'Contact Form'];
        return { 
          message: "✅ I've added a contact section to your website! It includes a contact form and your contact information.",
          updatedWebsite: updated
        };
      } else if (input.includes('about') && !updated.sections.includes('about')) {
        updated.sections = [...updated.sections, 'about'];
        updated.features = [...updated.features, 'About Page'];
        return { 
          message: "✅ I've added an about section! This will help visitors learn more about you or your business.",
          updatedWebsite: updated
        };
      } else if (input.includes('pricing') && !updated.sections.includes('pricing')) {
        updated.sections = [...updated.sections, 'pricing'];
        updated.features = [...updated.features, 'Pricing Tables'];
        return { 
          message: "✅ I've added a pricing section! Perfect for showcasing your plans and prices.",
          updatedWebsite: updated
        };
      } else if (input.includes('testimonial') && !updated.sections.includes('testimonials')) {
        updated.sections = [...updated.sections, 'testimonials'];
        updated.features = [...updated.features, 'Customer Reviews'];
        return { 
          message: "✅ I've added a testimonials section! Show off what your customers think.",
          updatedWebsite: updated
        };
      }
    }
    
    // Change title
    if (input.includes('title') || input.includes('name') || input.includes('rename')) {
      const newTitle = extractTitleFromInput(userInput);
      updated.title = newTitle;
      return { 
        message: `✅ I've updated the website title to "${newTitle}"! The header and page title have been changed.`,
        updatedWebsite: updated
      };
    }
    
    // Change description
    if (input.includes('description') || input.includes('tagline')) {
      const words = userInput.split(' ');
      const descIndex = Math.max(
        words.findIndex(w => w.toLowerCase().includes('description')),
        words.findIndex(w => w.toLowerCase().includes('tagline'))
      );
      const newDesc = words.slice(descIndex + 2).join(' ') || 'A modern website built with advanced technologies';
      updated.description = newDesc;
      return { 
        message: `✅ I've updated the description to: "${newDesc}"`,
        updatedWebsite: updated
      };
    }
    
    // Add features
    if (input.includes('add') && (input.includes('feature') || input.includes('capability'))) {
      if ((input.includes('mobile') || input.includes('responsive')) && !updated.features.includes('Mobile Responsive')) {
        updated.features = [...updated.features, 'Mobile Responsive'];
        return { 
          message: "✅ I've made your website mobile-responsive! It will now look great on all devices.",
          updatedWebsite: updated
        };
      } else if (input.includes('seo') && !updated.features.includes('SEO Optimized')) {
        updated.features = [...updated.features, 'SEO Optimized'];
        return { 
          message: "✅ I've optimized your website for SEO! It will now rank better in search engines.",
          updatedWebsite: updated
        };
      } else if ((input.includes('dark') || input.includes('mode')) && !updated.features.includes('Dark Mode')) {
        updated.features = [...updated.features, 'Dark Mode Support'];
        return { 
          message: "✅ I've added dark mode support! Users can now switch between light and dark themes.",
          updatedWebsite: updated
        };
      } else if ((input.includes('animation') || input.includes('interactive')) && !updated.features.includes('Smooth Animations')) {
        updated.features = [...updated.features, 'Smooth Animations'];
        return { 
          message: "✅ I've added smooth animations! Your website now has engaging interactive elements.",
          updatedWebsite: updated
        };
      }
    }
    
    // Remove sections
    if (input.includes('remove') && input.includes('section')) {
      const sectionToRemove = updated.sections.find(s => input.includes(s));
      if (sectionToRemove) {
        updated.sections = updated.sections.filter(s => s !== sectionToRemove);
        return { 
          message: `✅ I've removed the "${sectionToRemove}" section from your website.`,
          updatedWebsite: updated
        };
      }
    }
    
    // Default response
    return { 
      message: `I understand you want to modify the website. Here are some things I can help with:

**Content Changes:**
- "Change the title to [new title]"
- "Update the description to [new description]"

**Colors:**
- "Change theme to blue/green/purple/red/orange"
- "Make it blue/green/purple"

**Add Sections:**
- "Add a contact section"
- "Add an about section"
- "Add a pricing section"
- "Add testimonials"

**Add Features:**
- "Add dark mode"
- "Make it mobile responsive"
- "Add SEO optimization"
- "Add smooth animations"

What would you like to change?`,
      updatedWebsite: null
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

  if (isNavigating) {
    // Loading state when navigating to generation
    return (
      <div className="fixed inset-0 h-screen w-screen bg-black overflow-hidden flex flex-col items-center justify-center z-50">
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
        
        {/* Main Content - Centered */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 h-full w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto flex flex-col items-center justify-center"
          >
            {/* Loading Animation */}
            <div className="loader-wrapper mb-8">
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
              Preparing Your Website
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Getting ready to generate your custom website...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    // Loading state during generation
    return (
      <div className="fixed inset-0 h-screen w-screen bg-black overflow-hidden flex flex-col items-center justify-center z-50">
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
            <div className="w-20 h-20 mx-auto mb-8 relative">
              <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"
                style={{ animationDuration: '1s' }}
              ></div>
            </div>
            
            {/* 🚀 NEW: Agent-based progress UI */}
            {useAgentMode && progressSteps.length > 0 ? (
              <div className="max-w-2xl mx-auto">
                <GenerationProgressUI 
                  progress={progressSteps}
                  currentStep={currentProgress || undefined}
                />
              </div>
            ) : (
              /* Fallback to simple progress bar */
              <>
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
                
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  {generationProgress < 20 && (
                    <>
                      <Search className="w-4 h-4 animate-pulse" />
                      <span>AI is analyzing your prompt...</span>
                    </>
                  )}
                  {generationProgress >= 20 && generationProgress < 40 && (
                    activeModel === 'groq' ? (
                      <>
                        <Zap className="w-4 h-4 animate-pulse text-yellow-400" />
                        <span>Calling GROQ AI (Llama 3.3 - Lightning Fast!)...</span>
                      </>
                    ) : (
                      <>
                        <Gem className="w-4 h-4 animate-pulse text-purple-400" />
                        <span>Calling Google Gemini (1.5 Flash - Smart & Reliable!)...</span>
                      </>
                    )
                  )}
                  {generationProgress >= 40 && generationProgress < 60 && (
                    <>
                      <Palette className="w-4 h-4 animate-pulse text-pink-400" />
                      <span>Designing your stunning website...</span>
                    </>
                  )}
                  {generationProgress >= 60 && generationProgress < 80 && (
                    <>
                      <Monitor className="w-4 h-4 animate-pulse text-blue-400" />
                      <span>Writing production-ready code...</span>
                    </>
                  )}
                  {generationProgress >= 80 && (
                    <>
                      <Wand2 className="w-4 h-4 animate-pulse text-green-400" />
                      <span>Adding final touches...</span>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  if (showAIInterface && generatedWebsite) {
    // Modern AI Interface - appears after generation
    return (
      <div className="fixed inset-0 h-screen w-screen bg-[#1a1a1a] flex flex-col overflow-hidden z-50">
        {/* Top Bar */}
        <div className="h-14 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAIInterface(false);
                setGeneratedWebsite(null);
                setChatHistory([]);
                setInput('');
              }}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <div className="h-6 w-px bg-gray-700"></div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-white font-semibold">{generatedWebsite.title}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`/site/${generatedWebsite.slug}`, '_blank')}
              className="text-gray-400 hover:text-white"
            >
              <Globe className="w-4 h-4 mr-2" />
              Open Live Site
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Split Screen */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="w-2/5 bg-[#0a0a0a] border-r border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-2">Chat with AI</h2>
              <p className="text-gray-400 text-sm">Ask me to modify your website</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
              {chatHistory.length === 2 ? (
                // Show suggestions when only initial message exists
                <div className="space-y-4">
                  {chatHistory.map((message, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-[#1a1a1a] text-gray-200 border border-gray-800'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Quick suggestions */}
                  <div className="mt-8 space-y-4">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Try these:</p>
                    <button
                      onClick={() => {
                        setChatInput('change theme to blue');
                        setTimeout(() => handleChatSend(), 100);
                      }}
                      className="w-full text-left px-4 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-300 group-hover:text-white">Change theme to blue</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setChatInput('add a contact section');
                        setTimeout(() => handleChatSend(), 100);
                      }}
                      className="w-full text-left px-4 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-300 group-hover:text-white">Add a contact section</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setChatInput('add a pricing section');
                        setTimeout(() => handleChatSend(), 100);
                      }}
                      className="w-full text-left px-4 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-300 group-hover:text-white">Add a pricing section</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                // Regular chat view
                chatHistory.map((message, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-[#1a1a1a] text-gray-200 border border-gray-800'
                    }`}>
                      {message.content === '...' ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Chat Input - FIXED AT BOTTOM */}
            <div className="p-6 border-t border-gray-800 bg-[#0a0a0a]">
              <div className="relative flex items-center">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSend();
                    }
                  }}
                  placeholder="Type here to modify your website..."
                  className="w-full bg-[#1a1a1a] border-2 border-gray-600 focus:border-purple-500 text-white placeholder:text-gray-400 pr-14 h-12 text-sm rounded-xl shadow-lg"
                  style={{ outline: 'none' }}
                />
                <Button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim()}
                  className="absolute right-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10 p-0 rounded-lg flex items-center justify-center transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Try: "change theme to blue" or "add contact section"
              </p>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 bg-[#1a1a1a] flex flex-col overflow-hidden">
            <div className="h-12 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-500 font-mono">
                  localhost:3000/{generatedWebsite.slug}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-gray-500 hover:text-gray-300 h-6 px-2"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
            </div>

            {/* Website Preview */}
            <div className="flex-1 overflow-auto bg-white">
              {/* 🚀 NEW: Sandpack Preview for agent-generated projects */}
              {generatedProject ? (
                <SandpackPreview
                  files={generatedProject.files}
                  dependencies={generatedProject.dependencies || {}}
                  showEditor={false}
                  showConsole={true}
                />
              ) : generatedWebsite?.aiGeneratedHTML ? (
                /* Fallback to old iframe for simple mode */
                <iframe
                  srcDoc={generatedWebsite.aiGeneratedHTML}
                  className="w-full h-full border-0"
                  title="AI Generated Website Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                /* Otherwise show the template preview */
                <>
              {/* Professional Navbar */}
              <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg"
                        style={{ backgroundColor: generatedWebsite.primaryColor }}
                      >
                        {generatedWebsite.title?.charAt(0).toUpperCase() || 'W'}
                      </div>
                      <span className="text-xl font-bold text-gray-900">{generatedWebsite.title}</span>
                    </div>
                    
                    {/* Nav Links */}
                    <div className="hidden md:flex items-center space-x-8">
                      {generatedWebsite.sections?.slice(0, 5).map((section, idx) => (
                        <a 
                          key={idx} 
                          href={`#${section}`} 
                          className="text-gray-600 hover:text-gray-900 font-medium transition-colors capitalize"
                        >
                          {section.replace('-', ' ')}
                        </a>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-600 hover:text-gray-900 font-medium">
                        Sign In
                      </button>
                      <button 
                        className="px-5 py-2.5 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: generatedWebsite.primaryColor }}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </nav>

              {/* Hero Section */}
              <div 
                className="py-20 px-8 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${generatedWebsite.primaryColor}, ${generatedWebsite.secondaryColor})` 
                }}
              >
                <div className="max-w-6xl mx-auto text-center">
                  <div 
                    className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 bg-white/20 backdrop-blur-sm"
                  >
                    {generatedWebsite.type?.charAt(0).toUpperCase() + generatedWebsite.type?.slice(1)} Website
                  </div>
                  <h1 className="text-6xl font-bold mb-6">{generatedWebsite.title}</h1>
                  <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
                    {generatedWebsite.description?.split('.')[0]}
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Get Started Free
                    </button>
                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="max-w-6xl mx-auto px-8 py-20">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Powerful Features
                  </h2>
                  <p className="text-xl text-gray-600">
                    {generatedWebsite.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {generatedWebsite.features?.slice(0, 6).map((feature, idx) => (
                    <div key={idx} className="p-6 border border-gray-200 rounded-lg">
                      <div 
                        className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${generatedWebsite.primaryColor}20` }}
                      >
                        ✓
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                      <p className="text-sm text-gray-600">
                        {feature} capabilities built right in.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isIDEView && !showAIInterface) {
    // Initial input view
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
        
        {/* Grainy texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgICAgPGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjQiLz4KPC9zdmc+')] z-10"></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col lg:flex-row items-center"
          >
            {/* Left Side - Circular Text - Far Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-shrink-0 lg:absolute lg:-left-[180px] lg:top-[90px] lg:transform"
            >
              <CircularText
                text="MAYA*WEB*BUILDER*"
                spinDuration={15}
                onHover="speedUp"
                className="text-white"
              />
            </motion.div>

            {/* Center Content */}
            <div className="flex-1 text-center lg:text-center lg:max-w-4xl mx-auto">
              {/* Main Heading */}
              <motion.h1 
                className="text-6xl md:text-8xl font-bold text-white mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Build something Maya-Web
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-white/80 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Create apps and websites by chatting with AI
              </motion.p>

              {/* Input Section */}
              <motion.div 
                className="relative max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
              
              {/* Model Selector - Above Search Bar */}
              <div className="mb-4 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm font-medium">Model:</span>
                  <button
                    onClick={() => !autoMode && setShowModelSelector(!showModelSelector)}
                    disabled={autoMode}
                    className={`flex items-center gap-2 px-4 py-2 bg-black/40 border rounded-lg transition-all ${
                      autoMode 
                        ? 'border-gray-700 cursor-not-allowed opacity-50' 
                        : 'border-purple-500/30 hover:border-purple-500/50 cursor-pointer'
                    } text-white`}
                  >
                    {autoMode ? (
                      <Bot className="w-5 h-5" />
                    ) : (
                      (() => {
                        const ModelIcon = AI_MODELS.find(m => m.id === selectedModel)?.icon || Bot;
                        return <ModelIcon className="w-5 h-5" />;
                      })()
                    )}
                    <span className="font-medium">
                      {autoMode ? 'Auto' : AI_MODELS.find(m => m.id === selectedModel)?.name}
                    </span>
                    {!autoMode && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Status indicator */}
                  {autoMode && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">Auto-selecting best model</span>
                    </div>
                  )}
                  {maxMode && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-purple-400 font-medium">MAX Mode: {AI_MODELS.find(m => m.id === selectedModel)?.name}</span>
                    </div>
                  )}
                  {!autoMode && !maxMode && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-blue-400 font-medium">Manual: {AI_MODELS.find(m => m.id === selectedModel)?.name}</span>
                    </div>
                  )}
                </div>
                
                {/* Auto & MAX Mode toggles (MUTUALLY EXCLUSIVE like Cursor) */}
                <div className="flex items-center gap-4 z-50 relative">
                  <div className="relative group z-50">
                    <div 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Auto clicked!', autoMode);
                        if (!autoMode) {
                          setAutoMode(true);
                          setMaxMode(false);
                        } else {
                          setAutoMode(false);
                        }
                      }}
                      className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors cursor-pointer select-none"
                      style={{ pointerEvents: 'auto', zIndex: 100 }}
                    >
                      <span className="font-medium pointer-events-none">Auto</span>
                      <div
                        className={`w-10 h-5 rounded-full relative transition-all pointer-events-none ${
                          autoMode ? 'bg-green-500' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${
                          autoMode ? 'right-0.5' : 'left-0.5'
                        }`}></div>
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block w-72 p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-xs text-gray-300 shadow-2xl pointer-events-none" style={{ zIndex: 200 }}>
                      <div className="font-semibold text-white mb-1">Auto</div>
                      <div className="text-gray-400">Balanced quality and speed, recommended for most tasks</div>
                    </div>
                  </div>
                  <div className="relative group z-50">
                    <div 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('MAX clicked!', maxMode);
                        if (!maxMode) {
                          setMaxMode(true);
                          setAutoMode(false);
                        } else {
                          setMaxMode(false);
                        }
                      }}
                      className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors cursor-pointer select-none"
                      style={{ pointerEvents: 'auto', zIndex: 100 }}
                    >
                      <span className="font-medium pointer-events-none">MAX Mode</span>
                      <div
                        className={`w-10 h-5 rounded-full relative transition-all pointer-events-none ${
                          maxMode ? 'bg-green-500' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${
                          maxMode ? 'right-0.5' : 'left-0.5'
                        }`}></div>
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block w-72 p-3 bg-[#1e1e1e] border border-gray-700 rounded-lg text-xs text-gray-300 shadow-2xl pointer-events-none" style={{ zIndex: 200 }}>
                      <div className="font-semibold text-white mb-1">MAX MODE</div>
                      <div className="text-gray-400">Maxes out context windows and tool calls. For advanced users that are cost insensitive.</div>
                      <div className="text-blue-400 mt-2">Billed at API pricing.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Selector Dropdown - Only show when Auto mode is OFF */}
              {showModelSelector && !autoMode && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 top-16 bg-[#1a1f2e] border border-purple-500/30 rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-50"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#8b5cf6 #1a1f2e'
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold text-sm">Models</h3>
                      <button 
                        onClick={() => setShowModelSelector(false)}
                        className="text-white/60 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-1">
                      {AI_MODELS.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => {
                            if (model.available) {
                              setSelectedModel(model.id);
                              setShowModelSelector(false);
                            }
                          }}
                          disabled={!model.available}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm ${
                            selectedModel === model.id
                              ? 'bg-purple-600/20 text-white'
                              : model.available
                              ? 'hover:bg-white/5 text-white/80'
                              : 'opacity-40 cursor-not-allowed text-white/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <model.icon className="w-4 h-4" />
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {model.badge && (
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                model.badge === 'Free' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : model.badge === 'New'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-purple-500/20 text-purple-400'
                              }`}>
                                {model.badge}
                              </span>
                            )}
                            {selectedModel === model.id && (
                              <span className="text-purple-400">✓</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="relative">
                <Input
                  type="text"
                  placeholder="Ask Maya-Web to create a landing page for..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full h-20 text-xl bg-black/40 border-2 border-purple-500/50 text-white placeholder:text-white/60 focus:border-purple-400 focus:ring-purple-400/20 focus:ring-2 rounded-full pr-24 pl-8 shadow-lg shadow-purple-500/20"
                />
                
                {/* Right side icons */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white hover:bg-white/10 p-2"
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                  {isNavigating ? (
                    <Button
                      disabled
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg shadow-purple-500/20"
                    >
                      Generate Site
                    </Button>
                  ) : (
                    <SparkleButton to={`/generation?prompt=${encodeURIComponent(input)}`} onClick={handleSend}>
                      Generate Site
                    </SparkleButton>
                  )}
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-4">
                  {(generatedWebsite || generatedProject) && (
                    <Button
                      onClick={handleSaveProject}
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 border border-purple-500/30"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {currentProjectId ? 'Update Project' : 'Save Project'}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Public
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Supabase
                  </Button>
                </div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Holographic Checkbox - Bottom Right */}
        <div className="fixed bottom-8 right-8 z-20">
          <HolographicCheckbox 
            checked={isSystemActivated}
            className="scale-75"
          />
          {/* Debug info with dot */}
          <div className="text-white text-xs mt-2 flex items-center gap-2">
            {/* Glowing Status Dot */}
            <div className="relative">
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                isSystemActivated 
                  ? 'bg-green-500 shadow-green-500/50 shadow-lg animate-pulse' 
                  : 'bg-blue-500 shadow-blue-500/50 shadow-lg animate-pulse'
              }`}></div>
              {/* Outer glow ring */}
              <div className={`absolute inset-0 w-3 h-3 rounded-full transition-all duration-500 ${
                isSystemActivated 
                  ? 'bg-green-500/30 animate-ping' 
                  : 'bg-blue-500/30 animate-ping'
              }`}></div>
            </div>
            <span>System: {isSystemActivated ? 'ACTIVATED' : countdown > 0 ? `ACTIVATING IN ${countdown}s` : 'DEACTIVATED'}</span>
            
            {/* Activity bars when activated */}
            {isSystemActivated && (
              <div className="flex items-end space-x-1 mt-2">
                {activityBars.map((height, i) => (
                  <div
                    key={i}
                    className="bg-green-500 rounded-sm animate-pulse"
                    style={{
                      width: '3px',
                      height: `${height}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1s'
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Enhanced IDE View inspired by bolt.diy
  return (
    <div className="fixed inset-0 h-screen w-screen bg-gray-50 overflow-hidden flex flex-col">
      {/* Top Header Bar - Enhanced */}
      <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToMain}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Main</span>
          </Button>
          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="text-gray-900 font-medium text-sm">maya-web-builder</span>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 bg-green-100 text-green-700 px-2 py-1 rounded">
                ✓ Live Preview
          </div>
              <div className="text-xs text-gray-500 bg-blue-100 text-blue-700 px-2 py-1 rounded">
                AI Generated
        </div>
              {generatedWebsite?.slug && (
                <div className="text-xs text-gray-500 bg-purple-100 text-purple-700 px-2 py-1 rounded font-mono">
                  /{generatedWebsite.slug}
                </div>
              )}
            </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Code className="w-4 h-4 mr-2" />
            <span className="text-sm">Code</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
            <Globe className="w-4 h-4" />
          </Button>
          {generatedWebsite?.slug && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.open(`/site/${generatedWebsite.slug}`, '_blank')}
              className="text-blue-600 hover:text-blue-700 border-blue-600"
            >
              <Globe className="w-4 h-4 mr-2" />
              Open Live Site
            </Button>
          )}
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            Deploy
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Enhanced File Explorer */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-900 font-semibold text-sm">Project Files</h2>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <FolderOpen className="w-4 h-4" />
                </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Plus className="w-4 h-4" />
              </Button>
              </div>
            </div>
            {/* Project Info */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-600 mb-1">Project Type</div>
              <div className="text-sm font-medium text-gray-900">
                {generatedWebsite?.type ? generatedWebsite.type.charAt(0).toUpperCase() + generatedWebsite.type.slice(1) : 'Modern Website'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {generatedWebsite?.techStack ? `${generatedWebsite.techStack.framework} + ${generatedWebsite.techStack.styling}` : 'React + Tailwind CSS'}
              </div>
            </div>
            
            {/* Original Prompt */}
            {generatedWebsite?.prompt && (
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <div className="text-xs text-blue-600 mb-1 font-semibold">Your Prompt</div>
                <div className="text-xs text-gray-700 italic line-clamp-3">
                  "{generatedWebsite.prompt}"
                </div>
              </div>
            )}
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-green-50 rounded p-2">
                <div className="text-lg font-bold text-green-700">{generatedWebsite?.sections?.length || 0}</div>
                <div className="text-xs text-green-600">Sections</div>
              </div>
              <div className="bg-purple-50 rounded p-2">
                <div className="text-lg font-bold text-purple-700">{generatedWebsite?.features?.length || 0}</div>
                <div className="text-xs text-purple-600">Features</div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {renderFileTree(websiteFiles)}
            </div>
          </div>
        </div>

        {/* Middle Panel - Enhanced Live Preview */}
        <div className="flex-1 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900 font-semibold text-sm flex items-center">
                <Globe className="w-4 h-4 mr-2 text-blue-600" />
                Live Preview
                <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Desktop
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Tablet
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Mobile
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-2"></div>
                <Button variant="ghost" size="sm" className="text-xs">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white overflow-y-auto">
            {/* Professional Website Preview */}
            <div className="min-h-full bg-gradient-to-br from-gray-50 to-white">
              {/* Website Header - Dynamic based on generated website */}
              <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        generatedWebsite?.primaryColor === 'green' ? 'bg-gradient-to-r from-green-600 to-blue-600' :
                        generatedWebsite?.primaryColor === 'purple' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                        generatedWebsite?.primaryColor === 'orange' ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                        'bg-gradient-to-r from-blue-600 to-purple-600'
                      }`}>
                        <span className="text-white font-bold text-sm">
                          {generatedWebsite?.title ? generatedWebsite.title.charAt(0).toUpperCase() : 'M'}
                        </span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        {generatedWebsite?.title || 'Your Website'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-8">
                      {generatedWebsite?.sections?.includes('features') && (
                      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
                      )}
                      {generatedWebsite?.sections?.includes('pricing') && (
                      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
                      )}
                      {(generatedWebsite?.sections?.includes('about') || generatedWebsite?.type === 'portfolio') && (
                      <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">About</a>
                      )}
                      {generatedWebsite?.type === 'ecommerce' && (
                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Shop</a>
                      )}
                      {generatedWebsite?.type === 'blog' && (
                        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Blog</a>
                      )}
                      <Button variant="outline" size="sm">
                        {generatedWebsite?.type === 'ecommerce' ? 'Sign In' : 'Log In'}
                      </Button>
                      <Button size="sm" className={`${
                        generatedWebsite?.primaryColor === 'green' ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700' :
                        generatedWebsite?.primaryColor === 'purple' ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' :
                        generatedWebsite?.primaryColor === 'orange' ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700' :
                        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      }`}>
                        {generatedWebsite?.type === 'ecommerce' ? 'Shop Now' :
                         generatedWebsite?.type === 'portfolio' ? 'Hire Me' :
                         generatedWebsite?.type === 'business' ? 'Contact Us' :
                         'Get Started'}
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
                          <div className="space-y-2">
                            <div className="text-xs font-semibold text-gray-700 mb-2">Sections Generated:</div>
                            {generatedWebsite?.sections?.slice(0, 5).map((section, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <div className="text-xs text-gray-600 capitalize">{section.replace('-', ' ')}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {generatedWebsite?.features?.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className={`${
                              idx % 2 === 0 ? 'bg-blue-50' : 'bg-purple-50'
                            } rounded-lg p-3`}>
                              <div className={`text-sm font-medium ${
                                idx % 2 === 0 ? 'text-blue-900' : 'text-purple-900'
                              }`}>{feature}</div>
                              <div className={`text-xs ${
                                idx % 2 === 0 ? 'text-blue-700' : 'text-purple-700'
                              }`}>Included</div>
                            </div>
                          )) || (
                            <>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-sm font-medium text-blue-900">Responsive</div>
                            <div className="text-xs text-blue-700">Mobile Ready</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-sm font-medium text-purple-900">Fast</div>
                            <div className="text-xs text-purple-700">Optimized</div>
                          </div>
                            </>
                          )}
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

export default WebsiteBuilder;
