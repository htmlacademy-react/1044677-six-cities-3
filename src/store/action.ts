import { SortType } from '../const';
import { City } from '../types/city';
import { Offers } from '../types/offer';
import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<City>('city/change');
export const fillOffers = createAction<Offers>('offers/fill');
export const changeSortType = createAction<SortType>('sort/change');
