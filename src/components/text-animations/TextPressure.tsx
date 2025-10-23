import React from 'react';
import { motion } from 'framer-motion';

interface TextPressureProps {
  text: string;
  delay?: number;
  duration?: number;
  pressure?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TextPressure: React.FC<TextPressureProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  pressure = 0.5,
  className = "",
  style = {}
}) => {
  const words = text.split(' ');
  
  return (
    <div className={`flex flex-wrap justify-center items-center gap-2 ${className}`} style={style}>
      {words.map((word, wordIndex) => (
        <motion.div
          key={wordIndex}
          className="flex gap-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: duration,
            delay: delay + wordIndex * 0.1,
            type: 'spring',
            stiffness: 200,
            damping: 20
          }}
        >
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default TextPressure;
