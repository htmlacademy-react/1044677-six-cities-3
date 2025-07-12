import { City } from '../../types/city';
import { AppProcess } from '../../types/state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortType } from '../../const';

const initialState: AppProcess = {
  city: DEFAULT_CITY,
  sortType: SortType.Popular,
  isLoading: false,
  error: null,
  isDataLoaded: false,
  isCommentSending: false,
  isFavorite: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers() {},
});

export const { changeCity, changeSortType, setError } = appProcess.actions;
