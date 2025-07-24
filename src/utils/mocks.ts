import faker from 'faker';
import { City } from '../types/city';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { Offer, OfferCity } from '../types/offer';

export const makeFakeCity = (): City => ({
  title: faker.address.city(),
  lat: parseFloat(faker.address.latitude()),
  lng: parseFloat(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 10, max: 15 })
});

export const makeFakeOfferCity = (): OfferCity => ({
  name: faker.address.city(),
  location: {
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    zoom: faker.datatype.number({ min: 10, max: 15 })
  }
});

export const makeFakeOffer = (): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(),
  type: faker.random.arrayElement(['apartment', 'room', 'house', 'hotel']),
  price: faker.datatype.number({ min: 50, max: 1000 }),
  city: makeFakeOfferCity(),
  location: {
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    zoom: faker.datatype.number({ min: 10, max: 15 })
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: faker.random.arrayElements([
    'Heating', 'Kitchen', 'Cable TV', 'Washing machine',
    'Coffee machine', 'Dishwasher', 'Wi-Fi', 'Air conditioning'
  ], 8),
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean()
  },
  images: Array.from({ length: faker.datatype.number({ min: 3, max: 6 }) }, () => faker.image.imageUrl()),
  maxAdults: faker.datatype.number({ min: 1, max: 4 }),
  previewImage: faker.image.imageUrl()
});

export const makeFakeReview = (): Review => ({
  id: faker.datatype.string(),
  date: faker.date.recent().toISOString(),
  user: {
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean()
  },
  comment: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 1, max: 5 })
});

export const makeFakeUserData = (): UserData => ({
  id: faker.datatype.number(),
  email: faker.internet.email(),
  token: faker.random.alphaNumeric(32)
});
