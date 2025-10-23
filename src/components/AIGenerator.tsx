import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Send, 
  Sparkles, 
  Code, 
  Palette, 
  Zap,
  ArrowRight,
  Check
} from 'lucide-react';

const examplePrompts = [
  "Make me a portfolio website",
  "Create an e-commerce store",
  "Build a SaaS landing page",
  "Design a creative agency site"
];

const mockLayouts = [
  {
    name: "Modern Portfolio",
    preview: "Hero + Gallery + About + Contact",
    color: "from-blue-400 to-purple-500"
  },
  {
    name: "E-commerce Store", 
    preview: "Header + Products + Cart + Footer",
    color: "from-green-400 to-cyan-500"
  },
  {
    name: "SaaS Landing",
    preview: "Hero + Features + Pricing + CTA", 
    color: "from-yellow-400 to-orange-500"
  }
];

const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 3000);
  };

  const handlePromptClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 30% 70%, hsl(45 100% 65% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 30%, hsl(200 100% 60% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 70%, hsl(45 100% 65% / 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
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
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">AI Generator</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Describe your vision,
            <span className="holographic"> watch it build</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI understands natural language and converts your ideas into 
            stunning 3D websites with cinematic animations—in seconds.
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
            {/* Prompt Input */}
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
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the website you want to build..."
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
                          <Sparkles className="w-4 h-4 mr-2" />
                        </motion.div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Generate
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
                      onClick={() => handlePromptClick(example)}
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
                    <h3 className="text-xl font-semibold mb-2">AI is working its magic...</h3>
                    <p className="text-muted-foreground">Analyzing your prompt and generating layouts</p>
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-4">
                    {[
                      { icon: Code, label: "Analyzing requirements", delay: 0 },
                      { icon: Palette, label: "Designing components", delay: 1 },
                      { icon: Zap, label: "Adding animations", delay: 2 },
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

          {/* Generated Results */}
          <AnimatePresence>
            {showResults && (
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
                    <Check className="w-8 h-8 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Layouts Generated!</h3>
                  <p className="text-muted-foreground">Choose your favorite layout to customize</p>
                </div>

                {/* Layout Options */}
                <div className="grid md:grid-cols-3 gap-6">
                  {mockLayouts.map((layout, index) => (
                    <motion.div
                      key={layout.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative glass rounded-2xl p-6 hover:shadow-glow-accent transition-all duration-500 cursor-pointer tilt"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Preview */}
                      <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${layout.color} mb-4 relative overflow-hidden`}>
                        <div className="absolute inset-2 bg-background/10 rounded-lg backdrop-blur-sm">
                          <div className="p-2 space-y-1">
                            {layout.preview.split(' + ').map((section, i) => (
                              <div key={i} className="h-3 bg-white/20 rounded animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                            ))}
                          </div>
                        </div>
                      </div>

                      <h4 className="font-semibold mb-2">{layout.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{layout.preview}</p>

                      <Button variant="glass" size="sm" className="w-full group-hover:shadow-glow-soft">
                        Customize
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AIGenerator;