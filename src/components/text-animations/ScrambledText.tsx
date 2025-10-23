import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScrambledTextProps {
  text: string;
  delay?: number;
  duration?: number;
  scrambleSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 2000,
  scrambleSpeed = 100,
  className = "",
  style = {}
}) => {
  const [scrambledText, setScrambledText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  
  useEffect(() => {
    setIsScrambling(true);
    const interval = setInterval(() => {
      setScrambledText(prev => {
        return prev.split('').map(char => {
          if (char === ' ') return ' ';
          return String.fromCharCode(65 + Math.random() * 26);
        }).join('');
      });
    }, scrambleSpeed);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setScrambledText(text);
      setIsScrambling(false);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, duration, scrambleSpeed]);

  return (
    <motion.div
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {scrambledText}
    </motion.div>
  );
};

export default ScrambledText;
