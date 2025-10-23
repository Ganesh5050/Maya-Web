import { motion } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  HelpCircle, 
  Sparkles, 
  Zap,
  CreditCard,
  Shield,
  Download,
  Code,
  Palette
} from 'lucide-react';

const faqs = [
  {
    id: "1",
    question: "How does the AI website generation work?",
    answer: "Our AI analyzes your natural language description and generates a complete website structure with sections, components, and 3D elements. It understands context, design preferences, and creates responsive layouts optimized for performance. The AI considers your industry, target audience, and desired functionality to create the perfect website for your needs.",
    icon: Sparkles
  },
  {
    id: "2", 
    question: "Can I customize the generated websites?",
    answer: "Absolutely! Every generated website is fully customizable. You can modify colors, fonts, layouts, content, and 3D effects using our visual editor. You can also add new sections, remove elements, and adjust animations. The customization is real-time, so you see changes instantly as you make them.",
    icon: Palette
  },
  {
    id: "3",
    question: "What 3D elements and animations are available?",
    answer: "Maya-Web includes a comprehensive library of 3D elements including holographic backgrounds, floating particles, interactive geometric shapes, magnetic cursors, glassmorphic components, and cinematic transitions. All animations are optimized for performance and work seamlessly across all devices.",
    icon: Zap
  },
  {
    id: "4",
    question: "How do I export my website?",
    answer: "You can export your website in multiple ways: as clean React/Vite code for self-hosting, deploy directly to your domain with one click, or download as a static site. The exported code is production-ready, SEO optimized, and includes all necessary dependencies and configurations.",
    icon: Download
  },
  {
    id: "5",
    question: "Is there a free plan available?",
    answer: "Yes! We offer a free plan that includes basic AI generation, access to starter templates, and limited exports. Our Pro plan unlocks advanced features, premium templates, unlimited exports, and priority support. Enterprise plans include custom integrations and dedicated support.",
    icon: CreditCard
  },
  {
    id: "6",
    question: "Do I need coding knowledge to use Maya-Web?",
    answer: "Not at all! Maya-Web is designed for everyone, regardless of technical background. The AI handles all the complex coding, and our visual editor makes customization intuitive. However, if you do have coding knowledge, you can access and modify the generated code for advanced customizations.",
    icon: Code
  },
  {
    id: "7",
    question: "How secure is my data and projects?",
    answer: "Security is our top priority. All your projects and data are encrypted and stored securely. We use industry-standard security practices, regular backups, and comply with data protection regulations. Your projects are private by default, and you control who can access them.",
    icon: Shield
  },
  {
    id: "8",
    question: "Can I collaborate with team members?",
    answer: "Yes! Maya-Web supports real-time collaboration. You can invite team members to edit projects, leave comments, and work together simultaneously. Changes are synced in real-time, and you can see who's working on what. Perfect for agencies, teams, and collaborative projects.",
    icon: HelpCircle
  }
];

const FAQ = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 25% 25%, hsl(45 100% 65% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 75% 75%, hsl(200 100% 60% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, hsl(290 100% 65% / 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
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
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">FAQ</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Frequently Asked
            <span className="holographic"> Questions</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Maya-Web. Can't find what you're looking for? 
            Contact our support team for personalized assistance.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <AccordionItem 
                    value={faq.id} 
                    className="glass rounded-2xl px-6 py-2 hover:shadow-glow-soft transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-semibold text-lg">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <div className="pl-14">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
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
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you succeed. Get personalized assistance 
              and expert guidance for your projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full hover:shadow-glow-primary transition-all duration-300"
              >
                <span className="holographic font-semibold">
                  Contact Support
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full hover:shadow-glow-soft transition-all duration-300"
              >
                <span className="font-semibold">
                  View Documentation
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
