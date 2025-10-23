import React from 'react';
import { motion } from 'framer-motion';

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  gridSize?: number;
  strokeWidth?: number;
  gridColor?: string;
  fadeEffect?: boolean;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  className = '',
  children,
  gridSize = 50,
  strokeWidth = 1,
  gridColor = 'rgba(255, 255, 255, 0.05)',
  fadeEffect = true
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-pattern"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <motion.path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke={gridColor}
                strokeWidth={strokeWidth}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </pattern>
            
            {fadeEffect && (
              <radialGradient id="grid-gradient">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            )}
          </defs>
          
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-pattern)"
            mask={fadeEffect ? 'url(#grid-gradient)' : undefined}
          />
        </svg>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--background)_70%)]" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
