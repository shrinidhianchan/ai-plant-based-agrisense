// src/context/SettingsContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const SettingsContext = createContext();

// Utility function to get the initial theme from local storage or default
const getInitialTheme = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  // Default to light if no preference is found
  return 'light';
};

// Utility function to get the initial language from local storage or default
const getInitialLanguage = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('language')) {
    return localStorage.getItem('language');
  }
  // Default to English
  return 'en';
};

// Provider component
export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);

  // Effect to apply theme class to the document body and save to local storage
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    // Update localStorage
    localStorage.setItem('theme', theme);
    
    // Update the class on the root element (for Tailwind CSS dark mode)
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Effect to save language to local storage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Functions to toggle/change settings
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
  };

  const contextValue = {
    theme,
    toggleTheme,
    language,
    changeLanguage,
    // Add translation data here (see step 3)
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook for components to easily access the settings
export const useSettings = () => {
  return useContext(SettingsContext);
};