import { City } from './types/city';

export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const MAX_COMMENTS = 10;
export const MAX_NEARBY_OFFERS = 3;
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const TIMEOUT_SHOW_ERROR = 2000;

export const CITIES: City[] = [
  {
    title: 'Paris',
    lat: 48.864716,
    lng: 2.349014,
    zoom: 13
  },
  {
    title: 'Cologne',
    lat: 50.935173,
    lng: 6.953101,
    zoom: 13
  },
  {
    title: 'Brussels',
    lat: 50.846557,
    lng: 4.351697,
    zoom: 13
  },
  {
    title: 'Amsterdam',
    lat: 52.372776,
    lng: 4.892222,
    zoom: 13
  },
  {
    title: 'Hamburg',
    lat: 53.551086,
    lng: 9.993682,
    zoom: 13
  },
  {
    title: 'Dusseldorf',
    lat: 51.233334,
    lng: 6.783333,
    zoom: 13
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

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Nearby = '/nearby',
  Favorite = '/favorite',
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  App = 'APP',
}

export const URL_MARKER_DEFAULT =
  './img/pin.svg';

export const URL_MARKER_CURRENT =
  './img/pin-active.svg';
