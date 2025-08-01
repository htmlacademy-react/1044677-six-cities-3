import { memo } from 'react';
import { Offer } from '../../types/offer';
import { getRatingWidth } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { toggleFavorite, fetchFavoriteOffers } from '../../store/action';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type NearbyPlaceCardProps = {
  offer: Offer;
}

function NearbyPlaceCard({offer}: NearbyPlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {id, previewImage, price, rating, title, type, isPremium, isFavorite} = offer;

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({offerId: id, isFavorite}))
      .unwrap()
      .then(() => {
        dispatch(fetchFavoriteOffers());
      })
      .catch(() => {
      });
  };

  return (
    <article
      className="near-places__card place-card"
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="near-places__image-wrapper place-card__image-wrapper">
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
            <span data-testid="rating-stars" style={{width: `${getRatingWidth(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

export default memo(NearbyPlaceCard);
