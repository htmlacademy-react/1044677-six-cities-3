import { AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../utils/mocks';
import { userProcess, requireAuthorization } from './user-process.slice';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

describe('UserProcess Slice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userEmail: null,
  };

  it('should return initial state with undefined action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set "authorizationStatus" to "Auth" with "requireAuthorization" action', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = userProcess.reducer(initialState, requireAuthorization(AuthorizationStatus.Auth));

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth" with "requireAuthorization" action', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    const result = userProcess.reducer(initialState, requireAuthorization(AuthorizationStatus.NoAuth));

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "Unknown" with "requireAuthorization" action', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Unknown,
    };

    const result = userProcess.reducer(initialState, requireAuthorization(AuthorizationStatus.Unknown));

    expect(result).toEqual(expectedState);
  });

  describe('checkAuthAction', () => {
    it('should set Auth status and user email on checkAuthAction.fulfilled', () => {
      const fakeUserData = makeFakeUserData();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: fakeUserData.email,
      };

      const result = userProcess.reducer(
        initialState,
        checkAuthAction.fulfilled(fakeUserData, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set NoAuth status on checkAuthAction.rejected', () => {
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      };

      const result = userProcess.reducer(
        initialState,
        checkAuthAction.rejected(new Error('Auth failed'), '', undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('loginAction', () => {
    it('should set Auth status and user email on loginAction.fulfilled', () => {
      const fakeUserData = makeFakeUserData();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: fakeUserData.email,
      };

      const result = userProcess.reducer(
        initialState,
        loginAction.fulfilled(fakeUserData, '', { login: 'test@test.com', password: 'password123' })
      );

      expect(result).toEqual(expectedState);
    });

    it('should set NoAuth status on loginAction.rejected', () => {
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      };

      const result = userProcess.reducer(
        initialState,
        loginAction.rejected(new Error('Login failed'), '', { login: 'test@test.com', password: 'wrong' })
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('logoutAction', () => {
    it('should set NoAuth status on logoutAction.fulfilled', () => {
      const stateWithAuth = {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
      };

      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      };

      const result = userProcess.reducer(
        stateWithAuth,
        logoutAction.fulfilled(undefined, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

    it('should set NoAuth status on logoutAction.rejected', () => {
      const stateWithAuth = {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: 'test@test.com',
      };

      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: null,
      };

      const result = userProcess.reducer(
        stateWithAuth,
        logoutAction.rejected(new Error('Logout failed'), '', undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });
});
