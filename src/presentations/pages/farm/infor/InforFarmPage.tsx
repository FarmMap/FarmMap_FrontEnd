import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  Rectangle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";
// import LeafletRoutingMachine from "./LeafletRoutingMachine";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Button, Grid, Pagination } from "@mui/material";
import Map from "../../../components/maps/Map";

import PlaneArea from "../../../../data/types/PlaneArea";

import AddIcon from "@mui/icons-material/Add";

import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import classNames from "classnames/bind";
import styles from "./InforFarmPage.module.scss";
import "./Map.css";
import DefaultWebLayOut from "../../../components/defaultWebLayOut/DefaultWebLayOut";
import InforFarmPageTable from "./InforFarmPageTable";
import images from "../../../../assets/images";
import DefaultModal from "../../../components/defaultModal/DefaultModal";
import PlaneModal from "./PlaneModal";
import { STATUS } from "../../../../constants/Constants";
import { toast } from "react-toastify";
import LeafletGeocoder from "../../../components/maps/LeafletGeocoder";
const cx = classNames.bind(styles);

let DefaultIcon = L.icon({
  iconUrl: images.markerIcon,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Create a Leaflet context
const LeafletContext = createContext(null);

// Custom hook to access the Leaflet map instance
const useLeafletMap = () => useContext(LeafletContext);

function InforFarmPage() {
  const position = { lat: 10.964112, lng: 106.856461 };

  const [viewLocation, setViewLocation] = useState(false);
  const fillBlueOptions = { fillColor: "blue" };
  const blackOptions = { color: "black" };

  const rectangle = [
    [10.964112, 106.856461],
    [10.94612, 106.876259],
  ];

  const [addPlace, setAddPlace] = useState(false);

  // Draw map
  const [plane, setPlane] = useState<PlaneArea>({
    tenFarm: "",
    tenKhuDat: "",
    dienTich: 0,
    latlng: [
      {
        lat: 0,
        lng: 0,
      },
    ],
    ghiChu: "",
  });

  const [showPolygon, setShowPolygon] = useState(false);
  const [showMarker, setShowMarker] = useState(false);

  const handleSubmitPlane = () => {
    setShowPolygon(true);
    setShowMarker(true);
    setAddPlace(false);
    setTimeout(() => {
      toast.success("Thêm vùng thành công");
    }, 3000);
  };

  const polygon = [
    { lat: 10.94612, lng: 106.876259 }, // Long Bình
    { lat: 10.95536, lng: 106.848923 }, // Tân Mai
    { lat: 10.95468, lng: 106.794357 }, // Bửu Long
    { lat: 10.964112, lng: 106.876259 }, // Bình Đas
  ];
  return (
    <DefaultWebLayOut>
      <>
        {/* Xem location */}
        <Grid>
          <label>
            <input
              type="checkbox"
              onChange={() => {
                setViewLocation(!viewLocation);
              }}
            />{" "}
            View your location
          </label>
        </Grid>

        {/* Map */}
        <Grid className="leaflet-container">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Render your map layers, markers, etc. */}
            {viewLocation && <LocationMarker />}
            <LeafletGeocoder />

            {plane.latlng.length > 0 &&
              showMarker &&
              plane.latlng.map((item, i) => (
                <Marker
                  key={i}
                  position={{
                    lat: item.lat,
                    lng: item.lng,
                  }}
                >
                  <Popup>Điểm {i + 1}</Popup>
                </Marker>
              ))}
            {plane.latlng.length > 0 && showPolygon && (
              <Polygon pathOptions={blackOptions} positions={plane.latlng}>
                <Popup>{plane.tenKhuDat}</Popup>
              </Polygon>
            )}
          </MapContainer>
          {/* <Map /> */}
        </Grid>

        {/* Thêm vùng */}
        <Grid className={cx("add-btn-wrapper")}>
          <Button
            className={cx("addBtn")}
            variant="contained"
            startIcon={<AddIcon className={cx("add-icon")} />}
            size="large"
            onClick={() => {
              setAddPlace(true);
            }}
          >
            Thêm vùng
          </Button>
        </Grid>

        {addPlace && (
          <PlaneModal
            title="Thêm khu đất"
            submitButtonLabel="Xác nhận"
            handleCloseModal={() => {
              setAddPlace(false);
            }}
            roles={STATUS}
            plane={plane}
            setPlane={setPlane}
            handleSubmitPlane={handleSubmitPlane}
          />
        )}

        {/* Bảng thông tin */}
        <InforFarmPageTable />

        {/* Phân trang */}
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
function useLeaflet(): { map: any } {
  throw new Error("Function not implemented.");
}
