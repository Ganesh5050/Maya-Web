import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Code, 
  FileText, 
  Folder, 
  Zap, 
  CheckCircle,
  Copy,
  ExternalLink,
  Settings,
  Package,
  Globe,
  Github,
  Loader2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// Mock project data
const mockProject = {
  name: 'Portfolio Website',
  description: 'Personal portfolio with 3D animations and glassmorphic design',
  sections: [
    {
      name: 'Hero',
      component: 'HeroSection',
      code: `import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-6"
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-8"
        >
          Creating amazing experiences with AI and 3D design
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="hero" size="lg">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};`
    },
    {
      name: 'About',
      component: 'AboutSection',
      code: `import { motion } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm a passionate developer and designer who loves creating 
            immersive digital experiences using cutting-edge technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};`
    }
  ],
  dependencies: [
    'react',
    'framer-motion',
    'tailwindcss',
    '@radix-ui/react-slot',
    'lucide-react'
  ],
  config: {
    framework: 'React + Vite',
    styling: 'Tailwind CSS',
    animations: 'Framer Motion',
    components: 'Radix UI'
  }
};

const CodeExport = () => {
  const [exportFormat, setExportFormat] = useState<'react' | 'html' | 'nextjs'>('react');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedFiles, setExportedFiles] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const exportOptions = [
    {
      id: 'react',
      name: 'React + Vite',
      description: 'Modern React application with Vite build system',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      features: ['TypeScript', 'Hot Reload', 'Modern Build', 'Component Library']
    },
    {
      id: 'html',
      name: 'Static HTML/CSS',
      description: 'Pure HTML, CSS, and JavaScript files',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      features: ['No Build Step', 'Universal Compatibility', 'Fast Loading', 'Easy Hosting']
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      description: 'Full-stack React framework with SSR',
      icon: Package,
      color: 'from-purple-500 to-pink-500',
      features: ['Server-Side Rendering', 'API Routes', 'Image Optimization', 'SEO Ready']
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportedFiles([]);

    // Simulate export process
    const steps = [
      { name: 'Analyzing components...', progress: 20 },
      { name: 'Generating code...', progress: 40 },
      { name: 'Optimizing assets...', progress: 60 },
      { name: 'Creating build files...', progress: 80 },
      { name: 'Finalizing export...', progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportProgress(step.progress);
    }

    // Generate mock exported files
    const files = generateExportedFiles();
    setExportedFiles(files);
    setIsExporting(false);
  };

  const generateExportedFiles = () => {
    const files = [
      {
        name: 'package.json',
        type: 'config',
        size: '2.1 KB',
        content: JSON.stringify({
          name: mockProject.name.toLowerCase().replace(/\s+/g, '-'),
          version: '1.0.0',
          dependencies: mockProject.dependencies.reduce((acc, dep) => {
            acc[dep] = 'latest';
            return acc;
          }, {} as any)
        }, null, 2)
      },
      {
        name: 'src/App.tsx',
        type: 'component',
        size: '1.8 KB',
        content: `import React from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <AboutSection />
    </div>
  );
}

export default App;`
      },
      {
        name: 'src/main.tsx',
        type: 'entry',
        size: '0.5 KB',
        content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
      },
      {
        name: 'tailwind.config.js',
        type: 'config',
        size: '1.2 KB',
        content: `module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#45d5ff',
        secondary: '#ffd700'
      }
    }
  },
  plugins: []
};`
      }
    ];

    // Add component files
    mockProject.sections.forEach(section => {
      files.push({
        name: `src/components/${section.component}.tsx`,
        type: 'component',
        size: `${Math.floor(section.code.length / 100)} KB`,
        content: section.code
      });
    });

    return files;
  };

  const handleDownloadZip = () => {
    // Mock ZIP download
    console.log('Downloading ZIP file...');
    // In real implementation, this would create and download a ZIP file
  };

  const handleDeployToVercel = () => {
    // Mock Vercel deployment
    console.log('Deploying to Vercel...');
  };

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-glass-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Export Your Website</h1>
              <p className="text-muted-foreground">
                Download your AI-generated website as production-ready code
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview Code
              </Button>
              <Button variant="hero" onClick={handleExport} disabled={isExporting}>
                <Download className="w-5 h-5 mr-2" />
                Export Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Export Options */}
          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Export Format</h2>
              
              <div className="space-y-4">
                {exportOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      className={`glass rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                        exportFormat === option.id 
                          ? 'border-primary shadow-glow-primary' 
                          : 'hover:shadow-glow-soft'
                      }`}
                      onClick={() => setExportFormat(option.id as any)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{option.name}</h3>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {option.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-primary/20 rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Project Info */}
              <div className="mt-8 p-4 glass rounded-2xl">
                <h3 className="font-semibold mb-3">Project Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{mockProject.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sections:</span>
                    <span>{mockProject.sections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dependencies:</span>
                    <span>{mockProject.dependencies.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Export Progress */}
            <AnimatePresence>
              {isExporting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass rounded-3xl p-8 mb-8"
                >
                  <div className="text-center mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center"
                    >
                      <Zap className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Exporting Your Website</h3>
                    <p className="text-muted-foreground">Generating production-ready code...</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{exportProgress}%</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <motion.div
                        className="h-2 bg-gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${exportProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Exported Files */}
            <AnimatePresence>
              {exportedFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Export Complete!</h3>
                    <p className="text-muted-foreground">
                      Your website has been exported with {exportedFiles.length} files
                    </p>
                  </div>

                  {/* File List */}
                  <div className="glass rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold">Generated Files</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleDownloadZip}>
                          <Download className="w-4 h-4 mr-2" />
                          Download ZIP
                        </Button>
                        <Button variant="hero" size="sm" onClick={handleDeployToVercel}>
                          <Globe className="w-4 h-4 mr-2" />
                          Deploy to Vercel
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {exportedFiles.map((file, index) => (
                        <motion.div
                          key={file.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 glass rounded-2xl hover:shadow-glow-soft transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                              {file.type === 'component' ? (
                                <Code className="w-4 h-4 text-primary-foreground" />
                              ) : file.type === 'config' ? (
                                <Settings className="w-4 h-4 text-primary-foreground" />
                              ) : (
                                <FileText className="w-4 h-4 text-primary-foreground" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{file.name}</div>
                              <div className="text-sm text-muted-foreground">{file.size}</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyToClipboard(file.content)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowPreview(true)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Deployment Options */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Vercel</h4>
                          <p className="text-sm text-muted-foreground">One-click deployment</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Deploy to Vercel
                      </Button>
                    </div>

                    <div className="glass rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                          <Github className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">GitHub</h4>
                          <p className="text-sm text-muted-foreground">Push to repository</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Github className="w-4 h-4 mr-2" />
                        Push to GitHub
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            {!isExporting && exportedFiles.length === 0 && (
              <div className="glass rounded-3xl p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold mb-2">Ready to Export</h3>
                  <p className="text-muted-foreground">
                    Choose your preferred format and click "Export Now" to generate your website code
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">What's Included:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Complete React components
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Tailwind CSS styling
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Framer Motion animations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Package.json with dependencies
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Build configuration
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Next Steps:</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">1</span>
                        Download the generated files
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">2</span>
                        Install dependencies with npm install
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">3</span>
                        Run the development server
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">4</span>
                        Deploy to your preferred platform
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Code Preview</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                  ✕
                </Button>
              </div>
              
              <div className="bg-gray-900 rounded-2xl p-6 overflow-y-auto max-h-[60vh]">
                <pre className="text-sm text-gray-300">
                  <code>{exportedFiles[0]?.content || mockProject.sections[0].code}</code>
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeExport;
