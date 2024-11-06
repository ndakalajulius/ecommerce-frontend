import React from 'react';
import ReactDOM from 'react-dom/client';  // Notice the new import path
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
