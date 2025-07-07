import { RATING_TITLES } from '../../const';
import { useParams } from 'react-router-dom';
import { leaveComment } from '../../store/action';
import { useAppDispatch } from '../../hooks/store';
import { useState, ChangeEvent, FormEvent, Fragment } from 'react';

function ReviewForm(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({rating: 0, review: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rating: Number(evt.target.value)
    });
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      review: evt.target.value
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!id || formData.rating === 0 || formData.review.length < 50) {
      return;
    }

    setCommentError('');
    setIsSubmitting(true);

    dispatch(leaveComment({
      offerId: id,
      comment: formData.review,
      rating: formData.rating
    }))
      .unwrap()
      .then(() => {
        setFormData({rating: 0, review: ''});
      })
      .catch(() => {
        setCommentError('Failed to submit comment. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const isFormValid = formData.rating > 0 && formData.review.length >= 50 && formData.review.length <= 300;
  const isDisabled = !isFormValid || isSubmitting;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_TITLES.map(({ value, title }) => (
          <Fragment key={`input-${value}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              onChange={handleRatingChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      {commentError && (
        <div className="reviews__error">
          {commentError}
        </div>
      )}
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleReviewChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
