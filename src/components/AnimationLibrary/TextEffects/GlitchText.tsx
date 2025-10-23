import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  glitchIntensity = 'medium'
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const intensityMap = {
    low: { x: 2, y: 2 },
    medium: { x: 5, y: 5 },
    high: { x: 10, y: 10 }
  };

  const intensity = intensityMap[glitchIntensity];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.span
        animate={isGlitching ? {
          x: [0, -intensity.x, intensity.x, -intensity.x, 0],
          y: [0, intensity.y, -intensity.y, intensity.y, 0],
        } : {}}
        transition={{ duration: 0.2 }}
        className="relative z-10 font-bold"
      >
        {text}
      </motion.span>

      {/* Glitch layer 1 - Cyan */}
      {isGlitching && (
        <motion.span
          className="absolute top-0 left-0 font-bold text-cyan-500 opacity-70"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
          animate={{
            x: [-intensity.x, intensity.x, -intensity.x],
            opacity: [0.7, 0.5, 0.7],
          }}
          transition={{ duration: 0.15, repeat: 2 }}
        >
          {text}
        </motion.span>
      )}

      {/* Glitch layer 2 - Red */}
      {isGlitching && (
        <motion.span
          className="absolute top-0 left-0 font-bold text-red-500 opacity-70"
          style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
          animate={{
            x: [intensity.x, -intensity.x, intensity.x],
            opacity: [0.7, 0.5, 0.7],
          }}
          transition={{ duration: 0.15, repeat: 2 }}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
};
