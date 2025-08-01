import { Provider } from 'react-redux';
import ReviewsList from './reviews-list';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeReview } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('Component: ReviewsList', () => {
  const fakeReviews = [makeFakeReview(), makeFakeReview()];

  const store = mockStore({
    USER: {
      authorizationStatus: 'AUTH',
    },
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewsList reviews={fakeReviews} totalCount={fakeReviews.length} />
        </BrowserRouter>
      </Provider>
    );
  };

  it('should render reviews list', () => {
    renderComponent();

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByTestId('rating-stars')).toHaveLength(2);
  });

  it('should render empty list when no reviews', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewsList reviews={[]} totalCount={0} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByTestId('rating-stars')).toHaveLength(0);
  });

  it('should render review information correctly', () => {
    renderComponent();

    const reviewItems = screen.getAllByTestId('rating-stars');

    fakeReviews.forEach((review, index) => {
      expect(reviewItems[index].closest('li')).toHaveTextContent(review.comment);
    });
  });

  it('should render user information', () => {
    renderComponent();

    fakeReviews.forEach((review) => {
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
    });
  });

  it('should render rating stars', () => {
    renderComponent();

    const ratingStars = screen.getAllByTestId('rating-stars');
    expect(ratingStars).toHaveLength(fakeReviews.length);
  });

  it('should render review dates', () => {
    renderComponent();

    const dates = fakeReviews.map((review) =>
      new Date(review.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      })
    );

    dates.forEach((date) => {
      expect(screen.getAllByText(date).length).toBeGreaterThan(0);
    });
  });

  it('should render user information correctly', () => {
    renderComponent();

    fakeReviews.forEach((review) => {
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
    });
  });
});
