import { City } from './city';
import { Offers } from './offer';

export interface OfferState {
  city: City;
  offers: Offers;
}
