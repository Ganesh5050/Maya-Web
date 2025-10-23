import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Code, 
  Zap, 
  CheckCircle, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw,
  ArrowRight,
  Target,
  Calendar,
  Users,
  BarChart3,
  Rocket,
  Settings,
  FileText,
  Palette,
  Database,
  Globe,
  Shield,
  Layers,
  Workflow
} from 'lucide-react';

const DevelopmentWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const workflowSteps = [
    {
      id: 1,
      title: 'Project Initialization',
      description: 'Set up project structure, dependencies, and development environment',
      icon: Code,
      duration: '5-10 min',
      complexity: 'Low',
      features: ['Vite Setup', 'TypeScript Config', 'Tailwind CSS', 'Component Library'],
      status: 'completed'
    },
    {
      id: 2,
      title: 'UI Framework Setup',
      description: 'Configure design system, components, and styling architecture',
      icon: Palette,
      duration: '15-20 min',
      complexity: 'Medium',
      features: ['Design Tokens', 'Component Library', 'Theme System', 'Responsive Grid'],
      status: 'completed'
    },
    {
      id: 3,
      title: '3D Graphics Integration',
      description: 'Implement React Three Fiber and 3D scene management',
      icon: Layers,
      duration: '30-45 min',
      complexity: 'High',
      features: ['Three.js Setup', 'Scene Management', 'Material System', 'Animation Engine'],
      status: 'completed'
    },
    {
      id: 4,
      title: 'AI Integration Layer',
      description: 'Build AI service integration and prompt processing system',
      icon: Zap,
      duration: '45-60 min',
      complexity: 'High',
      features: ['API Integration', 'Prompt Processing', 'Code Generation', 'Template Engine'],
      status: 'completed'
    },
    {
      id: 5,
      title: 'Real-time Collaboration',
      description: 'Implement collaborative editing and live synchronization',
      icon: Users,
      duration: '60-90 min',
      complexity: 'Very High',
      features: ['WebSocket Setup', 'Live Editing', 'User Management', 'Conflict Resolution'],
      status: 'in-progress'
    },
    {
      id: 6,
      title: 'Visual Editor',
      description: 'Create drag-and-drop visual website builder interface',
      icon: Settings,
      duration: '90-120 min',
      complexity: 'Very High',
      features: ['Drag & Drop', 'Component Library', 'Properties Panel', 'Live Preview'],
      status: 'pending'
    },
    {
      id: 7,
      title: 'Code Export System',
      description: 'Build code generation and export functionality',
      icon: FileText,
      duration: '30-45 min',
      complexity: 'Medium',
      features: ['Code Generation', 'Multiple Formats', 'Dependency Management', 'Build Config'],
      status: 'pending'
    },
    {
      id: 8,
      title: 'Authentication & Security',
      description: 'Implement user authentication and security measures',
      icon: Shield,
      duration: '45-60 min',
      complexity: 'High',
      features: ['User Auth', 'Session Management', 'API Security', 'Data Protection'],
      status: 'pending'
    },
    {
      id: 9,
      title: 'Database Integration',
      description: 'Set up database and data persistence layer',
      icon: Database,
      duration: '30-45 min',
      complexity: 'Medium',
      features: ['Database Setup', 'Data Models', 'API Endpoints', 'Caching Layer'],
      status: 'pending'
    },
    {
      id: 10,
      title: 'Performance Optimization',
      description: 'Optimize application performance and loading times',
      icon: BarChart3,
      duration: '60-90 min',
      complexity: 'High',
      features: ['Code Splitting', 'Lazy Loading', 'Image Optimization', 'Bundle Analysis'],
      status: 'pending'
    },
    {
      id: 11,
      title: 'Testing & Quality Assurance',
      description: 'Implement comprehensive testing and quality checks',
      icon: CheckCircle,
      duration: '45-60 min',
      complexity: 'Medium',
      features: ['Unit Tests', 'Integration Tests', 'E2E Tests', 'Code Quality'],
      status: 'pending'
    },
    {
      id: 12,
      title: 'Deployment & DevOps',
      description: 'Set up deployment pipeline and production environment',
      icon: Rocket,
      duration: '30-45 min',
      complexity: 'Medium',
      features: ['CI/CD Pipeline', 'Production Setup', 'Monitoring', 'Backup Strategy'],
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300';
      case 'in-progress': return 'bg-blue-500/20 text-blue-300';
      case 'pending': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-500/20 text-green-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'High': return 'bg-orange-500/20 text-orange-300';
      case 'Very High': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const runWorkflow = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= workflowSteps.length) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
        return nextStep;
      });
    }, 2000);

    return () => clearInterval(interval);
  };

  const resetWorkflow = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const overallProgress = (completedSteps.length / workflowSteps.length) * 100;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <Workflow className="w-4 h-4 mr-2" />
            Development Workflow
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Complete Development Pipeline
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow our comprehensive development workflow to build Maya-Web from scratch. 
            Each step is carefully planned and optimized for maximum efficiency.
          </p>
        </motion.div>

        {/* Workflow Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-indigo-500/20">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</div>
                    <div className="text-sm text-gray-400">Complete</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Progress value={overallProgress} className="h-3 bg-black/30" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{completedSteps.length} completed</span>
                      <span>{workflowSteps.length - completedSteps.length} remaining</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={runWorkflow}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Workflow
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={resetWorkflow}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:border-gray-500"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workflow Steps */}
        <div className="space-y-6">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`bg-black/20 backdrop-blur-xl border-l-4 transition-all duration-500 ${
                completedSteps.includes(index) 
                  ? 'border-l-green-500 bg-green-500/5' 
                  : index === currentStep && isRunning
                  ? 'border-l-blue-500 bg-blue-500/5'
                  : 'border-l-gray-600'
              }`}>
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Step Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          completedSteps.includes(index)
                            ? 'bg-green-500/20 text-green-300'
                            : index === currentStep && isRunning
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {completedSteps.includes(index) ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <step.icon className="w-6 h-6" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                            <Badge className={getStatusColor(step.status)}>
                              {step.status}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mb-4">{step.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400">{step.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-gray-400" />
                              <Badge className={getComplexityColor(step.complexity)}>
                                {step.complexity}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="lg:w-80">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {step.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="text-xs bg-black/30 text-gray-300 px-2 py-1 rounded"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  {index === currentStep && isRunning && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-sm text-blue-300">Currently executing...</span>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Development Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-black/20 backdrop-blur-xl border-green-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">4</div>
                <div className="text-sm text-gray-400">Completed Steps</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">8-12</div>
                <div className="text-sm text-gray-400">Hours Total</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">12</div>
                <div className="text-sm text-gray-400">Development Phases</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-gray-400">Production Ready</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevelopmentWorkflow;
