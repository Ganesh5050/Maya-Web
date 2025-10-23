import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  Cloud, 
  Server, 
  Globe, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Zap,
  Shield,
  Database,
  Code,
  Terminal,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Activity,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  RefreshCw,
  ExternalLink,
  Copy,
  Trash2,
  Plus,
  ArrowRight
} from 'lucide-react';

const DeploymentAutomation = () => {
  const [activeTab, setActiveTab] = useState('deployments');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const tabs = [
    { id: 'deployments', name: 'Deployments', icon: Rocket },
    { id: 'environments', name: 'Environments', icon: Server },
    { id: 'pipelines', name: 'CI/CD Pipelines', icon: GitBranch },
    { id: 'monitoring', name: 'Monitoring', icon: Activity }
  ];

  const deployments = [
    {
      id: '1',
      name: 'Portfolio Website',
      environment: 'production',
      status: 'success',
      url: 'https://portfolio-demo.maya-web.app',
      lastDeployed: '2 hours ago',
      commit: 'a1b2c3d',
      branch: 'main',
      buildTime: '2m 34s',
      size: '1.2 MB'
    },
    {
      id: '2',
      name: 'E-commerce Store',
      environment: 'staging',
      status: 'deploying',
      url: 'https://ecommerce-staging.maya-web.app',
      lastDeployed: 'In progress',
      commit: 'e4f5g6h',
      branch: 'feature/payment',
      buildTime: '3m 12s',
      size: '2.8 MB'
    },
    {
      id: '3',
      name: 'Blog Template',
      environment: 'development',
      status: 'failed',
      url: 'https://blog-dev.maya-web.app',
      lastDeployed: '1 day ago',
      commit: 'i7j8k9l',
      branch: 'dev/blog-updates',
      buildTime: '1m 45s',
      size: '0.9 MB'
    }
  ];

  const environments = [
    {
      id: 'production',
      name: 'Production',
      url: 'https://maya-web.com',
      status: 'active',
      region: 'us-east-1',
      instances: 3,
      cpu: 45,
      memory: 67,
      uptime: '99.9%'
    },
    {
      id: 'staging',
      name: 'Staging',
      url: 'https://staging.maya-web.com',
      status: 'active',
      region: 'us-west-2',
      instances: 2,
      cpu: 23,
      memory: 45,
      uptime: '99.7%'
    },
    {
      id: 'development',
      name: 'Development',
      url: 'https://dev.maya-web.com',
      status: 'maintenance',
      region: 'eu-west-1',
      instances: 1,
      cpu: 78,
      memory: 89,
      uptime: '98.2%'
    }
  ];

  const pipelines = [
    {
      id: '1',
      name: 'Main Pipeline',
      trigger: 'Push to main',
      status: 'success',
      lastRun: '2 hours ago',
      duration: '4m 23s',
      steps: [
        { name: 'Install Dependencies', status: 'success', duration: '45s' },
        { name: 'Run Tests', status: 'success', duration: '1m 23s' },
        { name: 'Build Application', status: 'success', duration: '2m 15s' },
        { name: 'Deploy to Production', status: 'success', duration: '1m 0s' }
      ]
    },
    {
      id: '2',
      name: 'Feature Pipeline',
      trigger: 'Pull Request',
      status: 'running',
      lastRun: 'In progress',
      duration: '2m 15s',
      steps: [
        { name: 'Install Dependencies', status: 'success', duration: '38s' },
        { name: 'Run Tests', status: 'success', duration: '1m 12s' },
        { name: 'Build Application', status: 'running', duration: '25s' },
        { name: 'Deploy to Staging', status: 'pending', duration: '-' }
      ]
    }
  ];

  const deploymentSteps = [
    'Preparing build environment...',
    'Installing dependencies...',
    'Running tests...',
    'Building application...',
    'Optimizing assets...',
    'Deploying to server...',
    'Running health checks...',
    'Deployment complete!'
  ];

  const startDeployment = async () => {
    setIsDeploying(true);
    setDeploymentProgress(0);
    
    for (let i = 0; i < deploymentSteps.length; i++) {
      setCurrentStep(deploymentSteps[i]);
      setDeploymentProgress((i + 1) * 12.5);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsDeploying(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-500/20 text-green-300';
      case 'deploying': return 'bg-blue-500/20 text-blue-300';
      case 'failed': return 'bg-red-500/20 text-red-300';
      case 'running': return 'bg-blue-500/20 text-blue-300';
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'deploying': return Clock;
      case 'failed': return AlertCircle;
      case 'running': return Clock;
      case 'active': return CheckCircle;
      case 'maintenance': return Settings;
      default: return Clock;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <Rocket className="w-4 h-4 mr-2" />
            Deployment Automation
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
            Deploy with Confidence
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Automate your deployment pipeline with our advanced CI/CD system. 
            Deploy to multiple environments with zero downtime and comprehensive monitoring.
          </p>
        </motion.div>

        {/* Quick Deploy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Zap className="w-6 h-6 mr-3 text-orange-400" />
                Quick Deploy
              </CardTitle>
              <CardDescription className="text-gray-300">
                Deploy your project to production with one click
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter project name or URL"
                    className="bg-black/30 border-orange-500/30 text-white placeholder-gray-400"
                  />
                </div>
                <Button
                  onClick={startDeployment}
                  disabled={isDeploying}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                >
                  {isDeploying ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy Now
                    </>
                  )}
                </Button>
              </div>

              {isDeploying && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{currentStep}</span>
                      <span className="text-orange-400">{Math.round(deploymentProgress)}%</span>
                    </div>
                    <Progress value={deploymentProgress} className="h-2 bg-black/30" />
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20">
            <CardContent className="pt-8 pb-8">
              <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-orange-600 text-white"
                        : "border-gray-600 text-gray-300 hover:border-orange-500"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deployments */}
        {activeTab === 'deployments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {deployments.map((deployment, index) => {
              const StatusIcon = getStatusIcon(deployment.status);
              return (
                <Card key={deployment.id} className="bg-black/20 backdrop-blur-xl border-orange-500/20 hover:border-orange-400/40 transition-all duration-300">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="text-white font-semibold">{deployment.name}</h3>
                          <p className="text-gray-400 text-sm">{deployment.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(deployment.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {deployment.status}
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-300">
                          {deployment.environment}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-sm text-gray-400">Last Deployed</div>
                        <div className="text-white font-medium">{deployment.lastDeployed}</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-sm text-gray-400">Commit</div>
                        <div className="text-white font-mono text-sm">{deployment.commit}</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-sm text-gray-400">Build Time</div>
                        <div className="text-white font-medium">{deployment.buildTime}</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-sm text-gray-400">Size</div>
                        <div className="text-white font-medium">{deployment.size}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                        <Eye className="w-4 h-4 mr-2" />
                        View Site
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:border-gray-500">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Redeploy
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:border-gray-500">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        )}

        {/* Environments */}
        {activeTab === 'environments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {environments.map((env, index) => {
              const StatusIcon = getStatusIcon(env.status);
              return (
                <Card key={env.id} className="bg-black/20 backdrop-blur-xl border-green-500/20">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <Server className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{env.name}</h3>
                          <p className="text-gray-400 text-sm">{env.url}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(env.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {env.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-sm text-gray-400">Region</div>
                        <div className="text-white font-medium">{env.region}</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-sm text-gray-400">Instances</div>
                        <div className="text-white font-medium">{env.instances}</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-sm text-gray-400">CPU Usage</div>
                        <div className="text-white font-medium">{env.cpu}%</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-sm text-gray-400">Memory</div>
                        <div className="text-white font-medium">{env.memory}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Uptime: <span className="text-white font-medium">{env.uptime}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        )}

        {/* CI/CD Pipelines */}
        {activeTab === 'pipelines' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {pipelines.map((pipeline, index) => {
              const StatusIcon = getStatusIcon(pipeline.status);
              return (
                <Card key={pipeline.id} className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">{pipeline.name}</CardTitle>
                        <CardDescription className="text-gray-300">
                          Trigger: {pipeline.trigger}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(pipeline.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {pipeline.status}
                        </Badge>
                        <div className="text-sm text-gray-400">
                          Duration: {pipeline.duration}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pipeline.steps.map((step, stepIndex) => {
                        const StepIcon = getStatusIcon(step.status);
                        return (
                          <div key={stepIndex} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <StepIcon className={`w-4 h-4 ${
                                step.status === 'success' ? 'text-green-400' :
                                step.status === 'running' ? 'text-blue-400' :
                                step.status === 'pending' ? 'text-gray-400' :
                                'text-red-400'
                              }`} />
                              <span className="text-white">{step.name}</span>
                            </div>
                            <div className="text-sm text-gray-400">{step.duration}</div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        )}

        {/* Monitoring */}
        {activeTab === 'monitoring' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-xl border-green-500/20 text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">1.2s</div>
                  <div className="text-sm text-gray-400">Avg Response</div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">45</div>
                  <div className="text-sm text-gray-400">Active Deployments</div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20 text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">0</div>
                  <div className="text-sm text-gray-400">Security Issues</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Deployment Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white">Deployment Platforms</CardTitle>
              <CardDescription className="text-gray-300">
                Deploy to your preferred platform with one click
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-20 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex-col">
                  <Cloud className="w-6 h-6 mb-2" />
                  <span className="text-sm">Vercel</span>
                </Button>
                <Button className="h-20 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex-col">
                  <Globe className="w-6 h-6 mb-2" />
                  <span className="text-sm">Netlify</span>
                </Button>
                <Button className="h-20 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-col">
                  <Server className="w-6 h-6 mb-2" />
                  <span className="text-sm">AWS</span>
                </Button>
                <Button className="h-20 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white flex-col">
                  <Database className="w-6 h-6 mb-2" />
                  <span className="text-sm">DigitalOcean</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DeploymentAutomation;
