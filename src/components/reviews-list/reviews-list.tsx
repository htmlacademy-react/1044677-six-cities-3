import { memo } from 'react';
import Review from '../review/review';
import { Reviews } from '../../types/review';
import ReviewForm from '../review-form/review-form';

type ReviewsListProps = {
  reviews: Reviews;
  totalCount: number;
  showForm?: boolean;
}

function ReviewsList({reviews, totalCount, showForm = false}: ReviewsListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{totalCount}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
      {showForm && <ReviewForm />}
    </section>
  );
}

export default memo(ReviewsList);
