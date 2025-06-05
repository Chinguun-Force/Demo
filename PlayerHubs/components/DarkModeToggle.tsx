"use client";

import React from 'react';
import { useThemeStore } from '@/store/themeStore';
import { motion } from 'framer-motion';

const DarkModeToggle = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(darkMode ? 'light' : 'dark');
    root.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="flex items-center justify-center w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer"
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="w-4 h-4 bg-white dark:bg-black rounded-full shadow-md"
        layout
        transition={{ type: 'spring', stiffness: 300 }}
      />
    </motion.button>
  );
};

export default DarkModeToggle; 