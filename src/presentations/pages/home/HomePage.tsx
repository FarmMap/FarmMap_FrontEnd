import React, { Fragment, useState } from "react";
// Ex
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import {
  Autocomplete,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
// In
import images from "../../../assets/images";
import DefaultTitleLayOut from "../../components/defaultTitleLayOut";
import DefaultFilterLayOut from "../../components/defaultTitleLayOut/DefaultFilterLayOut";
import Province from "../../../data/types/Province";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import LeafletGeocoder from "../../components/maps/LeafletGeocoder";
import SearchLocationByLatLng from "../../components/maps/SearchLocationByLatLng";
import { Area } from "../../../data/types/Area";
import Farm from "../../../data/types/Farm";
import useFetchFarmList from "../../../api/Farm/useFetchFarmList";
import useFetchAreaList from "../../../api/PlaneArea/useFetchAreaList";
import { LatLngObject } from "../../../data/types/Area";
import { LatLngExpression } from "leaflet";
import useFetchLandList from "../../../api/Land/useFetchLandList";

import useFetchProvinceList from "../../../api/Farm/useFetchCategoryList";
import VerticalChart from "../../components/chart/VerticalChart";

import KhoDashBoard from "./KhoDashBoard";
import XuatKhoDashBoard from "./XuatKhoDashBoard";
import PieAgri from "../../components/chart/home/pie_agri";
import PieMaterialHomeChart from "../../components/chart/home/pie_material";
import PieSuppliesHomeChart from "../../components/chart/home/pie_supplies";
// Style
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

const HomePage = () => {
  const headerData = [
    {
      title: "Doanh thu",
      quality: "0",
      percent: 22,
      srcVector: images.vector1,
      isIncrease: true,
      color: "var(--orange-color)",
    },
    {
      title: "Khoản chi khác",
      percent: 5.7,
      srcVector: images.vector2,
      quality: "0",
      isIncrease: true,
      color: "var(--second-color)",
    },
    {
      title: "Người truy cập",
      percent: 18,
      srcVector: images.vector3,
      quality: "160",
      isIncrease: false,
      color: "#25a150",
    },
    {
      title: "Lợi nhuận",
      percent: 12,
      srcVector: images.vector4,
      quality: "28%",
      isIncrease: true,
      color: "var(--orange-color)",
    },
  ];

  // Map
  const position = { lat: 10.964112, lng: 106.856461 };

  const blackOptions = { color: "black" };

  const [addPlace, setAddPlace] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const {
    farms,
    error: fetchFarmErr,
    isLoading,
  } = useFetchFarmList({
    shouldRefesh: refresh,
  });

  const { areas } = useFetchAreaList({});

  const convertLatLngObjectToLatLngExpression = (
    locations: LatLngObject[]
  ): LatLngExpression[] => {
    return locations.map(
      (loc) => [loc.latitude, loc.longitude] as LatLngExpression
    );
  };

  const [showLocationArea, setShowLocationArea] = useState<{
    open: boolean;
    area?: Area;
  }>({ open: false });

  // Land
  const { lands } = useFetchLandList({});
  // img
  const [showImgFarmModal, setShowImgFarmModal] = useState<{
    open: boolean;
    farmImg?: Farm;
  }>({
    open: false,
  });

  // Show marker
  const [showMarker, setShowMarker] = useState(false);

  // Filter
  const places = ["Bắc", "Trung", "Nam"];
  const [filter, setFilter] = useState<string | number>("");
  const handleFilterChange = (event: SelectChangeEvent) =>
    setFilter(event.target.value);

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
      <Grid>
        <Grid>
          <h4
            style={{
              color: "var(--black-color)",
              fontWeight: "500",
            }}
          >
            Bảng điều khiển
          </h4>
        </Grid>
        <Grid
          mt={"12px"}
          columns={12}
          container
          justifyContent={"space-between"}
        >
          {headerData.map((data, i) => (
            <Grid
              className={cx("box-wrapper")}
              key={i}
              item
              lg={2.8}
              md={5.7}
              sm={5.7}
              xs={12}
              sx={{
                marginTop: { lg: "0", md: "10px", sm: "10px", xs: "10px" },
              }}
            >
              <Grid display={"flex"} justifyContent={"space-between"}>
                <span style={{ color: "#000" }} className={cx("title")}>
                  {data.title}
                </span>
                <span
                  className={cx("percent")}
                  style={{ color: `${data.color}`, fontWeight: 600 }}
                >
                  {data.isIncrease ? "+" : ""} {data.percent}%
                </span>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                mt={"5px"}
              >
                <span
                  className={cx("quality")}
                  style={{ color: `${data.color}`, fontWeight: 600 }}
                >
                  {data.quality}
                </span>
                <img
                  className={cx("vector")}
                  alt="vector"
                  src={data.srcVector}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid
          mt={"20px"}
          columns={12}
          container
          justifyContent={"space-between"}
        >
          <Grid
            item
            lg={7}
            style={{ backgroundColor: "var(--white-color)" }}
            display={"flex"}
            height={"500px"}
            width={"100%"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            borderRadius={"4px"}
            boxShadow={"0 2px 3px #eaedf2"}
            border={"1px solid #eff0f2"}
            padding={"10px 12px 12px 12px"}
          >
            {" "}
            <span
              style={{
                color: "var(--black-color)",
                fontWeight: "500",
              }}
            >
              Bản đồ tổng quát
            </span>
            <Grid>
              <Grid>
                <DefaultTitleLayOut
                  heading="Khu canh tác"
                  showHeading={true}
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
                          value={`${filter}`}
                          displayEmpty
                          onChange={handleFilterChange}
                        >
                          <MenuItem sx={{ fontSize: "1.1rem" }} value="">
                            Tất cả
                          </MenuItem>
                          {places.map((map, i) => (
                            <MenuItem
                              key={i}
                              sx={{ fontSize: "1.1rem" }}
                              value={map}
                            >
                              {map}
                            </MenuItem>
                          ))}
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
                            noOptionsText="Không tìm thấy quận huyện nào"
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
                            noOptionsText="Không tìm thấy phường xã nào"
                            onChange={() => {}}
                            sx={{ width: "100%" }}
                            renderOption={(props, option) => (
                              <MenuItem {...props} divider>
                                <HomeWorkIcon sx={{ mr: 2 }} />
                                <ListItemText
                                  primaryTypographyProps={{
                                    fontSize: "1.3rem",
                                  }}
                                  secondaryTypographyProps={{
                                    fontSize: "1.2rem",
                                  }}
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
                            noOptionsText="Không tìm thấy trang trại nào"
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
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
                >
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
                                setShowImgFarmModal({
                                  open: true,
                                  farmImg: farm,
                                }),
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
                                fillColor:
                                  land.productType?.child_column?.color,
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
            </Grid>
          </Grid>
          <Grid
            lg={4.8}
            item
            height={"500px"}
            display={"flex"}
            width={"100%"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            borderRadius={"4px"}
            style={{ backgroundColor: "var(--white-color)" }}
            boxShadow={"0 2px 3px #eaedf2"}
            border={"1px solid #eff0f2"}
            padding={"10px 12px 12px 12px"}
          >
            <span
              style={{
                color: "var(--black-color)",
                fontWeight: "500",
              }}
            >
              Nông nghiệp
            </span>
            <Grid
              style={{
                height: "80%",
              }}
            >
              {" "}
              <PieAgri />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          mt={"20px"}
          columns={12}
          container
          justifyContent={"space-between"}
        >
          <Grid
            item
            lg={7}
            padding={"10px 12px 12px 12px"}
            style={{ backgroundColor: "var(--white-color)" }}
            boxShadow={"0 2px 3px #eaedf2"}
            border={"1px solid #eff0f2"}
          >
            <VerticalChart />
          </Grid>

          <Grid
            lg={4.8}
            item
            height={"400px"}
            display={"flex"}
            width={"100%"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            style={{ backgroundColor: "var(--white-color)" }}
            boxShadow={"0 2px 3px #eaedf2"}
            border={"1px solid #eff0f2"}
            padding={"10px 12px 32px 12px"}
          >
            <span
              style={{
                color: "var(--black-color)",
                fontWeight: "500",
              }}
            >
              Vật tư
            </span>
            <Grid
              style={{
                height: "100%",
              }}
            >
              {" "}
              <PieSuppliesHomeChart />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          mt={"20px"}
          columns={12}
          container
          justifyContent={"space-between"}
        >
          <Grid
            lg={7}
            item
            height={"400px"}
            display={"flex"}
            width={"100%"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            style={{ backgroundColor: "var(--white-color)" }}
            boxShadow={"0 2px 3px #eaedf2"}
            border={"1px solid #eff0f2"}
            padding={"10px 12px 32px 12px"}
          >
            <span style={{ fontWeight: 600 }}>Nhập hàng</span>
            <Grid
              style={{
                height: "100%",
              }}
            >
              <KhoDashBoard />
            </Grid>

            <span style={{ fontWeight: 600 }}>Xuất hàng</span>
            <Grid
              style={{
                height: "100%",
              }}
            >
              <XuatKhoDashBoard />
            </Grid>
          </Grid>

          <Grid
            lg={4.8}
            item
            height={"400px"}
            display={"flex"}
            width={"100%"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            style={{ backgroundColor: "var(--white-color)" }}
            boxShadow={"0 2px 3px #eaedf2"}
            border={"1px solid #eff0f2"}
            padding={"10px 12px 32px 12px"}
          >
            <span
              style={{
                color: "var(--black-color)",
                fontWeight: "500",
              }}
            >
              Kho
            </span>
            <Grid
              style={{
                height: "85%",
              }}
            >
              {" "}
              <PieMaterialHomeChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default HomePage;
