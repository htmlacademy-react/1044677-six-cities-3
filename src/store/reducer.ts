import { DEFAULT_CITY } from '../const';
import { offers } from '../mocks/offers';
import { createReducer } from '@reduxjs/toolkit';
import { OfferState } from '../types/offer-state';
import { changeCity, fillOffers } from './action';

const initialState: OfferState = {
  city: DEFAULT_CITY,
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});
