import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { Area } from "../../../../data/types/Area";

declare module "leaflet" {
  namespace Control {
    function geocoder(options?: any): any;
  }

  namespace Geocoder {
    interface ResultEvent extends L.LeafletEvent {
      geocode: {
        center: L.LatLng;
        name: string;
        bbox: L.LatLngBounds;
      };
    }
  }
}

interface LeafletGeocoderProps {
  setArea: React.Dispatch<React.SetStateAction<Area>>;
}

const LeafletGeocoder: React.FC<LeafletGeocoderProps> = ({ setArea }) => {
  const map = useMap();
  const geocoderRef = useRef<L.Control | null>(null);

  useEffect(() => {
    if (!geocoderRef.current) {
      const geocoderControl = L.Control.geocoder({
        defaultMarkGeocode: false,
      }).on("markgeocode", function (e: L.Geocoder.ResultEvent) {
        const { center, name } = e.geocode;
        const latlng = center;

        const marker = L.marker(latlng)
          .addTo(map)
          .bindPopup(
            `Name: ${name}<br/>Lat: ${latlng.lat}<br/>Long: ${latlng.lng}`
          )
          .openPopup();

        marker.on("click", () => {
          setArea((prevArea: Area) => ({
            ...prevArea,
            locations: [
              ...prevArea.locations,
              {
                point: prevArea.locations.length + 1,
                latitude: latlng.lat,
                longitude: latlng.lng,
              },
            ],
          }));
        });

        map.fitBounds(e.geocode.bbox);
      });

      geocoderControl.addTo(map);
      geocoderRef.current = geocoderControl;
    }

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.remove();
        geocoderRef.current = null;
      }
    };
  }, [map, setArea]);

  return null;
};

export default LeafletGeocoder;
