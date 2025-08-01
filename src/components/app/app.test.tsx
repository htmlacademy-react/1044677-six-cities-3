import App from './app';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
vi.mock('../../hooks/store', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../pages/main-screen/main-screen', () => ({
  default: () => <div>Main Screen</div>,
}));

vi.mock('../../pages/login-screen/login-screen', () => ({
  default: () => <div>Login Screen</div>,
}));

vi.mock('../../pages/favorites-screen/favorites-screen', () => ({
  default: () => <div>Favorites Screen</div>,
}));

vi.mock('../../pages/offer-screen/offer-screen', () => ({
  default: () => <div>Offer Screen</div>,
}));

vi.mock('../../pages/not-found-screen/not-found-screen', () => ({
  default: () => <div>Not Found Screen</div>,
}));

vi.mock('../private-route/private-route', () => ({
  default: ({ children }: { children: JSX.Element }) => <div>Protected: {children}</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('App Routing', () => {
  const mockStoreData = {
    user: { authorizationStatus: 'NO_AUTH', userEmail: null },
    data: { allOffers: [], currentOffer: null, nearbyOffers: [], comments: [], isLoading: false, hasError: false },
    app: { city: { title: 'Paris', lat: 48.864716, lng: 2.349014, zoom: 13 }, sortType: 'Popular', isLoading: false, hasError: false, isDataLoaded: false, isCommentSending: false, isFavorite: false },
  };

  beforeEach(() => {
    vi.mocked(useAppSelector).mockReturnValue([]);
  });

  it('should render Main Screen for root route', () => {
    const store = mockStore(mockStoreData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Main Screen')).toBeInTheDocument();
  });

  it('should render Login Screen for login route', () => {
    const store = mockStore(mockStoreData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login Screen')).toBeInTheDocument();
  });

  it('should render Favorites Screen with protection for favorites route', () => {
    const store = mockStore(mockStoreData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Protected:')).toBeInTheDocument();
    expect(screen.getByText('Favorites Screen')).toBeInTheDocument();
  });

  it('should render Offer Screen for offer route', () => {
    const store = mockStore(mockStoreData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Offer Screen')).toBeInTheDocument();
  });

  it('should render Not Found Screen for unknown route', () => {
    const store = mockStore(mockStoreData);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Not Found Screen')).toBeInTheDocument();
  });
});
