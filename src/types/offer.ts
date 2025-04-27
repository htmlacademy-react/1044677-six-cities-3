export type Offer = {
  id: number;
  img: string;
  priceValue: number;
  rating: number;
  placeCardName: string;
  placeCardType: string;
  isFavorite: boolean;
  isPremium: boolean;
  city: string;
  lat: number;
  lng: number;
};

export type Offers = Offer[];
