import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicController = ({ musicConfig }) => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isVisible, setIsVisible] = useState(false); 
  const audioRef = useRef(null);

  useEffect(() => {
    if (!musicConfig?.enabled) return;

    const audio = new Audio(musicConfig.src);
    audio.loop = true;
    audio.volume = musicConfig.volume || 0.35;
    audioRef.current = audio;

    const attemptPlay = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsVisible(true);
          // If successful, we don't need the interaction listeners anymore
          document.removeEventListener('click', attemptPlay);
          document.removeEventListener('touchstart', attemptPlay);
        }).catch(err => {
          console.log("Autoplay blocked by browser, waiting for interaction:", err);
          // Intentionally do not show the button yet. 
          // The button will appear (unmuted) as soon as the user interacts with the page (e.g., clicks 'Start').
        });
      }
    };

    // Try to play immediately on load
    attemptPlay();

    // Fallback: if browser blocks immediate autoplay, wait for the first click/touch
    document.addEventListener('click', attemptPlay);
    document.addEventListener('touchstart', attemptPlay);

    return () => {
      document.removeEventListener('click', attemptPlay);
      document.removeEventListener('touchstart', attemptPlay);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [musicConfig]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!musicConfig?.enabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-6 right-6 z-50"
        >
          <button
            onClick={toggleMute}
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-romantic-cream hover:bg-white/10 transition-colors"
            aria-label={isPlaying ? "Mute music" : "Play music"}
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicController;
