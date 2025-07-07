import { createReducer } from '@reduxjs/toolkit';
import { OfferState } from '../types/offer-state';
import { AuthorizationStatus, DEFAULT_CITY, SortType } from '../const';
import { changeCity, changeSortType, fetchOffers, requireAuthorization, setError, toggleFavorite, fetchComments } from './action';

const initialState: OfferState = {
  city: DEFAULT_CITY,
  allOffers: [],
  sortType: SortType.Popular,
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  comments: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allOffers = action.payload;
    })
    .addCase(fetchOffers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || 'Failed to load offers';
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(toggleFavorite, (state, action) => {
      const offerId = action.payload;
      const currentOffer = state.allOffers.find((offer) => offer.id === offerId);
      if (currentOffer) {
        currentOffer.isFavorite = !currentOffer.isFavorite;
      }
    })
    .addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    })
    .addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || 'Failed to load comments';
    });
});
