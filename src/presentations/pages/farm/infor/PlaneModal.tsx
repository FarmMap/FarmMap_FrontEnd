// External
import {
  Autocomplete,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SaveIcon from "@mui/icons-material/Save";
import ImageIcon from "@mui/icons-material/Image";
// Internal
import DefaultModal from "../../../components/defaultModal";
import FormInput from "../../../components/formInput/FormInput";

// Styles
import classNames from "classnames/bind";
import styles from "./InforFarmPage.module.scss";
import FloatingLabelInput from "../../../components/floatingLabelInput/FloatingLabelInput";
import Farm from "../../../../data/types/Farm";
import { Area } from "../../../../data/types/Area";
import Carousel from "react-material-ui-carousel";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import SearchLocationByLatLng from "../../../components/maps/SearchLocationByLatLng";
import LeafletGecoderPlane from "./LeafletGecoderPlane";
const cx = classNames.bind(styles);

export interface PlaneModalProps {
  title: string;
  submitButtonLabel: string;
  handleCloseModal: () => void;
  area: Area;
  handleSubmitArea: (area: Area) => void;
  farms: Farm[];
  farm: Farm;
  setFarm: React.Dispatch<React.SetStateAction<Farm>>;
  setArea: React.Dispatch<React.SetStateAction<Area>>;
}

const PlaneModal = (props: PlaneModalProps) => {
  const [countLocal, setCountLocal] = useState<number[]>([]);
  const position = { lat: 10.964112, lng: 106.856461 };
  useEffect(() => {
    const storedCount = localStorage.getItem("count");
    if (storedCount) {
      setCountLocal(JSON.parse(storedCount));
    } else {
      const existingPoints = props.area.locations.map(
        (location) => location.point
      );
      setCountLocal(existingPoints);
    }
  }, [props.area.locations]);

  const handleAddPlace = () => {
    const newCount = (countLocal[countLocal.length - 1] || 0) + 1;

    // Thêm điểm mới vào danh sách locations
    const newArea = { ...props.area };
    newArea.locations.push({
      point: newCount,
      latitude: 0,
      longitude: 0,
    });

    setCountLocal([...countLocal, newCount]); // Cập nhật state điểm
    props.setArea(newArea); // Cập nhật area với điểm mới
  };

  useEffect(() => {
    let newArea = { ...props.area };

    // Kiểm tra và khởi tạo mảng locations nếu chưa tồn tại
    if (!newArea.locations) {
      newArea.locations = [];
    }

    // Kiểm tra độ dài của mảng locations và chỉnh sửa các giá trị 'point'
    countLocal.forEach((count, i) => {
      if (!newArea.locations[i]) {
        newArea.locations[i] = {
          point: count,
          latitude: 0,
          longitude: 0,
        };
      } else {
        newArea.locations[i].point = count;
      }
    });

    props.setArea(newArea);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countLocal, props.area, props.setArea]);

  // Ref để tham chiếu tới input file
  const fileInputRef = useRef(null);
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  useEffect(() => {
    const newAvatars = props.area.avatars;
    if (newAvatars && newAvatars.length > 0) {
      const urls = newAvatars.map((avatar) => URL.createObjectURL(avatar));
      setImageURLs(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [props.area.avatars]);

  useEffect(() => {
    console.log(props.area.locations);
  }, [props.area.locations]);

  // Map get lat long when click
  const MapWithClickHandler = ({
    setArea,
  }: {
    setArea: (area: any) => void;
  }) => {
    const [markerPosition, setMarkerPosition] = useState<{
      lat: number;
      lng: number;
    } | null>(null);

    useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition({ lat, lng });

      setArea((prevArea: any) => {
        const newPoint =
          prevArea.locations.length > 0
            ? prevArea.locations[prevArea.locations.length - 1].point + 1
            : 1;

        const newLocations = [
          ...prevArea.locations,
          { point: newPoint, latitude: lat, longitude: lng },
        ];

        return { ...prevArea, locations: newLocations };
      });
    });

    return markerPosition ? <Marker position={markerPosition} /> : null;
  };

  return (
    <DefaultModal title={props.title} onClose={props.handleCloseModal}>
      <Fragment>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LeafletGecoderPlane setArea={props.setArea} />
          <MapWithClickHandler setArea={props.setArea} />
          {/* Hiển thị điểm của các location */}
          {props.area.locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.latitude, lng: location.longitude }}
            />
          ))}

          {/* Hiển thị trang trại nếu tồn tại */}
          {props.farm.location && (
            <Marker
              position={{
                lat: props.farm.location.latitude,
                lng: props.farm.location.longitude,
              }}
            />
          )}
        </MapContainer>
        <Grid
          mt={"12px"}
          className={cx("company-wrapper")}
          container
          columns={12}
        >
          <Grid item lg={2.6} md={4} xs={4} sm={12}>
            <label className={cx("label-company")} htmlFor="mo-hinh-kd">
              Trang trại
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
              options={props.farms}
              getOptionLabel={(option: Farm) => option.name as string}
              noOptionsText="Không tìm thấy trang trại nào"
              onChange={(event, value: Farm | null) => {
                if (value == null) return;
                props.setFarm({
                  ...props.farm,
                  id: value.id,
                  location: value.location,
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
                <TextField {...params} label="Chọn trang trại" />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={cx("form-body-wrapper")}>
          <FormInput
            label="Tên khu đất"
            placeholder="Nhập tên khu đất"
            type="text"
            required
            value={props.area.name ?? ""}
            onChange={(event) => {
              let newArea = { ...props.area };
              newArea.name = event.currentTarget.value;
              props.setArea(newArea);
            }}
          />
          <Fragment>
            <Grid
              item
              lg={3}
              md={4}
              sm={4}
              xs={12}
              className={cx("form-control-wrapper")}
            >
              <label className={cx("form-input-label")} htmlFor={"Dientich"}>
                Diện tích (m<sup>2</sup>)
              </label>
            </Grid>
            <Grid
              item
              lg={7}
              md={7}
              sm={7}
              xs={12}
              className={cx("form-control-wrapper")}
            >
              <input
                className={cx("form-input")}
                id={"Diện tích"}
                type={"text"}
                placeholder={"Nhập diện tích"}
                value={`${String(props.area.acreage ?? "").replace(
                  /(.)(?=(\d{3})+$)/g,
                  "$1."
                )}`}
                onChange={(event) => {
                  let newArea = { ...props.area };
                  newArea.acreage =
                    parseFloat(event.currentTarget.value.replaceAll(".", "")) ||
                    0;
                  props.setArea(newArea);
                }}
                min={0}
              />
            </Grid>
            <FormInput
              label="Ghi chú"
              placeholder="Nhập ghi chú"
              type="text"
              value={props.area.description ?? ""}
              onChange={(event) => {
                let newArea = { ...props.area };
                newArea.description = event.currentTarget.value;
                props.setArea(newArea);
              }}
            />
          </Fragment>

          {countLocal.map((item, i) => (
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
                  Điểm {item}
                  <span style={{ color: "red" }}>*</span>
                </label>
              </Grid>
              <Grid
                item
                lg={4}
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
                    props.area.locations[i]?.latitude !== undefined
                      ? props.area.locations[i].latitude.toString()
                      : ""
                  }
                  onChange={(event: React.FormEvent<HTMLInputElement>) => {
                    let newArea = { ...props.area };
                    if (!newArea.locations) {
                      newArea.locations = [
                        {
                          point: item,
                          latitude: 0,
                          longitude: 0,
                        },
                      ];
                    }
                    newArea.locations[i] = {
                      ...newArea.locations[i],
                      latitude:
                        parseFloat((event.target as HTMLInputElement).value) ||
                        0,
                    };
                    props.setArea(newArea);
                  }}
                />
              </Grid>
              <Grid
                item
                lg={4}
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
                    props.area.locations[i]?.longitude !== undefined
                      ? props.area.locations[i].longitude.toString()
                      : ""
                  }
                  onChange={(event: React.FormEvent<HTMLInputElement>) => {
                    let newArea = { ...props.area };
                    if (!newArea.locations) {
                      newArea.locations = [
                        { point: item, latitude: 0, longitude: 0 },
                      ];
                    }
                    newArea.locations[i] = {
                      ...newArea.locations[i],
                      longitude:
                        parseFloat((event.target as HTMLInputElement).value) ||
                        0,
                    };
                    props.setArea(newArea);
                  }}
                />
              </Grid>
            </Grid>
          ))}

          <Grid columns={12} width={"100%"}>
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
          <Grid container columns={12}>
            <Grid item xs={3.5}></Grid>
            <Grid item xs={7.5}>
              <p className={cx("description")}>
                Bạn có thể thêm điểm mới bằng cách thủ công hoặc tìm kiếm trên
                bản đồ
              </p>
            </Grid>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={7} paddingTop={"0 !important"}>
            <Button
              style={{ marginRight: 12 }}
              variant="outlined"
              disableElevation={true}
              startIcon={<AddCircleIcon />}
              color="success"
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

                  // Cập nhật state area.avatars với mảng chứa các File ảnh đã chọn
                  props.setArea((prevArea) => ({
                    ...prevArea,
                    avatars: files, // Set to an array containing the selected File objects
                  }));
                }
              }}
            />

            <label htmlFor="file-input">
              <Button
                style={{ marginRight: 12 }}
                variant="outlined"
                color="success"
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
              color="success"
              onClick={() => props.handleSubmitArea(props.area)}
            >
              {props.submitButtonLabel}
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    </DefaultModal>
  );
};

export default PlaneModal;
