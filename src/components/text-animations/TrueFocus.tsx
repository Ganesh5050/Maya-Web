import React from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  text: string;
  delay?: number;
  duration?: number;
  focusIntensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TrueFocus: React.FC<TrueFocusProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  focusIntensity = 0.5,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration, delay: delay }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, focusIntensity, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <span className="relative z-10">{text}</span>
    </motion.div>
  );
};

export default TrueFocus;
