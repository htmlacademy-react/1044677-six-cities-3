import React from 'react';
import { store } from './store/index';
import { Provider } from 'react-redux';
import App from './components/app/app';
import ReactDOM from 'react-dom/client';
import { offers } from './mocks/offers';
import { fillOffers } from './store/action';

store.dispatch(fillOffers(offers));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
