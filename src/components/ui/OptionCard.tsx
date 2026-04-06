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
      whileHover={{ scale: 1.006 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-[1.2rem] border transition-all duration-200 lg:rounded-[1.45rem] lg:px-6 lg:py-4.5 ${
        selected 
          ? 'border-pink-secondary bg-gradient-to-r from-white to-pink-primary/10 shadow-[0_16px_28px_rgba(182,106,77,0.14)] lg:shadow-[0_16px_26px_rgba(182,106,77,0.14)]' 
          : 'border-border-soft/90 bg-white/80 hover:border-pink-primary/60 hover:bg-white shadow-[0_10px_24px_rgba(37,29,28,0.05)] lg:shadow-[0_12px_24px_rgba(37,29,28,0.05)]'
      }`}
    >
      <div className="flex items-center gap-3 lg:gap-4.5">
        <span
          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors lg:h-6 lg:w-6 ${
            selected ? 'border-pink-secondary bg-pink-secondary' : 'border-border-soft bg-white'
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${selected ? 'bg-white' : 'bg-transparent'}`} />
        </span>
        <span className={`text-[15px] font-semibold leading-snug lg:text-[18px] lg:font-medium ${selected ? 'text-text-main' : 'text-text-secondary'}`}>
          {text}
        </span>
      </div>
    </motion.button>
  );
};
