import { offers } from '../mocks/offers';
import { createReducer } from '@reduxjs/toolkit';
import { OfferState } from '../types/offer-state';
import { DEFAULT_CITY, SortType } from '../const';
import { changeCity, fillOffers, changeSortType } from './action';

const initialState: OfferState = {
  city: DEFAULT_CITY,
  offers: offers.filter((offer) => offer.city === DEFAULT_CITY.title),
  sortType: SortType.Popular
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.offers = offers.filter((offer) => offer.city === action.payload.title);
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
});
