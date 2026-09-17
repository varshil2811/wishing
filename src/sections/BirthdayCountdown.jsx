import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassButton from '../components/GlassButton';
import PageTransition from '../components/PageTransition';

const BirthdayCountdown = ({ config, onNext }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [status, setStatus] = useState('counting'); // 'counting', 'today', 'past'

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Create date objects ignoring timezones to compare strictly by local dates
      const today = new Date();
      // Ensure we compare start of day for both
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      const [year, month, day] = config.birthday.split('-');
      const bday = new Date(year, month - 1, day);
      
      const difference = bday.getTime() - todayDate.getTime();
      
      if (difference === 0) {
        setStatus('today');
        return;
      } else if (difference < 0) {
        setStatus('past');
        return;
      }

      // If future date, calculate precise difference from now to midnight of that day
      const preciseDifference = bday.getTime() - new Date().getTime();
      
      if (preciseDifference <= 0) {
        setStatus('today');
        return;
      }

      setTimeLeft({
        days: Math.floor(preciseDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((preciseDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((preciseDifference / 1000 / 60) % 60),
        seconds: Math.floor((preciseDifference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [config.birthday]);

  const formattedDate = new Date(config.birthday).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <PageTransition>
      <div className="text-center w-full max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl text-romantic-pink font-light tracking-widest mb-4">
            {formattedDate}
          </h2>
          <h1 className="text-4xl md:text-5xl font-serif text-white">
            Your Special Day ❤️
          </h1>
        </motion.div>

        {status === 'counting' && (
          <div className="grid grid-cols-4 gap-2 md:gap-6 mb-16 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                className="glass-panel rounded-2xl p-3 md:p-6 flex flex-col items-center justify-center"
              >
                <div className="text-3xl md:text-5xl font-serif text-white mb-2 tabular-nums">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-romantic-pink font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {status === 'today' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mb-16 text-3xl md:text-5xl font-serif text-romantic-rose"
          >
            Today is Your Day ❤️
          </motion.div>
        )}

        {status === 'past' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mb-16 text-2xl md:text-4xl font-serif text-romantic-rose leading-relaxed"
          >
            Your Special Day<br/>Will Always Be Special ❤️
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: status === 'counting' ? 2.5 : 2 }}
        >
          <GlassButton onClick={onNext} className="mx-auto">
            Continue 💖
          </GlassButton>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default BirthdayCountdown;
