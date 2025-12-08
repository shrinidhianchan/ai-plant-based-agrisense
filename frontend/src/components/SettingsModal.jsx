// src/components/SettingsModal.jsx

import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../data/translations';
import { Moon, Sun, Globe } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const { theme, toggleTheme, language, changeLanguage } = useSettings();
  const t = translations[language].settings; // Get settings translations

  if (!isOpen) return null;

  return (
    // Simple overlay backdrop for demonstration
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 shadow-xl transform transition-transform duration-300 translate-x-0"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">{t.title}</h2>

        {/* --- 1. Language Changer --- */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 mr-3 text-agri-gold" />
            <h3 className="text-xl font-semibold">{t.language}</h3>
          </div>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            <option value="en">{t.langEnglish}</option>
            <option value="kn">{t.langKannada}</option>
            <option value="hi">{t.langHindi}</option>
          </select>
        </div>

        {/* --- 2. Dark/Light Mode Toggle --- */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center mb-4">
            {theme === 'dark' ? <Moon className="w-6 h-6 mr-3 text-agri-gold" /> : <Sun className="w-6 h-6 mr-3 text-agri-gold" />}
            <h3 className="text-xl font-semibold">{t.theme}</h3>
          </div>
          <div className="flex justify-between items-center">
            <span>{theme === 'dark' ? t.themeDark : t.themeLight}</span>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-agri-gold text-white font-bold rounded-lg hover:opacity-90 transition-colors shadow-md"
            >
              {theme === 'dark' ? t.themeLight : t.themeDark}
            </button>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}