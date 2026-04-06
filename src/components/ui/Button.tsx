import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'lg', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold tracking-[0.01em] transition-all duration-300 rounded-[1.35rem] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-pink-secondary via-pink-primary to-[#e6c8b7] text-white shadow-[0_16px_40px_rgba(182,106,77,0.28)] hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(182,106,77,0.34)] focus:ring-pink-secondary",
    secondary: "bg-white/70 text-text-main border border-white/80 shadow-[0_10px_30px_rgba(37,29,28,0.06)] hover:bg-white focus:ring-sand-soft",
    outline: "border-2 border-border-soft bg-white/50 text-text-main hover:border-pink-primary hover:bg-white/80 focus:ring-pink-primary"
  };

  const sizes = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-6 py-3.5 text-base",
    lg: "px-8 py-4.5 text-lg"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
