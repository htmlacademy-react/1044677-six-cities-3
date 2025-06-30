import { store } from '../store';
import { getToken } from './token';
import { AuthorizationStatus } from '../const';
import { requireAuthorization } from '../store/action';
import axios, { AxiosInstance, AxiosError } from 'axios';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
      return Promise.reject(error);
    }
  );

  return api;
};
