import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Workflow,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
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
  Code,
  Eye,
  Download,
  Save,
  Share2,
  Copy,
  Trash2,
  Plus,
  Edit,
  Star,
  TrendingUp
} from 'lucide-react';

const WorkflowManager = () => {
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [workflows, setWorkflows] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    activeWorkflows: 0,
    totalTime: 0
  });

  const workflowTemplates = [
    {
      id: 'portfolio',
      name: 'Portfolio Website',
      description: 'Create a professional portfolio website',
      steps: [
        { name: 'Project Setup', duration: 5, status: 'pending' },
        { name: 'Design Layout', duration: 15, status: 'pending' },
        { name: 'Add Content', duration: 20, status: 'pending' },
        { name: 'Optimize Performance', duration: 10, status: 'pending' },
        { name: 'Deploy Website', duration: 5, status: 'pending' }
      ],
      estimatedTime: 55,
      difficulty: 'medium',
      category: 'portfolio'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Build a complete online store',
      steps: [
        { name: 'Project Setup', duration: 5, status: 'pending' },
        { name: 'Product Catalog', duration: 30, status: 'pending' },
        { name: 'Shopping Cart', duration: 25, status: 'pending' },
        { name: 'Payment Integration', duration: 20, status: 'pending' },
        { name: 'Order Management', duration: 15, status: 'pending' },
        { name: 'Testing & Launch', duration: 10, status: 'pending' }
      ],
      estimatedTime: 105,
      difficulty: 'high',
      category: 'ecommerce'
    },
    {
      id: 'landing',
      name: 'Landing Page',
      description: 'Create a high-converting landing page',
      steps: [
        { name: 'Project Setup', duration: 5, status: 'pending' },
        { name: 'Hero Section', duration: 15, status: 'pending' },
        { name: 'Features Section', duration: 20, status: 'pending' },
        { name: 'CTA Optimization', duration: 10, status: 'pending' },
        { name: 'A/B Testing', duration: 15, status: 'pending' },
        { name: 'Deploy & Monitor', duration: 5, status: 'pending' }
      ],
      estimatedTime: 70,
      difficulty: 'medium',
      category: 'marketing'
    }
  ];

  const startWorkflow = async (workflow) => {
    setActiveWorkflow(workflow);
    setIsRunning(true);
    setCurrentStep(0);

    for (let i = 0; i < workflow.steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsRunning(false);
    
    // Create completed project
    const project = {
      id: Date.now().toString(),
      name: workflow.name,
      description: workflow.description,
      status: 'completed',
      completedAt: new Date().toISOString(),
      workflow: workflow.id,
      steps: workflow.steps.length,
      totalTime: workflow.estimatedTime
    };
    
    setProjects(prev => [project, ...prev]);
    updateStats();
  };

  const updateStats = () => {
    setStats({
      totalProjects: projects.length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      activeWorkflows: workflows.filter(w => w.status === 'running').length,
      totalTime: projects.reduce((sum, p) => sum + (p.totalTime || 0), 0)
    });
  };

  const saveWorkflow = (workflow) => {
    const savedWorkflow = {
      ...workflow,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'saved'
    };
    setWorkflows(prev => [savedWorkflow, ...prev]);
  };

  const duplicateWorkflow = (workflow) => {
    const duplicated = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (Copy)`,
      createdAt: new Date().toISOString(),
      status: 'saved'
    };
    setWorkflows(prev => [duplicated, ...prev]);
  };

  const deleteWorkflow = (id) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
  };

  const exportWorkflow = (workflow) => {
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflow.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    updateStats();
  }, [projects]);

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
            Workflow Manager
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Complete Development Workflows
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Manage your development process with automated workflows. 
            Track progress, collaborate with teams, and deliver projects faster.
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stats.totalProjects}</div>
                <div className="text-sm text-gray-400">Total Projects</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-green-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stats.completedProjects}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Workflow className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stats.activeWorkflows}</div>
                <div className="text-sm text-gray-400">Active Workflows</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stats.totalTime}h</div>
                <div className="text-sm text-gray-400">Total Time</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Workflow Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-indigo-500/20">
            <CardHeader>
              <CardTitle className="text-white">Workflow Templates</CardTitle>
              <CardDescription className="text-gray-300">
                Choose from pre-built workflows or create your own
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workflowTemplates.map((template) => (
                  <Card key={template.id} className="bg-black/30 backdrop-blur-xl border-gray-700 hover:border-indigo-500/50 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                        <Badge className={`${
                          template.difficulty === 'high' ? 'bg-red-500/20 text-red-300' :
                          template.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {template.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-300">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Steps:</span>
                          <span className="text-white">{template.steps.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Est. Time:</span>
                          <span className="text-white">{template.estimatedTime} min</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white capitalize">{template.category}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-300">Steps:</h4>
                        <div className="space-y-1">
                          {template.steps.slice(0, 3).map((step, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">{step.name}</span>
                              <span className="text-gray-500">{step.duration}m</span>
                            </div>
                          ))}
                          {template.steps.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{template.steps.length - 3} more steps
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => startWorkflow(template)}
                          disabled={isRunning}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                        <Button
                          onClick={() => saveWorkflow(template)}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:border-gray-500"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Workflow */}
        {activeWorkflow && isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Play className="w-6 h-6 mr-3 text-green-400" />
                  Running: {activeWorkflow.name}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Current step: {activeWorkflow.steps[currentStep]?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      Step {currentStep + 1} of {activeWorkflow.steps.length}
                    </span>
                    <span className="text-green-400">
                      {Math.round(((currentStep + 1) / activeWorkflow.steps.length) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={((currentStep + 1) / activeWorkflow.steps.length) * 100} 
                    className="h-3 bg-black/30" 
                  />
                </div>

                <div className="space-y-3">
                  {activeWorkflow.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index < currentStep ? 'bg-green-500/10 border border-green-500/20' :
                        index === currentStep ? 'bg-blue-500/10 border border-blue-500/20' :
                        'bg-black/30 border border-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {index < currentStep ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        ) : index === currentStep ? (
                          <Clock className="w-5 h-5 text-blue-400 mr-3 animate-pulse" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-600 rounded-full mr-3" />
                        )}
                        <span className="text-white">{step.name}</span>
                      </div>
                      <div className="text-sm text-gray-400">{step.duration}m</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setIsRunning(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:border-gray-500"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    onClick={() => {
                      setIsRunning(false);
                      setActiveWorkflow(null);
                      setCurrentStep(0);
                    }}
                    variant="outline"
                    className="border-red-600 text-red-300 hover:border-red-500"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Saved Workflows */}
        {workflows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Saved Workflows</CardTitle>
                <CardDescription className="text-gray-300">
                  Your custom workflows and templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Workflow className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{workflow.name}</h4>
                          <p className="text-gray-400 text-sm">{workflow.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">{workflow.steps.length} steps</span>
                            <span className="text-xs text-gray-500">{workflow.estimatedTime} min</span>
                            <span className="text-xs text-gray-500">
                              {new Date(workflow.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => startWorkflow(workflow)}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Run
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => duplicateWorkflow(workflow)}
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => exportWorkflow(workflow)}
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => deleteWorkflow(workflow.id)}
                          variant="outline"
                          className="border-red-600 text-red-300 hover:border-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recent Projects */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-black/20 backdrop-blur-xl border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Projects</CardTitle>
                <CardDescription className="text-gray-300">
                  Your completed and ongoing projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{project.name}</h4>
                          <p className="text-gray-400 text-sm">{project.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge className="bg-green-500/20 text-green-300">
                              {project.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{project.steps} steps</span>
                            <span className="text-xs text-gray-500">{project.totalTime} min</span>
                            <span className="text-xs text-gray-500">
                              {new Date(project.completedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WorkflowManager;
