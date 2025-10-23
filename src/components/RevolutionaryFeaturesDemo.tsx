import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Zap, 
  Film, 
  Box, 
  Move3D, 
  Download,
  Play,
  Code,
  Eye,
  Star,
  Crown,
  Rocket,
  Palette,
  Brain,
  Wand2
} from 'lucide-react';
import {
  AI3DWebsiteGenerator,
  RealTime3DEnvironmentBuilder,
  CinematicMotionDirector,
  NeuralStyleTransformer,
  CognitiveDesignEngine,
  DreamToWebTranslator,
} from '@/components/RevolutionaryFeatures';

export const RevolutionaryFeaturesDemo: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState('3d-generator');

  const features = [
    {
      id: '3d-generator',
      name: 'AI 3D Website Generator',
      description: 'Generate complete 3D-integrated websites from a single text prompt',
      icon: <Box className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      component: <AI3DWebsiteGenerator />,
      stats: ['8 Scene Types', 'AI-Powered', 'React Three Fiber'],
    },
    {
      id: '3d-environment',
      name: 'Real-Time 3D Environment Builder',
      description: 'Drag-and-drop 3D assets with real-time lighting and camera controls',
      icon: <Move3D className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      component: <RealTime3DEnvironmentBuilder />,
      stats: ['500+ Assets', 'Real-Time', 'Export Ready'],
    },
    {
      id: 'cinematic-motion',
      name: 'Cinematic Motion Director',
      description: 'AI automatically applies professional Framer Motion + GSAP animations',
      icon: <Film className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      component: <CinematicMotionDirector />,
      stats: ['8 Animation Types', 'AI-Generated', 'Production Code'],
    },
    {
      id: 'neural-style',
      name: 'Neural Style Transformer',
      description: 'Instantly transform any design with AI-powered theme generation',
      icon: <Palette className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      component: <NeuralStyleTransformer />,
      stats: ['8 Complete Themes', 'Instant Transform', 'CSS Export'],
    },
    {
      id: 'cognitive-design',
      name: 'Cognitive Design Engine',
      description: 'AI reads your emotion and builds designs that match your mood',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      component: <CognitiveDesignEngine />,
      stats: ['Emotion Detection', 'Voice Analysis', 'Adaptive Design'],
    },
    {
      id: 'dream-to-web',
      name: 'Dream-to-Web Translator',
      description: 'Upload sketches or describe dreams → AI converts them to live 3D websites',
      icon: <Wand2 className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-500',
      component: <DreamToWebTranslator />,
      stats: ['Vision Translation', 'Dream Analysis', 'Live Export'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Hero Section */}
      <div className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(251, 146, 60, 0.2))',
                'linear-gradient(225deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2), rgba(245, 158, 11, 0.2))',
                'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(251, 146, 60, 0.2))',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Revolutionary Features
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              The features that make Maya-Web absolutely UNSTOPPABLE
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 justify-center mb-12"
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Rocket className="w-5 h-5 mr-2" />
                Try Features Now
              </Button>
              <Button size="lg" variant="outline">
                <Code className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </motion.div>

            {/* Feature Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  20+
                </div>
                <div className="text-sm text-muted-foreground mt-1">Revolutionary Features</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  3D
                </div>
                <div className="text-sm text-muted-foreground mt-1">AI Generation</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  200+
                </div>
                <div className="text-sm text-muted-foreground mt-1">Premium Animations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm text-muted-foreground mt-1">Better than Lovable</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Try the Revolutionary Features</h2>
          <p className="text-xl text-muted-foreground">
            Experience the future of website building
          </p>
        </div>

        <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-6xl mx-auto mb-8">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
              >
                <div className="flex items-center gap-2">
                  {feature.icon}
                  {feature.name}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{feature.name}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-6">
                    {feature.stats.map((stat, index) => (
                      <Badge key={index} variant="outline">
                        {stat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="h-[600px] rounded-lg overflow-hidden bg-black/20">
                  {feature.component}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Comparison Section */}
      <div className="py-20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Maya-Web vs Everyone</h2>
            <p className="text-xl text-muted-foreground">
              The only website builder with these revolutionary features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Lovable', features: ['Basic AI', 'No 3D', 'Limited Animations', 'Closed Code'] },
              { name: 'Webflow', features: ['Visual Editor', 'No AI', 'Basic Animations', 'Good Export'] },
              { name: 'Framer', features: ['Good Animations', 'No AI', 'No 3D', 'Good Export'] },
              { name: 'Maya-Web', features: ['AI 3D Generation', 'Cinematic Motion', 'Neural Style', 'Full Control'] },
            ].map((competitor, index) => (
              <Card
                key={competitor.name}
                className={`p-6 ${
                  competitor.name === 'Maya-Web'
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50'
                    : 'bg-background/50'
                }`}
              >
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                    competitor.name === 'Maya-Web'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gray-500'
                  }`}>
                    {competitor.name === 'Maya-Web' ? (
                      <Crown className="w-6 h-6 text-white" />
                    ) : (
                      <Star className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{competitor.name}</h3>
                </div>
                
                <div className="space-y-2">
                  {competitor.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        competitor.name === 'Maya-Web' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Build the Future?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators using Maya-Web to build websites that were impossible before.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Rocket className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
              <Button size="lg" variant="outline">
                <Eye className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
