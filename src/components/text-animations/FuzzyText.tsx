import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FuzzyTextProps {
  text: string;
  delay?: number;
  duration?: number;
  fuzziness?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  fuzziness = 0.1,
  className = "",
  style = {}
}) => {
  const [fuzzyText, setFuzzyText] = useState(text);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFuzzyText(text.split('').map(char => {
        if (char === ' ') return ' ';
        return Math.random() < fuzziness ? 
          String.fromCharCode(65 + Math.random() * 26) : char;
      }).join(''));
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setFuzzyText(text);
    }, duration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, duration, fuzziness]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {fuzzyText}
    </motion.div>
  );
};

export default FuzzyText;
