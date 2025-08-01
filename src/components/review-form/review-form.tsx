import { useParams } from 'react-router-dom';
import { leaveComment } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { CommentLength, Rating, RATING_TITLES } from '../../const';
import { useState, ChangeEvent, FormEvent, Fragment, memo } from 'react';

function ReviewForm(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isSubmittingComment = useAppSelector((state) => state.DATA.isSubmittingComment);
  const [formData, setFormData] = useState({rating: 0, review: ''});
  const [commentError, setCommentError] = useState<string | null>(null);
  const isFormValid = formData.rating > 0 && formData.review.length >= Number(CommentLength.Min) && formData.review.length <= Number(CommentLength.Max);
  const isDisabled = !isFormValid || isSubmittingComment;

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

    if (!id || formData.rating <= Number(Rating.Min) || formData.review.length < Number(CommentLength.Min) || formData.review.length > Number(CommentLength.Max)) {
      return;
    }

    setCommentError('');

    dispatch(leaveComment({
      offerId: id,
      comment: formData.review,
      rating: formData.rating
    }))
      .unwrap()
      .then(() => {
        setFormData({rating: 0, review: ''});
        setCommentError(null);
      })
      .catch(() => {
        setCommentError('Failed to submit comment. Please try again.');
      });
  };


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
              disabled={isSubmittingComment}
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
        <div
          className="reviews__error"
          style={{
            color: '#ff0000',
            fontSize: '14px',
            marginBottom: '10px',
            padding: '8px',
            backgroundColor: '#ffe6e6',
            border: '1px solid #ffcccc',
            borderRadius: '4px'
          }}
        >
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
        disabled={isSubmittingComment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{CommentLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          {isSubmittingComment ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default memo(ReviewForm);
