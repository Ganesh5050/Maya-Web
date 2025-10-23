import React from 'react';
import { motion } from 'framer-motion';

interface ScrollVelocityProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{
        opacity: 1,
        scale: 1
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

export default ScrollVelocity;
