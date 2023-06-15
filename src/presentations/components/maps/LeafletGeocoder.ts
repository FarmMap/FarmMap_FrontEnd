import React, { useEffect } from "react";
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
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e: L.Geocoder.ResultEvent) {
        var latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, [map]);
  return null;
};

export default LeafletGeocoder;
