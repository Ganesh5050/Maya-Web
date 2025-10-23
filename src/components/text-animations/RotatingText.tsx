import React from 'react';
import { motion } from 'framer-motion';

interface RotatingTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const RotatingText: React.FC<RotatingTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 2,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.span
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default RotatingText;
