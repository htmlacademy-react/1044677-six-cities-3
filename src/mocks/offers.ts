import { Offers } from '../types/offer';

export const offers: Offers = [
  {
    id: 1,
    img: 'img/apartment-01.jpg',
    priceValue: 100,
    rating: 80,
    placeCardName: 'Beautiful flat in the center of the city',
    placeCardType: 'Flat',
    isFavorite: true,
    isPremium: true,
    city: 'Amsterdam',
    lat: 52.3909553943508,
    lng: 4.85309666406198
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
    city: 'Amsterdam',
    lat: 52.3609553943508,
    lng: 4.85309666406198
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
    city: 'Amsterdam',
    lat: 52.3909553943508,
    lng: 4.929309666406198
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
    city: 'Amsterdam',
    lat: 52.3809553943508,
    lng: 4.939309666406198
  },
  {
    id: 5,
    img: 'img/apartment-03.jpg',
    priceValue: 200,
    rating: 100,
    placeCardName: 'Cozy apartment room',
    placeCardType: 'Apartment',
    isFavorite: false,
    isPremium: true,
    city: 'Cologne',
    lat: 50.935173,
    lng: 6.953101
  },
  {
    id: 6,
    img: 'img/apartment-02.jpg',
    priceValue: 3000,
    rating: 100,
    placeCardName: 'Luxurious apartment in the city center',
    placeCardType: 'Apartment',
    isFavorite: true,
    isPremium: true,
    city: 'Hamburg',
    lat: 53.551086,
    lng: 9.993682
  },
  {
    id: 7,
    img: 'img/apartment-02.jpg',
    priceValue: 5000,
    rating: 100,
    placeCardName: 'Luxurious apartment in the city center',
    placeCardType: 'Apartment',
    isFavorite: false,
    isPremium: true,
    city: 'Paris',
    lat: 48.856613,
    lng: 2.352222
  },
  {
    id: 8,
    img: 'img/apartment-02.jpg',
    priceValue: 500,
    rating: 80,
    placeCardName: 'Beautiful flat in the city center',
    placeCardType: 'Flat',
    isFavorite: false,
    isPremium: false,
    city: 'Dusseldorf',
    lat: 51.225402,
    lng: 6.776314
  },
  {
    id: 9,
    img: 'img/apartment-01.jpg',
    priceValue: 300,
    rating: 60,
    placeCardName: 'Hostel room in the downtown',
    placeCardType: 'Hostel',
    isFavorite: false,
    isPremium: false,
    city: 'Dusseldorf',
    lat: 51.235402,
    lng: 6.786314
  }
];

export const getNearOffers = (offerId: number, allOffers: Offers): Offers => allOffers
  .filter((offer) => offer.id !== offerId)
  .slice(0, 3);
