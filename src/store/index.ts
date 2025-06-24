import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { configureStore } from '@reduxjs/toolkit';

export const api = createAPI();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
