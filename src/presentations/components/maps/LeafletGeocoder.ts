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

    // Remove the second geocoder control
    const controls = document.getElementsByClassName(
      "leaflet-control-geocoder"
    );
    if (controls.length > 1) {
      controls[1].remove();
    }
  }, [map]);

  return null;
};

export default LeafletGeocoder;
