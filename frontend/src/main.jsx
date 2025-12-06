// frontend/src/main.jsx (or wherever your router is defined)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ADD THE basename PROP HERE: */}
    <BrowserRouter basename="/ai-plant-based-agrisense">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);