import { reducer } from '../store/reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: reducer
});
