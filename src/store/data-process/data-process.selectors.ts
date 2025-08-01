import { NameSpace } from '../../const';
import { Reviews } from '../../types/review';
import { RootState } from '../../types/state';
import { Offer, Offers } from '../../types/offer';

export const getAllOffers = (state: RootState): Offers => state[NameSpace.Data].allOffers;
export const getFavoriteOffers = (state: RootState): Offers => state[NameSpace.Data].favoriteOffers;
export const getNearbyOffers = (state: RootState): Offers => state[NameSpace.Data].nearbyOffers;
export const getCurrentOffer = (state: RootState): Offer | null => state[NameSpace.Data].currentOffer;
export const getComments = (state: RootState): Reviews => state[NameSpace.Data].comments;
export const getDataHasError = (state: RootState): boolean => state[NameSpace.Data].hasError;
export const getDataIsLoading = (state: RootState): boolean => state[NameSpace.Data].isLoading;
export const getDataIsFavoriteOffersLoading = (state: RootState): boolean => state[NameSpace.Data].isFavoriteOffersLoading;

export const getCurrentOffers = (state: RootState): Offers => {
  const allOffers = getAllOffers(state);
  const currentCity = state[NameSpace.App].city.title;
  return allOffers.filter((offer: Offer) => offer.city.name === currentCity);
};

export const getFavoriteCities = (state: RootState): string[] => {
  const favoriteOffers = getFavoriteOffers(state);
  return Array.from(new Set(favoriteOffers.map((offer: Offer) => offer.city.name)));
};
