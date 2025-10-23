import { motion } from 'framer-motion';
import { 
  Zap, 
  Palette, 
  Cpu, 
  Globe, 
  Sparkles, 
  Layers,
  MousePointer,
  Smartphone
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Generation',
    description: 'Create stunning websites in seconds with our advanced AI that understands your vision and brings it to life.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Palette,
    title: 'Cinematic Animations',
    description: 'Every element comes alive with smooth, cinematic animations and transitions that captivate your audience.',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    icon: Cpu,
    title: '3D Interactive Elements',
    description: 'Immersive 3D components that respond to user interactions with realistic physics and lighting.',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time, seeing changes instantly as they happen.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Luxury Design System',
    description: 'Premium components with glassmorphism, neumorphism, and holographic effects built-in.',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    icon: Layers,
    title: 'Modular Architecture',
    description: 'Flexible, scalable components that grow with your needs and maintain perfect performance.',
    gradient: 'from-pink-400 to-red-500',
  },
  {
    icon: MousePointer,
    title: 'Magnetic Interactions',
    description: 'Every click, hover, and scroll feels responsive with magnetic cursors and smooth feedback.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Smartphone,
    title: 'Responsive Excellence',
    description: 'Flawless experience across all devices with adaptive layouts and optimized performance.',
    gradient: 'from-emerald-400 to-green-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powerful Features</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Everything you need to build
            <span className="holographic"> the future</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Maya-Web combines cutting-edge AI with stunning 3D visuals to create 
            websites that don't just look amazing—they feel alive.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                {/* Card */}
                <div className="h-full glass rounded-2xl p-6 hover:shadow-glow-accent transition-all duration-500 tilt">
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    {/* Floating glow effect */}
                    <motion.div
                      className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-[1px] rounded-2xl shimmer" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Ready to experience the future of web design?
          </p>
          <motion.div
            className="inline-block glass px-6 py-3 rounded-full cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="holographic font-semibold">
              Explore All Features →
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;