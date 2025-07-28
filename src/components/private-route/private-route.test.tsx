import { Provider } from 'react-redux';
import PrivateRoute from './private-route';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { describe, it, expect, vi, type MockedFunction } from 'vitest';

const mockStore = configureMockStore();

vi.mock('../../hooks/store', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock('../../services/token', () => ({
  getToken: vi.fn() as () => string | null,
}));

import { getToken } from '../../services/token';
import { useAppSelector, useAppDispatch } from '../../hooks/store';

const mockGetToken = vi.mocked(getToken) as MockedFunction<() => string | null>;

const TestComponent = () => <div>Protected Content</div>;

describe('Component: PrivateRoute', () => {
  it('should render children when user is authorized', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Auth);
    vi.mocked(useAppDispatch).mockReturnValue(vi.fn());
    vi.mocked(getToken).mockReturnValue('fake-token');

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should render Spinner when authorization status is unknown but token exists', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Unknown);
    vi.mocked(useAppDispatch).mockReturnValue(vi.fn());
    vi.mocked(getToken).mockReturnValue('fake-token');

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is not authorized', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.NoAuth);
    vi.mocked(useAppDispatch).mockReturnValue(vi.fn());
    mockGetToken.mockReturnValue(null);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to login when authorization status is unknown and no token', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Unknown);
    vi.mocked(useAppDispatch).mockReturnValue(vi.fn());
    mockGetToken.mockReturnValue(null);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
