// External
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L, { LatLngExpression } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";
// import LeafletRoutingMachine from "./LeafletRoutingMachine";
import { Fragment, useEffect, useState } from "react";
import { Button, Grid, Pagination } from "@mui/material";
import Carousel from "react-material-ui-carousel";
// Internal

import AddIcon from "@mui/icons-material/Add";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./Map.css";
import DefaultWebLayOut from "../../../components/defaultWebLayOut/DefaultWebLayOut";
import InforFarmPageTable from "./InforFarmPageTable";
import images from "../../../../assets/images";
import PlaneModal from "./PlaneModal";
import { toast } from "react-toastify";
import LeafletGeocoder from "../../../components/maps/LeafletGeocoder";
import { Area, LatLngObject } from "../../../../data/types/Area";
import useCreateArea from "../../../../api/PlaneArea/useCreateArea";
import useFetchFarmList from "../../../../api/Farm/useFetchFarmList";
import Farm from "../../../../data/types/Farm";
import useFetchAreaList from "../../../../api/PlaneArea/useFetchAreaList";
import DefaultModal from "../../../components/defaultModal";
import SearchLocationByLatLng from "../../../components/maps/SearchLocationByLatLng";
import useFetchLandList from "../../../../api/Land/useFetchLandList";
// Style
import classNames from "classnames/bind";
import styles from "./InforFarmPage.module.scss";

const cx = classNames.bind(styles);

