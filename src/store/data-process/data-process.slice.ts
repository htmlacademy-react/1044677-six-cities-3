import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { DataProcess } from '../../types/state';
import { logoutAction, loginAction } from '../api-actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffers, fetchFavoriteOffers, fetchOfferById, fetchNearbyOffers, fetchComments, leaveComment, toggleFavorite } from '../action';

const initialState: DataProcess = {
  allOffers: [],
  favoriteOffers: [],
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isLoading: false,
  isFavoriteOffersLoading: false,
  isSubmittingComment: false,
  hasError: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    resetError: (state) => {
      state.hasError = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOffers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.isFavoriteOffersLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.isLoading = false;
        const offerInAllOffers = state.allOffers.find((offer) => offer.id === action.payload.id);
        state.currentOffer = {
          ...action.payload,
          isFavorite: offerInAllOffers ? offerInAllOffers.isFavorite : action.payload.isFavorite
        };
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
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
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(leaveComment.pending, (state) => {
        state.isSubmittingComment = true;
      })
      .addCase(leaveComment.fulfilled, (state, action) => {
        state.isSubmittingComment = false;
        state.comments.unshift(action.payload);
      })
      .addCase(leaveComment.rejected, (state) => {
        state.isSubmittingComment = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<Offer>) => {
        const updatedOffer = action.payload;

        const offerInAllOffers = state.allOffers.find((offer) => offer.id === updatedOffer.id);
        if (offerInAllOffers) {
          offerInAllOffers.isFavorite = updatedOffer.isFavorite;
        }

        if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
          state.currentOffer.isFavorite = updatedOffer.isFavorite;
        }

        const nearbyOffer = state.nearbyOffers.find((offer) => offer.id === updatedOffer.id);
        if (nearbyOffer) {
          nearbyOffer.isFavorite = updatedOffer.isFavorite;
        }

        const existingFavoriteIndex = state.favoriteOffers.findIndex((offer) => offer.id === updatedOffer.id);

        if (updatedOffer.isFavorite) {
          if (existingFavoriteIndex === -1) {
            state.favoriteOffers.push(updatedOffer);
          } else {
            state.favoriteOffers[existingFavoriteIndex] = updatedOffer;
          }
        } else {
          if (existingFavoriteIndex !== -1) {
            state.favoriteOffers.splice(existingFavoriteIndex, 1);
          }
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
        state.allOffers = state.allOffers.map((offer) => ({
          ...offer,
          isFavorite: false
        }));

        if (state.currentOffer) {
          state.currentOffer.isFavorite = false;
        }

        state.nearbyOffers = state.nearbyOffers.map((offer) => ({
          ...offer,
          isFavorite: false
        }));

        state.favoriteOffers = [];
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.allOffers = state.allOffers.map((offer) => ({
          ...offer,
          isFavorite: false
        }));

        if (state.currentOffer) {
          state.currentOffer.isFavorite = false;
        }

        state.nearbyOffers = state.nearbyOffers.map((offer) => ({
          ...offer,
          isFavorite: false
        }));

        state.favoriteOffers = [];
      });
  },
});

export const { resetError } = dataProcess.actions;
