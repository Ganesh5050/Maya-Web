import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroHologram from '@/assets/hero-hologram.png';
import LogoLoop from './LogoLoop';
import HeroGlobe from './HeroGlobe';
import Particles from './Particles';
import { techLogos } from '@/data/techLogos';

const Hero = () => {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    console.log('Start Building clicked!');
    navigate('/builder');
  };

  const handleWatchDemo = () => {
    console.log('Watch Demo clicked!');
    // You can add demo functionality here
  };

  return (
    <section className="relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20 z-10"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, hsl(45 100% 65% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, hsl(200 100% 60% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, hsl(290 100% 65% / 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />

      <div className="container mx-auto px-6 z-50">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Next-Gen AI Builder</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Build{' '}
                <span className="holographic bg-gradient-hologram bg-clip-text text-transparent">
                  3D Websites
                </span>
                <br />
                with AI Magic
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Maya-Web revolutionizes web creation with cinematic 3D animations,
                AI-powered design, and luxury interactions that bring websites to life.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 relative z-50"
            >
              <Button 
                variant="hero" 
                size="lg" 
                className="group cursor-pointer relative z-50 pointer-events-auto"
                onClick={handleStartBuilding}
              >
                Start Building
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="glass" 
                size="lg" 
                className="group cursor-pointer relative z-50 pointer-events-auto"
                onClick={handleWatchDemo}
              >
                <Zap className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { value: '10K+', label: 'Websites Created' },
                { value: '99%', label: 'Client Satisfaction' },
                { value: '24/7', label: 'AI Assistance' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Globe */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[600px] lg:h-[700px]"
          >
            {/* Interactive 3D Globe */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <HeroGlobe className="w-full h-full" />
            </div>

            {/* Floating UI Elements */}
            <motion.div
              className="absolute top-10 left-10 glass p-3 rounded-lg z-40"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-xs text-primary font-mono">DESIGNING...</div>
              <div className="w-20 h-1 bg-gradient-primary rounded mt-1" />
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-10 glass p-3 rounded-lg z-40"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="text-xs text-accent font-mono">AI POWERED</div>
              <div className="flex gap-1 mt-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-accent rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Full Width Logo Loop */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] cursor-none z-20"
        style={{ paddingTop: '4px', paddingLeft: '200px', paddingRight: '200px' }}
      >
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
          className="py-4"
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-glass-border rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;