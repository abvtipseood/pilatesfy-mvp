import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-border-soft/40 rounded-full overflow-hidden relative shadow-inner">
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-primary to-pink-secondary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          type: "spring",
          stiffness: 45,
          damping: 12,
          mass: 0.6,
          restDelta: 0.001
        }}
      >
        {/* Subtle shine overlay for a premium, 3D-like feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
};
