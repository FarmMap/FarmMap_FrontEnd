import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

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

const LeafletGeocoder = () => {
  const map = useMap();
  const geocoderRef = useRef<L.Control | null>(null);

  useEffect(() => {
    if (!geocoderRef.current) {
      const geocoderControl = L.Control.geocoder({
        defaultMarkGeocode: false,
      }).on("markgeocode", function (e: L.Geocoder.ResultEvent) {
        const { center, name } = e.geocode;
        const latlng = center;
        L.marker(latlng)
          .addTo(map)
          .bindPopup(
            `Name: ${name}<br/>Lat: ${latlng.lat}<br/>Long: ${latlng.lng}`
          )
          .openPopup();
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
  }, [map]);

  return null;
};

export default LeafletGeocoder;
