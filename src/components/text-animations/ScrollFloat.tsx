import React from 'react';
import { motion } from 'framer-motion';

interface ScrollFloatProps {
  text: string;
  delay?: number;
  duration?: number;
  floatHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  floatHeight = 20,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.span
        animate={{
          y: [-floatHeight, floatHeight, -floatHeight]
        }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default ScrollFloat;
