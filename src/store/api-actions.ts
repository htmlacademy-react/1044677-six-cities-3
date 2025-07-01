import { store } from '../store';
import { AxiosInstance } from 'axios';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken, dropToken } from '../services/token';
import { requireAuthorization, setError } from './action';
import { AppDispatch, RootState } from '../types/state.js';
import { processErrorHandle } from '../services/proces-error-handle';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';

export const clearErrorAction = createAsyncThunk(
  'error/clearError',
  () => {
    setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      processErrorHandle('Login failed');
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
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
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
