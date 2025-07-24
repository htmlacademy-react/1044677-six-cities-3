import Header from './header';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

const mockStore = configureMockStore();

vi.mock('../../hooks/store', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

import { useAppSelector } from '../../hooks/store';

describe('Component: Header', () => {
  it('should render header with logo and navigation', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.NoAuth);
    vi.mocked(useAppSelector).mockReturnValue(null);
    vi.mocked(useAppSelector).mockReturnValue([]);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render authorized user with email', () => {
    const fakeOffers = [makeFakeOffer()];

    vi.mocked(useAppSelector)
      .mockReturnValueOnce(AuthorizationStatus.Auth)
      .mockReturnValueOnce('test@example.com')
      .mockReturnValueOnce(fakeOffers);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render default email when user email is null', () => {
    const fakeOffers = [makeFakeOffer()];

    vi.mocked(useAppSelector)
      .mockReturnValueOnce(AuthorizationStatus.Auth)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(fakeOffers);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Keks@htmlacademy.ru')).toBeInTheDocument();
  });

  it('should render sign in link for unauthorized user', () => {
    vi.mocked(useAppSelector)
      .mockReturnValueOnce(AuthorizationStatus.NoAuth)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce([]);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should handle logout click', () => {
    const fakeOffers = [makeFakeOffer()];

    vi.mocked(useAppSelector)
      .mockReturnValueOnce(AuthorizationStatus.Auth)
      .mockReturnValueOnce('test@example.com')
      .mockReturnValueOnce(fakeOffers);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const logoutButton = screen.getByText('Sign out');
    fireEvent.click(logoutButton);

    expect(logoutButton).toBeInTheDocument();
  });
});
