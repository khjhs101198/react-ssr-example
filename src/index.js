import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import StreamingApp from './StreamingApp';
import './index.css';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

switch (process.env.REACT_APP_MODE) {
  case 'no-stream':
    hydrateRoot(document.getElementById('root'), app);

    break;
  case 'stream':
    hydrateRoot(document, <StreamingApp server={false} />);

    break;
  default:
    const root = createRoot(document.getElementById('root'));

    root.render(app);

    break;
}

