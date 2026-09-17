import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassButton from '../components/GlassButton';

const PhotoMemories = ({ config, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const photos = config.photos || [];

  useEffect(() => {
    // Preload next image
    if (currentIndex < photos.length - 1) {
      const img = new Image();
      img.src = photos[currentIndex + 1].src;
    }
    setIsLoaded(true);
  }, [currentIndex, photos]);

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (photos.length === 0) {
    return (
      <PageTransition>
        <GlassButton onClick={onNext}>Continue</GlassButton>
      </PageTransition>
    );
  }

  const currentPhoto = photos[currentIndex];

  return (
    <PageTransition className="p-0">
      <div className="w-full h-[100dvh] relative flex items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex flex-col"
          >
            {/* Blurred Background to fill space beautifully */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src={currentPhoto.src}
                alt=""
                className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
                style={{
                  animation: 'ken-burns 20s ease-out forwards',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/20 z-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            </div>
            
            {/* Main Content Layout */}
            <div className="relative z-10 flex flex-col h-full w-full">
              {/* Image Container - Flex-1 makes it take all remaining space above text */}
              <div className="flex-1 w-full px-4 pt-20 pb-6 flex items-center justify-center min-h-0 pointer-events-none">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.title || "Memory"}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{
                    animation: 'ken-burns 20s ease-out forwards',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Text Card Container - Sits at the bottom above controls */}
              <div className="w-full px-6 pb-32 md:pb-36 flex-shrink-0 text-center pointer-events-none z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="glass-panel p-6 md:p-8 rounded-3xl max-w-2xl w-full mx-auto shadow-xl"
                >
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-3 drop-shadow-md">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-lg md:text-xl text-romantic-rose font-light italic drop-shadow-sm">
                    "{currentPhoto.caption}"
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls Overlay */}
        <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between p-6">
          <div className="flex justify-center pt-8">
            <div className="flex gap-2">
              {photos.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentIndex ? 'w-8 bg-romantic-pink' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-end pb-12 pointer-events-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-4 rounded-full glass-panel transition-all ${
                currentIndex === 0 ? 'opacity-0 translate-x-4' : 'opacity-100 hover:bg-white/10'
              }`}
            >
              <ChevronLeft className="text-white" size={24} />
            </button>
            
            <button
              onClick={handleNext}
              className="p-4 rounded-full glass-panel hover:bg-white/10 transition-all group flex items-center gap-2"
            >
              {currentIndex === photos.length - 1 && (
                <span className="text-white font-medium pl-2 hidden sm:block">
                  Next
                </span>
              )}
              {currentIndex === photos.length - 1 ? (
                <Heart size={24} className="text-romantic-pink" />
              ) : (
                <ChevronRight className="text-white" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
      `}} />
    </PageTransition>
  );
};

export default PhotoMemories;
