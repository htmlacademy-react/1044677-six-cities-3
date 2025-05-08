import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

type NearbyPlaceCardProps = {
  offer: Offer;
}

function NearbyPlaceCard({offer}: NearbyPlaceCardProps): JSX.Element {
  const {id, img, priceValue, rating, placeCardName, placeCardType, isPremium, isFavorite} = offer;

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
            src={img}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {placeCardName}
          </Link>
        </h2>
        <p className="place-card__type">{placeCardType}</p>
      </div>
    </article>
  );
}

export default NearbyPlaceCard;
