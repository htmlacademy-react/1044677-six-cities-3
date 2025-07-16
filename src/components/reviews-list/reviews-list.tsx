import { memo } from 'react';
import Review from '../review/review';
import { Reviews } from '../../types/review';

type ReviewsListProps = {
  reviews: Reviews;
  totalCount: number;
}

function ReviewsList({reviews, totalCount}: ReviewsListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{totalCount}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default memo(ReviewsList);
