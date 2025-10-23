import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Code, 
  Palette, 
  Layout, 
  Sparkles,
  CheckCircle,
  Clock,
  ArrowRight,
  Download,
  Eye
} from 'lucide-react';

const AdvancedAIIntegration = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWebsite, setGeneratedWebsite] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    setGeneratedWebsite(null);

    const steps = [
      'Analyzing prompt...',
      'Generating layout structure...',
      'Creating components...',
      'Adding animations...',
      'Optimizing performance...',
      'Finalizing website...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) * 16.67);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Mock generated website
    setGeneratedWebsite({
      id: 'generated-' + Date.now(),
      name: 'AI Generated Website',
      type: 'portfolio',
      features: ['responsive', 'animations', '3d-elements'],
      complexity: 'medium',
      estimatedTime: '2-3 hours',
      components: [
        { name: 'Hero Section', type: 'hero', status: 'completed' },
        { name: 'About Section', type: 'about', status: 'completed' },
        { name: 'Projects Gallery', type: 'gallery', status: 'completed' },
        { name: 'Contact Form', type: 'contact', status: 'completed' }
      ]
    });

    setIsGenerating(false);
  };

  const examplePrompts = [
    "Create a modern portfolio website for a graphic designer with dark theme and neon accents",
    "Build a landing page for a SaaS startup with glassmorphism design and 3D elements",
    "Design a restaurant website with warm colors, food photography, and reservation system",
    "Make a tech blog with clean typography, code syntax highlighting, and dark mode"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Brain className="w-4 h-4 mr-2" />
            Advanced AI Integration
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            AI-Powered Website Generation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Describe your vision in natural language and watch as our AI creates a complete, 
            production-ready website with modern design and advanced features.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Sparkles className="w-6 h-6 mr-3 text-purple-400" />
                  Describe Your Website
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Be as detailed as possible for the best results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Textarea
                  placeholder="Example: Create a modern portfolio website for a graphic designer with dark theme, neon accents, and interactive 3D elements..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-black/30 border-purple-500/30 text-white placeholder-gray-400"
                />
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">Example Prompts:</h4>
                  <div className="space-y-2">
                    {examplePrompts.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="text-left text-sm text-gray-400 hover:text-purple-300 transition-colors p-2 rounded-lg hover:bg-purple-500/10 w-full"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Website
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Progress Section */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{currentStep}</span>
                        <span className="text-purple-400">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-black/30" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {generatedWebsite ? (
              <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                    Website Generated Successfully!
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Your AI-generated website is ready for customization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Website Type</h4>
                      <Badge className="bg-purple-500/20 text-purple-300">
                        {generatedWebsite.type}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Complexity</h4>
                      <Badge className="bg-blue-500/20 text-blue-300">
                        {generatedWebsite.complexity}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Est. Time</h4>
                      <Badge className="bg-orange-500/20 text-orange-300">
                        {generatedWebsite.estimatedTime}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Components</h4>
                      <Badge className="bg-green-500/20 text-green-300">
                        {generatedWebsite.components.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Generated Components:</h4>
                    <div className="space-y-2">
                      {generatedWebsite.components.map((component, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                          <div className="flex items-center">
                            <Layout className="w-4 h-4 mr-3 text-purple-400" />
                            <span className="text-white">{component.name}</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">
                            {component.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Export Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Ready to Generate</h3>
                    <p className="text-gray-400">
                      Enter your website description and click generate to create your AI-powered website
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Analysis</h3>
                <p className="text-gray-400 text-sm">
                  AI analyzes your prompt to understand requirements, target audience, and design preferences
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Design Generation</h3>
                <p className="text-gray-400 text-sm">
                  Creates modern, responsive layouts with custom color schemes and typography
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-green-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Production Code</h3>
                <p className="text-gray-400 text-sm">
                  Generates clean, optimized React components ready for deployment
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedAIIntegration;
