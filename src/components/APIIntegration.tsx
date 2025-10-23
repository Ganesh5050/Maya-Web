import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, 
  Zap, 
  Database, 
  Globe, 
  Shield, 
  Settings,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Download,
  Upload,
  RefreshCw,
  Server,
  Cloud,
  Lock,
  Key,
  Webhook,
  Terminal,
  FileText,
  Activity
} from 'lucide-react';

const APIIntegration = () => {
  const [activeTab, setActiveTab] = useState('endpoints');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState('sk-maya-1234567890abcdef');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  const tabs = [
    { id: 'endpoints', name: 'API Endpoints', icon: Globe },
    { id: 'webhooks', name: 'Webhooks', icon: Webhook },
    { id: 'auth', name: 'Authentication', icon: Shield },
    { id: 'monitoring', name: 'Monitoring', icon: Activity }
  ];

  const endpoints = [
    {
      id: 'generate-website',
      method: 'POST',
      path: '/api/v1/generate',
      description: 'Generate a website from natural language prompt',
      status: 'active',
      requests: 1250,
      avgResponseTime: '2.3s',
      successRate: 98.5
    },
    {
      id: 'get-templates',
      method: 'GET',
      path: '/api/v1/templates',
      description: 'Retrieve available templates',
      status: 'active',
      requests: 3400,
      avgResponseTime: '0.8s',
      successRate: 99.2
    },
    {
      id: 'save-project',
      method: 'POST',
      path: '/api/v1/projects',
      description: 'Save user project',
      status: 'active',
      requests: 890,
      avgResponseTime: '1.2s',
      successRate: 99.8
    },
    {
      id: 'export-code',
      method: 'POST',
      path: '/api/v1/export',
      description: 'Export project as downloadable code',
      status: 'active',
      requests: 567,
      avgResponseTime: '3.1s',
      successRate: 97.3
    },
    {
      id: 'collaborate',
      method: 'WS',
      path: '/ws/collaborate',
      description: 'Real-time collaboration WebSocket',
      status: 'active',
      requests: 2100,
      avgResponseTime: '0.1s',
      successRate: 99.9
    }
  ];

  const webhooks = [
    {
      id: '1',
      name: 'Project Created',
      url: 'https://your-app.com/webhooks/project-created',
      events: ['project.created'],
      status: 'active',
      lastTriggered: '2 minutes ago',
      successRate: 100
    },
    {
      id: '2',
      name: 'User Signup',
      url: 'https://your-app.com/webhooks/user-signup',
      events: ['user.created'],
      status: 'active',
      lastTriggered: '15 minutes ago',
      successRate: 98.5
    },
    {
      id: '3',
      name: 'Payment Success',
      url: 'https://your-app.com/webhooks/payment-success',
      events: ['payment.completed'],
      status: 'paused',
      lastTriggered: '1 hour ago',
      successRate: 100
    }
  ];

  const authMethods = [
    {
      name: 'API Key',
      description: 'Simple API key authentication',
      icon: Key,
      status: 'enabled',
      usage: '85%'
    },
    {
      name: 'OAuth 2.0',
      description: 'Secure OAuth authentication',
      icon: Shield,
      status: 'enabled',
      usage: '12%'
    },
    {
      name: 'JWT Tokens',
      description: 'JSON Web Token authentication',
      icon: Lock,
      status: 'enabled',
      usage: '3%'
    }
  ];

  const monitoringData = [
    {
      metric: 'Total Requests',
      value: '12,450',
      change: '+15.3%',
      trend: 'up',
      color: 'text-blue-400'
    },
    {
      metric: 'Average Response Time',
      value: '1.8s',
      change: '-8.2%',
      trend: 'down',
      color: 'text-green-400'
    },
    {
      metric: 'Error Rate',
      value: '0.8%',
      change: '-2.1%',
      trend: 'down',
      color: 'text-purple-400'
    },
    {
      metric: 'Active Users',
      value: '1,234',
      change: '+22.7%',
      trend: 'up',
      color: 'text-orange-400'
    }
  ];

  const generateCode = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-300';
      case 'POST': return 'bg-blue-500/20 text-blue-300';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-300';
      case 'DELETE': return 'bg-red-500/20 text-red-300';
      case 'WS': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

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
            <Code className="w-4 h-4 mr-2" />
            API Integration Layer
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Powerful API Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Integrate Maya-Web with your applications using our comprehensive REST API and WebSocket services. 
            Build custom workflows and automate your development process.
          </p>
        </motion.div>

        {/* API Key Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-indigo-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Key className="w-6 h-6 mr-3 text-indigo-400" />
                API Configuration
              </CardTitle>
              <CardDescription className="text-gray-300">
                Your API key for accessing Maya-Web services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    value={apiKey}
                    readOnly
                    className="bg-black/30 border-indigo-500/30 text-white font-mono"
                  />
                </div>
                <Button
                  onClick={() => navigator.clipboard.writeText(apiKey)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:border-gray-500"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-black/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">v1.0</div>
                  <div className="text-sm text-gray-400">API Version</div>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
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
          <Card className="bg-black/20 backdrop-blur-xl border-indigo-500/20">
            <CardContent className="pt-8 pb-8">
              <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-indigo-600 text-white"
                        : "border-gray-600 text-gray-300 hover:border-indigo-500"
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

        {/* API Endpoints */}
        {activeTab === 'endpoints' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {endpoints.map((endpoint, index) => (
              <Card key={endpoint.id} className="bg-black/20 backdrop-blur-xl border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-white font-mono bg-black/30 px-3 py-1 rounded">
                        {endpoint.path}
                      </code>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {endpoint.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{endpoint.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-black/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{endpoint.requests.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Requests</div>
                    </div>
                    <div className="text-center p-3 bg-black/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{endpoint.avgResponseTime}</div>
                      <div className="text-sm text-gray-400">Avg Response</div>
                    </div>
                    <div className="text-center p-3 bg-black/30 rounded-lg">
                      <div className="text-lg font-bold text-white">{endpoint.successRate}%</div>
                      <div className="text-sm text-gray-400">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => setSelectedEndpoint(endpoint)}
                    >
                      <Terminal className="w-4 h-4 mr-2" />
                      Test Endpoint
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:border-gray-500"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Docs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Webhooks */}
        {activeTab === 'webhooks' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {webhooks.map((webhook, index) => (
              <Card key={webhook.id} className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold">{webhook.name}</h3>
                      <p className="text-gray-400 text-sm">{webhook.url}</p>
                    </div>
                    <Badge className={webhook.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>
                      {webhook.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-300">Events: </span>
                      <div className="flex gap-2 mt-1">
                        {webhook.events.map((event, eventIndex) => (
                          <Badge key={eventIndex} className="bg-purple-500/20 text-purple-300 text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-400">Last Triggered:</span>
                        <div className="text-white">{webhook.lastTriggered}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">Success Rate:</span>
                        <div className="text-white">{webhook.successRate}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Webhook className="w-4 h-4 mr-2" />
                      Test Webhook
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Authentication */}
        {activeTab === 'auth' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {authMethods.map((method, index) => (
              <Card key={index} className="bg-black/20 backdrop-blur-xl border-green-500/20">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{method.name}</h3>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500/20 text-green-300 mb-2">
                        {method.status}
                      </Badge>
                      <div className="text-sm text-gray-400">{method.usage} usage</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              {monitoringData.map((metric, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-xl border-blue-500/20">
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${metric.color.replace('text-', 'from-').replace('-400', '-500')} to-${metric.color.split('-')[1]}-600 rounded-full flex items-center justify-center`}>
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-400 mb-2">{metric.metric}</div>
                    <div className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.change}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Code Generation Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white">API Code Generator</CardTitle>
              <CardDescription className="text-gray-300">
                Generate integration code for your preferred language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  <Code className="w-4 h-4 mr-2" />
                  JavaScript/Node.js
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-gray-500">
                  <Code className="w-4 h-4 mr-2" />
                  Python
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-gray-500">
                  <Code className="w-4 h-4 mr-2" />
                  PHP
                </Button>
              </div>
              
              <div className="bg-black/50 rounded-lg p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Maya-Web API Integration Example
const mayaWeb = require('maya-web-api');

const client = new MayaWebClient({
  apiKey: '${apiKey}',
  baseURL: 'https://api.maya-web.com'
});

// Generate a website
const website = await client.generate({
  prompt: "Create a modern portfolio website",
  template: "portfolio-pro",
  features: ["responsive", "animations", "3d-elements"]
});

console.log('Generated website:', website);`}
                </pre>
              </div>
              
              <Button
                onClick={generateCode}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating Code...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Integration Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default APIIntegration;
