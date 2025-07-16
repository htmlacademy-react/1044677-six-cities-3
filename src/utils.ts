import { CITIES } from './const';
import { City } from './types/city';

export const getRandomCity = (): City => {
  const randomIndex = Math.floor(Math.random() * CITIES.length);
  return CITIES[randomIndex];
};
