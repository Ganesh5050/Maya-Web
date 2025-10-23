import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Globe Component
const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[2, 32, 32]}>
        <meshStandardMaterial
          color="#45d5ff"
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      const color = new THREE.Color().setHSL(
        Math.random() * 0.1 + 0.1,
        1,
        0.5 + Math.random() * 0.5
      );
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const ContactScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#45d5ff" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#ffd700" />
        
        <Globe />
        <ParticleField />
      </Canvas>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@maya-web.com",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us", 
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello",
      value: "San Francisco, CA",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

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
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Contact Us</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Let's build something
            <span className="holographic"> amazing together</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? Need help getting started? Our team is here to help 
            you bring your vision to life with Maya-Web.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="glass"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="glass"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="glass"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    required
                    className="glass resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="hero"
                  size="lg"
                  className="w-full group"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                      </motion.div>
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="glass rounded-2xl p-6 hover:shadow-glow-soft transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          {info.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {info.description}
                        </p>
                        <p className="text-sm font-medium">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="relative h-[600px] lg:h-[700px]"
          >
            <div className="absolute inset-0">
              <ContactScene />
            </div>

            {/* Floating UI Elements */}
            <motion.div
              className="absolute top-10 left-10 glass p-4 rounded-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono">RESPONSE TIME</span>
              </div>
              <div className="text-lg font-bold text-primary">24 hours</div>
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-10 glass p-4 rounded-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono">SUPPORT</span>
              </div>
              <div className="text-lg font-bold text-accent">Always Online</div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
