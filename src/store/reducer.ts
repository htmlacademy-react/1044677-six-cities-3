import { createReducer } from '@reduxjs/toolkit';
import { OfferState } from '../types/offer-state';
import { DEFAULT_CITY, SortType } from '../const';
import { changeCity, fillOffers, changeSortType } from './action';

const initialState: OfferState = {
  city: DEFAULT_CITY,
  allOffers: [],
  sortType: SortType.Popular
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.allOffers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
});
