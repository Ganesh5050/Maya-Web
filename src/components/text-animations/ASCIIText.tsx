import React from 'react';
import { motion } from 'framer-motion';

interface ASCIITextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ASCIIText: React.FC<ASCIITextProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  const asciiChars = ['@', '#', '$', '%', '&', '*', '+', '=', '?', '!'];
  
  return (
    <motion.div
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + index * 0.05 }}
        >
          {char === ' ' ? ' ' : asciiChars[Math.floor(Math.random() * asciiChars.length)]}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default ASCIIText;
