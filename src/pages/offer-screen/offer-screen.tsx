import { useEffect } from 'react';
import Map from '../../components/map/map';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ReviewForm from '../../components/review-form/review-form';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import ReviewsList from '../../components/reviews-list/reviews-list';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';
import { CITIES, AuthorizationStatus, AppRoute, MAX_NEARBY_OFFERS, MAX_COMMENTS } from '../../const';
import { toggleFavorite, fetchComments, fetchOfferById, fetchNearbyOffers } from '../../store/action';

function OfferScreen(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const nearbyOffersToShow = nearbyOffers.slice(0, MAX_NEARBY_OFFERS);
  const comments = useAppSelector((state) => state.comments);
  const commentsToShow = comments.slice(0, MAX_COMMENTS);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [id]);


  const handleToggleFavorite = () => {
    if (id) {
      dispatch(toggleFavorite(id));
    }
  };

  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  const currentCity = CITIES.find((city) => city.title === currentOffer.city.name) || CITIES[0];

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: {currentOffer.title}</title>
      </Helmet>

      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={currentOffer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={() => authorizationStatus === AuthorizationStatus.Auth ? handleToggleFavorite() : navigate(AppRoute.Login)}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${currentOffer.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedroom{currentOffer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adult{currentOffer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {currentOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
                <ReviewsList reviews={commentsToShow} />
                {isAuthorized ? (
                  <ReviewForm />
                ) : ''}
              </div>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={currentCity}
              offers={nearbyOffersToShow}
              activeOffer={currentOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyOffersList offers={nearbyOffersToShow} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
