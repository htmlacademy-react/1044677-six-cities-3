import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { Helmet } from 'react-helmet-async';
import { RATING_MULTIPLIER } from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { toggleFavorite, fetchFavoriteOffers } from '../../store/action';
import { getFavoriteOffers, getDataIsLoading } from '../../store/data-process/data-process.selectors';

function FavoriteCard({offer}: { offer: Offer }): JSX.Element {
  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({offerId: offer.id, isFavorite: offer.isFavorite}))
      .unwrap()
      .then(() => {
        dispatch(fetchFavoriteOffers());
      })
      .catch(() => {
      });
  };

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
            src={offer.previewImage}
            width="150"
            height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={handleToggleFavorite}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * RATING_MULTIPLIER}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
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

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isLoading = useAppSelector(getDataIsLoading);
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="page">
        <Helmet>
          <title>6 cities: favorites</title>
        </Helmet>
        <Header/>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <Spinner />
          </div>
        </main>
        <Footer/>
      </div>
    );
  }

  return (
    <div className={`page ${favoriteOffers.length === 0 ? 'page--favorites-empty' : ''}`}>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header/>
      <main className={`page__main page__main--favorites ${favoriteOffers.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        {favoriteOffers.length === 0 ? (
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        ) : (
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => (
                  <CityOffers
                    key={city}
                    city={city}
                    offers={favoriteOffers.filter((offer) => offer.city.name === city)}
                  />
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesScreen;
