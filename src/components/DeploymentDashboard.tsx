// Maya-Web Deployment Dashboard Component
// One-click deployment to 20+ platforms with real-time status

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  Rocket,
  Globe,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Settings,
  Download,
  ExternalLink,
  Zap,
  Shield,
  Star,
  DollarSign,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Copy,
  Eye,
  AlertCircle
} from 'lucide-react';

import { DeploymentAPIService } from '@/services/apiClient';

interface DeploymentPlatform {
  id: string;
  name: string;
  features: string[];
  pricing: 'free' | 'paid' | 'freemium';
  supportedFormats: string[];
}

interface Deployment {
  id: string;
  platform: string;
  status: 'pending' | 'building' | 'deployed' | 'failed';
  url?: string;
  deploymentId?: string;
  createdAt: string;
  deployedAt?: string;
  logs?: string[];
  estimatedTime?: number;
}

const DeploymentDashboard: React.FC = () => {
  const [platforms, setPlatforms] = useState<DeploymentPlatform[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [activeDeployments, setActiveDeployments] = useState<Deployment[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [customDomain, setCustomDomain] = useState('');
  const [environmentVariables, setEnvironmentVariables] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [logs, setLogs] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load platforms and deployments on mount
  useEffect(() => {
    loadPlatforms();
    loadDeployments();
    loadActiveDeployments();
  }, []);

  // Poll for active deployments
  useEffect(() => {
    const interval = setInterval(() => {
      loadActiveDeployments();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadPlatforms = async () => {
    try {
      const response = await DeploymentAPIService.getPlatforms();
      if (response.success) {
        setPlatforms(response.platforms);
      }
    } catch (error) {
      console.error('Failed to load platforms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDeployments = async () => {
    if (!selectedProject) return;
    
    try {
      const response = await DeploymentAPIService.getProjectDeployments(selectedProject);
      if (response.success) {
        setDeployments(response.deployments);
      }
    } catch (error) {
      console.error('Failed to load deployments:', error);
    }
  };

  const loadActiveDeployments = async () => {
    try {
      const response = await DeploymentAPIService.getActiveDeployments();
      if (response.success) {
        setActiveDeployments(response.deployments);
      }
    } catch (error) {
      console.error('Failed to load active deployments:', error);
    }
  };

  const handleDeploy = async () => {
    if (!selectedProject || selectedPlatforms.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select a project and at least one platform.',
        variant: 'destructive'
      });
      return;
    }

    setIsDeploying(true);

    try {
      const envVars = environmentVariables
        ? JSON.parse(environmentVariables)
        : {};

      const response = await DeploymentAPIService.deployToMultiplePlatforms({
        projectId: selectedProject,
        platforms: selectedPlatforms,
        customDomain,
        environmentVariables: envVars
      });

      if (response.success) {
        toast({
          title: 'Deployment Started',
          description: `Deploying to ${selectedPlatforms.length} platforms...`
        });

        // Refresh deployments
        loadDeployments();
        loadActiveDeployments();
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Deployment failed:', error);
      toast({
        title: 'Deployment Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const handleCancelDeployment = async (deploymentId: string) => {
    try {
      const response = await DeploymentAPIService.cancelDeployment(deploymentId);
      if (response.success) {
        toast({
          title: 'Deployment Cancelled',
          description: 'The deployment has been cancelled successfully.'
        });
        loadDeployments();
        loadActiveDeployments();
      }
    } catch (error) {
      console.error('Failed to cancel deployment:', error);
      toast({
        title: 'Cancel Failed',
        description: 'Failed to cancel deployment.',
        variant: 'destructive'
      });
    }
  };

  const handleRollback = async (deploymentId: string) => {
    try {
      const response = await DeploymentAPIService.rollbackDeployment(deploymentId);
      if (response.success) {
        toast({
          title: 'Rollback Successful',
          description: `Rolled back to previous version. URL: ${response.url}`
        });
        loadDeployments();
      }
    } catch (error) {
      console.error('Rollback failed:', error);
      toast({
        title: 'Rollback Failed',
        description: 'Failed to rollback deployment.',
        variant: 'destructive'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'building':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-500/20 text-green-300';
      case 'building':
        return 'bg-blue-500/20 text-blue-300';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'failed':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPricingIcon = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'freemium':
        return <DollarSign className="w-4 h-4 text-yellow-400" />;
      case 'paid':
        return <DollarSign className="w-4 h-4 text-red-400" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-300">Loading deployment platforms...</p>
            </div>
          </div>
        ) : (
          <>
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Universal Deployment
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Deploy to 20+ platforms with one click. Real-time monitoring and instant rollback.
          </p>
        </motion.div>

        <Tabs defaultValue="deploy" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="deploy" className="data-[state=active]:bg-purple-600">
              <Rocket className="w-4 h-4 mr-2" />
              Deploy
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-purple-600">
              <Globe className="w-4 h-4 mr-2" />
              Platforms
            </TabsTrigger>
            <TabsTrigger value="deployments" className="data-[state=active]:bg-purple-600">
              <Eye className="w-4 h-4 mr-2" />
              Deployments
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Active
            </TabsTrigger>
          </TabsList>

          {/* Deploy Tab */}
          <TabsContent value="deploy" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Deploy Your Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Project Selection */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Select Project</Label>
                  <Input
                    placeholder="Enter project ID"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Platform Selection */}
                <div className="space-y-4">
                  <Label className="text-gray-300">Select Platforms</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {platforms.map((platform) => (
                      <motion.div
                        key={platform.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedPlatforms.includes(platform.id)
                              ? 'bg-purple-600 border-purple-500'
                              : 'bg-slate-700 border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => {
                            if (selectedPlatforms.includes(platform.id)) {
                              setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id));
                            } else {
                              setSelectedPlatforms([...selectedPlatforms, platform.id]);
                            }
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-white text-sm">
                                {platform.name}
                              </h3>
                              {getPricingIcon(platform.pricing || 'free')}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {(platform.features || []).slice(0, 2).map((feature) => (
                                <Badge
                                  key={feature}
                                  variant="secondary"
                                  className="text-xs bg-slate-600 text-slate-300"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Custom Domain */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Custom Domain (Optional)</Label>
                  <Input
                    placeholder="example.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Environment Variables */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Environment Variables (JSON)</Label>
                  <Textarea
                    placeholder='{"NODE_ENV": "production", "API_URL": "https://api.example.com"}'
                    value={environmentVariables}
                    onChange={(e) => setEnvironmentVariables(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  />
                </div>

                {/* Deploy Button */}
                <Button
                  onClick={handleDeploy}
                  disabled={isDeploying || !selectedProject || selectedPlatforms.length === 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isDeploying ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-slate-800 border-slate-700 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">
                          {platform.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          {getPricingIcon(platform.pricing || 'free')}
                          <Badge
                            variant="secondary"
                            className={`${
                              (platform.pricing || 'free') === 'free'
                                ? 'bg-green-500/20 text-green-300'
                                : (platform.pricing || 'free') === 'freemium'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {platform.pricing || 'free'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-gray-300 text-sm font-medium mb-2">Features</h4>
                          <div className="flex flex-wrap gap-1">
                            {(platform.features || []).map((feature) => (
                              <Badge
                                key={feature}
                                variant="secondary"
                                className="text-xs bg-slate-600 text-slate-300"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-gray-300 text-sm font-medium mb-2">Supported Formats</h4>
                          <div className="flex flex-wrap gap-1">
                            {(platform.supportedFormats || []).map((format) => (
                              <Badge
                                key={format}
                                variant="outline"
                                className="text-xs border-slate-600 text-slate-400"
                              >
                                {format}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Deployments Tab */}
          <TabsContent value="deployments" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Deployment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deployments.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Rocket className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No deployments yet. Deploy your first project!</p>
                    </div>
                  ) : (
                    deployments.map((deployment) => (
                      <motion.div
                        key={deployment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon(deployment.status)}
                          <div>
                            <h3 className="text-white font-medium">
                              {deployment.platform}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {new Date(deployment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(deployment.status)}>
                            {deployment.status}
                          </Badge>
                          {deployment.url && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(deployment.url, '_blank')}
                              className="border-slate-600 text-slate-300 hover:bg-slate-600"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          )}
                          {deployment.status === 'building' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancelDeployment(deployment.id)}
                              className="border-red-600 text-red-300 hover:bg-red-600"
                            >
                              <Pause className="w-3 h-3" />
                            </Button>
                          )}
                          {deployment.status === 'deployed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRollback(deployment.id)}
                              className="border-yellow-600 text-yellow-300 hover:bg-yellow-600"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Deployments Tab */}
          <TabsContent value="active" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Active Deployments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeDeployments.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No active deployments</p>
                    </div>
                  ) : (
                    activeDeployments.map((deployment) => (
                      <motion.div
                        key={deployment.deploymentId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon(deployment.status)}
                          <div>
                            <h3 className="text-white font-medium">
                              {deployment.deploymentId}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {deployment.estimatedTime && `ETA: ${deployment.estimatedTime}s`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(deployment.status)}>
                            {deployment.status}
                          </Badge>
                          {deployment.url && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(deployment.url, '_blank')}
                              className="border-slate-600 text-slate-300 hover:bg-slate-600"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </>
        )}
      </div>
    </motion.section>
  );
};

export default DeploymentDashboard;
