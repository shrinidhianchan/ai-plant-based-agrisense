// frontend/src/main.jsx (or similar)

import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. CHANGE THIS IMPORT
import { HashRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css'; // assuming you have this line

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. AND CHANGE THIS COMPONENT */}
    <HashRouter> 
      <App />
    </HashRouter>
  </React.StrictMode>,
);