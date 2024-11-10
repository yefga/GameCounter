import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GameCounterApp from './GameCounter';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GameCounterApp />
    </React.StrictMode>
  );
}
