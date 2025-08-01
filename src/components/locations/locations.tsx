import { memo } from 'react';
import { CITIES } from '../../const';
import { City } from '../../types/city';

type LocationsProps = {
  currentCity: City;
  onCityChange: (city: City) => void;
}

function Locations({currentCity, onCityChange}: LocationsProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li className="locations__item" key={city.title}>
            <a
              className={`locations__item-link tabs__item ${city.title === currentCity.title ? ' tabs__item--active' : ''}`}
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                onCityChange(city);
              }}
            >
              <span>{city.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(Locations);
