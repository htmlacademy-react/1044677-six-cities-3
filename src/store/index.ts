import { RootState } from '../types/state';
import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type AppState = RootState;
