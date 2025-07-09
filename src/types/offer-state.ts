import { City } from './city';
import { Offers, Offer } from './offer';
import { Reviews } from './review';
import { SortType } from '../const';

export interface OfferState {
  city: City;
  allOffers: Offers;
  currentOffer: Offer | null;
  nearbyOffers: Offers;
  sortType: SortType;
  isLoading: boolean;
  error: string | null;
  comments: Reviews;
}
