import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  direction = "up",
  className = "",
  style = {}
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 100, opacity: 0 };
      case "down": return { y: -100, opacity: 0 };
      case "left": return { x: 100, opacity: 0 };
      case "right": return { x: -100, opacity: 0 };
      default: return { y: 100, opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={getInitialPosition()}
      whileInView={{
        y: 0,
        x: 0,
        opacity: 1
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut'
      }}
      viewport={{ once: true }}
    >
      {text}
    </motion.div>
  );
};

export default ScrollReveal;
