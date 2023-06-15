import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  Rectangle,
} from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";
import LeafletGeocoder from "../../../components/maps/LeafletGeocoder";
// import LeafletRoutingMachine from "./LeafletRoutingMachine";
import { useMapEvents } from "react-leaflet";
import { useRef, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import DrawLocation from "../../../components/maps/DrawLocation";

import classNames from "classnames/bind";
import styles from "./InforFarmPage.module.scss";
import "./Map.css";
import DefaultWebLayOut from "../../../components/defaultWebLayOut/DefaultWebLayOut";
import InforFarmPageTable from "./InforFarmPageTable";
import images from "../../../../assets/images";
const cx = classNames.bind(styles);

let DefaultIcon = L.icon({
  iconUrl: images.markerIcon,
});

L.Marker.prototype.options.icon = DefaultIcon;

function InforFarmPage() {
  const position = { lat: 10.964112, lng: 106.856461 };

  const [viewLocation, setViewLocation] = useState(false);

  const fillBlueOptions = { fillColor: "blue" };
  const blackOptions = { color: "black" };

  const rectangle = [
    [10.964112, 106.856461],
    [10.94612, 106.876259],
  ];

  const polygon = [
    [
      { lat: 10.94612, lng: 106.876259 },
      { lat: 10.95536, lng: 106.848923 },
      { lat: 10.95468, lng: 106.794357 },
    ],
  ];

  return (
    <DefaultWebLayOut>
      <>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={() => {
                setViewLocation(!viewLocation);
              }}
            />{" "}
            View your location
          </label>
        </div>
        <Grid className="leaflet-container">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <LeafletGeocoder /> */}
            {viewLocation && <LocationMarker />}
            <DrawLocation />
            {/* <Polygon pathOptions={fillBlueOptions} positions={polygon} /> */}
            {/* <Rectangle bounds={rectangle} pathOptions={blackOptions} /> */}
            {/* <LeafletRoutingMachine /> */}
          </MapContainer>
        </Grid>
        <InforFarmPageTable />
        <Pagination
          count={1}
          defaultPage={1}
          variant="outlined"
          color="primary"
          shape="rounded"
          // onChange={handlePaginationChange}
          sx={{
            marginTop: {
              lg: "0",
              md: "0",
              sm: "30px",
              xs: "30px",
            },
          }}
        />
      </>
    </DefaultWebLayOut>
  );
}

const LocationMarker = () => {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });

  const map = useMapEvents({
    click() {
      map.locate();
      console.log(map.locate());
    },

    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default InforFarmPage;
