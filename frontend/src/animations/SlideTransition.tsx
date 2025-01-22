// src/animations/SlideTransition.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction: 'left' | 'right';
  keyProp: string; // Used for triggering re-renders
}

const SlideTransition: React.FC<SlideTransitionProps> = ({ children, direction, keyProp }) => {
  const slideVariants = {
    initial: (custom: 'left' | 'right') => ({
      x: custom === 'left' ? '-100%' : '100%', // Start off-screen
    }),
    animate: {
      x: 0, // Center
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4, // Adjust duration to match exit
      },
    },
    exit: (custom: 'left' | 'right') => ({
      x: custom === 'left' ? '100%' : '-100%', // Exit off-screen
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4, // Match the animate duration
      },
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={keyProp}
        className="w-full"
        custom={direction}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideTransition;

