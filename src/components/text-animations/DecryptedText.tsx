import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  delay?: number;
  duration?: number;
  decryptSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 2000,
  decryptSpeed = 50,
  className = "",
  style = {}
}) => {
  const [decryptedText, setDecryptedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDecryptedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, decryptSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, decryptSpeed]);

  useEffect(() => {
    setDecryptedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <motion.div
      className={`font-mono ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {decryptedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          █
        </motion.span>
      )}
    </motion.div>
  );
};

export default DecryptedText;
