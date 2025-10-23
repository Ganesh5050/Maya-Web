import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  delay?: number;
  duration?: number;
  glitchIntensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  glitchIntensity = 0.1,
  className = "",
  style = {}
}) => {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * glitchIntensity * 10,
        y: (Math.random() - 0.5) * glitchIntensity * 10
      });
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setGlitchOffset({ x: 0, y: 0 });
    }, duration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [glitchIntensity, duration]);

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
        filter: `hue-rotate(${glitchOffset.x * 10}deg)`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {text}
    </motion.div>
  );
};

export default GlitchText;
