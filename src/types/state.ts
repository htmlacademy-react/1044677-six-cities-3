import { City } from './city';
import { Offer } from './offer';
import { Review } from './review';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, SortType } from '../const';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

export type RootState = {
  APP: AppProcess;
  DATA: DataProcess;
  USER: UserProcess;
};
export type AppDispatch = ThunkDispatch<RootState, AxiosInstance, AnyAction>;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

export interface DataProcess {
  allOffers: Offer[];
  favoriteOffers: Offer[];
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isLoading: boolean;
  isSubmittingComment: boolean;
  hasError: boolean;
}

export type AppProcess = {
  city: City;
  sortType: SortType;
  isLoading: boolean;
  hasError: boolean;
  isDataLoaded: boolean;
  isCommentSending: boolean;
  isFavorite: boolean;
};
