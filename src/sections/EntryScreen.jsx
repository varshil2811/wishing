import React from 'react';
import { motion } from 'framer-motion';
import GlassButton from '../components/GlassButton';
import PageTransition from '../components/PageTransition';
import { Heart } from 'lucide-react';

const EntryScreen = ({ onNext }) => {
  return (
    <PageTransition>
      <div className="text-center max-w-md mx-auto w-full relative">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Heart size={64} className="text-romantic-pink fill-romantic-pink opacity-80" />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 text-romantic-pink fill-romantic-pink"
            >
              <Heart size={64} />
            </motion.div>
          </div>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-12 leading-tight">
          Scan This For A<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-romantic-pink to-romantic-rose">
            Little Surprise
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <GlassButton onClick={onNext} className="w-full sm:w-auto mx-auto">
            Open My Surprise <Heart size={20} className="text-romantic-pink fill-romantic-pink ml-2" />
          </GlassButton>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default EntryScreen;
