import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download,
  Code,
  FileText,
  Package,
  Rocket,
  Settings,
  Eye,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Globe,
  Server,
  Database,
  Shield,
  Layers,
  Palette,
  Type,
  Image,
  Layout,
  Play,
  Pause,
  RotateCcw,
  Save,
  Share2,
  Trash2,
  Plus,
  Edit,
  Star,
  TrendingUp,
  Target,
  Calendar,
  Users,
  BarChart3,
  Workflow,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

// Enhanced Code Export Types
interface ExportFormat {
  id: string;
  name: string;
  description: string;
  extension: string;
  icon: React.ReactNode;
  features: string[];
  frameworks: string[];
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'react' | 'vue' | 'angular' | 'vanilla' | 'nextjs' | 'nuxt' | 'svelte';
  framework: string;
  features: string[];
  dependencies: string[];
  preview: string;
}

interface DeploymentTarget {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  features: string[];
  pricing: string;
  status: 'available' | 'coming-soon' | 'beta';
}

interface ExportJob {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  format: string;
  template: string;
  startedAt: string;
  completedAt?: string;
  error?: string;
  downloadUrl?: string;
}

const EnhancedCodeExportSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('export');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ExportTemplate | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<DeploymentTarget | null>(null);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSettings, setExportSettings] = useState({
    minify: true,
    optimizeImages: true,
    generateTypes: true,
    includeTests: false,
    includeDocs: true,
    bundleSize: 'medium',
    compatibility: 'modern'
  });

  // Export formats
  const exportFormats: ExportFormat[] = [
    {
      id: 'react',
      name: 'React',
      description: 'Modern React components with hooks and TypeScript',
      extension: '.tsx',
      icon: <Code className="w-5 h-5" />,
      features: ['TypeScript', 'Hooks', 'Context', 'Router', 'State Management'],
      frameworks: ['Next.js', 'Create React App', 'Vite', 'Parcel']
    },
    {
      id: 'vue',
      name: 'Vue.js',
      description: 'Progressive Vue.js components with Composition API',
      extension: '.vue',
      icon: <Layers className="w-5 h-5" />,
      features: ['Composition API', 'TypeScript', 'Router', 'Pinia', 'Vite'],
      frameworks: ['Nuxt.js', 'Vue CLI', 'Vite', 'Quasar']
    },
    {
      id: 'angular',
      name: 'Angular',
      description: 'Enterprise-grade Angular components and services',
      extension: '.ts',
      icon: <Target className="w-5 h-5" />,
      features: ['TypeScript', 'RxJS', 'Angular CLI', 'Material Design', 'Testing'],
      frameworks: ['Angular CLI', 'Ionic', 'Nx']
    },
    {
      id: 'vanilla',
      name: 'Vanilla JS',
      description: 'Pure JavaScript with modern ES6+ features',
      extension: '.js',
      icon: <FileText className="w-5 h-5" />,
      features: ['ES6+', 'Modules', 'Web Components', 'Service Workers', 'PWA'],
      frameworks: ['Webpack', 'Rollup', 'Parcel', 'Vite']
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      description: 'Full-stack React framework with SSR and SSG',
      extension: '.tsx',
      icon: <Rocket className="w-5 h-5" />,
      features: ['SSR', 'SSG', 'API Routes', 'Image Optimization', 'Performance'],
      frameworks: ['Next.js', 'Vercel', 'Netlify']
    },
    {
      id: 'svelte',
      name: 'Svelte',
      description: 'Compile-time optimized Svelte components',
      extension: '.svelte',
      icon: <Zap className="w-5 h-5" />,
      features: ['Compile-time', 'Small Bundle', 'Reactive', 'TypeScript', 'SvelteKit'],
      frameworks: ['SvelteKit', 'Vite', 'Rollup']
    }
  ];

  // Export templates
  const exportTemplates: ExportTemplate[] = [
    {
      id: 'portfolio',
      name: 'Portfolio Website',
      description: 'Modern portfolio with animations and responsive design',
      category: 'react',
      framework: 'Next.js',
      features: ['Responsive Design', 'Animations', 'Dark Mode', 'SEO', 'Performance'],
      dependencies: ['next', 'react', 'framer-motion', 'tailwindcss'],
      preview: 'Modern portfolio layout with hero section, projects grid, and contact form'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Complete e-commerce solution with cart and payments',
      category: 'nextjs',
      framework: 'Next.js',
      features: ['Product Catalog', 'Shopping Cart', 'Payments', 'Admin Panel', 'Analytics'],
      dependencies: ['next', 'react', 'stripe', 'prisma', 'next-auth'],
      preview: 'E-commerce store with product listings, cart functionality, and checkout'
    },
    {
      id: 'landing',
      name: 'Landing Page',
      description: 'High-converting landing page with A/B testing',
      category: 'react',
      framework: 'React',
      features: ['A/B Testing', 'Analytics', 'Forms', 'Animations', 'Mobile-First'],
      dependencies: ['react', 'framer-motion', 'react-hook-form', 'analytics'],
      preview: 'Landing page with hero section, features, testimonials, and CTA'
    },
    {
      id: 'dashboard',
      name: 'Admin Dashboard',
      description: 'Modern admin dashboard with charts and tables',
      category: 'react',
      framework: 'React',
      features: ['Charts', 'Tables', 'Filters', 'Export', 'Responsive'],
      dependencies: ['react', 'recharts', 'react-table', 'tailwindcss'],
      preview: 'Admin dashboard with sidebar navigation, charts, and data tables'
    },
    {
      id: 'blog',
      name: 'Blog Platform',
      description: 'Content management system with markdown support',
      category: 'nextjs',
      framework: 'Next.js',
      features: ['Markdown', 'SEO', 'Comments', 'Search', 'Categories'],
      dependencies: ['next', 'gray-matter', 'remark', 'prisma'],
      preview: 'Blog platform with article listings, markdown rendering, and search'
    },
    {
      id: 'saas',
      name: 'SaaS Application',
      description: 'Software as a Service with subscription management',
      category: 'nextjs',
      framework: 'Next.js',
      features: ['Authentication', 'Subscriptions', 'Billing', 'API', 'Analytics'],
      dependencies: ['next', 'stripe', 'prisma', 'next-auth', 'react-query'],
      preview: 'SaaS application with user authentication, subscription plans, and billing'
    }
  ];

  // Deployment targets
  const deploymentTargets: DeploymentTarget[] = [
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Deploy to Vercel with zero configuration',
      icon: <Rocket className="w-5 h-5" />,
      url: 'https://vercel.com',
      features: ['Zero Config', 'Edge Functions', 'Analytics', 'Preview Deployments'],
      pricing: 'Free tier available',
      status: 'available'
    },
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'Deploy to Netlify with continuous deployment',
      icon: <Globe className="w-5 h-5" />,
      url: 'https://netlify.com',
      features: ['CDN', 'Forms', 'Functions', 'Split Testing'],
      pricing: 'Free tier available',
      status: 'available'
    },
    {
      id: 'github-pages',
      name: 'GitHub Pages',
      description: 'Host static sites directly from GitHub',
      icon: <Server className="w-5 h-5" />,
      url: 'https://pages.github.com',
      features: ['Free Hosting', 'Custom Domains', 'HTTPS', 'Jekyll Support'],
      pricing: 'Free',
      status: 'available'
    },
    {
      id: 'aws',
      name: 'AWS S3 + CloudFront',
      description: 'Scalable hosting with AWS infrastructure',
      icon: <Database className="w-5 h-5" />,
      url: 'https://aws.amazon.com',
      features: ['Scalable', 'CDN', 'SSL', 'Custom Domains'],
      pricing: 'Pay as you go',
      status: 'available'
    },
    {
      id: 'firebase',
      name: 'Firebase Hosting',
      description: 'Fast and secure hosting by Google',
      icon: <Shield className="w-5 h-5" />,
      url: 'https://firebase.google.com',
      features: ['Fast CDN', 'SSL', 'Custom Domains', 'Rollbacks'],
      pricing: 'Free tier available',
      status: 'available'
    },
    {
      id: 'digitalocean',
      name: 'DigitalOcean App Platform',
      description: 'Simple deployment to DigitalOcean',
      icon: <Server className="w-5 h-5" />,
      url: 'https://digitalocean.com',
      features: ['Auto Scaling', 'SSL', 'Monitoring', 'Git Integration'],
      pricing: 'Starting at $5/month',
      status: 'available'
    }
  ];

  // Mock project data
  const mockProject = {
    id: 'project-1',
    name: 'Portfolio Website',
    description: 'Modern portfolio with animations and responsive design',
    components: [
      { id: 'hero', name: 'Hero Section', type: 'section' },
      { id: 'about', name: 'About Section', type: 'section' },
      { id: 'projects', name: 'Projects Grid', type: 'section' },
      { id: 'contact', name: 'Contact Form', type: 'form' }
    ],
    styles: {
      colors: ['#3B82F6', '#1E40AF', '#F59E0B'],
      fonts: ['Inter', 'Playfair Display'],
      spacing: '8px'
    },
    animations: [
      { id: 'fade-in', name: 'Fade In', type: 'entrance' },
      { id: 'slide-up', name: 'Slide Up', type: 'entrance' },
      { id: 'hover-scale', name: 'Hover Scale', type: 'interaction' }
    ]
  };

  const handleExport = async () => {
    if (!selectedFormat || !selectedTemplate) return;

    const job: ExportJob = {
      id: Date.now().toString(),
      name: `${mockProject.name} - ${selectedFormat.name}`,
      status: 'pending',
      progress: 0,
      format: selectedFormat.name,
      template: selectedTemplate.name,
      startedAt: new Date().toISOString()
    };

    setExportJobs(prev => [job, ...prev]);
    setIsExporting(true);

    // Simulate export process
    const interval = setInterval(() => {
      setExportJobs(prev => prev.map(j => {
        if (j.id === job.id) {
          const newProgress = Math.min(j.progress + Math.random() * 20, 100);
          const newStatus = newProgress >= 100 ? 'completed' : 'processing';
          
          if (newStatus === 'completed') {
            setIsExporting(false);
            clearInterval(interval);
            return {
              ...j,
              progress: 100,
              status: 'completed',
              completedAt: new Date().toISOString(),
              downloadUrl: `https://example.com/download/${job.id}.zip`
            };
          }
          
          return { ...j, progress: newProgress, status: 'processing' };
        }
        return j;
      }));
    }, 1000);
  };

  const handleDeploy = async () => {
    if (!selectedTarget) return;
    
    // Simulate deployment
    console.log(`Deploying to ${selectedTarget.name}...`);
  };

  const downloadExport = (job: ExportJob) => {
    if (job.downloadUrl) {
      window.open(job.downloadUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <Download className="w-4 h-4 mr-2" />
            Code Export System
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Export & Deploy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Generate production-ready code and deploy to your favorite platform. 
            Choose from multiple frameworks and deployment targets.
          </p>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-black/20 backdrop-blur-xl">
            <TabsTrigger value="export" className="data-[state=active]:bg-indigo-600">
              <Code className="w-4 h-4 mr-2" />
              Export Code
            </TabsTrigger>
            <TabsTrigger value="deploy" className="data-[state=active]:bg-purple-600">
              <Rocket className="w-4 h-4 mr-2" />
              Deploy
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-green-600">
              <Clock className="w-4 h-4 mr-2" />
              Export Jobs
            </TabsTrigger>
          </TabsList>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-8">
            {/* Project Preview */}
            <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Project Preview</CardTitle>
                <CardDescription className="text-gray-300">
                  Current project: {mockProject.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Components</h4>
                    <div className="space-y-2">
                      {mockProject.components.map(component => (
                        <div key={component.id} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          {component.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-3">Styles</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Palette className="w-4 h-4" />
                        {mockProject.styles.colors.length} colors
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Type className="w-4 h-4" />
                        {mockProject.styles.fonts.length} fonts
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-3">Animations</h4>
                    <div className="space-y-2">
                      {mockProject.animations.map(animation => (
                        <div key={animation.id} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          {animation.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Formats */}
            <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white">Choose Export Format</CardTitle>
                <CardDescription className="text-gray-300">
                  Select the framework and format for your exported code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exportFormats.map(format => (
                    <Card
                      key={format.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedFormat?.id === format.id
                          ? 'bg-indigo-500/20 border-indigo-500'
                          : 'bg-black/30 border-gray-700 hover:border-green-500/50'
                      }`}
                      onClick={() => setSelectedFormat(format)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-indigo-400">{format.icon}</div>
                          <h3 className="text-white font-medium">{format.name}</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{format.description}</p>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-400">Features:</div>
                          <div className="flex flex-wrap gap-1">
                            {format.features.slice(0, 3).map(feature => (
                              <Badge key={feature} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Export Templates */}
            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Choose Template</CardTitle>
                <CardDescription className="text-gray-300">
                  Select a template that matches your project type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exportTemplates.map(template => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedTemplate?.id === template.id
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-black/30 border-gray-700 hover:border-purple-500/50'
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-purple-400">
                            {template.category === 'react' ? <Code className="w-5 h-5" /> :
                             template.category === 'nextjs' ? <Rocket className="w-5 h-5" /> :
                             template.category === 'vue' ? <Layers className="w-5 h-5" /> :
                             <FileText className="w-5 h-5" />}
                          </div>
                          <h3 className="text-white font-medium">{template.name}</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{template.description}</p>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-400">Framework: {template.framework}</div>
                          <div className="flex flex-wrap gap-1">
                            {template.features.slice(0, 3).map(feature => (
                              <Badge key={feature} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Export Settings */}
            <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">Export Settings</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure your export preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Minify Code</span>
                      <Button
                        size="sm"
                        variant={exportSettings.minify ? "default" : "outline"}
                        onClick={() => setExportSettings(prev => ({ ...prev, minify: !prev.minify }))}
                        className={exportSettings.minify ? "bg-green-600" : "border-gray-600"}
                      >
                        {exportSettings.minify ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Optimize Images</span>
                      <Button
                        size="sm"
                        variant={exportSettings.optimizeImages ? "default" : "outline"}
                        onClick={() => setExportSettings(prev => ({ ...prev, optimizeImages: !prev.optimizeImages }))}
                        className={exportSettings.optimizeImages ? "bg-green-600" : "border-gray-600"}
                      >
                        {exportSettings.optimizeImages ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Generate Types</span>
                      <Button
                        size="sm"
                        variant={exportSettings.generateTypes ? "default" : "outline"}
                        onClick={() => setExportSettings(prev => ({ ...prev, generateTypes: !prev.generateTypes }))}
                        className={exportSettings.generateTypes ? "bg-green-600" : "border-gray-600"}
                      >
                        {exportSettings.generateTypes ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Include Tests</span>
                      <Button
                        size="sm"
                        variant={exportSettings.includeTests ? "default" : "outline"}
                        onClick={() => setExportSettings(prev => ({ ...prev, includeTests: !prev.includeTests }))}
                        className={exportSettings.includeTests ? "bg-green-600" : "border-gray-600"}
                      >
                        {exportSettings.includeTests ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Include Documentation</span>
                      <Button
                        size="sm"
                        variant={exportSettings.includeDocs ? "default" : "outline"}
                        onClick={() => setExportSettings(prev => ({ ...prev, includeDocs: !prev.includeDocs }))}
                        className={exportSettings.includeDocs ? "bg-green-600" : "border-gray-600"}
                      >
                        {exportSettings.includeDocs ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <span className="text-white text-sm">Bundle Size</span>
                      <div className="flex gap-2">
                        {['small', 'medium', 'large'].map(size => (
                          <Button
                            key={size}
                            size="sm"
                            variant={exportSettings.bundleSize === size ? "default" : "outline"}
                            onClick={() => setExportSettings(prev => ({ ...prev, bundleSize: size as any }))}
                            className={exportSettings.bundleSize === size ? "bg-blue-600" : "border-gray-600"}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleExport}
                disabled={!selectedFormat || !selectedTemplate || isExporting}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Export Code
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Deploy Tab */}
          <TabsContent value="deploy" className="space-y-8">
            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Deployment Targets</CardTitle>
                <CardDescription className="text-gray-300">
                  Choose where to deploy your exported code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deploymentTargets.map(target => (
                    <Card
                      key={target.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedTarget?.id === target.id
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-black/30 border-gray-700 hover:border-purple-500/50'
                      }`}
                      onClick={() => setSelectedTarget(target)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-purple-400">{target.icon}</div>
                          <div>
                            <h3 className="text-white font-medium">{target.name}</h3>
                            <Badge 
                              className={`text-xs ${
                                target.status === 'available' ? 'bg-green-500/20 text-green-300' :
                                target.status === 'beta' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-gray-500/20 text-gray-300'
                              }`}
                            >
                              {target.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{target.description}</p>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-400">Pricing: {target.pricing}</div>
                          <div className="flex flex-wrap gap-1">
                            {target.features.slice(0, 2).map(feature => (
                              <Badge key={feature} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedTarget && (
              <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Deploy to {selectedTarget.name}</CardTitle>
                  <CardDescription className="text-gray-300">
                    Configure your deployment settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">Project Name</label>
                      <Input
                        placeholder="my-awesome-project"
                        className="bg-black/30 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">Domain (optional)</label>
                      <Input
                        placeholder="myproject.com"
                        className="bg-black/30 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Deployment Features</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedTarget.features.map(feature => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleDeploy}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Advanced Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-8">
            <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white">Export Jobs</CardTitle>
                <CardDescription className="text-gray-300">
                  Track your export progress and download completed exports
                </CardDescription>
              </CardHeader>
              <CardContent>
                {exportJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No export jobs yet</p>
                    <p className="text-gray-500 text-sm">Start an export to see your jobs here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {exportJobs.map(job => (
                      <div key={job.id} className="p-4 bg-black/30 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-white font-medium">{job.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {job.format} • {job.template} • {new Date(job.startedAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              className={`${
                                job.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                job.status === 'processing' ? 'bg-blue-500/20 text-blue-300' :
                                job.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                                'bg-yellow-500/20 text-yellow-300'
                              }`}
                            >
                              {job.status}
                            </Badge>
                            {job.status === 'completed' && (
                              <Button
                                size="sm"
                                onClick={() => downloadExport(job)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {job.status === 'processing' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">Progress</span>
                              <span className="text-blue-400">{Math.round(job.progress)}%</span>
                            </div>
                            <Progress value={job.progress} className="h-2 bg-black/30" />
                          </div>
                        )}
                        
                        {job.error && (
                          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-300 text-sm">
                            <AlertCircle className="w-4 h-4 inline mr-2" />
                            {job.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedCodeExportSystem;
