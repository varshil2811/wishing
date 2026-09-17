import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const LoveMailbox = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  return (
    <PageTransition>
      <div className="text-center w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            A Special Message
          </h2>
          <h3 className="text-2xl md:text-3xl font-serif text-romantic-pink">
            For You 💌
          </h3>
        </motion.div>

        <div className="relative h-64 w-full flex justify-center items-center mb-12">
          {/* Mailbox body */}
          <motion.div
            className="relative w-48 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-t-[3rem] shadow-2xl flex flex-col justify-end"
            animate={{ y: isOpen ? 10 : [0, -5, 0] }}
            transition={{ duration: isOpen ? 0.5 : 3, repeat: isOpen ? 0 : Infinity }}
          >
            {/* Stand */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-4 h-24 bg-zinc-800" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-16 h-2 bg-zinc-900 rounded-full" />
            
            {/* Mailbox Door */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-t-[3rem] border-2 border-red-900/50 flex items-center justify-center origin-bottom z-20"
              animate={{ rotateX: isOpen ? -90 : 0, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-12 h-4 bg-zinc-800 rounded-full absolute top-4 shadow-inner" />
              <Mail className="text-white/50 w-16 h-16" />
            </motion.div>

            {/* Inside of mailbox */}
            <div className="absolute inset-0 bg-zinc-900 rounded-t-[3rem] shadow-inner z-0 overflow-hidden flex items-end justify-center pb-2">
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: -40, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    className="w-32 h-20 bg-white rounded flex items-center justify-center relative shadow-lg"
                  >
                    <div className="absolute inset-0 border-2 border-red-100 m-1 rounded border-dashed" />
                    <Heart className="text-red-500 fill-red-500 w-8 h-8 z-10" />
                    {/* Envelope flap */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-t-[40px] border-t-white/90 drop-shadow-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button
                onClick={handleOpen}
                className="glass-panel px-8 py-4 rounded-full text-xl text-white hover:bg-white/10 transition-colors flex items-center gap-3 mx-auto group"
              >
                Open Me <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default LoveMailbox;
