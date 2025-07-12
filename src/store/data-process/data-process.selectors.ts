import { NameSpace } from '../../const';
import { Reviews } from '../../types/review';
import { RootState } from '../../types/state';
import { Offer, Offers } from '../../types/offer';

export const getAllOffers = (state: RootState): Offers => state[NameSpace.Data].allOffers;
export const getNearbyOffers = (state: RootState): Offers => state[NameSpace.Data].nearbyOffers;
export const getCurrentOffer = (state: RootState): Offer | null => state[NameSpace.Data].currentOffer;
export const getComments = (state: RootState): Reviews => state[NameSpace.Data].comments;
export const getDataError = (state: RootState): string | null => state[NameSpace.Data].error;
export const getDataIsLoading = (state: RootState): boolean => state[NameSpace.Data].isLoading;
