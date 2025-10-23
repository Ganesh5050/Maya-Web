import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  delay?: number;
  duration?: number;
  gradient?: string;
  className?: string;
  style?: React.CSSProperties;
}

const GradientText: React.FC<GradientTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  gradient = "from-purple-400 via-pink-500 to-red-500",
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
    >
      {text}
    </motion.div>
  );
};

export default GradientText;
