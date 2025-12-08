// src/main.jsx (FINAL MODIFIED CODE with SettingsProvider)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import App from './App.jsx';
import './index.css'; 

// CRITICAL FIX: Replaced 'require' (CommonJS) with 'import' (ES Module).
// This fixes the "require is not defined" error in the browser.
import { EMAILJS_CONFIG } from './config.js'; 

// 🎯 NEW: Import the SettingsProvider
import { SettingsProvider } from './context/SettingsContext.jsx'; 


// Initialize EmailJS globally and only once.
// The .USER_ID contains your EmailJS Public Key.
try {
  emailjs.init(EMAILJS_CONFIG.USER_ID); 
} catch (error) {
  console.error("Failed to initialize EmailJS. Check config.js and the USER_ID.", error);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Using HashRouter component for GitHub Pages compatibility */}
    <HashRouter> 
      {/* 🎯 NEW: Wrap the entire application with the SettingsProvider */}
      <SettingsProvider> 
        <App />
      </SettingsProvider>
    </HashRouter>
  </React.StrictMode>,
);