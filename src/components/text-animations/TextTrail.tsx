import React from 'react';
import { motion } from 'framer-motion';

interface TextTrailProps {
  text: string;
  delay?: number;
  duration?: number;
  trailLength?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TextTrail: React.FC<TextTrailProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  trailLength = 5,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  
  return (
    <div className={`flex ${className}`} style={style}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration,
            delay: delay + index * 0.1
          }}
        >
          {char}
          {/* Trail effect */}
          {Array.from({ length: trailLength }).map((_, trailIndex) => (
            <motion.span
              key={trailIndex}
              className="absolute inset-0"
              style={{
                opacity: 0.3 - (trailIndex * 0.05),
                transform: `translateY(${(trailIndex + 1) * 2}px)`
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </div>
  );
};

export default TextTrail;
