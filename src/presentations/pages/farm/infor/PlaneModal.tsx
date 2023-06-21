// External
import { Button, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Internal
import DefaultModal from "../../../components/defaultModal";
import SaveIcon from "@mui/icons-material/Save";
import FormInput from "../../../components/formInput/FormInput";
import Role from "../../../../data/types/Role";
import PlaneArea from "../../../../data/types/PlaneArea";
// Styles
import classNames from "classnames/bind";
import styles from "./InforFarmPage.module.scss";
import { stringify } from "querystring";
import FloatingLabelInput from "../../../components/floatingLabelInput/FloatingLabelInput";
const cx = classNames.bind(styles);

export interface PlaneModalProps {
  title: string;
  submitButtonLabel: string;
  handleCloseModal: () => void;
  roles: Role[];
  plane: PlaneArea;
  setPlane: React.Dispatch<React.SetStateAction<PlaneArea>>;
  handleSubmitPlane: () => void;
}

const PlaneModal = (props: PlaneModalProps) => {
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

  return (
    <DefaultModal title={props.title} onClose={props.handleCloseModal}>
      <Grid container spacing={3} className={cx("form-body-wrapper")}>
        <FormInput
          label="Tên Farm"
          placeholder="Nhập tên farm"
          type="text"
          required
          value={props.plane.tenFarm ?? ""}
          onChange={(event) => {
            let newPlane = { ...props.plane };
            newPlane.tenFarm = event.currentTarget.value;
            props.setPlane(newPlane);
          }}
        />
        <FormInput
          label="Tên khu đất"
          placeholder="Nhập tên khu đất"
          type="text"
          required
          value={props.plane.tenKhuDat ?? ""}
          onChange={(event) => {
            let newPlane = { ...props.plane };
            newPlane.tenKhuDat = event.currentTarget.value;
            props.setPlane(newPlane);
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
              value={`${String(props.plane.dienTich ?? "").replace(
                /(.)(?=(\d{3})+$)/g,
                "$1."
              )}`}
              onChange={(event) => {
                let newPlane = { ...props.plane };
                newPlane.dienTich =
                  parseFloat(event.currentTarget.value.replaceAll(".", "")) ||
                  0;
                props.setPlane(newPlane);
              }}
              min={0}
            />
          </Grid>
          <FormInput
            label="Ghi chu"
            placeholder="Nhập ghi chu"
            type="text"
            required
            value={props.plane.ghiChu ?? ""}
            onChange={(event) => {
              let newPlane = { ...props.plane };
              newPlane.ghiChu = event.currentTarget.value;
              props.setPlane(newPlane);
            }}
          />
        </Fragment>

        {countLocal.map((item, i) => (
          <Fragment key={i}>
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
                  props.plane.latlng[i]?.lat !== undefined
                    ? props.plane.latlng[i].lat.toString()
                    : ""
                }
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  let newPlane = { ...props.plane };
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
                  props.setPlane(newPlane);
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
                  props.plane.latlng[i]?.lng !== undefined
                    ? props.plane.latlng[i].lng.toString()
                    : ""
                }
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  let newPlane = { ...props.plane };
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
                  props.setPlane(newPlane);
                }}
              />
            </Grid>
          </Fragment>
        ))}

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
            onClick={props.handleSubmitPlane}
          >
            {props.submitButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default PlaneModal;
