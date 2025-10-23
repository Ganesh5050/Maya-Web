import React from 'react';
import { motion } from 'framer-motion';

interface VariableProximityProps {
  text: string;
  delay?: number;
  duration?: number;
  proximity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const VariableProximity: React.FC<VariableProximityProps> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  proximity = 0.5,
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
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: duration,
            delay: delay + index * proximity * 0.1,
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

export default VariableProximity;
