import { Offers } from '../../types/offer';
import NearbyPlaceCard from '../nearby-place-card/nearby-place-card';

function NearbyOffersList({offers}: {offers: Offers}): JSX.Element {
  return (
    <div className="near-places__list places__list" data-testid="nearby-offers-list">
      {offers.map((offer) => (
        <NearbyPlaceCard
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}

export default NearbyOffersList;
