import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'AI Generator', href: '#ai-generator' },
      { name: 'Templates', href: '#templates' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Tutorials', href: '#tutorials' },
      { name: 'Blog', href: '#blog' },
      { name: 'Changelog', href: '#changelog' },
      { name: 'Status', href: '#status' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-glass-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 border-b border-glass-border"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Stay Updated</span>
            </motion.div>

            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Get the latest from
              <span className="holographic"> Maya-Web</span>
            </h3>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for product updates, design tips, and exclusive early access to new features.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 bg-muted/20 border border-glass-border rounded-xl px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button variant="hero" size="lg" className="shrink-0">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-2xl font-bold mb-2">
                  <span className="holographic">Maya-Web</span>
                </h4>
                <p className="text-muted-foreground max-w-md">
                  The future of web design is here. Create stunning 3D websites with AI-powered tools, 
                  cinematic animations, and luxury interactions.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:shadow-glow-accent transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Links Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {footerSections.map((section, sectionIndex) => (
                <div key={section.title}>
                  <h5 className="font-semibold mb-4">{section.title}</h5>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: (sectionIndex * 0.1) + (linkIndex * 0.05) 
                        }}
                      >
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-muted-foreground">
              © 2024 Maya-Web. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  );
};

export default Footer;