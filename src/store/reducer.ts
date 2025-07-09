import { createReducer } from '@reduxjs/toolkit';
import { OfferState } from '../types/offer-state';
import { AuthorizationStatus, DEFAULT_CITY, SortType } from '../const';
import { changeCity, changeSortType, fetchOffers, requireAuthorization, setError, toggleFavorite, fetchComments, fetchOfferById, fetchNearbyOffers, leaveComment } from './action';

const initialState: OfferState = {
  city: DEFAULT_CITY,
  allOffers: [],
  currentOffer: null,
  nearbyOffers: [],
  sortType: SortType.Popular,
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  comments: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allOffers = action.payload;
    })
    .addCase(fetchOffers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || 'Failed to load offers';
    })
    .addCase(fetchOfferById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchOfferById.fulfilled, (state, action) => {
      state.isLoading = false;
      const offerInAllOffers = state.allOffers.find((offer) => offer.id === action.payload.id);
      state.currentOffer = {
        ...action.payload,
        isFavorite: offerInAllOffers ? offerInAllOffers.isFavorite : action.payload.isFavorite
      };
    })
    .addCase(fetchOfferById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || 'Failed to load offer';
    })
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.nearbyOffers = action.payload.map((offer) => {
        const offerInAllOffers = state.allOffers.find((allOffer) => allOffer.id === offer.id);
        return {
          ...offer,
          isFavorite: offerInAllOffers ? offerInAllOffers.isFavorite : offer.isFavorite
        };
      });
    })
    .addCase(fetchNearbyOffers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || 'Failed to load nearby offers';
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(toggleFavorite, (state, action) => {
      const offerId = action.payload;

      const offerInAllOffers = state.allOffers.find((offer) => offer.id === offerId);
      if (offerInAllOffers) {
        offerInAllOffers.isFavorite = !offerInAllOffers.isFavorite;
      }

      if (state.currentOffer && state.currentOffer.id === offerId) {
        state.currentOffer.isFavorite = !state.currentOffer.isFavorite;
      }

      const nearbyOffer = state.nearbyOffers.find((offer) => offer.id === offerId);
      if (nearbyOffer) {
        nearbyOffer.isFavorite = !nearbyOffer.isFavorite;
      }
    })
    .addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    })
    .addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || 'Failed to load comments';
    })
    .addCase(leaveComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(leaveComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments.unshift(action.payload);
    })
    .addCase(leaveComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || 'Failed to leave a comment';
    });
});