let DefaultIcon = L.icon({
  iconUrl: images.markerIcon,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Create a Leaflet context

// Custom hook to access the Leaflet map instance

function InforFarmPage() {
  const position = { lat: 10.964112, lng: 106.856461 };

  const fillBlueOptions = { fillColor: "blue" };
  const blackOptions = { color: "black" };

  const [addPlace, setAddPlace] = useState(false);

  //API
  const [area, setArea] = useState<Area>({
    name: "",
    acreage: 0,
    description: "",
    locations: [
      {
        point: 0,
        latitude: 0,
        longitude: 0,
      },
    ],
    avatars: undefined,
  });

  const [farm, setFarm] = useState<Farm>({
    id: "",
    name: "",
    business_model: "",
    business_type: "",
    province: "",
    district: "",
    wards: "",
    address: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    image: undefined,
  });

  const {
    isCreated,
    error: createAreaError,
    isLoading: isCreating,
    createArea,
  } = useCreateArea({
    farmId: farm.id,
    name: area.name,
    acreage: area.acreage,
    description: area.description,
    locations: area.locations,
    avatars: area.avatars,
  });

  const { farms, error: fetchFarmErr, isLoading } = useFetchFarmList({});

  const handleSubmitArea = (area: Area) => {
    createArea({ area: area });
  };

  useEffect(() => {
    let error = createAreaError ?? fetchFarmErr;
    let isSuccess = isCreated;

    if (error != null) {
      toast.error(error);
    }

    if (isSuccess) {
      toast.success("Thao tác thành công!");
      setTimeout(() => {
        setArea({
          name: "",
          acreage: 0,
          description: "",
          locations: [
            {
              point: 0,
              latitude: 0,
              longitude: 0,
            },
          ],
          avatars: undefined,
        });

        setFarm({
          id: "",
          name: "",
          business_model: "",
          business_type: "",
          province: "",
          district: "",
          wards: "",
          address: "",
          location: {
            latitude: 0,
            longitude: 0,
          },
          image: undefined,
        });
      }, 3000);
    }
  }, [isCreated]);

  const { areas } = useFetchAreaList({});

  const convertLatLngObjectToLatLngExpression = (
    locations: LatLngObject[]
  ): LatLngExpression[] => {
    return locations.map(
      (loc) => [loc.latitude, loc.longitude] as LatLngExpression
    );
  };

  const [showImgModal, setShowImgModal] = useState<{
    open: boolean;
    area?: Area;
  }>({
    open: false,
  });

  const [showLocationArea, setShowLocationArea] = useState<{
    open: boolean;
    area?: Area;
  }>({ open: false });

  const handleGetAvtArea = (area: Area) => {
    setShowImgModal({ open: true, area: area });
  };

  const handleSeeLocationArea = (area: Area) => {
    setShowLocationArea((prev) => ({
      open: !prev.open,
      area: prev.area === area ? undefined : area,
    }));
  };

  const [showImgFarmModal, setShowImgFarmModal] = useState<{
    open: boolean;
    farmImg?: Farm;
  }>({
    open: false,
  });

  // Land
  const { lands } = useFetchLandList({});

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
            {showLocationArea.area?.locations &&
              showLocationArea.area.locations[0] &&
              showLocationArea.open && (
                <SearchLocationByLatLng
                  showPopUp={false}
                  lat={showLocationArea.area.locations[0].latitude}
                  lng={showLocationArea.area.locations[0].longitude}
                />
              )}

            {/* Farm */}
            {farms.length > 0 &&
              !showLocationArea.open &&
              farms.map((farm, i) => {
                // Check if the farm has a valid location property
                if (
                  farm.location &&
                  farm.location.latitude !== undefined &&
                  farm.location.longitude !== undefined
                ) {
                  return (
                    <Marker
                      key={i}
                      position={{
                        lat: farm.location.latitude,
                        lng: farm.location.longitude,
                      }}
                      eventHandlers={{
                        click: () =>
                          setShowImgFarmModal({ open: true, farmImg: farm }),
                      }}
                    >
                      <Popup>
                        {farm.name}, {farm.address}
                      </Popup>
                    </Marker>
                  );
                } else {
                  return null;
                }
              })}

            {/* Polygon */}
            {areas.length > 0 &&
              showLocationArea.open &&
              areas.map((area, i) => (
                <Fragment key={i}>
                  {showLocationArea?.area?.id === area.id && (
                    <>
                      <Polygon
                        key={i}
                        pathOptions={blackOptions}
                        positions={convertLatLngObjectToLatLngExpression(
                          area.locations
                        )}
                      >
                        <Popup>{area.name}</Popup>
                      </Polygon>
                      {area.locations.map((item, j) => (
                        <Marker
                          key={j}
                          position={{
                            lat: item.latitude,
                            lng: item.longitude,
                          }}
                        >
                          <Popup>Điểm {j + 1}</Popup>
                        </Marker>
                      ))}
                    </>
                  )}
                </Fragment>
              ))}

            {/* Land */}
            {lands.length > 0 &&
              showLocationArea.open &&
              lands.map((land, i) => (
                <Fragment key={i}>
                  {showLocationArea?.area?.id === land.area?.id && (
                    <>
                      <Polygon
                        key={i}
                        pathOptions={fillBlueOptions}
                        positions={convertLatLngObjectToLatLngExpression(
                          land.locations
                        )}
                      >
                        <Popup>
                          <b>Khu đất:</b>
                          {land.area?.name}, <b>Tên</b>:{land.name},{" "}
                          <b>Loại đất:</b> {land.soilType.name}
                        </Popup>
                      </Polygon>
                    </>
                  )}
                </Fragment>
              ))}
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
            Thêm khu
          </Button>
        </Grid>

        {addPlace && (
          <PlaneModal
            farm={farm}
            setFarm={setFarm}
            farms={farms}
            title="Thêm khu đất"
            submitButtonLabel="Xác nhận"
            handleCloseModal={() => {
              setAddPlace(false);
            }}
            area={area}
            setArea={setArea}
            handleSubmitArea={handleSubmitArea}
          />
        )}

        {showImgModal.open && (
          <DefaultModal
            title={`Ảnh ${showImgModal.area?.name}`}
            onClose={() => {
              setShowImgModal({ open: false, area: undefined });
            }}
          >
            <Carousel>
              {showImgModal.area?.avatars?.map((avatar, i) => (
                <img
                  key={i}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                  src={`http://116.118.49.43:8878/${avatar}`}
                  alt="FITPRO Farm"
                />
              ))}
            </Carousel>
          </DefaultModal>
        )}

        {showImgFarmModal.farmImg?.image && (
          <DefaultModal
            title={`${showImgFarmModal.farmImg.name}, ${showImgFarmModal.farmImg.address}`}
            onClose={() => {
              setShowImgFarmModal({ open: false, farmImg: undefined });
            }}
          >
            <img
              style={{
                width: "100%",
                height: "90vh",
                objectFit: "cover",
                margin: "5px",
              }}
              src={`http://116.118.49.43:8878/${showImgFarmModal.farmImg.image}`}
              alt="FITPRO Farm"
            />
          </DefaultModal>
        )}

        {/* Bảng thông tin */}
        <InforFarmPageTable
          areas={areas}
          areaProps={showLocationArea.area}
          seeLocation={showLocationArea.open}
          handleGetAvtArea={handleGetAvtArea}
          handleSeeLocationArea={handleSeeLocationArea}
        />

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
