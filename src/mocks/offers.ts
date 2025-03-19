import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 1,
    img: 'img/apartment-01.jpg',
    priceValue: 100,
    rating: 80,
    placeCardName: 'Beautiful flat in the center of the city',
    placeCardType: 'Flat',
    isFavorite: true,
    isPremium: true,
    city: {
      name: 'Amsterdam',
    },
  },
  {
    id: 2,
    img: 'img/apartment-02.jpg',
    priceValue: 220,
    rating: 100,
    placeCardName: 'Beautiful & luxurious apartment at great location',
    placeCardType: 'Apartment',
    isFavorite: true,
    isPremium: true,
    city: {
      name: 'Amsterdam',
    },
  },
  {
    id: 3,
    img: 'img/apartment-03.jpg',
    priceValue: 20,
    rating: 60,
    placeCardName: 'Cozy hostel room',
    placeCardType: 'Hostel',
    isFavorite: false,
    isPremium: false,
    city: {
      name: 'Cologne',
    },
  },
  {
    id: 4,
    img: 'img/apartment-02.jpg',
    priceValue: 300,
    rating: 90,
    placeCardName: 'Luxurious apartment in the city center',
    placeCardType: 'Apartment',
    isFavorite: true,
    isPremium: false,
    city: {
      name: 'Hamburg',
    },
  }
];
