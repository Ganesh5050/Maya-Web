import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  duration?: number;
  blurAmount?: number;
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8, 
  blurAmount = 10,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ filter: `blur(${blurAmount}px)`, opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
    >
      {text}
    </motion.div>
  );
};

export default BlurText;
