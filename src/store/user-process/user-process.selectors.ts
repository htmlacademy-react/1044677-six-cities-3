import { NameSpace } from '../../const';
import { RootState } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserEmail = (state: RootState): string | null => state[NameSpace.User].userEmail;
