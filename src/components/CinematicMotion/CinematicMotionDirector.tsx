import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Film, 
  Camera, 
  Sparkles,
  Download,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';

// Animation Types
export type AnimationType = 'entrance' | 'exit' | 'hover' | 'scroll' | 'click' | 'loop' | 'stagger' | 'parallax';
export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring' | 'bounce' | 'elastic';

// Animation Configuration
export interface AnimationConfig {
  id: string;
  name: string;
  type: AnimationType;
  element: string;
  duration: number;
  delay: number;
  easing: EasingType;
  properties: {
    opacity?: number;
    scale?: number;
    x?: number;
    y?: number;
    z?: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
  };
  trigger: 'auto' | 'hover' | 'scroll' | 'click' | 'viewport';
  enabled: boolean;
}

// Cinematic Motion Director Class
export class CinematicMotionDirectorService {
  private static animationPresets: Record<AnimationType, Partial<AnimationConfig>> = {
    entrance: {
      type: 'entrance',
      duration: 0.8,
      delay: 0,
      easing: 'easeOut',
      properties: { opacity: 0, scale: 0.8, y: 50 },
      trigger: 'viewport',
    },
    exit: {
      type: 'exit',
      duration: 0.5,
      delay: 0,
      easing: 'easeIn',
      properties: { opacity: 0, scale: 0.8, y: -50 },
      trigger: 'auto',
    },
    hover: {
      type: 'hover',
      duration: 0.3,
      delay: 0,
      easing: 'easeOut',
      properties: { scale: 1.05, y: -5 },
      trigger: 'hover',
    },
    scroll: {
      type: 'scroll',
      duration: 1,
      delay: 0,
      easing: 'easeOut',
      properties: { opacity: 1, y: 0 },
      trigger: 'scroll',
    },
    click: {
      type: 'click',
      duration: 0.2,
      delay: 0,
      easing: 'spring',
      properties: { scale: 0.95 },
      trigger: 'click',
    },
    loop: {
      type: 'loop',
      duration: 2,
      delay: 0,
      easing: 'linear',
      properties: { rotateY: 360 },
      trigger: 'auto',
    },
    stagger: {
      type: 'stagger',
      duration: 0.6,
      delay: 0.1,
      easing: 'easeOut',
      properties: { opacity: 1, y: 0 },
      trigger: 'viewport',
    },
    parallax: {
      type: 'parallax',
      duration: 1,
      delay: 0,
      easing: 'linear',
      properties: { y: -100 },
      trigger: 'scroll',
    },
  };

  static generateFromPrompt(prompt: string, elements: string[]): AnimationConfig[] {
    const lowerPrompt = prompt.toLowerCase();
    const animations: AnimationConfig[] = [];

    // Analyze prompt for animation types
    if (lowerPrompt.includes('entrance') || lowerPrompt.includes('appear') || lowerPrompt.includes('fade in')) {
      elements.forEach((element, index) => {
        animations.push({
          id: `entrance-${index}`,
          name: `${element} Entrance`,
          element,
          delay: index * 0.1,
          ...this.animationPresets.entrance,
        } as AnimationConfig);
      });
    }

    if (lowerPrompt.includes('hover') || lowerPrompt.includes('interactive')) {
      elements.forEach((element, index) => {
        animations.push({
          id: `hover-${index}`,
          name: `${element} Hover`,
          element,
          ...this.animationPresets.hover,
        } as AnimationConfig);
      });
    }

    if (lowerPrompt.includes('scroll') || lowerPrompt.includes('reveal') || lowerPrompt.includes('parallax')) {
      elements.forEach((element, index) => {
        animations.push({
          id: `scroll-${index}`,
          name: `${element} Scroll Reveal`,
          element,
          delay: index * 0.2,
          ...this.animationPresets.scroll,
        } as AnimationConfig);
      });
    }

    if (lowerPrompt.includes('stagger') || lowerPrompt.includes('sequence')) {
      elements.forEach((element, index) => {
        animations.push({
          id: `stagger-${index}`,
          name: `${element} Stagger`,
          element,
          delay: index * 0.15,
          ...this.animationPresets.stagger,
        } as AnimationConfig);
      });
    }

    if (lowerPrompt.includes('loop') || lowerPrompt.includes('rotate') || lowerPrompt.includes('spin')) {
      elements.forEach((element, index) => {
        animations.push({
          id: `loop-${index}`,
          name: `${element} Loop`,
          element,
          ...this.animationPresets.loop,
        } as AnimationConfig);
      });
    }

    // Default entrance animation if none specified
    if (animations.length === 0) {
      elements.forEach((element, index) => {
        animations.push({
          id: `entrance-${index}`,
          name: `${element} Entrance`,
          element,
          delay: index * 0.1,
          ...this.animationPresets.entrance,
        } as AnimationConfig);
      });
    }

    return animations;
  }

