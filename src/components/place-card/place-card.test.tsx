import PlaceCard from './place-card';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

const mockStore = configureMockStore();

vi.mock('../../hooks/store', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

import { useAppSelector } from '../../hooks/store';

describe('Component: PlaceCard', () => {
  const fakeOffer = makeFakeOffer();

  it('should render place card with offer data', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Auth);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={fakeOffer} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type.charAt(0).toUpperCase() + fakeOffer.type.slice(1))).toBeInTheDocument();
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', fakeOffer.previewImage);
  });

  it('should render premium mark when offer is premium', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Auth);
    const premiumOffer = { ...fakeOffer, isPremium: true };

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={premiumOffer} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render active bookmark button when offer is favorite', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Auth);
    const favoriteOffer = { ...fakeOffer, isFavorite: true };

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={favoriteOffer} />
        </BrowserRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button', { name: /to bookmarks/i });
    expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should call onMouseEnter when mouse enters card', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Auth);
    const onMouseEnter = vi.fn();

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={fakeOffer} onMouseEnter={onMouseEnter} />
        </BrowserRouter>
      </Provider>
    );

    const card = screen.getByRole('article');
    fireEvent.mouseEnter(card);

    expect(onMouseEnter).toHaveBeenCalledWith(fakeOffer);
  });

  it('should call onMouseLeave when mouse leaves card', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Auth);
    const onMouseLeave = vi.fn();

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={fakeOffer} onMouseLeave={onMouseLeave} />
        </BrowserRouter>
      </Provider>
    );

    const card = screen.getByRole('article');
    fireEvent.mouseLeave(card);

    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('should render correct rating stars', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Auth);
    const offerWithRating = { ...fakeOffer, rating: 4 };

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={offerWithRating} />
        </BrowserRouter>
      </Provider>
    );

    const ratingSpan = screen.getByTestId('rating-stars');
    expect(ratingSpan).toHaveStyle({ width: '80%' });
  });

  it('should render links to offer page', () => {
    vi.mocked(useAppSelector).mockReturnValue(AuthorizationStatus.Auth);

    const store = mockStore({});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceCard offer={fakeOffer} />
        </BrowserRouter>
      </Provider>
    );

    const imageLink = screen.getByAltText('Place image').closest('a');
    const titleLink = screen.getByText(fakeOffer.title).closest('a');

    expect(imageLink).toHaveAttribute('href', `/offer/${fakeOffer.id}`);
    expect(titleLink).toHaveAttribute('href', `/offer/${fakeOffer.id}`);
  });
});
