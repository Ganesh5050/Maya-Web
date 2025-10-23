import React from 'react';
import { motion } from 'framer-motion';

interface CircularTextProps {
  text: string;
  delay?: number;
  duration?: number;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CircularText: React.FC<CircularTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 1,
  radius = 80,
  className = "",
  style = {}
}) => {
  const characters = text.split('');
  const angleStep = (2 * Math.PI) / characters.length;

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: radius * 2, height: radius * 2, ...style }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration, delay: delay }}
    >
      {characters.map((char, index) => {
        const angle = index * angleStep - Math.PI / 2; // Start from top
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);
        
        return (
          <motion.span
            key={index}
            className="absolute text-sm font-bold"
            style={{
              left: x - 8, // Center the character
              top: y - 8,
              color: style.color || 'white',
              transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: duration, 
              delay: delay + index * 0.1,
              type: 'spring',
              stiffness: 200
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
