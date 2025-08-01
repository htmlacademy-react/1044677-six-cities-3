import Review from './review';
import { describe, it, expect } from 'vitest';
import { makeFakeReview } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

describe('Component: Review', () => {
  it('should render review with user data and comment', () => {
    const fakeReview = makeFakeReview();

    render(<Review review={fakeReview} />);

    const userAvatar = screen.getByRole('img', { name: /reviews avatar/i });
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute('src', fakeReview.user.avatarUrl);
    expect(userAvatar).toHaveAttribute('width', '54');
    expect(userAvatar).toHaveAttribute('height', '54');

    const userName = screen.getByText(fakeReview.user.name);
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveClass('reviews__user-name');

    const comment = screen.getByText(fakeReview.comment);
    expect(comment).toBeInTheDocument();
    expect(comment).toHaveClass('reviews__text');

    const ratingStars = screen.getByText('Rating');
    expect(ratingStars).toBeInTheDocument();
    expect(ratingStars).toHaveClass('visually-hidden');

    const reviewDate = new Date(fakeReview.date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    const dateElement = screen.getByText(reviewDate);
    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveClass('reviews__time');
  });

  it('should render review with correct rating width', () => {
    const fakeReview = makeFakeReview();
    fakeReview.rating = 4;

    render(<Review review={fakeReview} />);

    const ratingSpan = screen.getByTestId('rating-stars');
    expect(ratingSpan).toHaveStyle({ width: '80%' });
  });
});
