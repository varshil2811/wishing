import React from 'react';
import { motion } from 'framer-motion';
import GlassButton from '../components/GlassButton';
import PageTransition from '../components/PageTransition';

const WelcomeScreen = ({ config, onNext }) => {
  return (
    <PageTransition>
      <div className="text-center max-w-2xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white to-romantic-rose mb-6"
        >
          {config.welcome.title}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="text-xl md:text-2xl text-romantic-pink font-light mb-8 italic"
        >
          {config.welcome.subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3.5 }}
          className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 font-light"
        >
          {config.welcome.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 5 }}
        >
          <GlassButton onClick={onNext} className="mx-auto">
            Start Surprise 💝
          </GlassButton>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default WelcomeScreen;
