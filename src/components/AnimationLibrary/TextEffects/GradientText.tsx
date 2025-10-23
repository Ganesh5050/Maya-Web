import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
  animate?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  className = '',
  gradient = 'from-purple-400 via-pink-500 to-red-500',
  animate = true
}) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient} font-bold`}
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </span>
      
      {animate && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-2xl opacity-30`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
};
