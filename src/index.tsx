import React from 'react';
import { store } from './store/index';
import { Provider } from 'react-redux';
import App from './components/app/app';
import ReactDOM from 'react-dom/client';
import { offers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers = {offers}
      />
    </Provider>
  </React.StrictMode>
);
