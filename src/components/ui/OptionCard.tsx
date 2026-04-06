import React from 'react';
import { motion } from 'motion/react';

interface OptionCardProps {
  text: string;
  selected?: boolean;
  onClick: () => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({ text, selected, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-[1.35rem] border transition-all duration-200 ${
        selected 
          ? 'border-pink-secondary bg-gradient-to-r from-white to-pink-primary/10 shadow-[0_16px_28px_rgba(182,106,77,0.14)]' 
          : 'border-border-soft/90 bg-white/78 hover:border-pink-primary/60 hover:bg-white shadow-[0_10px_24px_rgba(37,29,28,0.05)]'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <span
          className={`flex h-5.5 w-5.5 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected ? 'border-pink-secondary bg-pink-secondary' : 'border-border-soft bg-white'
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${selected ? 'bg-white' : 'bg-transparent'}`} />
        </span>
        <span className={`text-[16px] font-semibold leading-snug ${selected ? 'text-text-main' : 'text-text-secondary'}`}>
          {text}
        </span>
      </div>
    </motion.button>
  );
};
