import { useEffect, useRef } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import { checkAuthAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchOffers, fetchFavoriteOffers } from '../../store/action';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import { getAllOffers } from '../../store/data-process/data-process.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const allOffers = useAppSelector(getAllOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (isMountedRef.current) {
      dispatch(checkAuthAction());
      if (allOffers.length === 0) {
        dispatch(fetchOffers());
      }
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [dispatch, allOffers.length]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authorizationStatus]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen/>}
          />
          <Route
            path={AppRoute.NotFound}
            element={<NotFoundScreen/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
