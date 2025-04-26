import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
  onMouseEnter: (offer: Offer) => void;
  onMouseLeave: () => void;
}

function OffersList({ offers, onMouseEnter, onMouseLeave }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onMouseEnter(offer)}
          onMouseLeave={() => onMouseLeave()}
        />
      ))}
    </div>
  );
}

export default OffersList;
