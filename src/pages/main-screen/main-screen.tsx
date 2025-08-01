import { useState } from 'react';
import { Offer } from '../../types/offer';
import Map from '../../components/map/map';
import { Helmet } from 'react-helmet-async';
import Sort from '../../components/sort/sort';
import Header from '../../components/header/header';
import { DEFAULT_CITY, SortType } from '../../const';
import Spinner from '../../components/spinner/spinner';
import ErrorScreen from '../error-screen/error-screen';
import Locations from '../../components/locations/locations';
import OffersList from '../../components/offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeCity } from '../../store/app-process/app-process.slice';
import OffersListEmpty from '../../components/offers-list-empty/offers-list-empty';
import { getCity, getSortType } from '../../store/app-process/app-process.selectors';
import { getAllOffers, getDataIsLoading, getDataHasError } from '../../store/data-process/data-process.selectors';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);
  const sortType = useAppSelector(getSortType);
  const allOffers = useAppSelector(getAllOffers);
  const hasError = useAppSelector(getDataHasError);
  const isLoading = useAppSelector(getDataIsLoading);
  const currentOffers = allOffers.filter((offer) => offer.city.name === currentCity.title);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const onCityChange = (selectedCity: typeof DEFAULT_CITY) => {
    dispatch(changeCity(selectedCity));
  };

  const getSortedOffers = (offersList: Offer[]): Offer[] => {
    switch (sortType) {
      case SortType.PriceLowToHigh:
        return [...offersList].sort((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return [...offersList].sort((a, b) => b.price - a.price);
      case SortType.TopRated:
        return [...offersList].sort((a, b) => b.rating - a.rating);
      default:
        return offersList;
    }
  };

  const sortedOffers = getSortedOffers(currentOffers);

  if (isLoading) {
    return (
      <div className="page page--gray page--main">
        <Helmet>
          <title>6 cities</title>
        </Helmet>
        <Header/>
        <main className={`page__main page__main--index ${currentOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <Locations
              currentCity={currentCity}
              onCityChange={onCityChange}
            />
          </div>
          <div className="cities">
            <div className={`cities__places-container ${currentOffers.length === 0 ? 'cities__places-container--empty' : ''} container`}>
              <section className={`${currentOffers.length === 0 ? 'cities__no-places' : 'cities__places places'}`}>
                {currentOffers.length === 0 ? <OffersListEmpty currentCity={currentCity} /> : (
                  <>
                    <h2 className="visually-hidden">Places</h2>
                    <Spinner />
                  </>
                )}
              </section>
              {currentOffers.length > 0 ? (
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map
                      city={currentCity}
                      offers={currentOffers}
                      activeOffer={activeOffer}
                    />
                  </section>
                </div>
              ) : (
                <div className="cities__right-section"></div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header/>
      <main className={`page__main page__main--index ${currentOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations
            currentCity={currentCity}
            onCityChange={onCityChange}
          />
        </div>
        <div className="cities">
          <div className={`cities__places-container ${currentOffers.length === 0 ? 'cities__places-container--empty' : ''} container`}>
            <section className={`${currentOffers.length === 0 ? 'cities__no-places' : 'cities__places places'}`}>
              {currentOffers.length === 0 ? <OffersListEmpty currentCity={currentCity} /> : (
                <>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{currentOffers.length} place{currentOffers.length > 1 || currentOffers.length === 0 ? 's' : ''} to stay in {currentCity.title}</b>
                  <Sort/>
                  <OffersList
                    offers={sortedOffers}
                    onMouseEnter={setActiveOffer}
                    onMouseLeave={() => setActiveOffer(null)}
                  />
                </>
              )}
            </section>
            {currentOffers.length > 0 ? (
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    city={currentCity}
                    offers={currentOffers}
                    activeOffer={activeOffer}
                  />
                </section>
              </div>
            ) : (
              <div className="cities__right-section"></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
