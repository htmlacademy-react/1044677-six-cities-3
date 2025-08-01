import { City } from './types/city';
import { CITIES, RATING_MULTIPLIER } from './const';

export const getRandomCity = (): City => {
  const randomIndex = Math.floor(Math.random() * CITIES.length);
  return CITIES[randomIndex];
};

export const getRatingWidth = (rating: number): number => Math.round(rating) * RATING_MULTIPLIER;
