import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Eye,
  Download,
  Bot,
  Palette,
  Code,
  Users,
  Globe,
  Clock,
  Star
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: number;
  component: string;
  features: string[];
  demoData?: any;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'landing',
    title: 'Landing Page Experience',
    description: 'Explore the stunning landing page with 3D animations and glassmorphic design',
    icon: Eye,
    duration: 8000,
    component: 'LandingPage',
    features: ['3D Holographic Scene', 'Glassmorphic UI', 'Smooth Animations', 'Responsive Design']
  },
  {
    id: 'ai-generator',
    title: 'AI Template Generation',
    description: 'Generate custom website templates using natural language prompts',
    icon: Bot,
    duration: 10000,
    component: 'AIGenerator',
    features: ['Natural Language Processing', 'Smart Template Creation', 'Real-time Preview', 'Multiple Formats']
  },
  {
    id: 'visual-editor',
    title: 'Visual Website Editor',
    description: 'Drag and drop components to build your website visually',
    icon: Palette,
    duration: 12000,
    component: 'VisualEditor',
    features: ['Drag & Drop Interface', 'Component Library', 'Real-time Editing', 'Properties Panel']
  },
  {
    id: 'dashboard',
    title: 'Project Management',
    description: 'Organize and manage all your website projects in one place',
    icon: Users,
    duration: 8000,
    component: 'UserDashboard',
    features: ['Project Organization', 'Statistics Overview', 'Search & Filter', 'Collaboration']
  },
  {
    id: 'ai-assistant',
    title: 'AI Design Assistant',
    description: 'Get intelligent design suggestions and improvements from AI',
    icon: Sparkles,
    duration: 10000,
    component: 'AIDesignAssistant',
    features: ['Chat Interface', 'Smart Suggestions', 'Voice Input', 'Learning System']
  },
  {
    id: 'export',
    title: 'Code Export & Deployment',
    description: 'Export your website as production-ready code and deploy instantly',
    icon: Download,
    duration: 8000,
    component: 'CodeExport',
    features: ['Multiple Formats', 'Production Code', 'One-click Deploy', 'Version Control']
  }
];

const WorkflowDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const currentStepData = workflowSteps[currentStep];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (currentStepData.duration / 100));
          if (newProgress >= 100) {
            setCompletedSteps(prev => [...prev, currentStep]);
            if (currentStep < workflowSteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, currentStepData.duration]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setCompletedSteps([]);
    setIsPlaying(false);
  };

  const handleSkipToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-glass-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Maya-Web Workflow Demo</h1>
              <p className="text-muted-foreground">
                Experience the complete AI website builder workflow
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {currentStep + 1}/{workflowSteps.length}
                </div>
                <div className="text-sm text-muted-foreground">Steps</div>
              </div>
              
              <Button variant="hero" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Workflow Steps</h2>
              
              <div className="space-y-3">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = completedSteps.includes(index);
                  const isCurrent = index === currentStep;
                  
                  return (
                    <motion.div
                      key={step.id}
                      whileHover={{ scale: 1.02 }}
                      className={`glass rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                        isCurrent 
                          ? 'border-primary shadow-glow-primary' 
                          : isCompleted
                          ? 'border-green-400/50 shadow-glow-soft'
                          : 'hover:shadow-glow-soft'
                      }`}
                      onClick={() => handleSkipToStep(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-500/20 border-2 border-green-400' 
                            : isCurrent
                            ? 'bg-gradient-primary'
                            : 'bg-muted/20'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <Icon className={`w-5 h-5 ${isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className={`font-semibold text-sm ${
                            isCurrent ? 'text-primary' : isCompleted ? 'text-green-400' : ''
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {step.duration / 1000}s
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="mt-8 space-y-3">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex-1"
                  >
                    <SkipBack className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentStep === workflowSteps.length - 1}
                    className="flex-1"
                  >
                    <SkipForward className="w-4 h-4 mr-2" />
                    Next
                  </Button>
                </div>
                
                <Button
                  variant={isPlaying ? "outline" : "hero"}
                  size="lg"
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="w-full"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause Demo
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Demo
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Main Demo Area */}
          <div className="lg:col-span-3">
            {/* Current Step Header */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-8 mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <currentStepData.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
                  <p className="text-muted-foreground">{currentStepData.description}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="text-lg font-bold">{currentStepData.duration / 1000}s</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-primary rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Demo Content */}
            <motion.div
              key={`demo-${currentStep}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8"
            >
              {/* Component-specific demo content */}
              {currentStepData.component === 'LandingPage' && (
                <LandingPageDemo />
              )}
              
              {currentStepData.component === 'AIGenerator' && (
                <AIGeneratorDemo />
              )}
              
              {currentStepData.component === 'VisualEditor' && (
                <VisualEditorDemo />
              )}
              
              {currentStepData.component === 'UserDashboard' && (
                <UserDashboardDemo />
              )}
              
              {currentStepData.component === 'AIDesignAssistant' && (
                <AIDesignAssistantDemo />
              )}
              
              {currentStepData.component === 'CodeExport' && (
                <CodeExportDemo />
              )}

              {/* Features List */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentStepData.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 glass rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Components
const LandingPageDemo = () => (
  <div className="text-center">
    <div className="text-6xl mb-6">🎬</div>
    <h3 className="text-xl font-semibold mb-4">Landing Page Experience</h3>
    <p className="text-muted-foreground mb-6">
      Experience the stunning landing page with 3D holographic scenes, glassmorphic UI elements, 
      and smooth animations that showcase Maya-Web's capabilities.
    </p>
    
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      {[
        { icon: '🎨', title: '3D Holographic Scene', desc: 'Custom WebGL shaders' },
        { icon: '✨', title: 'Glassmorphic UI', desc: 'Modern glass effects' },
        { icon: '🎭', title: 'Smooth Animations', desc: 'Framer Motion transitions' }
      ].map((item, index) => (
        <div key={index} className="glass rounded-2xl p-4">
          <div className="text-2xl mb-2">{item.icon}</div>
          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
          <p className="text-xs text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
    
    <Button variant="hero" className="group">
      <Eye className="w-4 h-4 mr-2" />
      View Landing Page
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

const AIGeneratorDemo = () => (
  <div className="text-center">
    <div className="text-6xl mb-6">🤖</div>
    <h3 className="text-xl font-semibold mb-4">AI Template Generation</h3>
    <p className="text-muted-foreground mb-6">
      Generate custom website templates using natural language. Our AI understands your vision 
      and creates complete website structures with 3D elements and animations.
    </p>
    
    <div className="glass rounded-2xl p-6 mb-6">
      <div className="text-left">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-primary" />
          <span className="font-semibold">AI Prompt Example:</span>
        </div>
        <div className="bg-muted/20 rounded-lg p-4 mb-4">
          <p className="text-sm italic">
            "Create a portfolio website with neon 3D effects and floating glass sections"
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="text-sm text-muted-foreground">AI is analyzing...</span>
        </div>
      </div>
    </div>
    
    <Button variant="hero" className="group">
      <Zap className="w-4 h-4 mr-2" />
      Try AI Generator
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

const VisualEditorDemo = () => (
  <div className="text-center">
    <div className="text-6xl mb-6">🎨</div>
    <h3 className="text-xl font-semibold mb-4">Visual Website Editor</h3>
    <p className="text-muted-foreground mb-6">
      Drag and drop components to build your website visually. No coding required - 
      just drag, drop, and customize with our intuitive interface.
    </p>
    
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="glass rounded-2xl p-4">
        <div className="text-2xl mb-2">📦</div>
        <h4 className="font-semibold text-sm mb-1">Component Library</h4>
        <p className="text-xs text-muted-foreground">Pre-built components ready to use</p>
      </div>
      <div className="glass rounded-2xl p-4">
        <div className="text-2xl mb-2">🎯</div>
        <h4 className="font-semibold text-sm mb-1">Drag & Drop</h4>
        <p className="text-xs text-muted-foreground">Intuitive visual editing</p>
      </div>
    </div>
    
    <Button variant="hero" className="group">
      <Palette className="w-4 h-4 mr-2" />
      Open Visual Editor
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

const UserDashboardDemo = () => (
  <div className="text-center">
    <div className="text-6xl mb-6">📊</div>
    <h3 className="text-xl font-semibold mb-4">Project Management</h3>
    <p className="text-muted-foreground mb-6">
      Organize and manage all your website projects in one place. Track statistics, 
      collaborate with team members, and keep everything organized.
    </p>
    
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Projects', value: '12', icon: '📁' },
        { label: 'Views', value: '2.5K', icon: '👁️' },
        { label: 'Likes', value: '156', icon: '❤️' },
        { label: 'Team', value: '4', icon: '👥' }
      ].map((stat, index) => (
        <div key={index} className="glass rounded-2xl p-4">
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-lg font-bold">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
    
    <Button variant="hero" className="group">
      <Users className="w-4 h-4 mr-2" />
      View Dashboard
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

const AIDesignAssistantDemo = () => (
  <div className="text-center">
    <div className="text-6xl mb-6">🧠</div>
    <h3 className="text-xl font-semibold mb-4">AI Design Assistant</h3>
    <p className="text-muted-foreground mb-6">
      Get intelligent design suggestions and improvements from our AI assistant. 
      Chat naturally and receive actionable recommendations.
    </p>
    
    <div className="glass rounded-2xl p-6 mb-6">
      <div className="space-y-4">
        <div className="flex justify-start">
          <div className="bg-primary/20 rounded-2xl p-3 max-w-[80%]">
            <p className="text-sm">"Make the hero section more engaging"</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-muted/20 rounded-2xl p-3 max-w-[80%]">
            <p className="text-sm">I suggest adding floating particles and a gradient background with 95% confidence.</p>
          </div>
        </div>
      </div>
    </div>
    
    <Button variant="hero" className="group">
      <Bot className="w-4 h-4 mr-2" />
      Chat with AI Assistant
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

const CodeExportDemo = () => (
  <div className="text-center">
    <div className="text-6xl mb-6">📦</div>
    <h3 className="text-xl font-semibold mb-4">Code Export & Deployment</h3>
    <p className="text-muted-foreground mb-6">
      Export your website as production-ready code in multiple formats. 
      Deploy instantly to Vercel, GitHub, or any hosting platform.
    </p>
    
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      {[
        { format: 'React + Vite', files: '12 files', size: '1.2MB' },
        { format: 'Static HTML', files: '8 files', size: '0.8MB' },
        { format: 'Next.js', files: '15 files', size: '1.5MB' }
      ].map((exportOption, index) => (
        <div key={index} className="glass rounded-2xl p-4">
          <h4 className="font-semibold text-sm mb-2">{exportOption.format}</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>{exportOption.files}</div>
            <div>{exportOption.size}</div>
          </div>
        </div>
      ))}
    </div>
    
    <Button variant="hero" className="group">
      <Download className="w-4 h-4 mr-2" />
      Export & Deploy
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

export default WorkflowDemo;
