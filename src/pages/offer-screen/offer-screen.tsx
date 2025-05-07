import { CITIES } from '../../const';
import { Offer } from '../../types/offer';
import Map from '../../components/map/map';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { reviews } from '../../mocks/reviews';
import { getNearOffers } from '../../mocks/offers';
import Header from '../../components/header/header';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';

type OfferScreenProps = {
  offers: Offer[];
}

function OfferScreen({offers}: OfferScreenProps): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const offer = offers.find((item) => item.id === Number(id));
  if (!offer) {
    return <NotFoundScreen />;
  }

  const nearbyOffers = getNearOffers(offer.id, offers);
  const currentCity = CITIES.find((city) => city.title === offer.city) || CITIES[0];
  const mapOffers = [offer, ...nearbyOffers];
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: {offer.placeCardName}</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src={offer.img} alt={offer.placeCardName}/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio"/>
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.placeCardName}
                </h1>
                <button className={`offer__bookmark-button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${offer.rating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating / 20}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.placeCardType}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.priceValue}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                    Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                    Washing machine
                  </li>
                  <li className="offer__inside-item">
                    Towels
                  </li>
                  <li className="offer__inside-item">
                    Heating
                  </li>
                  <li className="offer__inside-item">
                    Coffee machine
                  </li>
                  <li className="offer__inside-item">
                    Baby seat
                  </li>
                  <li className="offer__inside-item">
                    Kitchen
                  </li>
                  <li className="offer__inside-item">
                    Dishwasher
                  </li>
                  <li className="offer__inside-item">
                    Cabel TV
                  </li>
                  <li className="offer__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </div>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={currentCity}
              offers={mapOffers}
              activeOffer={offer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyOffersList
              offers={nearbyOffers}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
