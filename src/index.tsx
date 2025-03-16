import React from 'react';
import {Setting} from './const';
import App from './components/app/app';
import ReactDOM from 'react-dom/client';
import { offers } from './mocks/offers';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount = {Setting.OffersCount}
      offers = {offers}
    />
  </React.StrictMode>
);
