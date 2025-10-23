import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className = '',
  children,
  showRadialGradient = true
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora effect */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Aurora wave 1 */}
          <motion.div
            className="absolute inset-0 opacity-50"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
                'radial-gradient(circle at 60% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Aurora wave 2 */}
          <motion.div
            className="absolute inset-0 opacity-50"
            animate={{
              background: [
                'radial-gradient(circle at 80% 30%, rgba(236, 72, 153, 0.3), transparent 50%)',
                'radial-gradient(circle at 40% 70%, rgba(236, 72, 153, 0.3), transparent 50%)',
                'radial-gradient(circle at 80% 30%, rgba(236, 72, 153, 0.3), transparent 50%)',
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Aurora wave 3 */}
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              background: [
                'radial-gradient(circle at 50% 80%, rgba(167, 139, 250, 0.3), transparent 50%)',
                'radial-gradient(circle at 50% 20%, rgba(167, 139, 250, 0.3), transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(167, 139, 250, 0.3), transparent 50%)',
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>

      {/* Radial gradient overlay */}
      {showRadialGradient && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_var(--background)_80%)]" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
