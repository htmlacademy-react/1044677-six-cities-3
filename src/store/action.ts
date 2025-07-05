import { City } from '../types/city';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offer';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortType, APIRoute } from '../const';

export const changeCity = createAction<City>('city/change');
export const setError = createAction<string | null>('error/set');
export const changeSortType = createAction<SortType>('sort/change');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const fetchOffers = createAsyncThunk<Offers, void, {extra: AxiosInstance}>
('offers/fetchOffers', async (_arg, { extra: api }) => {
  const response = await api.get<Offers>(APIRoute.Offers);
  return response.data;
});
