import { City } from '../../types/city';
import { RootState } from '../../types/state';
import { NameSpace, SortType } from '../../const';

export const getCity = (state: RootState): City => state[NameSpace.App].city;
export const getError = (state: RootState): string | null => state[NameSpace.App].error;
export const getSortType = (state: RootState): SortType => state[NameSpace.App].sortType;
export const getIsLoading = (state: RootState): boolean => state[NameSpace.App].isLoading;
export const getIsFavorite = (state: RootState): boolean => state[NameSpace.App].isFavorite;
export const getIsDataLoaded = (state: RootState): boolean => state[NameSpace.App].isDataLoaded;
export const getIsCommentSending = (state: RootState): boolean => state[NameSpace.App].isCommentSending;
