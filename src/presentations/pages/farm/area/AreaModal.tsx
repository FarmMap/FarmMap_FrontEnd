// External
import React, { Fragment, useEffect, useState } from "react";
import DefaultModal from "../../../components/defaultModal/DefaultModal";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import LeafletGeocoder from "../../../components/maps/LeafletGeocoder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
// Internal
import FormInput from "../../../components/formInput/FormInput";
import FloatingLabelInput from "../../../components/floatingLabelInput/FloatingLabelInput";
import PlaneArea from "../../../../data/types/PlaneArea";
// Style
import classNames from "classnames/bind";
import styles from "./Area.module.scss";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";

const cx = classNames.bind(styles);

interface AreaModalProps {
  title: string;
  submitButtonLabel: string;
  handleCloseModal: () => void;
}
const AreaModal = (props: AreaModalProps) => {
  const position = { lat: 10.964112, lng: 106.856461 };

  const areas = [
    { label: "Khu đất A", year: 1994 },
    { label: "Khu đất B", year: 1972 },
    { label: "Khu đất C", year: 1974 },
    { label: "Khu đất D", year: 2008 },
  ];

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
  };

  const handleDeletePlace = (index: Number) => {
    const newCountLocal = countLocal.filter((_, i) => i !== index);
    setCountLocal(newCountLocal);
  };

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

  const fillBlueOptions = { fillColor: "blue" };
  const blackOptions = { color: "black" };

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

        <Grid className={cx("area-wrapper")} container columns={12}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-area")} htmlFor="khu-dat">
              Khu đất <span>*</span>
            </label>
          </Grid>
          <Grid
            item
            lg={7}
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
              options={areas}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn khu đất" />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ margin: "10px 0 0 0" }}>
          <FormInput
            label="Tên vùng"
            placeholder="Nhập tên vùng"
            type="text"
            value=""
            required
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
                Diện tích (m<sup>2</sup>){" "}
                <span style={{ color: "red" }}>*</span>
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
                value={""}
                min={0}
              />
            </Grid>
          </Fragment>
          <FormInput
            label="Ghi chú"
            placeholder="Nhập ghi chú"
            type="text"
            value=""
          />
        </Grid>

        {countLocal.map((item, i) => (
          <Grid justifyContent={"space-around"} container columns={12} key={i}>
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
                  plane.latlng[i]?.lat !== undefined
                    ? plane.latlng[i].lat.toString()
                    : ""
                }
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  let newPlane = { ...plane };
                  if (!newPlane.latlng) {
                    newPlane.latlng = [
                      {
                        lat: 0,
                        lng: 0,
                      },
                    ];
                  }
                  newPlane.latlng[i] = {
                    ...newPlane.latlng[i],
                    lat:
                      parseFloat((event.target as HTMLInputElement).value) || 0,
                  };
                  setPlane(newPlane);
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
                  plane.latlng[i]?.lng !== undefined
                    ? plane.latlng[i].lng.toString()
                    : ""
                }
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  let newPlane = { ...plane };
                  if (!newPlane.latlng) {
                    newPlane.latlng = [
                      {
                        lat: 0,
                        lng: 0,
                      },
                    ];
                  }
                  newPlane.latlng[i] = {
                    ...newPlane.latlng[i],
                    lng:
                      parseFloat((event.target as HTMLInputElement).value) || 0,
                  };
                  setPlane(newPlane);
                }}
              />
            </Grid>
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
                  onClick={() => handleDeletePlace(i)}
                  size="medium"
                >
                  <DeleteIcon className={cx("delete-icon")} />
                </Button>
              </Tippy>
            </Grid>
          </Grid>
        ))}

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
            <Button
              variant="contained"
              disableElevation={true}
              startIcon={<SaveIcon />}
              onClick={handleSubmitPlane}
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
