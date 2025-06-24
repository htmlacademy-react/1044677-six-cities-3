import { SortType } from '../const';
import { City } from '../types/city';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offer';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const changeCity = createAction<City>('city/change');
export const changeSortType = createAction<SortType>('sort/change');

export const fetchOffers = createAsyncThunk<Offers, void, {extra: AxiosInstance}>
('offers/fetchOffers', async (_arg, { extra: api }) => {
  const response = await api.get<Offers>('/offers');
  return response.data;
});
