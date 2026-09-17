import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className={`min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