  static generateFramerMotionCode(animations: AnimationConfig[]): string {
    const imports = `import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';`;

    const variants = animations.reduce((acc, anim) => {
      const variantName = anim.id.replace(/[^a-zA-Z0-9]/g, '');
      acc[variantName] = {
        initial: anim.properties,
        animate: { opacity: 1, scale: 1, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
        transition: {
          duration: anim.duration,
          delay: anim.delay,
          ease: anim.easing,
        },
      };
      return acc;
    }, {} as any);

    const components = animations.map(anim => {
      const variantName = anim.id.replace(/[^a-zA-Z0-9]/g, '');
      return `
const ${anim.element.replace(/[^a-zA-Z0-9]/g, '')}Component = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      variants={variants.${variantName}}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover={anim.trigger === 'hover' ? { scale: 1.05 } : undefined}
      whileTap={anim.trigger === 'click' ? { scale: 0.95 } : undefined}
    >
      {/* Your ${anim.element} content here */}
    </motion.div>
  );
};`;
    }).join('\n');

    return `${imports}

const variants = ${JSON.stringify(variants, null, 2)};

${components}

export { variants };`;
  }
}

// Animation Preview Component
const AnimationPreview: React.FC<{
  animation: AnimationConfig;
  isPlaying: boolean;
}> = ({ animation, isPlaying }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAnimationProps = () => {
    const baseProps = {
      duration: animation.duration,
      delay: animation.delay,
    };

    switch (animation.easing) {
      case 'spring':
        return { ...baseProps, type: 'spring', stiffness: 300, damping: 30 };
      case 'bounce':
        return { ...baseProps, type: 'spring', stiffness: 200, damping: 10 };
      case 'elastic':
        return { ...baseProps, type: 'spring', stiffness: 100, damping: 8 };
      default:
        return { ...baseProps, ease: animation.easing };
    }
  };

  return (
    <motion.div
      className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold"
      initial={animation.properties}
      animate={isPlaying ? { opacity: 1, scale: 1, x: 0, y: 0 } : animation.properties}
      whileHover={animation.trigger === 'hover' ? { scale: 1.1 } : undefined}
      whileTap={animation.trigger === 'click' ? { scale: 0.9 } : undefined}
      transition={getAnimationProps()}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {animation.element.charAt(0).toUpperCase()}
    </motion.div>
  );
};

// Main Cinematic Motion Director Component
export const CinematicMotionDirector: React.FC = () => {
  const [prompt, setPrompt] = useState('Create dramatic entrance animations with stagger effects');
  const [elements, setElements] = useState(['hero', 'features', 'testimonials', 'cta']);
  const [generatedAnimations, setGeneratedAnimations] = useState<AnimationConfig[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeTab, setActiveTab] = useState('preview');

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const animations = CinematicMotionDirectorService.generateFromPrompt(prompt, elements);
    const code = CinematicMotionDirectorService.generateFramerMotionCode(animations);
    
    setGeneratedAnimations(animations);
    setGeneratedCode(code);
    setIsGenerating(false);
  };

  const toggleAnimation = (id: string) => {
    setGeneratedAnimations(prev => prev.map(anim => 
      anim.id === id ? { ...anim, enabled: !anim.enabled } : anim
    ));
  };

  const examplePrompts = [
    'Create smooth entrance animations with stagger effects',
    'Add hover interactions to all elements',
    'Make scroll-triggered reveals with parallax',
    'Design bouncing click animations',
    'Create rotating loop animations',
    'Add cinematic fade transitions',
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Cinematic Motion Director
            </h1>
            <p className="text-muted-foreground">
              AI automatically applies professional Framer Motion + GSAP animations
            </p>
          </div>
        </motion.div>

        {/* Prompt Input */}
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            placeholder="Describe your animation style..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-background/50 backdrop-blur-xl border-white/10 focus:border-white/20"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                </motion.div>
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Animations
              </>
            )}
          </Button>
        </div>

        {/* Example Prompts */}
        <div className="flex flex-wrap gap-2 mb-6">
          {examplePrompts.map((example, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/50"
              onClick={() => setPrompt(example)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>

      {/* Generated Content */}
      {generatedAnimations.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-6">
            <TabsTrigger value="preview">Animation Preview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="code">Framer Motion Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Animation Preview</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(false)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {generatedAnimations.map((animation) => (
                  <div key={animation.id} className="text-center">
                    <div className="mb-2">
                      <AnimationPreview animation={animation} isPlaying={isPlaying} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{animation.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAnimation(animation.id)}
                      >
                        {animation.enabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </Button>
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {animation.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <h3 className="text-xl font-semibold mb-4">Animation Timeline</h3>
              <div className="space-y-4">
                {generatedAnimations.map((animation, index) => (
                  <div key={animation.id} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium">{animation.name}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: isPlaying ? '100%' : '0%' }}
                        transition={{
                          duration: animation.duration,
                          delay: animation.delay,
                          ease: animation.easing,
                        }}
                      />
                    </div>
                    <div className="w-16 text-xs text-muted-foreground">
                      {animation.duration}s
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Generated Framer Motion Code</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Copy Code
                </Button>
              </div>
              <pre className="text-sm text-muted-foreground overflow-auto max-h-96 bg-black/20 p-4 rounded-lg">
                {generatedCode}
              </pre>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Film className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold">Cinematic Quality</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Professional-grade animations with perfect timing, easing, and choreography.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold">AI-Powered</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            AI analyzes your prompt and generates perfect animations automatically.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Download className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold">Production Ready</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Export clean Framer Motion code ready for production use.
          </p>
        </Card>
      </div>
    </div>
  );
};
