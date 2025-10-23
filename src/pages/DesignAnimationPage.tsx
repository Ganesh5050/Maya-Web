import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Palette,
  Film,
  Box,
  Wand2,
  Layers,
  Move3D,
  Sparkles,
  ArrowRight,
  Star,
  Crown,
  Play,
  Download,
} from 'lucide-react';

// Import all Design & Animation components
import AnimationTimelineEditor from '@/components/AnimationTimelineEditor/AnimationTimelineEditor';
import { AnimationLibraryDemo } from '@/components/AnimationLibraryDemo';
import { RevolutionaryFeaturesDemo } from '@/components/RevolutionaryFeaturesDemo';
import LayoutOptimizer from '@/components/LayoutOptimizer/LayoutOptimizer';
import DesignSystemExtractor from '@/components/DesignSystemExtractor/DesignSystemExtractor';
import WorkingScene3DEditor from '@/components/WorkingScene3DEditor';

const DesignAnimationPage: React.FC = () => {
  const designFeatures = [
    {
      id: 'animation-timeline-editor',
      title: 'Animation Timeline Editor',
      description: 'Professional-grade animation tool with visual keyframe editing and timeline control',
      icon: <Film className="w-8 h-8" />,
      badge: 'Pro Tool',
      color: 'from-blue-500 to-cyan-500',
      component: <AnimationTimelineEditor />,
    },
    {
      id: 'animation-library-demo',
      title: 'Animation Library',
      description: '200+ premium animation components with copy-paste code and live previews',
      icon: <Layers className="w-8 h-8" />,
      badge: '200+ Effects',
      color: 'from-purple-500 to-pink-500',
      component: <AnimationLibraryDemo />,
    },
    {
      id: 'revolutionary-features-demo',
      title: 'Revolutionary Features',
      description: 'Cutting-edge 3D and motion features that blow minds and outperform competitors',
      icon: <Sparkles className="w-8 h-8" />,
      badge: '3D Magic',
      color: 'from-pink-500 to-rose-500',
      component: <RevolutionaryFeaturesDemo />,
    },
    {
      id: 'layout-optimizer',
      title: 'Layout Optimizer',
      description: 'AI-powered layout optimization with automatic fixes and intelligent suggestions',
      icon: <Wand2 className="w-8 h-8" />,
      badge: 'AI Smart',
      color: 'from-green-500 to-emerald-500',
      component: <LayoutOptimizer />,
    },
    {
      id: 'design-system-extractor',
      title: 'Design System Extractor',
      description: 'Extract complete design systems from screenshots or URLs automatically',
      icon: <Palette className="w-8 h-8" />,
      badge: 'Auto Extract',
      color: 'from-orange-500 to-red-500',
      component: <DesignSystemExtractor />,
    },
    {
      id: 'working-scene-3d-editor',
      title: '3D Scene Editor',
      description: 'Real-time 3D environment builder with drag-and-drop assets and lighting control',
      icon: <Box className="w-8 h-8" />,
      badge: '3D Editor',
      color: 'from-indigo-500 to-purple-500',
      component: <WorkingScene3DEditor />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900">
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
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500">
                <Palette className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Design & Animation
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional creative tools and visual effects that make your websites stand out from the crowd
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Creative Excellence
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                200+ Animations
              </Badge>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {designFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 hover:border-pink-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <Badge variant="outline" className="border-pink-500/50 text-pink-300">
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
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
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
          {designFeatures.map((feature, index) => (
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
            <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-12 border border-pink-500/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Create Stunning Designs?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Transform your ideas into breathtaking visual experiences with Maya-Web's professional design tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-8 py-4"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Designing
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pink-500/50 text-pink-300 hover:bg-pink-500/10 px-8 py-4"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Assets
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default DesignAnimationPage;
