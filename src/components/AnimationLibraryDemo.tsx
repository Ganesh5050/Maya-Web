import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AnimationBrowser,
  SplitText,
  GradientText,
  TypewriterEffect,
  GlitchText,
  FlipWords,
  AuroraBackground,
  ParticlesBackground,
  GridBackground,
} from '@/components/AnimationLibrary';

export const AnimationLibraryDemo: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<{ name: string; category: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSelectComponent = (name: string, category: string) => {
    setSelectedComponent({ name, category });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Aurora Background */}
      <AuroraBackground className="relative py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <GradientText 
                text="Maya-Web" 
                className="text-6xl"
                gradient="from-purple-400 via-pink-500 to-orange-500"
              />
            </div>

            <SplitText
              text="Premium Animation Library"
              className="text-5xl font-bold text-white mb-6"
            />

            <div className="flex items-center justify-center gap-2 mb-8">
              <TypewriterEffect
                words={['Beautiful', 'Stunning', 'Professional', 'Amazing', 'Premium']}
                className="text-2xl text-muted-foreground"
              />
              <span className="text-2xl text-muted-foreground">animations at your fingertips</span>
            </div>

            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Sparkles className="w-5 h-5 mr-2" />
                Browse Library
              </Button>
              <Button size="lg" variant="outline">
                <Code className="w-5 h-5 mr-2" />
                View Docs
              </Button>
            </div>
          </motion.div>
        </div>
      </AuroraBackground>

      {/* Live Demos Section */}
      <section className="py-20 relative">
        <GridBackground className="absolute inset-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <GlitchText 
              text="Live Component Demos"
              className="text-4xl mb-4"
            />
            <p className="text-xl text-muted-foreground">
              Try out our premium animations in real-time
            </p>
          </div>

          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8">
              <TabsTrigger value="text">Text Effects</TabsTrigger>
              <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-6">
              {/* Split Text Demo */}
              <Card className="p-8 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Split Text Animation</h3>
                <div className="min-h-[100px] flex items-center justify-center bg-black/20 rounded-lg p-8 mb-4">
                  <SplitText
                    text="This text animates word by word"
                    className="text-3xl font-bold text-white"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyCode('<SplitText text="Your text here" />')}
                >
                  {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Code
                </Button>
              </Card>

              {/* Gradient Text Demo */}
              <Card className="p-8 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Gradient Text with Glow</h3>
                <div className="min-h-[100px] flex items-center justify-center bg-black/20 rounded-lg p-8 mb-4">
                  <GradientText
                    text="Stunning Gradient Text"
                    className="text-4xl"
                    gradient="from-cyan-400 via-blue-500 to-purple-600"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyCode('<GradientText text="Your text" gradient="from-cyan-400 to-purple-600" />')}
                >
                  {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Code
                </Button>
              </Card>

              {/* Flip Words Demo */}
              <Card className="p-8 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Flip Words Animation</h3>
                <div className="min-h-[100px] flex items-center justify-center bg-black/20 rounded-lg p-8 mb-4">
                  <div className="text-3xl">
                    Build{' '}
                    <FlipWords 
                      words={['faster', 'better', 'smarter', 'amazing']}
                      className="text-3xl"
                    />
                    {' '}websites
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyCode('<FlipWords words={["fast", "better", "amazing"]} />')}
                >
                  {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Code
                </Button>
              </Card>

              {/* Glitch Text Demo */}
              <Card className="p-8 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Glitch Effect</h3>
                <div className="min-h-[100px] flex items-center justify-center bg-black/20 rounded-lg p-8 mb-4">
                  <GlitchText
                    text="GLITCH EFFECT"
                    className="text-4xl"
                    glitchIntensity="high"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyCode('<GlitchText text="GLITCH" glitchIntensity="high" />')}
                >
                  {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Code
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="backgrounds" className="space-y-6">
              {/* Aurora Background Demo */}
              <Card className="p-8 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Aurora Background</h3>
                <AuroraBackground className="h-64 rounded-lg overflow-hidden mb-4">
                  <div className="flex items-center justify-center h-full">
                    <GradientText text="Aurora Effect" className="text-4xl" />
                  </div>
                </AuroraBackground>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyCode('<AuroraBackground><YourContent /></AuroraBackground>')}
                >
                  {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Code
                </Button>
              </Card>

              {/* Particles Background Demo */}
              <Card className="p-8 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Particles Background</h3>
                <ParticlesBackground className="h-64 rounded-lg overflow-hidden bg-black/40 mb-4" particleCount={30}>
                  <div className="flex items-center justify-center h-full">
                    <GlitchText text="Particles" className="text-4xl" />
                  </div>
                </ParticlesBackground>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyCode('<ParticlesBackground particleCount={50}><YourContent /></ParticlesBackground>')}
                >
                  {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Code
                </Button>
              </Card>

              {/* Grid Background Demo */}
              <Card className="p-8 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Animated Grid</h3>
                <GridBackground className="h-64 rounded-lg overflow-hidden bg-black/40 mb-4">
                  <div className="flex items-center justify-center h-full">
                    <SplitText text="Grid Background" className="text-4xl text-white" />
                  </div>
                </GridBackground>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyCode('<GridBackground gridSize={50}><YourContent /></GridBackground>')}
                >
                  {copiedCode ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Code
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="interactive">
              <Card className="p-8 text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                <h3 className="text-2xl font-bold mb-2">More Components Coming Soon!</h3>
                <p className="text-muted-foreground">
                  We're building 200+ premium animations. Stay tuned!
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Full Browser Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
        <div className="container mx-auto px-4">
          <AnimationBrowser onSelectComponent={handleSelectComponent} />
        </div>
      </section>
    </div>
  );
};
