import { City } from '../../types/city';
import { RootState } from '../../types/state';
import { NameSpace, SortType } from '../../const';

export const getCity = (state: RootState): City => state[NameSpace.App].city;
export const getHasError = (state: RootState): boolean => state[NameSpace.App].hasError;
export const getSortType = (state: RootState): SortType => state[NameSpace.App].sortType;
