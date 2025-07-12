import { RootState } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../const';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: RootState): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
