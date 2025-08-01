import { vi } from 'vitest';
import { Provider } from 'react-redux';
import OffersList from './offers-list';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

const mockStore = configureMockStore();

describe('Component: OffersList', () => {
  const fakeOffers = [makeFakeOffer(), makeFakeOffer()];
  const onMouseEnter = vi.fn();
  const onMouseLeave = vi.fn();

  const store = mockStore({
    USER: {
      authorizationStatus: 'AUTH',
    },
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OffersList
            offers={fakeOffers}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render offers list', () => {
    renderComponent();

    expect(screen.getAllByTestId('rating-stars')).toHaveLength(2);
  });

  it('should render empty list when no offers', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OffersList
            offers={[]}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryAllByTestId('rating-stars')).toHaveLength(0);
  });

  it('should call onMouseEnter when hovering over offer', () => {
    renderComponent();

    const offerCards = screen.getAllByTestId('rating-stars');
    const article = offerCards[0].closest('article');
    expect(article).not.toBeNull();
    fireEvent.mouseEnter(article!);

    expect(onMouseEnter).toHaveBeenCalledWith(fakeOffers[0]);
  });

  it('should call onMouseLeave when leaving offer', () => {
    renderComponent();

    const offerCards = screen.getAllByTestId('rating-stars');
    const article = offerCards[0].closest('article');
    expect(article).not.toBeNull();
    fireEvent.mouseLeave(article!);

    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('should render offer information correctly', () => {
    renderComponent();

    const offerCards = screen.getAllByTestId('rating-stars');

    fakeOffers.forEach((offer, index) => {
      expect(offerCards[index].closest('article')).toHaveTextContent(offer.title);
    });
  });

  it('should render premium badge for premium offers', () => {
    const premiumOffer = { ...makeFakeOffer(), isPremium: true };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OffersList
            offers={[premiumOffer]}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium badge for non-premium offers', () => {
    const regularOffer = { ...makeFakeOffer(), isPremium: false };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <OffersList
            offers={[regularOffer]}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });
});
