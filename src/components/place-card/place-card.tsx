import { memo } from 'react';
import { Offer } from '../../types/offer';
import { toggleFavorite } from '../../store/action';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter?: (offer: Offer) => void;
  onMouseLeave?: () => void;
}

function PlaceCard({offer, onMouseEnter, onMouseLeave}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {id, title, type, price, isPremium, isFavorite, previewImage, rating} = offer;

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({offerId: id, isFavorite}));
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={onMouseEnter ? () => onMouseEnter(offer) : undefined}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={() => authorizationStatus === AuthorizationStatus.Auth ? handleToggleFavorite() : navigate(AppRoute.Login)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);
