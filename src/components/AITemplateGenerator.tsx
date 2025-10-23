import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sparkles, 
  Wand2, 
  Download, 
  Eye, 
  Code,
  Palette,
  Zap,
  ArrowRight,
  CheckCircle,
  Loader2,
  Copy,
  Share2
} from 'lucide-react';

// Mock AI responses based on prompts
const generateAITemplate = (prompt: string) => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Portfolio templates
  if (lowerPrompt.includes('portfolio') || lowerPrompt.includes('personal')) {
    return {
      name: "Creative Portfolio",
      type: "Portfolio",
      description: "A stunning portfolio with 3D animations and glassmorphic design",
      sections: [
        { name: "Hero", description: "3D animated hero with floating elements" },
        { name: "About", description: "Interactive about section with particle background" },
        { name: "Projects", description: "3D project showcase with hover effects" },
        { name: "Skills", description: "Animated skill bars with holographic effects" },
        { name: "Contact", description: "Glassmorphic contact form with 3D globe" }
      ],
      features: ["3D Animations", "Glassmorphism", "Particle Effects", "Responsive Design"],
      colors: ["#45d5ff", "#ffd700", "#ff45d5"],
      animations: ["Floating", "Holographic", "Magnetic Cursor"],
      estimatedTime: "2-3 minutes"
    };
  }
  
  // E-commerce templates
  if (lowerPrompt.includes('ecommerce') || lowerPrompt.includes('store') || lowerPrompt.includes('shop')) {
    return {
      name: "Modern E-commerce Store",
      type: "E-commerce",
      description: "Interactive storefront with 3D product showcases and smooth animations",
      sections: [
        { name: "Header", description: "Navigation with glassmorphic design" },
        { name: "Hero", description: "Product showcase with 3D carousel" },
        { name: "Products", description: "3D product cards with magnetic interactions" },
        { name: "Cart", description: "Floating cart with smooth animations" },
        { name: "Checkout", description: "Secure checkout with progress indicators" }
      ],
      features: ["3D Products", "Shopping Cart", "Payment Integration", "Inventory Management"],
      colors: ["#00ff88", "#0088ff", "#ff0088"],
      animations: ["3D Rotation", "Magnetic Hover", "Smooth Transitions"],
      estimatedTime: "3-4 minutes"
    };
  }
  
  // SaaS templates
  if (lowerPrompt.includes('saas') || lowerPrompt.includes('software') || lowerPrompt.includes('app')) {
    return {
      name: "SaaS Landing Page",
      type: "SaaS",
      description: "Professional SaaS landing with holographic elements and data visualizations",
      sections: [
        { name: "Hero", description: "Compelling headline with 3D background" },
        { name: "Features", description: "Interactive feature cards with animations" },
        { name: "Pricing", description: "Dynamic pricing with hover effects" },
        { name: "Testimonials", description: "3D testimonial carousel" },
        { name: "CTA", description: "Prominent call-to-action with particles" }
      ],
      features: ["Data Visualization", "Interactive Charts", "User Analytics", "A/B Testing"],
      colors: ["#6366f1", "#8b5cf6", "#ec4899"],
      animations: ["Data Flow", "Chart Animations", "Holographic UI"],
      estimatedTime: "2-3 minutes"
    };
  }
  
  // Agency templates
  if (lowerPrompt.includes('agency') || lowerPrompt.includes('creative') || lowerPrompt.includes('design')) {
    return {
      name: "Creative Agency",
      type: "Agency",
      description: "Bold agency site with cinematic animations and particle backgrounds",
      sections: [
        { name: "Hero", description: "Cinematic intro with particle effects" },
        { name: "Services", description: "Interactive service showcase" },
        { name: "Portfolio", description: "3D project gallery with filters" },
        { name: "Team", description: "Team members with hover animations" },
        { name: "Contact", description: "Creative contact form with 3D elements" }
      ],
      features: ["Particle Effects", "Video Backgrounds", "3D Gallery", "Team Showcase"],
      colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
      animations: ["Particle Systems", "Cinematic Transitions", "3D Interactions"],
      estimatedTime: "3-4 minutes"
    };
  }
  
  // Default template
  return {
    name: "Modern Website",
    type: "General",
    description: "A versatile website with modern design and 3D elements",
    sections: [
      { name: "Hero", description: "Eye-catching hero section" },
      { name: "About", description: "Informative about section" },
      { name: "Services", description: "Service showcase" },
      { name: "Contact", description: "Contact information" }
    ],
    features: ["Responsive Design", "Modern UI", "Smooth Animations"],
    colors: ["#667eea", "#764ba2"],
    animations: ["Smooth Transitions", "Hover Effects"],
    estimatedTime: "2-3 minutes"
  };
};

const AITemplateGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const template = generateAITemplate(prompt);
    setGeneratedTemplate(template);
    setIsGenerating(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create downloadable content
    const templateData = {
      name: generatedTemplate.name,
      type: generatedTemplate.type,
      description: generatedTemplate.description,
      sections: generatedTemplate.sections,
      features: generatedTemplate.features,
      colors: generatedTemplate.colors,
      animations: generatedTemplate.animations,
      generatedAt: new Date().toISOString(),
      prompt: prompt
    };
    
    const blob = new Blob([JSON.stringify(templateData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedTemplate.name.toLowerCase().replace(/\s+/g, '-')}-template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
  };

  const examplePrompts = [
    "Create a portfolio website with neon 3D effects",
    "Build an e-commerce store with floating product cards",
    "Design a SaaS landing page with holographic UI",
    "Make a creative agency site with particle backgrounds"
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 30% 70%, hsl(45 100% 65% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 30%, hsl(200 100% 60% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 70%, hsl(45 100% 65% / 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <Wand2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Template Generator</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Describe your vision,
            <span className="holographic"> watch it build</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI understands your requirements and generates complete website templates 
            with 3D elements, animations, and modern design patterns.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* AI Prompt Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 mb-8"
          >
            <div className="space-y-6">
              <div className="relative">
                <motion.div
                  className="absolute -top-3 left-6 glass px-3 py-1 rounded-full text-xs font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  AI Prompt
                </motion.div>
                
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the website you want to build... (e.g., 'Create a portfolio website with neon 3D effects and floating glass sections')"
                    className="w-full h-32 bg-muted/20 border border-glass-border rounded-2xl px-6 py-4 text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                  
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    variant="hero"
                    className="absolute bottom-4 right-4"
                  >
                    {isGenerating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="w-4 h-4 mr-2" />
                        </motion.div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Template
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Example Prompts */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, index) => (
                    <motion.button
                      key={example}
                      onClick={() => setPrompt(example)}
                      className="text-sm px-4 py-2 glass rounded-full hover:shadow-glow-soft transition-all duration-300 hover:scale-105"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      "{example}"
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Generation Process */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass rounded-3xl p-8 mb-8"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center"
                    >
                      <Sparkles className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">AI is analyzing your prompt...</h3>
                    <p className="text-muted-foreground">Generating custom template with 3D elements</p>
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-4">
                    {[
                      { icon: Code, label: "Analyzing requirements", delay: 0 },
                      { icon: Palette, label: "Designing components", delay: 1 },
                      { icon: Zap, label: "Adding 3D animations", delay: 2 },
                    ].map((step, index) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: step.delay }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: step.delay + 0.5 }}
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                        >
                          <step.icon className="w-4 h-4 text-primary" />
                        </motion.div>
                        <span className="text-sm">{step.label}</span>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: step.delay + 1, duration: 1 }}
                          className="flex-1 h-1 bg-primary/20 rounded-full overflow-hidden"
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: step.delay + 1, duration: 1 }}
                            className="h-full bg-gradient-primary"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generated Template */}
          <AnimatePresence>
            {generatedTemplate && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
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
                  <h3 className="text-2xl font-bold mb-2">Template Generated!</h3>
                  <p className="text-muted-foreground">Your custom template is ready to customize and deploy</p>
                </div>

                {/* Template Details */}
                <div className="glass rounded-3xl p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Template Info */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-2xl font-bold mb-2">{generatedTemplate.name}</h4>
                        <p className="text-muted-foreground mb-4">{generatedTemplate.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Type: {generatedTemplate.type}</span>
                          <span>•</span>
                          <span>Est. Time: {generatedTemplate.estimatedTime}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h5 className="font-semibold mb-3">Features Included:</h5>
                        <div className="flex flex-wrap gap-2">
                          {generatedTemplate.features.map((feature: string, index: number) => (
                            <span key={index} className="px-3 py-1 bg-primary/20 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Color Palette */}
                      <div>
                        <h5 className="font-semibold mb-3">Color Palette:</h5>
                        <div className="flex gap-2">
                          {generatedTemplate.colors.map((color: string, index: number) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full border-2 border-white/20"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sections Preview */}
                    <div>
                      <h5 className="font-semibold mb-3">Website Sections:</h5>
                      <div className="space-y-3">
                        {generatedTemplate.sections.map((section: any, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg">
                            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{section.name}</div>
                              <div className="text-sm text-muted-foreground">{section.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      onClick={() => setShowPreview(!showPreview)}
                      className="group"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      {showPreview ? 'Hide Preview' : 'Preview Template'}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button 
                      variant="glass" 
                      size="lg" 
                      onClick={handleExport}
                      disabled={isExporting}
                      className="group"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Export Template
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline" size="lg" className="group">
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Preview Modal */}
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
                        className="glass rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-2xl font-bold">Template Preview</h3>
                          <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                            ✕
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="text-center py-8">
                            <div className="text-4xl mb-4">🎨</div>
                            <h4 className="text-xl font-semibold mb-2">Live Preview Coming Soon!</h4>
                            <p className="text-muted-foreground">
                              This template will be rendered with real 3D elements and animations.
                            </p>
                          </div>
                          
                          {/* Mock Preview */}
                          <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center">
                            <div className="text-6xl mb-4">🚀</div>
                            <p className="text-muted-foreground">
                              Interactive preview with {generatedTemplate.sections.length} sections
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AITemplateGenerator;
