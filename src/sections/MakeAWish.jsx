import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const MakeAWish = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <PageTransition>
      <div className="text-center max-w-2xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-romantic-rose to-white mb-8"
        >
          Make a Wish ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="text-xl md:text-2xl text-romantic-pink font-light italic"
        >
          I hope every wish you make<br/>finds its way to you. ❤️
        </motion.p>
      </div>
    </PageTransition>
  );
};

export default MakeAWish;
