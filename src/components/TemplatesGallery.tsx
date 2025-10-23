import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Download, 
  Sparkles, 
  Palette, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Clock
} from 'lucide-react';

const templates = [
  {
    id: 1,
    name: "Neon Portfolio",
    category: "Portfolio",
    description: "Stunning portfolio with neon 3D effects and floating glass sections",
    preview: "Hero + About + Projects + Contact",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    features: ["3D Animations", "Glassmorphism", "Responsive"],
    rating: 4.9,
    downloads: 1250,
    isNew: true,
    isPopular: true,
  },
  {
    id: 2,
    name: "SaaS Landing",
    category: "Business",
    description: "Modern SaaS landing page with holographic elements and smooth transitions",
    preview: "Hero + Features + Pricing + Testimonials",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    features: ["AI Integration", "3D Graphics", "Analytics"],
    rating: 4.8,
    downloads: 980,
    isNew: false,
    isPopular: true,
  },
  {
    id: 3,
    name: "E-commerce Store",
    category: "E-commerce",
    description: "Interactive storefront with 3D product showcases and magnetic interactions",
    preview: "Header + Products + Cart + Checkout",
    gradient: "from-green-500 via-emerald-500 to-lime-500",
    features: ["3D Products", "Shopping Cart", "Payments"],
    rating: 4.7,
    downloads: 750,
    isNew: false,
    isPopular: false,
  },
  {
    id: 4,
    name: "Creative Agency",
    category: "Agency",
    description: "Bold agency site with cinematic animations and particle backgrounds",
    preview: "Hero + Services + Portfolio + Team",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    features: ["Particle Effects", "Video Backgrounds", "Team Showcase"],
    rating: 4.9,
    downloads: 1100,
    isNew: true,
    isPopular: true,
  },
  {
    id: 5,
    name: "Tech Startup",
    category: "Startup",
    description: "Futuristic startup landing with holographic UI and AI-powered elements",
    preview: "Hero + Solution + Team + Contact",
    gradient: "from-indigo-500 via-purple-500 to-blue-500",
    features: ["AI Chat", "Holographic UI", "Real-time Data"],
    rating: 4.8,
    downloads: 890,
    isNew: false,
    isPopular: false,
  },
  {
    id: 6,
    name: "Restaurant Menu",
    category: "Food",
    description: "Elegant restaurant site with 3D food presentations and reservation system",
    preview: "Hero + Menu + Gallery + Reservations",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    features: ["3D Food Models", "Online Booking", "Menu Builder"],
    rating: 4.6,
    downloads: 650,
    isNew: false,
    isPopular: false,
  },
];

const categories = ["All", "Portfolio", "Business", "E-commerce", "Agency", "Startup", "Food"];

const TemplatesGallery = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, hsl(45 100% 65% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, hsl(200 100% 60% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, hsl(290 100% 65% / 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
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
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Template Gallery</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Choose from
            <span className="holographic"> stunning templates</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional templates designed with AI and enhanced with 3D elements. 
            Each template is fully customizable and ready to deploy.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                category === "All" 
                  ? "glass shadow-glow-primary" 
                  : "glass hover:shadow-glow-soft"
              }`}
            >
              <span className="text-sm font-medium">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              {/* Template Card */}
              <div className="glass rounded-3xl overflow-hidden hover:shadow-glow-accent transition-all duration-500 tilt">
                {/* Template Preview */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${template.gradient} relative`}>
                    {/* Mock Layout Preview */}
                    <div className="absolute inset-4 bg-background/20 rounded-xl backdrop-blur-sm">
                      <div className="p-4 space-y-2">
                        {template.preview.split(' + ').map((section, i) => (
                          <motion.div
                            key={i}
                            className="h-4 bg-white/30 rounded animate-pulse"
                            style={{ 
                              animationDelay: `${i * 0.2}s`,
                              width: `${80 + Math.random() * 20}%`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {template.isNew && (
                        <div className="px-2 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs font-medium">
                          NEW
                        </div>
                      )}
                      {template.isPopular && (
                        <div className="px-2 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-xs font-medium">
                          POPULAR
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <Button variant="glass" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="hero" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.map((feature, i) => (
                      <div
                        key={i}
                        className="px-2 py-1 bg-muted/50 rounded-full text-xs"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>2 min setup</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant="glass" 
                    className="w-full group-hover:shadow-glow-soft transition-all duration-300"
                  >
                    Customize Template
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-muted-foreground mb-6">
              Use our AI Generator to create a completely custom template from your description.
            </p>
            
            <Button variant="hero" size="lg" className="group">
              <Zap className="w-5 h-5 mr-2" />
              Generate Custom Template
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesGallery;
