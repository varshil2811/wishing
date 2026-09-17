import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import birthdayConfig from './config/birthdayConfig';

// Components
import ParticleBackground from './components/ParticleBackground';
import MusicController from './components/MusicController';

// Sections
import WelcomeScreen from './sections/WelcomeScreen';
import BirthdayCountdown from './sections/BirthdayCountdown';
import PhotoMemories from './sections/PhotoMemories';
import BirthdayCake from './sections/BirthdayCake';
import MakeAWish from './sections/MakeAWish';
import BirthdayReveal from './sections/BirthdayReveal';
import LoveMailbox from './sections/LoveMailbox';
import LoveLetter from './sections/LoveLetter';
import FinalSurprise from './sections/FinalSurprise';

// Pages
import QRGenerator from './pages/QRGenerator';

const SECTIONS = [
  WelcomeScreen,
  BirthdayCountdown,
  PhotoMemories,
  BirthdayCake,
  MakeAWish,
  BirthdayReveal,
  LoveMailbox,
  LoveLetter,
  FinalSurprise
];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isQRPage, setIsQRPage] = useState(false);

  useEffect(() => {
    // Basic routing
    if (window.location.pathname === '/qr') {
      setIsQRPage(true);
    }
  }, []);

  const handleNext = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  if (isQRPage) {
    return <QRGenerator />;
  }

  const CurrentComponent = SECTIONS[currentSection];

  return (
    <div className="relative min-h-screen bg-romantic-dark text-romantic-cream overflow-hidden selection:bg-romantic-pink/30 selection:text-white">
      {/* Background Effects */}
      <ParticleBackground config={birthdayConfig.effects} />
      
      {/* Music Controller */}
      <MusicController musicConfig={birthdayConfig.music} />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <CurrentComponent 
          key={currentSection} 
          config={birthdayConfig} 
          onNext={handleNext} 
        />
      </AnimatePresence>

      {/* Progress Indicator (subtle) */}
      {currentSection > 0 && currentSection < SECTIONS.length - 1 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-40 pointer-events-none">
          {SECTIONS.slice(1, -1).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentSection - 1 
                  ? 'w-4 bg-romantic-pink' 
                  : 'w-1 bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
