// External
import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L, { LatLngExpression } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";
// import LeafletRoutingMachine from "./LeafletRoutingMachine";
import { Fragment, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
// Internal

import HomeWorkIcon from "@mui/icons-material/HomeWork";
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
import AreaModal from "../area/AreaModal";
import useFetchSoilTypeList from "../../../../api/SoilType/useFetchSoilTypeList";
import SoilType from "../../../../data/types/SoilType";
import Land from "../../../../data/types/Land";
import useCreateLand from "../../../../api/Land/useCreateLand";
import DefaultTitleLayOut from "../../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../../components/defaultTitleLayOut/DefaultFilterLayOut";
import Province from "../../../../data/types/Province";
import useFetchProvinceList from "../../../../api/Farm/useFetchCategoryList";
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

  const blackOptions = { color: "black" };

  const [addPlace, setAddPlace] = useState(false);
  const [refresh, setRefresh] = useState(false);

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

  const {
    farms,
    error: fetchFarmErr,
    isLoading,
  } = useFetchFarmList({
    shouldRefesh: refresh,
  });

  const handleSubmitArea = (area: Area) => {
    createArea({ area: area });
  };

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
  const [showAddLand, setShowAddLand] = useState<{
    open: boolean;
    area: Area;
  }>({
    open: false,
    area: {
      name: "",
      acreage: 0,
      locations: [{ point: 0, latitude: 0, longitude: 0 }],
      description: "",
    },
  });
  const handleGetLandOfArea = (area: Area) => {
    setShowAddLand({ open: true, area: area });
  };

  // Get soiltype list
  const { soilTypes } = useFetchSoilTypeList({});
  const [soilType, setSoilType] = useState<SoilType>({
    createdAt: "",
    updateAt: "",
    id: "",
    name: "",
  });

  // Create land
  const [land, setLand] = useState<Land>({
    id: "",
    name: "",
    soilType: soilType,
    productTypeId: "",
    locations: [
      {
        point: 0,
        latitude: 0,
        longitude: 0,
      },
    ],
    images: undefined,
  });

  const {
    isCreated: createLandSuccess,
    createLand,
    error: CreateLandErr,
  } = useCreateLand({
    areaId: showAddLand.area.id,
    name: land.name,
    productTypeId: land.productTypeId,
    soilTypeId: soilType.id,
    locations: land.locations,
    images: land.images,
  });

  // handleSubmitCreateLand
  const handleSubmitCreateLand = (land: Land) => {
    createLand({ land: land });
  };

  useEffect(() => {
    let error = createAreaError ?? fetchFarmErr ?? CreateLandErr;

    if (error != null) {
      toast.error(error);
    }

    if (isCreated || createLandSuccess) {
      toast.success("Thao tác thành công!");
      setRefresh((refresh) => !refresh);
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
  }, [
    isCreated,
    createAreaError,
    fetchFarmErr,
    CreateLandErr,
    createLandSuccess,
  ]);

  // Show marker
  const [showMarker, setShowMarker] = useState(false);

  // Filter
  const places = ["Bắc", "Trung", "Nam"];

  const { provinces } = useFetchProvinceList({
    type: "TINH_THANH",
  });

  const { provinces: districts } = useFetchProvinceList({
    type: "QUAN_HUYEN",
  });

  const { provinces: wards } = useFetchProvinceList({
    type: "PHUONG_XA",
  });

  return (
    <DefaultWebLayOut>
      <>
        {/* Xem location */}
        <Grid>
          <DefaultTitleLayOut
            heading="Khu canh tác"
            handleAddButtonClick={() => {
              setAddPlace(true);
            }}
          >
            <DefaultFilterLayOut
              searchs={[]}
              filters={[
                <Fragment>
                  <Select
                    className={cx("filter-dropdown")}
                    sx={{
                      fontSize: "1.2rem",
                      boxShadow: "none",
                      minWidth: "140px",
                    }}
                    value={""}
                    displayEmpty
                    onChange={() => {}}
                  >
                    <MenuItem sx={{ fontSize: "1.1rem" }} value="">
                      Tất cả
                    </MenuItem>
                  </Select>
                </Fragment>,
                <Fragment>
                  <Grid
                    sx={{
                      width: {
                        lg: "140px",
                        md: "140px",
                        sm: "140px",
                        xs: "100%",
                      },
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={provinces}
                      getOptionLabel={(option: Province) =>
                        option.name as string
                      }
                      noOptionsText="Không tìm thấy tỉnh nào"
                      // onChange={(event, value: Province | null) => {
                      //   if (value == null) return;
                      //   setProVinceList({
                      //     ...provinceList,
                      //     name: value.name,
                      //   });
                      // }}
                      sx={{ width: "100%" }}
                      renderOption={(props, option) => (
                        <MenuItem {...props} divider>
                          <HomeWorkIcon sx={{ mr: 2 }} />
                          <ListItemText
                            primaryTypographyProps={{
                              fontSize: "1.2rem",
                              overflow: "hidden",
                            }}
                            primary={option.name}
                          />
                        </MenuItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tỉnh"
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              width: "100%",
                              padding: "0",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: "1.1rem",
                              top: "-8px",
                              color: "var(--black-color)",
                              fontWeight: "500",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Fragment>,
                <Fragment>
                  <Grid
                    sx={{
                      width: {
                        lg: "140px",
                        md: "140px",
                        sm: "140px",
                        xs: "100%",
                      },
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={districts}
                      getOptionLabel={(option: Province) =>
                        option.name as string
                      }
                      noOptionsText="Không tìm thấy tỉnh nào"
                      // onChange={(event, value: Province | null) => {
                      //   if (value == null) return;
                      //   setProVinceList({
                      //     ...provinceList,
                      //     name: value.name,
                      //   });
                      // }}
                      sx={{ width: "100%" }}
                      renderOption={(props, option) => (
                        <MenuItem {...props} divider>
                          <HomeWorkIcon sx={{ mr: 2 }} />
                          <ListItemText
                            primaryTypographyProps={{
                              fontSize: "1.2rem",
                              overflow: "hidden",
                            }}
                            primary={option.name}
                          />
                        </MenuItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Quận Huyện"
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              width: "100%",
                              padding: "0",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: "1.1rem",
                              top: "-8px",
                              color: "var(--black-color)",
                              fontWeight: "500",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Fragment>,
                <Fragment>
                  <Grid
                    sx={{
                      width: {
                        lg: "140px",
                        md: "140px",
                        sm: "140px",
                        xs: "100%",
                      },
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={wards}
                      getOptionLabel={(option: Province) =>
                        option.name as string
                      }
                      noOptionsText="Không tìm thấy tỉnh nào"
                      // onChange={(event, value: Province | null) => {
                      //   if (value == null) return;
                      //   setProVinceList({
                      //     ...provinceList,
                      //     name: value.name,
                      //   });
                      // }}
                      sx={{ width: "100%" }}
                      renderOption={(props, option) => (
                        <MenuItem {...props} divider>
                          <HomeWorkIcon sx={{ mr: 2 }} />
                          <ListItemText
                            primaryTypographyProps={{ fontSize: "1.3rem" }}
                            secondaryTypographyProps={{ fontSize: "1.2rem" }}
                            primary={option.name}
                          />
                        </MenuItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Phường Xã"
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              width: "100%",
                              padding: "0",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: "1.1rem",
                              top: "-8px",
                              color: "var(--black-color)",
                              fontWeight: "500",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Fragment>,
                <Fragment>
                  <Grid
                    sx={{
                      width: {
                        lg: "140px",
                        md: "140px",
                        sm: "140px",
                        xs: "100%",
                      },
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={farms}
                      getOptionLabel={(option: Province) =>
                        option.name as string
                      }
                      noOptionsText="Không tìm thấy tỉnh nào"
                      // onChange={(event, value: Province | null) => {
                      //   if (value == null) return;
                      //   setProVinceList({
                      //     ...provinceList,
                      //     name: value.name,
                      //   });
                      // }}
                      sx={{ width: "100%" }}
                      renderOption={(props, option) => (
                        <MenuItem {...props} divider>
                          {/* <HomeWorkIcon sx={{ mr: 2 }} /> */}
                          <ListItemText
                            primaryTypographyProps={{
                              fontSize: "1.2rem",
                              overflow: "hidden",
                            }}
                            primary={option.name}
                          />
                        </MenuItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Trang trại"
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              width: "100%",
                              padding: "0",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: "1.1rem",
                              top: "-8px",
                              color: "var(--black-color)",
                              fontWeight: "500",
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Fragment>,
              ]}
            ></DefaultFilterLayOut>
          </DefaultTitleLayOut>
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
                        eventHandlers={{
                          click: () => setShowMarker((marker) => !marker),
                        }}
                        positions={convertLatLngObjectToLatLngExpression(
                          area.locations
                        )}
                      >
                        <Popup>{area.name}</Popup>
                      </Polygon>
                      {showMarker &&
                        area.locations.map((item, j) => (
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
                        pathOptions={{
                          fillColor: land.productType?.child_column?.color,
                          color: land.productType?.child_column?.color,
                        }}
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

        {addPlace && (
          <PlaneModal
            farm={farm}
            setFarm={setFarm}
            farms={farms}
            title="Thêm khu canh tác"
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
          handleGetLandOfArea={handleGetLandOfArea}
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

        {/* Thêm vùng */}
        {showAddLand.open && (
          <AreaModal
            title="Thêm vùng trồng"
            submitButtonLabel="Xác nhận"
            handleCloseModal={() =>
              setShowAddLand({
                open: false,
                area: {
                  name: "",
                  acreage: 0,
                  locations: [{ point: 0, latitude: 0, longitude: 0 }],
                  description: "",
                },
              })
            }
            areas={areas}
            area={showAddLand.area}
            setArea={setArea}
            soilTypes={soilTypes}
            soilType={soilType}
            setSoilType={setSoilType}
            land={land}
            isDisabled={true}
            setLand={setLand}
            lands={lands}
            handleSubmitCreateLand={handleSubmitCreateLand}
          />
        )}
      </>
    </DefaultWebLayOut>
  );
}

export default InforFarmPage;
