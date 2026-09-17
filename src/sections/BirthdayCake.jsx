import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import PageTransition from '../components/PageTransition';

const BirthdayCake = ({ config, onNext }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const numCandles = config.cake?.candles || 5;

  const handleCakeClick = () => {
    if (candlesBlown) return;
    
    setCandlesBlown(true);
    
    // Launch confetti
    if (config.effects?.confetti !== false) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d16a82', '#f5c6d3', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#d16a82', '#f5c6d3', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }

    setTimeout(() => {
      setShowButton(true);
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="text-center w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            {config.cake?.title || "Make a Wish, My Love 🎂❤️"}
          </h2>
          {!candlesBlown && (
            <p className="text-romantic-pink font-light italic">
              {config.cake?.subtitle || "Tap the cake to make a wish ✨"}
            </p>
          )}
        </motion.div>

        <div className="relative h-64 w-full flex justify-center items-end mb-16">
          <motion.div 
            className="relative cursor-pointer"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            onClick={handleCakeClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Candles */}
            <div className="absolute -top-12 left-0 w-full flex justify-center gap-3 md:gap-4 z-20 px-4">
              {Array.from({ length: numCandles }).map((_, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  <AnimatePresence>
                    {!candlesBlown && (
                      <motion.div
                        exit={{ opacity: 0, scale: 0, y: -10 }}
                        className="w-3 h-4 bg-orange-400 rounded-full blur-[1px] absolute -top-4 origin-bottom"
                        animate={{ 
                          scale: [1, 1.1, 0.9, 1.2, 1],
                          rotate: [-2, 2, -1, 3, 0] 
                        }}
                        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }}
                      >
                        <div className="w-1 h-2 bg-yellow-200 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {candlesBlown && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0], y: -20 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="absolute -top-6 w-2 h-6 bg-gray-400/50 blur-sm rounded-full"
                    />
                  )}
                  <div className="w-2.5 h-12 bg-gradient-to-b from-white to-pink-100 rounded-t-sm shadow-sm" />
                </div>
              ))}
            </div>

            {/* Cake Layers */}
            <div className="relative z-10 drop-shadow-2xl">
              {/* Top Layer */}
              <div className="w-48 h-20 bg-romantic-pink rounded-[50%] absolute -top-10 left-1/2 -translate-x-1/2 border-t border-white/20" />
              <div className="w-48 h-24 bg-romantic-red rounded-b-[50%] relative mx-auto" />
              
              {/* Middle Layer */}
              <div className="w-56 h-20 bg-romantic-rose rounded-[50%] absolute top-8 left-1/2 -translate-x-1/2 border-t border-white/20 z-[-1]" />
              <div className="w-56 h-24 bg-romantic-pink rounded-b-[50%] relative mx-auto -mt-12 z-[-1]" />
              
              {/* Bottom Layer */}
              <div className="w-64 h-24 bg-romantic-red rounded-[50%] absolute top-20 left-1/2 -translate-x-1/2 border-t border-white/20 z-[-2]" />
              <div className="w-64 h-28 bg-romantic-dark border border-romantic-red rounded-b-[50%] relative mx-auto -mt-12 z-[-2] shadow-[0_10px_40px_rgba(209,106,130,0.3)]" />
              
              {/* Plate */}
              <div className="w-72 h-16 bg-white/10 backdrop-blur-sm rounded-[50%] absolute -bottom-4 left-1/2 -translate-x-1/2 z-[-3] border border-white/20 shadow-xl" />
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-romantic-pink/20 blur-3xl rounded-full z-[-4]" />
          </motion.div>
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <button 
                onClick={onNext}
                className="text-romantic-rose font-serif text-xl md:text-2xl hover:text-white transition-colors"
              >
                Continue 💖
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default BirthdayCake;
