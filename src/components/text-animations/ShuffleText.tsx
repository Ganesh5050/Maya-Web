import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ShuffleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  shuffleSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ShuffleText: React.FC<ShuffleTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 2000,
  shuffleSpeed = 100,
  className = "",
  style = {}
}) => {
  const [shuffledText, setShuffledText] = useState(text);
  const [isShuffling, setIsShuffling] = useState(false);
  
  useEffect(() => {
    setIsShuffling(true);
    const interval = setInterval(() => {
      setShuffledText(prev => {
        return prev.split('').map(char => {
          if (char === ' ') return ' ';
          return String.fromCharCode(33 + Math.random() * 94);
        }).join('');
      });
    }, shuffleSpeed);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShuffledText(text);
      setIsShuffling(false);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, duration, shuffleSpeed]);

  return (
    <motion.div
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {shuffledText}
    </motion.div>
  );
};

export default ShuffleText;
