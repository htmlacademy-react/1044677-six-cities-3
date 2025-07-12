import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffers, fetchOfferById, fetchNearbyOffers, fetchComments, leaveComment } from '../action';

const initialState: DataProcess = {
  allOffers: [],
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isLoading: false,
  hasError: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
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
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(leaveComment.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(leaveComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(leaveComment.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { toggleFavorite } = dataProcess.actions;
