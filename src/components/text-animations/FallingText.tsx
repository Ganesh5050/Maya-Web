import React from 'react';
import { motion } from 'framer-motion';

interface FallingTextProps {
  text: string;
  delay?: number;
  duration?: number;
  fallHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FallingText: React.FC<FallingTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 1,
  fallHeight = 100,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  
  return (
    <div className={`flex ${className}`} style={style}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: -fallHeight, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: duration,
            delay: delay + index * 0.1,
            type: 'spring',
            stiffness: 200
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

export default FallingText;
