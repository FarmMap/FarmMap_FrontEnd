// External
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
import { Button, Grid, Pagination, Select, MenuItem } from "@mui/material";

// Internal
import Map from "../../../components/maps/Map";

import PlaneArea from "../../../../data/types/PlaneArea";

import AddIcon from "@mui/icons-material/Add";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./Map.css";
import DefaultWebLayOut from "../../../components/defaultWebLayOut/DefaultWebLayOut";
import InforFarmPageTable from "./InforFarmPageTable";
import images from "../../../../assets/images";
import PlaneModal from "./PlaneModal";
import { STATUS } from "../../../../constants/Constants";
import { toast } from "react-toastify";
import LeafletGeocoder from "../../../components/maps/LeafletGeocoder";
import DrawLocation from "../../../components/maps/DrawLocation";

// Style
import classNames from "classnames/bind";
import styles from "./InforFarmPage.module.scss";
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

  const fillBlueOptions = { fillColor: "blue" };
  const blackOptions = { color: "black" };

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

  const [planeLocal, setPlaneLocal] = useState<PlaneArea[]>([]);

  const handleSubmitPlane = () => {
    planeLocal.push(plane);
    if (localStorage.getItem("plane") == undefined) {
      localStorage.setItem("planeLocal", JSON.stringify(planeLocal));
    }

    setTimeout(() => {
      toast.success("Thêm vùng thành công");
      setPlane({
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
    }, 3000);
  };

  const planeGetLocal: PlaneArea[] =
    JSON.parse(localStorage.getItem("planeLocal") || "null") || [];
  console.log(planeGetLocal.map((item, i) => item.latlng));

  const polygon = [
    { lat: 10.9576317, lng: 106.84341754730488 }, // Long Bình
    { lat: 10.95804175, lng: 106.82854776459729 }, // Tân Mai
    { lat: 10.9507929, lng: 106.8263284 }, // Bửu Long
    { lat: 10.9498102, lng: 106.841793 }, // Bình Đas
  ];

  const polygon1 = [
    { lat: 10.95804175, lng: 106.82854776459729 }, // Long Bình
    { lat: 10.9577124, lng: 106.8320321 }, // Tân Mai
    { lat: 10.95393345, lng: 106.83600481134125 }, // Bình Đas
    { lat: 10.9505247, lng: 106.8263284 }, // Bửu Long
  ];

  const polygon2 = [
    { lat: 10.960043, lng: 106.8500886 }, // Long Bình
    { lat: 10.958948, lng: 106.84370974954155 }, // Tân Mai
    { lat: 10.9557241, lng: 106.8568346 }, // Bửu Long
  ];
  return (
    <DefaultWebLayOut>
      <>
        {/* Xem location */}
        <Grid>
          <select
            style={{
              marginBottom: "10px",
              padding: "8px 10px",
              border: "1px solid #ccc",
            }}
            value={"Tất cả"}
          >
            <option value="ok">Khu vực</option>
            <option value="">Bắc</option>
            <option value="">Trung</option>
            <option value="">Nam</option>
          </select>

          <select
            style={{
              marginBottom: "10px",
              marginLeft: "10px",
              padding: "8px 10px",
              border: "1px solid #ccc",
            }}
            value={"Tất cả"}
          >
            <option value="ok">Tỉnh</option>
            <option value="">Đồng Nai</option>
            <option value="">Hà Nội</option>
            <option value="">Phú Yên</option>
          </select>

          <select
            style={{
              marginBottom: "10px",
              marginLeft: "10px",
              padding: "8px 10px",
              border: "1px solid #ccc",
            }}
            value={"Tất cả"}
          >
            <option value="ok">Thành phố</option>
            <option value="">Biên Hòa</option>
            <option value="">Lạng Sơn</option>
            <option value="">Hạ Long</option>
          </select>

          <select
            style={{
              marginBottom: "10px",
              marginLeft: "10px",
              padding: "8px 10px",
              border: "1px solid #ccc",
            }}
            value={"Tên Farm"}
          >
            <option value="ok">Tên Farm</option>
            <option value="">Farm A</option>
            <option value="">Farm B</option>
            <option value="">Farm C</option>
          </select>
        </Grid>

        {/* Map */}
        <Grid className="leaflet-container">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Render your map layers, markers, etc. */}
            {/* {viewLocation && <LocationMarker />} */}
            <LeafletGeocoder />
            {planeGetLocal.length > 0 &&
              planeGetLocal.map((planeLocalItem, i) =>
                planeLocalItem.latlng.map((item, j) => (
                  <Marker
                    key={j}
                    position={{
                      lat: item.lat,
                      lng: item.lng,
                    }}
                  >
                    <Popup>Điểm {j + 1}</Popup>
                  </Marker>
                ))
              )}

            {polygon.map((item, i) => (
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

            <Polygon pathOptions={blackOptions} positions={polygon}>
              <Popup>Khu ABCD</Popup>
              <Polygon pathOptions={fillBlueOptions} positions={polygon1}>
                <Popup>Vùng A</Popup>
              </Polygon>
              {/* <Polygon
                pathOptions={{ fillColor: "red", color: "red" }}
                positions={polygon2}
              >
                <Popup>Vùng B</Popup>
              </Polygon> */}
            </Polygon>

            {planeGetLocal.length > 0 &&
              planeGetLocal.map((planeGetLocalItem, i) => (
                <Polygon
                  pathOptions={blackOptions}
                  positions={planeGetLocalItem.latlng}
                >
                  <Popup>{planeGetLocalItem.tenKhuDat}</Popup>
                </Polygon>
              ))}
          </MapContainer>
          {/* <Map /> */}
        </Grid>

        {/* Thêm vùng */}
        <Grid className={cx("add-btn-wrapper")}>
          <Button
            className={cx("addBtn")}
            variant="contained"
            style={{ width: "150px" }}
            startIcon={<AddIcon className={cx("add-icon")} />}
            size="large"
            onClick={() => {
              setAddPlace(true);
            }}
          >
            Thêm khu đất
          </Button>
        </Grid>

        {addPlace && (
          <PlaneModal
            title="Thêm khu đất"
            submitButtonLabel="Xác nhận"
            handleCloseModal={() => {
              setAddPlace(false);
            }}
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
