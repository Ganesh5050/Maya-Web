import React from 'react';
import { motion } from 'framer-motion';

interface CurvedLoopProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CurvedLoop: React.FC<CurvedLoopProps> = ({ 
  text, 
  delay = 0, 
  duration = 3,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <motion.div
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="inline-block"
      >
        {text}
      </motion.div>
    </motion.div>
  );
};

export default CurvedLoop;
