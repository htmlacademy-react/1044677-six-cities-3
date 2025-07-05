import { store } from '../store';
import { getToken } from './token';
import { AuthorizationStatus } from '../const';
import { StatusCodes } from 'http-status-codes';
import { requireAuthorization } from '../store/action';
import { processErrorHandle } from './proces-error-handle';
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

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
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);

        if (error.response.status === 401) {
          store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        } else {
          processErrorHandle(detailMessage.message);
        }
      }

      throw error;
    }
  );

  return api;
};
