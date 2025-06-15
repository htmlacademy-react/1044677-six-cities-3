import { City } from './city';
import { Offers } from './offer';
import { SortType } from '../const';

export interface OfferState {
  city: City;
  offers: Offers;
  sortType: SortType;
}
