import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

interface SearchLocationByLatLngProps {
  lat: number;
  lng: number;
  showPopUp: boolean;
}

const SearchLocationByLatLng: React.FC<SearchLocationByLatLngProps> = ({
  lat,
  lng,
  showPopUp,
}) => {
  const map = useMap();
  const [searchResult, setSearchResult] = useState<any>(null);

  useEffect(() => {
    const searchLocation = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await response.json();

        // Access the location information from the response
        const { address } = data;
        setSearchResult(address);
      } catch (error) {
        console.error("Error searching location:", error);
      }
    };

    searchLocation();
  }, [lat, lng]);

  useEffect(() => {
    if (searchResult && map) {
      // Handle the search result data

      // Get the address information from the search result
      const { city, town, village, county, state, country, postcode } =
        searchResult;

      // Create a marker with a popup for the searched location
      const marker = L.marker([lat, lng]).addTo(map);
      let addressLine = "";

      if (city) addressLine += `${city}, `;
      else if (town) addressLine += `${town}, `;
      else if (village) addressLine += `${village}, `;
      else if (county) addressLine += `${county}, `;
      if (state) addressLine += `${state}, `;
      if (country) addressLine += `${country}, `;
      if (postcode) addressLine += `${postcode}`;

      if (showPopUp) {
        marker.bindPopup(`<b>Address:</b> ${addressLine}`).openPopup();
      } else {
        map.removeLayer(marker);
      }

      // Set the map view to the searched location
      map.setView([lat, lng], 18);
    }
  }, [searchResult, map, lat, lng, showPopUp]);

  return null;
};

export default SearchLocationByLatLng;
