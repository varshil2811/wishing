import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassButton from '../components/GlassButton';

const LoveLetter = ({ config, onNext }) => {
  const [showButton, setShowButton] = useState(false);
  
  const letter = config.loveLetter;

  useEffect(() => {
    // Show continue button after reading time (rough estimate based on paragraphs)
    const timeToRead = (letter.paragraphs.length * 2000) + 3000;
    const timer = setTimeout(() => {
      setShowButton(true);
    }, timeToRead);
    return () => clearTimeout(timer);
  }, [letter]);

  return (
    <PageTransition className="p-4 md:p-8">
      <div className="w-full max-w-2xl mx-auto h-[80vh] flex flex-col justify-center">
        <motion.div
          initial={{ y: 100, opacity: 0, rotateX: 20 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="paper-texture bg-romantic-cream p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 text-romantic-pink/30"><Heart size={20} /></div>
          <div className="absolute top-4 right-4 text-romantic-pink/30"><Heart size={20} /></div>
          <div className="absolute bottom-4 left-4 text-romantic-pink/30"><Heart size={20} /></div>
          <div className="absolute bottom-4 right-4 text-romantic-pink/30"><Heart size={20} /></div>

          <div className="font-handwriting text-2xl md:text-3xl text-romantic-dark leading-relaxed space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              {letter.greeting}
            </motion.p>
            
            {letter.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + (i * 1.5), duration: 1 }}
                className="indent-8"
              >
                {p}
              </motion.p>
            ))}

            <div className="pt-8 text-right space-y-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 + (letter.paragraphs.length * 1.5) + 1, duration: 1 }}
              >
                {letter.closing}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 + (letter.paragraphs.length * 1.5) + 2, duration: 1 }}
                className="text-3xl md:text-4xl text-romantic-red font-bold"
              >
                {letter.signature}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex justify-center"
        >
          <GlassButton onClick={onNext} className={`pointer-events-${showButton ? 'auto' : 'none'}`}>
            Continue 💖
          </GlassButton>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default LoveLetter;
