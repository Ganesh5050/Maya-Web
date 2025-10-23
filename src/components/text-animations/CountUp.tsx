import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountUpProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CountUp: React.FC<CountUpProps> = ({ 
  text, 
  delay = 0, 
  duration = 2,
  className = "",
  style = {}
}) => {
  const [count, setCount] = useState(0);
  const targetNumber = parseInt(text) || 0;
  
  useEffect(() => {
    const increment = targetNumber / (duration * 60);
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= targetNumber) {
          clearInterval(interval);
          return targetNumber;
        }
        return Math.min(prev + increment, targetNumber);
      });
    }, 16);

    return () => clearInterval(interval);
  }, [targetNumber, duration]);

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {Math.floor(count)}
    </motion.div>
  );
};

export default CountUp;
