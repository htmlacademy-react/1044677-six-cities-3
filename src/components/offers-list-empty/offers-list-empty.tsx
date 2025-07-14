import { memo } from 'react';
import { City } from '../../types/city';

type OffersListEmptyProps = {
  currentCity: City;
}

function OffersListEmpty({ currentCity }: OffersListEmptyProps): JSX.Element {
  return (
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in {currentCity.title}</p>
    </div>
  );
}

export default memo(OffersListEmpty);
