import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const FinalSurprise = ({ config }) => {
  const finalTitle = config.final?.title || "Forever & Always ❤️";
  const finalQuote = config.final?.quote || "My favorite place is wherever I am with you.";
  let finalMessage = config.final?.birthdayMessage || "Happy Birthday, My Beautiful Wife ❤️";
  finalMessage = finalMessage.replace('${wifeName}', config.wifeName);

  return (
    <PageTransition className="justify-between py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-romantic-red/20 via-transparent to-transparent z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-center z-10 w-full px-4"
      >
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
          {finalTitle}
        </h1>
        <p className="text-xl md:text-2xl text-romantic-rose font-light italic max-w-2xl mx-auto">
          "{finalQuote}"
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="z-10 text-center w-full px-4"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-romantic-pink to-white mb-16">
          {finalMessage}
        </h2>
        
        <div className="relative flex justify-center items-center h-32">
          {/* Pulsing glow */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-32 h-32 bg-romantic-red rounded-full blur-[40px] pointer-events-none"
          />
          
          {/* Main Heart */}
          <motion.div
            className="animate-beat text-romantic-red drop-shadow-[0_0_15px_rgba(209,106,130,0.8)]"
          >
            <Heart size={80} className="fill-romantic-red" />
          </motion.div>

          {/* Floating tiny hearts */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-romantic-pink"
              initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
              animate={{ 
                y: -100 - Math.random() * 50, 
                x: (Math.random() - 0.5) * 100,
                opacity: [0, 1, 0],
                scale: [0, Math.random() + 0.5, 0],
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            >
              <Heart size={16} className="fill-romantic-pink" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default FinalSurprise;
