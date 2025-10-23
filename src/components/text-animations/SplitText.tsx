import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  easing?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8, 
  stagger = 0.05,
  direction = "up",
  distance = 50,
  easing = "easeOut",
  className = "",
  style = {}
}) => {
  const words = text.split(' ');
  
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: distance, opacity: 0 };
      case "down": return { y: -distance, opacity: 0 };
      case "left": return { x: distance, opacity: 0 };
      case "right": return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case "up": return { y: 0, opacity: 1 };
      case "down": return { y: 0, opacity: 1 };
      case "left": return { x: 0, opacity: 1 };
      case "right": return { x: 0, opacity: 1 };
      default: return { y: 0, opacity: 1 };
    }
  };

  return (
    <div className={`flex flex-wrap justify-center items-center gap-2 ${className}`} style={style}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex gap-1">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              initial={getInitialPosition()}
              animate={getFinalPosition()}
              transition={{
                duration: duration,
                delay: delay + (wordIndex * 0.1) + (letterIndex * stagger),
                ease: easing
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SplitText;
