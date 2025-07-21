import { City } from '../types/city';
import { Map, TileLayer } from 'leaflet';
import { useEffect, useState, MutableRefObject, useRef } from 'react';

function useMap(
  mapRef: MutableRefObject<HTMLDivElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    if (mapRef.current !== null && !isInitializedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng
        },
        zoom: city.zoom || 13
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      if (isMounted) {
        setMap(instance);
        isInitializedRef.current = true;
      }
    }

    return () => {
      isMounted = false;
      if (map) {
        map.remove();
        isInitializedRef.current = false;
        setMap(null);
      }
    };
  }, [mapRef]);

  useEffect(() => {
    let isMounted = true;

    if (map && isInitializedRef.current) {
      setTimeout(() => {
        if (isMounted) {
          map.invalidateSize();
          map.setView(
            {
              lat: city.lat,
              lng: city.lng
            },
            city.zoom || 13
          );
        }
      }, 10);
    }

    return () => {
      isMounted = false;
    };
  }, [map, city.lat, city.lng, city.zoom]);

  return map;
}

export default useMap;
