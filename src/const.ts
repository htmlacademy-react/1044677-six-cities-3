import { City } from './types/city';

export const CITIES: City[] = [
  {
    title: 'Paris',
    lat: 48.864716,
    lng: 2.349014,
    zoom: 10
  },
  {
    title: 'Cologne',
    lat: 50.935173,
    lng: 6.953101,
    zoom: 10
  },
  {
    title: 'Brussels',
    lat: 50.846557,
    lng: 4.351697,
    zoom: 10
  },
  {
    title: 'Amsterdam',
    lat: 52.372776,
    lng: 4.892222,
    zoom: 10
  },
  {
    title: 'Hamburg',
    lat: 53.551086,
    lng: 9.993682,
    zoom: 10
  },
  {
    title: 'Dusseldorf',
    lat: 51.233334,
    lng: 6.783333,
    zoom: 10
  }
];

export const DEFAULT_CITY: City = CITIES[0];

export const RATING_TITLES = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' }
];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  './img/pin.svg';

export const URL_MARKER_CURRENT =
  './img/pin-active.svg';
