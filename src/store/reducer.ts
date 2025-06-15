import { Offer } from '../types/offer';
import { offers } from '../mocks/offers';
import { createReducer } from '@reduxjs/toolkit';
import { OfferState } from '../types/offer-state';
import { DEFAULT_CITY, SortType } from '../const';
import { changeCity, fillOffers, changeSortType } from './action';

const sortOffers = (offersList: Offer[], cityName: string, sortType: SortType): Offer[] => {
  const filteredOffers = offersList.filter((offer) => offer.city === cityName);

  switch (sortType) {
    case SortType.PriceLowToHigh:
      return filteredOffers.sort((a, b) => a.priceValue - b.priceValue);
    case SortType.PriceHighToLow:
      return filteredOffers.sort((a, b) => b.priceValue - a.priceValue);
    case SortType.TopRated:
      return filteredOffers.sort((a, b) => b.rating - a.rating);
    default:
      return filteredOffers;
  }
};

const initialState: OfferState = {
  city: DEFAULT_CITY,
  offers: sortOffers(offers, DEFAULT_CITY.title, SortType.Popular),
  sortType: SortType.Popular
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.offers = sortOffers(offers, action.payload.title, state.sortType);
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
      state.offers = sortOffers(offers, state.city.title, action.payload);
    });
});
