import { APIRoute } from '../const';
import { AxiosInstance } from 'axios';
import { Offers, Offer } from '../types/offer';
import { Reviews, Review } from '../types/review';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchOffers = createAsyncThunk<Offers, void, {extra: AxiosInstance}>
('offers/fetchOffers', async (_arg, { extra: api }) => {
  const response = await api.get<Offers>(APIRoute.Offers);
  return response.data;
});

export const fetchFavoriteOffers = createAsyncThunk<Offers, void, {extra: AxiosInstance}>
('offers/fetchFavoriteOffers', async (_arg, { extra: api }) => {
  const response = await api.get<Offers>(APIRoute.Favorite);
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

export const toggleFavorite = createAsyncThunk<Offer, {offerId: string; isFavorite: boolean}, {extra: AxiosInstance}>
('offers/toggleFavorite', async ({offerId, isFavorite}, { extra: api }) => {
  const status = isFavorite ? 0 : 1;
  const response = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
  return response.data;
});
