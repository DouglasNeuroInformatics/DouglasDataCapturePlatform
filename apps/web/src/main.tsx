import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';
import './styles.css';
import './i18n';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
