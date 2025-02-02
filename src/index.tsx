import React from 'react';
import App from './components/app/app';
import ReactDOM from 'react-dom/client';
import {Setting} from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placeCardsCount = {Setting.PlaceCardsCount}
    />
  </React.StrictMode>
);
