import { Offer } from '../../types/offer';
import Map from '../../components/map/map';
import { Helmet } from 'react-helmet-async';
import Sort from '../../components/sort/sort';
import Header from '../../components/header/header';
import { useState, useEffect, useMemo } from 'react';
import { DEFAULT_CITY, SortType } from '../../const';
import Spinner from '../../components/spinner/spinner';
import ErrorScreen from '../error-screen/error-screen';
import Locations from '../../components/locations/locations';
import OffersList from '../../components/offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeCity } from '../../store/app-process/app-process.slice';
import { resetError } from '../../store/data-process/data-process.slice';
import OffersListEmpty from '../../components/offers-list-empty/offers-list-empty';
import { getCity, getSortType } from '../../store/app-process/app-process.selectors';
import { getDataIsLoading, getDataHasError, getCurrentOffers } from '../../store/data-process/data-process.selectors';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);
  const sortType = useAppSelector(getSortType);
  const currentOffers = useAppSelector(getCurrentOffers);
  const hasError = useAppSelector(getDataHasError);
  const isLoading = useAppSelector(getDataIsLoading);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const hasOffers = useMemo(() => currentOffers.length > 0, [currentOffers.length]);
  const offersCount = useMemo(() => currentOffers.length, [currentOffers.length]);

  const sortedOffers = useMemo(() => {
    switch (sortType) {
      case SortType.PriceLowToHigh:
        return [...currentOffers].sort((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return [...currentOffers].sort((a, b) => b.price - a.price);
      case SortType.TopRated:
        return [...currentOffers].sort((a, b) => b.rating - a.rating);
      default:
        return currentOffers;
    }
  }, [currentOffers, sortType]);

  const mainClass = useMemo(() =>
    `page__main page__main--index ${!hasOffers ? 'page__main--index-empty' : ''}`,
  [hasOffers]
  );

  const containerClass = useMemo(() =>
    `cities__places-container ${!hasOffers ? 'cities__places-container--empty' : ''} container`,
  [hasOffers]
  );

  const sectionClass = useMemo(() =>
    !hasOffers ? 'cities__no-places' : 'cities__places places',
  [hasOffers]
  );

  useEffect(() => {
    if (hasOffers && hasError) {
      dispatch(resetError());
    }
  }, [dispatch, hasOffers, hasError]);

  const onCityChange = (selectedCity: typeof DEFAULT_CITY) => {
    dispatch(changeCity(selectedCity));
  };

  if (isLoading) {
    return (
      <div className="page page--gray page--main">
        <Helmet>
          <title>6 cities</title>
        </Helmet>
        <Header/>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <Locations
              currentCity={currentCity}
              onCityChange={onCityChange}
            />
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <Spinner />
              </section>
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
      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations
            currentCity={currentCity}
            onCityChange={onCityChange}
          />
        </div>
        <div className="cities">
          <div className={containerClass}>
            <section className={sectionClass}>
              {!hasOffers ? <OffersListEmpty currentCity={currentCity} /> : (
                <>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersCount} place{offersCount > 1 || offersCount === 0 ? 's' : ''} to stay in {currentCity.title}</b>
                  <Sort/>
                  <OffersList
                    offers={sortedOffers}
                    onMouseEnter={setActiveOffer}
                    onMouseLeave={() => setActiveOffer(null)}
                  />
                </>
              )}
            </section>
            {hasOffers ? (
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
