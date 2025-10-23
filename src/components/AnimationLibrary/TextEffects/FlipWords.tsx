import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords: React.FC<FlipWordsProps> = ({
  words,
  duration = 3000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.645, 0.045, 0.355, 1.0]
          }}
          style={{ transformOrigin: 'center center' }}
          className="inline-block font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          {words[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
