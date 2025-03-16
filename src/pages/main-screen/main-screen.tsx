import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { Helmet } from 'react-helmet-async';
import { CITIES, DEFAULT_CITY } from '../../const';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';

type MainScreenProps = {
  offersCount: number;
  offers: Offer[];
}

function MainScreen({offersCount, offers}: MainScreenProps): JSX.Element {
  const isActive: City = DEFAULT_CITY;

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <li className="locations__item" key={city}>
                  <a className={`locations__item-link tabs__item ${city === isActive ? ' tabs__item--active' : ''}`} href="#">
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {offers.map((offer) => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                  />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
