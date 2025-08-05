import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import NearbyOffersList from './nearby-offers-list';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('Component: NearbyOffersList', () => {
  const fakeOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

  const store = mockStore({
    USER: {
      authorizationStatus: 'AUTH',
    },
  });

  const renderComponent = (offers = fakeOffers) => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NearbyOffersList offers={offers} />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should render nearby offers list', () => {
    renderComponent();

    const listContainer = screen.getByTestId('nearby-offers-list');
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toHaveClass('near-places__list', 'places__list');
  });

  it('should render empty list when no offers', () => {
    renderComponent([]);

    const listContainer = screen.getByTestId('nearby-offers-list');
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toBeEmptyDOMElement();
  });

  it('should render correct number of offer cards', () => {
    renderComponent();

    const offerCards = screen.getAllByRole('article');
    expect(offerCards).toHaveLength(fakeOffers.length);
  });

  it('should render offer cards with correct data', () => {
    renderComponent();

    fakeOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
      expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
      expect(screen.getAllByText(offer.type.charAt(0).toUpperCase() + offer.type.slice(1)).length).toBeGreaterThan(0);
    });
  });

  it('should render premium mark for premium offers', () => {
    const premiumOffer = { ...makeFakeOffer(), isPremium: true };
    renderComponent([premiumOffer]);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium mark for non-premium offers', () => {
    const regularOffer = { ...makeFakeOffer(), isPremium: false };
    renderComponent([regularOffer]);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render rating stars for each offer', () => {
    renderComponent();

    const ratingStars = screen.getAllByTestId('rating-stars');
    expect(ratingStars).toHaveLength(fakeOffers.length);
  });

  it('should render bookmark buttons for each offer', () => {
    renderComponent();

    const bookmarkButtons = screen.getAllByRole('button');
    expect(bookmarkButtons.length).toBeGreaterThanOrEqual(fakeOffers.length);
  });
});
