import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TextCursorProps {
  text: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TextCursor: React.FC<TextCursorProps> = ({ 
  text, 
  delay = 0, 
  speed = 100,
  cursor = true,
  className = "",
  style = {}
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {displayText}
      {cursor && showCursor && (
        <span className="ml-1">|</span>
      )}
    </motion.div>
  );
};

export default TextCursor;
