import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LayerGroup } from 'leaflet';
import { City } from '../../types/city';
import useMap from '../../hooks/use-map';
import { useRef, useEffect, memo } from 'react';
import { Offers, Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

type MapProps = {
  city: City;
  offers: Offers;
  activeOffer: Offer | null;
};

const defaultMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

const activeMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

function Map(props: MapProps): JSX.Element {
  const {city, offers, activeOffer} = props;

  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    let isMounted = true;

    if (map && isMounted) {
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();

      if (activeOffer && isMounted) {
        leaflet.marker({
          lat: activeOffer.location.latitude,
          lng: activeOffer.location.longitude
        }, {
          icon: activeMarkerIcon
        }).addTo(markerLayer.current);
      }

      if (isMounted) {
        offers.forEach((offer) => {
          if (!activeOffer || offer.id !== activeOffer.id) {
            leaflet.marker({
              lat: offer.location.latitude,
              lng: offer.location.longitude
            }, {
              icon: defaultMarkerIcon
            }).addTo(markerLayer.current);
          }
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [map, offers, activeOffer]);

  return (
    <section
      className="cities__map map"
      style={{
        height: '100%'
      }} ref={mapRef}
    />
  );
}

export default memo(Map);
