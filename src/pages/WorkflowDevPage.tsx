import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Workflow,
  GitBranch,
  BarChart3,
  Rocket,
  Settings,
  Database,
  Code,
  ArrowRight,
  Star,
  Crown,
  Play,
  Download,
} from 'lucide-react';

// Import all Workflow & Development components
import WorkflowDemo from '@/components/WorkflowDemo';
import WorkflowManager from '@/components/WorkflowManager';
import DevelopmentWorkflow from '@/components/DevelopmentWorkflow';
import TemplateMarketplace from '@/components/TemplateMarketplace';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import DeploymentAutomation from '@/components/DeploymentAutomation';
import DeploymentDashboard from '@/components/DeploymentDashboard';

const WorkflowDevPage: React.FC = () => {
  const workflowFeatures = [
    {
      id: 'workflow-demo',
      title: 'Workflow Demo',
      description: 'Interactive demonstration of Maya-Web\'s powerful workflow automation system',
      icon: <Workflow className="w-8 h-8" />,
      badge: 'Demo',
      color: 'from-blue-500 to-cyan-500',
      component: <WorkflowDemo />,
    },
    {
      id: 'workflow-manager',
      title: 'Workflow Manager',
      description: 'Professional workflow management with drag-and-drop automation and AI assistance',
      icon: <Settings className="w-8 h-8" />,
      badge: 'Manager',
      color: 'from-purple-500 to-pink-500',
      component: <WorkflowManager />,
    },
    {
      id: 'development-workflow',
      title: 'Development Workflow',
      description: 'Complete development pipeline with Git integration, CI/CD, and automated testing',
      icon: <GitBranch className="w-8 h-8" />,
      badge: 'DevOps',
      color: 'from-green-500 to-emerald-500',
      component: <DevelopmentWorkflow />,
    },
    {
      id: 'template-marketplace',
      title: 'Template Marketplace',
      description: 'Curated collection of professional templates and components for rapid development',
      icon: <Code className="w-8 h-8" />,
      badge: 'Templates',
      color: 'from-orange-500 to-red-500',
      component: <TemplateMarketplace />,
    },
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and performance monitoring with real-time insights',
      icon: <BarChart3 className="w-8 h-8" />,
      badge: 'Analytics',
      color: 'from-indigo-500 to-purple-500',
      component: <AnalyticsDashboard />,
    },
    {
      id: 'deployment-automation',
      title: 'Deployment Automation',
      description: 'One-click deployment to 20+ platforms with automated CI/CD pipelines',
      icon: <Rocket className="w-8 h-8" />,
      badge: 'Deploy',
      color: 'from-pink-500 to-rose-500',
      component: <DeploymentAutomation />,
    },
    {
      id: 'deployment-dashboard',
      title: 'Deployment Dashboard',
      description: 'Centralized deployment management with status monitoring and rollback capabilities',
      icon: <Database className="w-8 h-8" />,
      badge: 'Monitor',
      color: 'from-emerald-500 to-teal-500',
      component: <DeploymentDashboard />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 md:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <Workflow className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Workflow & Development
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional development tools and workflow automation that streamline your entire development process
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Enterprise Ready
              </Badge>
              <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                20+ Platforms
              </Badge>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {workflowFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 hover:border-blue-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-xl mb-2">
                      {feature.title}
                    </CardTitle>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      onClick={() => {
                        const element = document.getElementById(feature.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Explore Feature
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Individual Feature Sections */}
          {workflowFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              id={feature.id}
              className="mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {feature.title}
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  {feature.description}
                </p>
              </div>
              {feature.component}
            </motion.div>
          ))}

          {/* CTA Section */}
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-3xl p-12 border border-blue-500/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Streamline Your Development?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Accelerate your development process with Maya-Web's professional workflow tools and automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Workflow
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-8 py-4"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Templates
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default WorkflowDevPage;
