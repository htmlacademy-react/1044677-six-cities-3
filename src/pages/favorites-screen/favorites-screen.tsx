import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

type FavoritesScreenProps = {
  offers: Offer[];
}

function FavoriteCard({offer}: { offer: Offer }): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image"
            src={offer.img}
            width="150"
            height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.placeCardName}</Link>
        </h2>
        <p className="place-card__type">{offer.placeCardType}</p>
      </div>
    </article>
  );
}

function CityOffers({city, offers}: {city: string; offers: Offer[]}): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city)));

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => (
                <CityOffers
                  key={city}
                  city={city}
                  offers={favoriteOffers.filter((offer) => offer.city === city)}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesScreen;
