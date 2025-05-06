import { Offer } from '../../types/offer';
import NearbyPlaceCard from '../nearby-place-card/nearby-place-card';

type NearbyOffersListProps = {
  offers: Offer[];
  onMouseEnter: (offer: Offer) => void;
  onMouseLeave: () => void;
}

function NearbyOffersList({offers, onMouseEnter, onMouseLeave}: NearbyOffersListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <NearbyPlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onMouseEnter(offer)}
          onMouseLeave={() => onMouseLeave()}
        />
      ))}
    </div>
  );
}

export default NearbyOffersList;
