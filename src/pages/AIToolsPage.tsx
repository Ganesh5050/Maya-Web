import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Brain,
  Mic,
  Image,
  Database,
  Sparkles,
  Bot,
  Cpu,
  Search,
  Palette,
  Code,
  Settings,
  ArrowRight,
  Star,
  Crown,
} from 'lucide-react';

// Import all AI-related components
import AICoPilot from '@/components/AICoPilot/AICoPilot';
import { AI3DWebsiteGenerator } from '@/components/AI3DGenerator/AI3DWebsiteGenerator';
import GeminiTest from '@/components/GeminiTest';
import PerplexityTest from '@/components/PerplexityTest';
import ElevenLabsTest from '@/components/ElevenLabsTest';
import StabilityAITest from '@/components/StabilityAITest';
import SupabaseTest from '@/components/SupabaseTest';
import MultiModelAIDemo from '@/components/MultiModelAIDemo';
import AdvancedAIIntegration from '@/components/AdvancedAIIntegration';

const AIToolsPage: React.FC = () => {
  const aiFeatures = [
    {
      id: 'ai-copilot',
      title: 'AI Co-Pilot',
      description: 'Voice-controlled AI assistant with real-time chat and hands-free building',
      icon: <Mic className="w-8 h-8" />,
      badge: 'Voice Control',
      color: 'from-purple-500 to-pink-500',
      component: <AICoPilot />,
    },
    {
      id: 'ai-3d-generator',
      title: 'AI 3D Website Generator',
      description: 'Generate complete 3D-integrated websites from text prompts with React Three Fiber',
      icon: <Bot className="w-8 h-8" />,
      badge: 'Revolutionary',
      color: 'from-blue-500 to-cyan-500',
      component: <AI3DWebsiteGenerator />,
    },
    {
      id: 'gemini-test',
      title: 'Gemini Pro Integration',
      description: 'Fast AI responses and real-time suggestions powered by Google Gemini',
      icon: <Brain className="w-8 h-8" />,
      badge: 'Fast AI',
      color: 'from-green-500 to-emerald-500',
      component: <GeminiTest />,
    },
    {
      id: 'perplexity-test',
      title: 'Perplexity Research AI',
      description: 'Real-time research and web information with citations',
      icon: <Search className="w-8 h-8" />,
      badge: 'Research',
      color: 'from-orange-500 to-red-500',
      component: <PerplexityTest />,
    },
    {
      id: 'elevenlabs-test',
      title: 'ElevenLabs Voice AI',
      description: 'Advanced voice synthesis and voice cloning technology',
      icon: <Mic className="w-8 h-8" />,
      badge: 'Voice AI',
      color: 'from-indigo-500 to-purple-500',
      component: <ElevenLabsTest />,
    },
    {
      id: 'stability-ai-test',
      title: 'Stability AI Image Generation',
      description: 'Professional image generation and style transfer capabilities',
      icon: <Image className="w-8 h-8" />,
      badge: 'Images',
      color: 'from-pink-500 to-rose-500',
      component: <StabilityAITest />,
    },
    {
      id: 'supabase-test',
      title: 'Supabase Integration',
      description: 'Real-time database, authentication, and backend services',
      icon: <Database className="w-8 h-8" />,
      badge: 'Database',
      color: 'from-emerald-500 to-teal-500',
      component: <SupabaseTest />,
    },
    {
      id: 'multi-model-ai-demo',
      title: 'Multi-Model AI Pipeline',
      description: 'Combines multiple AI models for superior results and smart routing',
      icon: <Cpu className="w-8 h-8" />,
      badge: 'Pipeline',
      color: 'from-violet-500 to-purple-500',
      component: <MultiModelAIDemo />,
    },
    {
      id: 'advanced-ai-integration',
      title: 'Advanced AI Integration',
      description: 'Professional AI features for enterprise-level website building',
      icon: <Settings className="w-8 h-8" />,
      badge: 'Pro',
      color: 'from-slate-500 to-gray-500',
      component: <AdvancedAIIntegration />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                AI Tools Suite
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolutionary AI-powered features that make website building 1000x faster than any competitor
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Industry-Leading AI
              </Badge>
              <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                9 AI Models Integrated
              </Badge>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <Badge variant="outline" className="border-purple-500/50 text-purple-300">
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
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
          {aiFeatures.map((feature, index) => (
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
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Experience the Future of AI?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of creators using Maya-Web's revolutionary AI tools to build websites faster than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Building with AI
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4"
                >
                  <Code className="w-5 h-5 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AIToolsPage;
