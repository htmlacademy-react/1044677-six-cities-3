import { dataProcess } from './data-process.slice';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';
import { fetchOffers, fetchOfferById, fetchNearbyOffers, fetchComments, leaveComment } from '../action';

describe('DataProcess Slice', () => {
  const initialState = {
    allOffers: [],
    favoriteOffers: [],
    currentOffer: null,
    nearbyOffers: [],
    comments: [],
    isLoading: false,
    isSubmittingComment: false,
    hasError: false,
  };

  it('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = dataProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = dataProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };

    const result = dataProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set "isLoading" to "true" with "fetchOffers.pending" action', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      hasError: false,
    };

    const result = dataProcess.reducer(initialState, fetchOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "allOffers" to array with offers, "isLoading" to "false" with "fetchOffers.fulfilled" action', () => {
    const fakeOffers = [makeFakeOffer(), makeFakeOffer()];
    const expectedState = {
      ...initialState,
      allOffers: fakeOffers,
      isLoading: false,
    };

    const result = dataProcess.reducer(
      { ...initialState, isLoading: true },
      fetchOffers.fulfilled(fakeOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false", "hasError" to "true" with "fetchOffers.rejected" action', () => {
    const expectedState = {
      ...initialState,
      isLoading: false,
      hasError: true,
    };

    const result = dataProcess.reducer(
      { ...initialState, isLoading: true },
      fetchOffers.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "fetchOfferById.pending" action', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      hasError: false,
    };

    const result = dataProcess.reducer(initialState, fetchOfferById.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "currentOffer" to offer, "isLoading" to "false" with "fetchOfferById.fulfilled" action', () => {
    const fakeOffer = makeFakeOffer();
    const expectedState = {
      ...initialState,
      currentOffer: fakeOffer,
      isLoading: false,
    };

    const result = dataProcess.reducer(
      { ...initialState, isLoading: true },
      fetchOfferById.fulfilled(fakeOffer, '', fakeOffer.id)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "fetchNearbyOffers.pending" action', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      hasError: false,
    };

    const result = dataProcess.reducer(initialState, fetchNearbyOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffers" to array with offers, "isLoading" to "false" with "fetchNearbyOffers.fulfilled" action', () => {
    const fakeOffers = [makeFakeOffer(), makeFakeOffer()];
    const expectedState = {
      ...initialState,
      nearbyOffers: fakeOffers,
      isLoading: false,
    };

    const result = dataProcess.reducer(
      { ...initialState, isLoading: true },
      fetchNearbyOffers.fulfilled(fakeOffers, '', '1')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "fetchComments.pending" action', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      hasError: false,
    };

    const result = dataProcess.reducer(initialState, fetchComments.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "comments" to array with reviews, "isLoading" to "false" with "fetchComments.fulfilled" action', () => {
    const fakeReviews = [makeFakeReview(), makeFakeReview()];
    const expectedState = {
      ...initialState,
      comments: fakeReviews,
      isLoading: false,
    };

    const result = dataProcess.reducer(
      { ...initialState, isLoading: true },
      fetchComments.fulfilled(fakeReviews, '', '1')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "leaveComment.pending" action', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      hasError: false,
    };

    const result = dataProcess.reducer(initialState, leaveComment.pending);

    expect(result).toEqual(expectedState);
  });

  it('should add new comment to "comments" array, "isLoading" to "false" with "leaveComment.fulfilled" action', () => {
    const fakeReview = makeFakeReview();
    const existingReviews = [makeFakeReview()];
    const expectedState = {
      ...initialState,
      comments: [fakeReview, ...existingReviews],
      isLoading: false,
    };

    const result = dataProcess.reducer(
      { ...initialState, comments: existingReviews, isLoading: true },
      leaveComment.fulfilled(fakeReview, '', { offerId: '1', comment: 'test', rating: 5 })
    );

    expect(result).toEqual(expectedState);
  });
});
