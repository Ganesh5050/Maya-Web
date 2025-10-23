import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  delay?: number;
  duration?: number;
  shineWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 2,
  shineWidth = 100,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        style={{ width: shineWidth }}
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <span className="relative z-10">{text}</span>
    </motion.div>
  );
};

export default ShinyText;
