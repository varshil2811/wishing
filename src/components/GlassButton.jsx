import React from 'react';
import { motion } from 'framer-motion';

const GlassButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative overflow-hidden glass-panel px-8 py-4 rounded-full text-lg sm:text-xl font-medium tracking-wide flex items-center justify-center gap-2 group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-romantic-pink/20 to-romantic-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
      {/* Ripple effect base */}
      <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-150 transition-transform duration-500 ease-out origin-center" />
    </motion.button>
  );
};

export default GlassButton;
