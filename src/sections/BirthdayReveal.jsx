import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import GlassButton from '../components/GlassButton';

const BirthdayReveal = ({ config, onNext }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(1);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const revealTitle = config.reveal?.title || `Happy Birthday, My Beautiful Wife ❤️`;
  // Replace the placeholder if used in config
  const finalTitle = revealTitle.replace('${wifeName}', config.wifeName);

  return (
    <PageTransition>
      <div className="text-center w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.h2
              key="wait"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 1 }}
              className="text-3xl md:text-5xl font-serif text-white/70 italic"
            >
              Wait...
            </motion.h2>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Soft spotlight behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-romantic-pink/20 rounded-full blur-[100px] pointer-events-none" />
              
              <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-romantic-rose to-romantic-pink mb-12 leading-tight drop-shadow-lg">
                {finalTitle.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== finalTitle.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <GlassButton onClick={onNext}>
                  Continue 💖
                </GlassButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default BirthdayReveal;
