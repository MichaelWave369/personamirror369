import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { registerServiceWorker } from './registerServiceWorker';
import './styles.css';
import './styles-v04.css';
import './styles-v12.css';
import './styles-v13.css';
import './styles-v14.css';
import './styles-v15.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

registerServiceWorker();
