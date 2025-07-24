import { AxiosInstance } from 'axios';
import { fetchOffers } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { saveToken, dropToken } from '../services/token';
import { AppDispatch, RootState } from '../types/state.js';

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'error/clearError',
  async (_arg, {dispatch}) => {
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT_SHOW_ERROR));
    dispatch({ type: 'appProcess/setHasError', payload: false });
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);

      dispatch(fetchOffers());

      return data;
    } catch (error) {
      dispatch({ type: 'appProcess/setHasError', payload: true });
      dispatch(clearErrorAction());
      throw error;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
