import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Sparkles, 
  Eye, 
  Download, 
  ArrowRight,
  CheckCircle,
  Zap,
  Palette,
  Code
} from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe Your Vision",
    description: "Tell our AI what kind of website you want to create. Use natural language like 'Create a portfolio with neon 3D effects' or 'Build an e-commerce store with floating product cards'.",
    details: [
      "Natural language processing",
      "AI understands context and intent",
      "Supports multiple languages",
      "Learns from your preferences"
    ],
    gradient: "from-blue-500 to-cyan-500",
    delay: 0
  },
  {
    number: "02", 
    icon: Sparkles,
    title: "AI Generates Layout",
    description: "Our advanced AI analyzes your request and creates a complete website structure with sections, components, and 3D elements tailored to your needs.",
    details: [
      "Intelligent component selection",
      "3D element integration",
      "Responsive layout generation",
      "Performance optimization"
    ],
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    number: "03",
    icon: Eye,
    title: "Preview & Customize",
    description: "See your website come to life with real-time preview. Customize colors, animations, content, and 3D effects using our intuitive visual editor.",
    details: [
      "Real-time preview",
      "Visual customization tools",
      "3D element controls",
      "Animation timeline editor"
    ],
    gradient: "from-green-500 to-emerald-500",
    delay: 0.4
  },
  {
    number: "04",
    icon: Download,
    title: "Export & Deploy",
    description: "Export your website as clean React/Vite code or deploy directly to your domain. Your site is production-ready with optimized performance.",
    details: [
      "Clean React/Vite code",
      "One-click deployment",
      "Performance optimized",
      "SEO ready"
    ],
    gradient: "from-orange-500 to-red-500",
    delay: 0.6
  }
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete websites in under 30 seconds"
  },
  {
    icon: Palette,
    title: "Fully Customizable", 
    description: "Every element can be modified to match your brand"
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Export production-ready React components"
  }
];

const HowItWorks = () => {
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
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">How It Works</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            From idea to
            <span className="holographic"> live website</span>
            <br />in 4 simple steps
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No coding required. No design skills needed. Just describe what you want, 
            and watch Maya-Web bring your vision to life with stunning 3D visuals.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-center gap-12 mb-24 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: step.delay + 0.2, type: "spring", stiffness: 200 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Step {step.number}</div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: step.delay + 0.3 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.4 }}
                    className="relative"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-8 -left-8 text-8xl font-bold text-primary/10 select-none">
                      {step.number}
                    </div>

                    {/* Card */}
                    <div className="glass rounded-3xl p-8 w-full max-w-md hover:shadow-glow-accent transition-all duration-500 tilt">
                      <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${step.gradient} relative overflow-hidden mb-6`}>
                        {/* Mock Content */}
                        <div className="absolute inset-4 bg-background/20 rounded-xl backdrop-blur-sm">
                          <div className="p-4 space-y-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="h-3 bg-white/30 rounded animate-pulse"
                                style={{ 
                                  animationDelay: `${i * 0.2}s`,
                                  width: `${70 + Math.random() * 30}%`
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: step.delay }}
                          className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"
                        />
                        <motion.div
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: step.delay + 1 }}
                          className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm"
                        />
                      </div>

                      <div className="text-center">
                        <h4 className="font-semibold mb-2">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {step.description.split('.')[0]}.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow-primary transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
