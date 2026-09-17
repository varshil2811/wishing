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
      <div className="w-full h-screen relative flex items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Fallback color/gradient if image fails or before loading */}
            <div className="absolute inset-0 bg-gradient-to-b from-romantic-dark/80 to-romantic-dark z-0" />
            
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title || "Memory"}
              className="absolute inset-0 w-full h-full object-cover opacity-60 z-10"
              style={{
                animation: 'ken-burns 20s ease-out forwards',
              }}
              onError={(e) => {
                e.target.style.display = 'none'; // hide broken image, fallback gradient shows
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />
            
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-24 px-6 md:pb-32 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="glass-panel p-6 md:p-8 rounded-3xl max-w-2xl w-full mx-auto"
              >
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">
                  {currentPhoto.title}
                </h3>
                <p className="text-lg md:text-xl text-romantic-rose font-light italic">
                  "{currentPhoto.caption}"
                </p>
              </motion.div>
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
          
          <div className="flex justify-between items-end pb-8 pointer-events-auto">
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
              <span className="text-white font-medium pl-2 hidden sm:block">
                {currentIndex === photos.length - 1 ? 'Next' : ''}
              </span>
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
