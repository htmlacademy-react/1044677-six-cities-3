import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import NearbyPlaceCard from './nearby-place-card';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus, AppRoute } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

const mockStore = configureMockStore();

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (): Promise<typeof import('react-router-dom')> => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../store/action', () => ({
  toggleFavorite: vi.fn(),
  fetchFavoriteOffers: vi.fn(),
}));

describe('Component: NearbyPlaceCard', () => {
  const fakeOffer = makeFakeOffer();

  const createMockStore = (authorizationStatus = AuthorizationStatus.Auth) => mockStore({
    USER: {
      authorizationStatus,
    },
  });

  const renderComponent = (offer = fakeOffer, authStatus = AuthorizationStatus.Auth) => {
    const store = createMockStore(authStatus);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NearbyPlaceCard offer={offer} />
        </BrowserRouter>
      </Provider>
    );

    return store;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render place card with all elements', () => {
    renderComponent();

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('near-places__card', 'place-card');
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type.charAt(0).toUpperCase() + fakeOffer.type.slice(1))).toBeInTheDocument();
  });

  it('should render premium mark for premium offers', () => {
    const premiumOffer = { ...fakeOffer, isPremium: true };
    renderComponent(premiumOffer);

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Premium').closest('div')).toHaveClass('place-card__mark');
  });

  it('should not render premium mark for non-premium offers', () => {
    const regularOffer = { ...fakeOffer, isPremium: false };
    renderComponent(regularOffer);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render offer image with correct attributes', () => {
    renderComponent();

    const image = screen.getByAltText('Place image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', fakeOffer.previewImage);
    expect(image).toHaveAttribute('width', '260');
    expect(image).toHaveAttribute('height', '200');
  });

  it('should render price information correctly', () => {
    renderComponent();

    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
  });

  it('should render rating stars', () => {
    renderComponent();

    const ratingStars = screen.getByTestId('rating-stars');
    expect(ratingStars).toBeInTheDocument();
  });

  it('should render bookmark button', () => {
    renderComponent();

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toBeInTheDocument();
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button', 'button');
  });

  it('should render active bookmark button for favorite offers', () => {
    const favoriteOffer = { ...fakeOffer, isFavorite: true };
    renderComponent(favoriteOffer);

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should render inactive bookmark button for non-favorite offers', () => {
    const nonFavoriteOffer = { ...fakeOffer, isFavorite: false };
    renderComponent(nonFavoriteOffer);

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should navigate to login page when unauthorized user clicks bookmark', () => {
    renderComponent(fakeOffer, AuthorizationStatus.NoAuth);
    const bookmarkButton = screen.getByRole('button');

    fireEvent.click(bookmarkButton);

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
  });

  it('should render links to offer detail page', () => {
    renderComponent();

    const imageLink = screen.getByAltText('Place image').closest('a');
    const titleLink = screen.getByText(fakeOffer.title).closest('a');

    expect(imageLink).toHaveAttribute('href', `/offer/${fakeOffer.id}`);
    expect(titleLink).toHaveAttribute('href', `/offer/${fakeOffer.id}`);
  });

  it('should render offer type with capitalized first letter', () => {
    const offerWithType = { ...fakeOffer, type: 'apartment' };
    renderComponent(offerWithType);

    expect(screen.getByText('Apartment')).toBeInTheDocument();
  });

  it('should render visually hidden text for accessibility', () => {
    renderComponent();

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toHaveClass('visually-hidden');
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toHaveClass('visually-hidden');
  });
});
