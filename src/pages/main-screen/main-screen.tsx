import { useState } from 'react';
import { Offer } from '../../types/offer';
import Map from '../../components/map/map';
import { Helmet } from 'react-helmet-async';
import { changeCity } from '../../store/action';
import { CITIES, DEFAULT_CITY } from '../../const';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

function MainScreen(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();

  const currentOffers = offers.filter((offer) => offer.city === currentCity.title);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const handleCityChange = (selectedCity: typeof DEFAULT_CITY) => {
    dispatch(changeCity(selectedCity));
  };

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
                <li className="locations__item" key={city.title}>
                  <a
                    className={`locations__item-link tabs__item ${city.title === currentCity.title ? ' tabs__item--active' : ''}`}
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      handleCityChange(city);
                    }}
                  >
                    <span>{city.title}</span>
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
              <b className="places__found">{currentOffers.length} places to stay in {currentCity.title}</b>
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
              <OffersList
                offers={currentOffers}
                onMouseEnter={setActiveOffer}
                onMouseLeave={() => setActiveOffer(null)}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={currentCity}
                  offers={currentOffers}
                  activeOffer={activeOffer}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
