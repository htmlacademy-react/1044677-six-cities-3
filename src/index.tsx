import React from 'react';
import { store } from './store/index';
import { Provider } from 'react-redux';
import App from './components/app/app';
import ReactDOM from 'react-dom/client';
import ErrorMessage from './components/error-message/error-message';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
