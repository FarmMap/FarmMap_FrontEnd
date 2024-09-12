// External
import React, { Fragment, useEffect, useRef, useState } from "react";
import DefaultModal from "../../../components/defaultModal/DefaultModal";
import {
  Autocomplete,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import LeafletGeocoder from "../../../components/maps/LeafletGeocoder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LandscapeIcon from "@mui/icons-material/Landscape";
import ImageIcon from "@mui/icons-material/Image";
// Internal
import FormInput from "../../../components/formInput/FormInput";
import FloatingLabelInput from "../../../components/floatingLabelInput/FloatingLabelInput";
import SoilType from "../../../../data/types/SoilType";
import Land from "../../../../data/types/Land";
import SearchLocationByLatLng from "../../../components/maps/SearchLocationByLatLng";
import { LatLngExpression } from "leaflet";
import Carousel from "react-material-ui-carousel";
import useFetchProductType from "../../../../api/Land/useFetchProductType";
import FormDropdown, {
  DropdownOption,
} from "../../../components/formDropDown/FormDropdown";
import KDialog from "../../../components/kDialog/KDialog";
import Tippy from "@tippyjs/react";
import { Area, LatLngObject } from "../../../../data/types/Area";
// Style
import classNames from "classnames/bind";
import styles from "./Area.module.scss";

const cx = classNames.bind(styles);

interface AreaModalProps {
  title: string;
  submitButtonLabel: string;
  handleCloseModal: () => void;
  areas: Area[];
  area: Area;
  setArea: React.Dispatch<React.SetStateAction<Area>>;
  soilTypes: SoilType[];
  soilType: SoilType;
  setSoilType: React.Dispatch<React.SetStateAction<SoilType>>;
  land: Land;
  setLand: React.Dispatch<React.SetStateAction<Land>>;
  lands: Land[];
  handleSubmitCreateLand: (land: Land) => void;
  isDisabled: boolean;
}
const AreaModal = (props: AreaModalProps) => {
  const position = { lat: 10.964112, lng: 106.856461 };

  const [countLocal, setCountLocal] = useState<number[]>([]);
  useEffect(() => {
    const storedCount = localStorage.getItem("count");
    if (storedCount) {
      setCountLocal(JSON.parse(storedCount));
    } else {
      setCountLocal([1, 2, 3, 4]);
    }
  }, []);

  const handleAddPlace = () => {
    const newCountLocal = [
      ...countLocal,
      countLocal[countLocal.length - 1] + 1,
    ];
    setCountLocal(newCountLocal);

    // Tạo phần tử mới và cập nhật state props.land.locations
    const newLocation = {
      point: countLocal.length + 1, // Chỉ số điểm mới
      latitude: 0, // Tọa độ lat mặc định ban đầu
      longitude: 0, // Tọa độ lng mặc định ban đầu
    };

    // Lấy giá trị hiện tại của state props.land.locations và thêm phần tử mới vào mảng
    let updatedLocations;
    if (props.isDisabled) {
      updatedLocations = props.area.locations
        ? [...props.area.locations, newLocation]
        : [newLocation];
    } else {
      updatedLocations = props.land.locations
        ? [...props.land.locations, newLocation]
        : [newLocation];
    }

    // Cập nhật state props.land
    if (props.isDisabled) {
      props.area.locations = updatedLocations;
    } else {
      props.setLand({
        ...props.land,
        locations: updatedLocations,
      });
    }
  };

  // Delete điểm
  const [showConfirmDeletePoint, setShowConfirmDeletePoint] = useState(false);

  const handleDeletePlace = (index: Number) => {
    const newCountLocal = countLocal.filter((_, i) => i !== index);
    setCountLocal(newCountLocal);

    // Lọc ra các phần tử khác với điểm được chỉ định để xóa
    let updatedLocations;
    if (props.isDisabled) {
      updatedLocations = props.area.locations.filter((_, i) => i !== index);
    } else {
      updatedLocations = props.land.locations.filter((_, i) => i !== index);
    }

    // Cập nhật state props.land
    if (props.isDisabled) {
      props.area.locations = updatedLocations;
    } else {
      props.setLand({
        ...props.land,
        locations: updatedLocations,
      });
    }
    setShowConfirmDeletePoint(false);
  };

  const blackOptions = { fillColor: "black" };

  const convertLatLngObjectToLatLngExpression = (
    locations: LatLngObject[]
  ): LatLngExpression[] => {
    return locations.map(
      (loc) => [loc.latitude, loc.longitude] as LatLngExpression
    );
  };

  // Xử lý ảnh
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const newAvatars = props.land.images;
    if (newAvatars && newAvatars.length > 0) {
      const urls = newAvatars.map((avatar) => URL.createObjectURL(avatar));
      setImageURLs(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [props.land.images]);

  // product type
  const { productTypes } = useFetchProductType({});

  return (
    <DefaultModal
      overrideMaxWidth={{
        lg: "900px",
      }}
      title={props.title}
      onClose={props.handleCloseModal}
    >
      <Grid>
        <Grid>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* Render your map layers, markers, etc. */}
            {/* {viewLocation && <LocationMarker />} */}
            <LeafletGeocoder />
            {props.area.locations && (
              <SearchLocationByLatLng
                showPopUp={false}
                lat={
                  props.area.locations.length > 0
                    ? props.area.locations[0].latitude
                    : 0
                }
                lng={
                  props.area.locations.length > 0
                    ? props.area.locations[0].longitude
                    : 0
                }
              />
            )}

            {/* Polygon */}
            {props.area.locations &&
              props.area.locations.map((area, i) => (
                <Fragment key={i}>
                  <>
                    <Polygon
                      key={i}
                      pathOptions={blackOptions}
                      positions={convertLatLngObjectToLatLngExpression(
                        props.area.locations
                      )}
                    >
                      <Popup>{props.area.name}</Popup>
                    </Polygon>
                    {props.area.locations.map((item, j) => (
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
                </Fragment>
              ))}

            {/* Land */}
            {props.lands.length > 0 &&
              props.area.locations &&
              props.lands.map((land, i) => (
                <Fragment key={i}>
                  {props.area?.id === land.area?.id && (
                    <>
                      <Polygon
                        key={i}
                        pathOptions={{
                          color: land.productType?.child_column?.color,
                          fillColor: land.productType?.child_column?.color,
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

            {/* Land update */}
            {props.land.locations &&
              props.land.locations.map((land, i) => (
                <Fragment key={i}>
                  <>
                    <Polygon
                      key={i}
                      pathOptions={{
                        color: "var(--primary-color)",
                        fillColor: "var(--primary-color)",
                      }}
                      positions={convertLatLngObjectToLatLngExpression(
                        props.land.locations
                      )}
                    ></Polygon>
                  </>
                </Fragment>
              ))}
          </MapContainer>
          {/* <Map /> */}
        </Grid>

        <Grid className={cx("area-wrapper")} container columns={12} mt={"30px"}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-area")} htmlFor="khu-dat">
              Khu đất <span>*</span>
            </label>
          </Grid>
          <Grid
            item
            lg={7.3}
            md={7}
            xs={12}
            sm={12}
            sx={{
              paddingLeft: {
                lg: "30px",
                md: "30px",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={props.areas}
              defaultValue={props.area}
              disabled={props.isDisabled}
              getOptionLabel={(option: Area) => option.name as string}
              noOptionsText="Không tìm thấy khu canh tác nào"
              onChange={(event, value: Area | null) => {
                if (value == null) return;
                props.setArea({
                  ...props.area,
                  id: value.id,
                  locations: value.locations,
                  name: value.name,
                });
                props.setLand({
                  ...props.land,
                  locations: value.locations,
                });
              }}
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
                <TextField {...params} label="Chọn khu canh tác" />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ margin: "10px 0 0 0" }}>
          <FormInput
            label="Tên vùng"
            placeholder="Nhập tên vùng"
            type="text"
            value={props.land.name ?? ""}
            onChange={(event) => {
              let newLand = { ...props.land };
              newLand.name = event.currentTarget.value;
              props.setLand(newLand);
            }}
            required
          />

          <FormInput
            label="Diện tích"
            placeholder="Nhập diện tích"
            required
            type="number"
            value={props.land.acreage?.toString() ?? ""}
            onChange={(event) => {
              let newLand = { ...props.land };
              newLand.acreage = parseInt(event.currentTarget.value);
              props.setLand(newLand);
            }}
          />

          <FormDropdown
            label="Loại sản phẩm"
            value={props.land.productTypeId ?? ""}
            required
            defaultValue={""}
            options={productTypes.map((u) => {
              return {
                name: u.name,
                value: u.id,
              } as DropdownOption;
            })}
            onChange={(event) => {
              let newLand: Land = {
                ...props.land,
                productTypeId: event.target.value,
              };
              props.setLand(newLand);
            }}
          />
        </Grid>

        <Grid className={cx("area-wrapper")} container columns={12} mb={"10px"}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-area")} htmlFor="khu-dat">
              Loại đất <span>*</span>
            </label>
          </Grid>
          <Grid
            item
            lg={7.3}
            md={7}
            xs={12}
            sm={12}
            sx={{
              paddingLeft: {
                lg: "30px",
                md: "30px",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={props.soilTypes}
              getOptionLabel={(option: SoilType) => option.name as string}
              noOptionsText="Không tìm thấy loại đất nào"
              onChange={(event, value: SoilType | null) => {
                if (value == null) return;
                props.setSoilType({ ...props.soilType, id: value.id });
              }}
              sx={{ width: "100%" }}
              renderOption={(props, option) => (
                <MenuItem {...props} divider>
                  <LandscapeIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "1.3rem" }}
                    secondaryTypographyProps={{ fontSize: "1.2rem" }}
                    primary={option.name}
                  />
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Chọn loại đất" />
              )}
            />
          </Grid>
        </Grid>

        {props.area.id && props.isDisabled
          ? props.area.locations.map((item, i) => (
              <Grid
                justifyContent={"space-around"}
                container
                columns={12}
                key={i}
              >
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={4}
                  xs={12}
                  className={cx("form-control-wrapper")}
                >
                  <label className={cx("form-input-label")} htmlFor={"lat"}>
                    Điểm {i + 1}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={4}
                  xs={6}
                  className={cx("form-control-wrapper")}
                >
                  <FloatingLabelInput
                    label="lat"
                    placeholder="nhập lat"
                    type="number"
                    value={
                      item.latitude !== undefined
                        ? item.latitude.toString()
                        : ""
                    }
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      let newLand = { ...props.land };
                      if (!newLand.locations) {
                        newLand.locations = [
                          {
                            point: i + 1,
                            latitude: 0,
                            longitude: 0,
                          },
                        ];
                      }
                      newLand.locations[i] = {
                        ...newLand.locations[i],
                        latitude:
                          parseFloat(
                            (event.target as HTMLInputElement).value
                          ) || 0,
                      };
                      props.setLand(newLand);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={4}
                  xs={6}
                  className={cx("form-control-wrapper")}
                >
                  <FloatingLabelInput
                    label="lng"
                    placeholder="nhập lng"
                    type="number"
                    value={
                      item.longitude !== undefined
                        ? item.longitude.toString()
                        : ""
                    }
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      let newLand = { ...props.land };
                      if (!newLand.locations) {
                        newLand.locations = [
                          { point: i + 1, latitude: 0, longitude: 0 },
                        ];
                      }
                      newLand.locations[i] = {
                        ...newLand.locations[i],
                        longitude:
                          parseFloat(
                            (event.target as HTMLInputElement).value
                          ) || 0,
                      };
                      props.setLand(newLand);
                    }}
                  />
                </Grid>

                {/* Confirm delete modal */}
                <KDialog
                  open={showConfirmDeletePoint}
                  bckColor="var(--green-color)"
                  title="Xác nhận xóa"
                  content={
                    <p>
                      Điểm này sẽ được xóa khỏi hệ thống cho đến khi bạn tải lại
                      trang <br />
                      Bạn có chắc muốn xóa điểm này chứ?
                    </p>
                  }
                  onCancel={() => {
                    setShowConfirmDeletePoint(false);
                  }}
                  onConfirm={() => handleDeletePlace(i)}
                />

                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  height={"54px"}
                  item
                  lg={2}
                  md={4}
                  sm={4}
                  xs={6}
                >
                  <Tippy content={`Xóa điểm ${i}`}>
                    <Button
                      style={{
                        backgroundColor: "var(--white-color)",
                        borderColor: "transparent",
                        color: "var(--second-color)",
                      }}
                      variant="outlined"
                      onClick={() => {
                        setShowConfirmDeletePoint(true);
                      }}
                      size="medium"
                    >
                      <DeleteIcon className={cx("delete-icon")} />
                    </Button>
                  </Tippy>
                </Grid>
              </Grid>
            ))
          : props.land.locations.map((item, i) => (
              <Grid
                justifyContent={"space-around"}
                container
                columns={12}
                key={i}
              >
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={4}
                  xs={12}
                  className={cx("form-control-wrapper")}
                >
                  <label className={cx("form-input-label")} htmlFor={"lat"}>
                    Điểm {i + 1}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={4}
                  xs={6}
                  className={cx("form-control-wrapper")}
                >
                  <FloatingLabelInput
                    label="lat"
                    placeholder="nhập lat"
                    type="number"
                    value={
                      item.latitude !== undefined
                        ? item.latitude.toString()
                        : ""
                    }
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      let newLand = { ...props.land };
                      if (!newLand.locations) {
                        newLand.locations = [
                          {
                            point: i + 1,
                            latitude: 0,
                            longitude: 0,
                          },
                        ];
                      }
                      newLand.locations[i] = {
                        ...newLand.locations[i],
                        latitude:
                          parseFloat(
                            (event.target as HTMLInputElement).value
                          ) || 0,
                      };
                      props.setLand(newLand);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={4}
                  xs={6}
                  className={cx("form-control-wrapper")}
                >
                  <FloatingLabelInput
                    label="lng"
                    placeholder="nhập lng"
                    type="number"
                    value={
                      item.longitude !== undefined
                        ? item.longitude.toString()
                        : ""
                    }
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                      let newLand = { ...props.land };
                      if (!newLand.locations) {
                        newLand.locations = [
                          { point: i + 1, latitude: 0, longitude: 0 },
                        ];
                      }
                      newLand.locations[i] = {
                        ...newLand.locations[i],
                        longitude:
                          parseFloat(
                            (event.target as HTMLInputElement).value
                          ) || 0,
                      };
                      props.setLand(newLand);
                    }}
                  />
                </Grid>

                {/* Confirm delete modal */}
                <KDialog
                  open={showConfirmDeletePoint}
                  title="Xác nhận xóa"
                  bckColor="var(--green-color)"
                  content={
                    <p>
                      Điểm này sẽ được xóa khỏi hệ thống cho đến khi bạn thay
                      đổi khu canh tác
                      <br />
                      Bạn có chắc muốn xóa điểm này chứ?
                    </p>
                  }
                  onCancel={() => {
                    setShowConfirmDeletePoint(false);
                  }}
                  onConfirm={() => handleDeletePlace(i)}
                />

                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  height={"54px"}
                  item
                  lg={2}
                  md={4}
                  sm={4}
                  xs={6}
                >
                  <Tippy content={`Xóa điểm ${i + 1}`}>
                    <Button
                      style={{
                        backgroundColor: "var(--white-color)",
                        borderColor: "transparent",
                        color: "var(--second-color)",
                      }}
                      variant="outlined"
                      onClick={() => setShowConfirmDeletePoint(true)}
                      size="medium"
                    >
                      <DeleteIcon className={cx("delete-icon")} />
                    </Button>
                  </Tippy>
                </Grid>
              </Grid>
            ))}

        <Grid>
          <Carousel>
            {imageURLs.length > 0 &&
              imageURLs.map((avatar, i) => (
                <img
                  src={avatar}
                  alt="Chọn hình ảnh"
                  key={i}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "contain",
                    margin: "5px",
                  }}
                />
              ))}
          </Carousel>
        </Grid>

        <Grid
          container
          columns={12}
          justifyContent={"flex-end"}
          marginTop={"20px"}
        >
          <Grid item xs={3}></Grid>
          <Grid item xs={7}>
            <Button
              style={{ marginRight: 12 }}
              variant="outlined"
              disableElevation={true}
              startIcon={<AddCircleIcon />}
              onClick={handleAddPlace}
            >
              thêm điểm mới
            </Button>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              ref={fileInputRef}
              id="file-input"
              multiple // Cho phép chọn nhiều tệp
              onChange={(e) => {
                const fileInput = e.target;
                if (
                  fileInput &&
                  fileInput.files &&
                  fileInput.files.length > 0
                ) {
                  const files = Array.from(fileInput.files); // Chuyển đổi FileList thành mảng các File objects

                  // Cập nhật state land.images với mảng chứa các File ảnh đã chọn
                  props.setLand((prevLand) => ({
                    ...prevLand,
                    images: files, // Set to an array containing the selected File objects
                  }));
                }
              }}
            />

            <label htmlFor="file-input">
              <Button
                style={{ marginRight: 12 }}
                variant="outlined"
                startIcon={<ImageIcon />}
                disableElevation={true}
                component="span"
              >
                Thêm ảnh
              </Button>
            </label>

            <Button
              variant="contained"
              disableElevation={true}
              startIcon={<SaveIcon />}
              onClick={() => props.handleSubmitCreateLand(props.land)}
            >
              {props.submitButtonLabel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default AreaModal;
