import { City } from '../types/city';
import { AxiosInstance } from 'axios';
import { Offers, Offer } from '../types/offer';
import { Reviews, Review } from '../types/review';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorizationStatus, SortType, APIRoute } from '../const';

export const changeCity = createAction<City>('city/change');
export const setError = createAction<string | null>('error/set');
export const changeSortType = createAction<SortType>('sort/change');
export const toggleFavorite = createAction<string>('offer/toggleFavorite');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const fetchOffers = createAsyncThunk<Offers, void, {extra: AxiosInstance}>
('offers/fetchOffers', async (_arg, { extra: api }) => {
  const response = await api.get<Offers>(APIRoute.Offers);
  return response.data;
});

export const fetchOfferById = createAsyncThunk<Offer, string, {extra: AxiosInstance}>
('offers/fetchOfferById', async (offerId, { extra: api }) => {
  const response = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
  return response.data;
});

export const fetchNearbyOffers = createAsyncThunk<Offers, string, {extra: AxiosInstance}>
('offers/fetchNearbyOffers', async (offerId, { extra: api }) => {
  const response = await api.get<Offers>(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`);
  return response.data;
});

export const fetchComments = createAsyncThunk<Reviews, string, {extra: AxiosInstance}>
('comments/fetchComments', async (offerId, { extra: api }) => {
  const response = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);
  return response.data;
});

export const leaveComment = createAsyncThunk<Review, {offerId: string; comment: string; rating: number}, {extra: AxiosInstance}>
('comments/leaveComment', async ({offerId, comment, rating}, { extra: api }) => {
  const response = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
  return response.data;
});
