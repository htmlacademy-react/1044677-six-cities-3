import { City } from './city';
import { Offers } from './offer';
import { AuthorizationStatus, SortType } from '../const';

export interface OfferState {
  city: City;
  allOffers: Offers;
  sortType: SortType;
  isLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus ;
}
