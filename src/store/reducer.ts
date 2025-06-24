import { createReducer } from '@reduxjs/toolkit';
import { OfferState } from '../types/offer-state';
import { DEFAULT_CITY, SortType } from '../const';
import { changeCity, changeSortType, fetchOffers } from './action';

const initialState: OfferState = {
  city: DEFAULT_CITY,
  allOffers: [],
  sortType: SortType.Popular,
  isLoading: false,
  error: null
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
    });
});
