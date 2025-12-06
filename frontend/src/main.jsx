import React from 'react';
import ReactDOM from 'react-dom/client';
// CHANGE THE IMPORT HERE
import { HashRouter } from 'react-router-dom'; 
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CHANGE THE COMPONENT HERE */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);