import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-[7px] lg:h-2 bg-border-soft/40 rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(108,99,99,0.08)]">
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-primary via-pink-secondary to-[#e8c9b4] rounded-full shadow-[0_4px_12px_rgba(221,183,191,0.28)]"
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
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
};
