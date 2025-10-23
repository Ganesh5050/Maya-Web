import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TemplatesGallery from '@/components/TemplatesGallery';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Complete homepage with ALL sections */}
      <div className="relative">
        <div id="hero">
          <Hero />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="templates-gallery">
          <TemplatesGallery />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Index;