import { City } from './city';
import { Offer } from './offer';
import { store } from '../store';
import { Review } from './review';
import { AuthorizationStatus, SortType } from '../const';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

export type DataProcess = {
  allOffers: Offer[];
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isLoading: boolean;
  hasError: boolean;
};

export type AppProcess = {
  city: City;
  sortType: SortType;
  isLoading: boolean;
  hasError: boolean;
  isDataLoaded: boolean;
  isCommentSending: boolean;
  isFavorite: boolean;
};
