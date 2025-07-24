import { makeFakeCity } from '../../utils/mocks';
import { DEFAULT_CITY, SortType } from '../../const';
import { appProcess, changeCity, changeSortType, setHasError } from './app-process.slice';

describe ('AppProcess Slice', () => {
  const initialState = {
    city: DEFAULT_CITY,
    sortType: SortType.Popular,
    isLoading: false,
    hasError: false,
    isDataLoaded: false,
    isCommentSending: false,
    isFavorite: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = {
      city: DEFAULT_CITY,
      sortType: SortType.Popular,
      isLoading: false,
      hasError: false,
      isDataLoaded: false,
      isCommentSending: false,
      isFavorite: false,
    };

    const result = appProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return deafult initial state with empty action and undefined', () => {
    const emptyAction = { type: ''};
    const expectedState = {
      city: DEFAULT_CITY,
      sortType: SortType.Popular,
      isLoading: false,
      hasError: false,
      isDataLoaded: false,
      isCommentSending: false,
      isFavorite: false,
    };

    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const newCity = makeFakeCity();

    const expectedState = {
      ...initialState,
      city: newCity,
    };

    const result = appProcess.reducer(initialState, changeCity(newCity));

    expect(result).toEqual(expectedState);
  });

  it('should change sort type with "changeSortType" action', () => {
    const newSortType = SortType.PriceHighToLow;

    const expectedState = {
      ...initialState,
      sortType: newSortType,
    };

    const result = appProcess.reducer(initialState, changeSortType(newSortType));

    expect(result).toEqual(expectedState);
  });

  it('should set has error with "setHasError" action', () => {
    const hasError = true;

    const expectedState = {
      ...initialState,
      hasError: hasError,
    };

    const result = appProcess.reducer(initialState, setHasError(hasError));

    expect(result).toEqual(expectedState);
  });
});
