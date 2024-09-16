import React, { useEffect, useRef, useState } from "react";

// Ex
import { Button, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

// In
import FormInput from "../../components/formInput/FormInput";
import DefaultModal from "../../components/defaultModal";

import FormDropdown, {
  DropdownOption,
} from "../../components/formDropDown/FormDropdown";
import ImageIcon from "@mui/icons-material/Image";
import Plant from "../../../data/types/Plant";
import useFetchProvinceList from "../../../api/Farm/useFetchCategoryList";
import Carousel from "react-material-ui-carousel";
// Style imports
import classNames from "classnames/bind";
import styles from "./Plant.module.scss";

const cx = classNames.bind(styles);

interface PlantModalProps {
  title: string;
  handleCloseModal: () => void;
  submitButtonLabel: string;
  plant: Plant;
  setPlant: React.Dispatch<React.SetStateAction<Plant>>;
  onSubmit: (plant: Plant | undefined) => void;
}

const PlantModal = (props: PlantModalProps) => {
  // fetch cropGr
  const { provinces: cropGr } = useFetchProvinceList({
    type: "NHOM_CAY_TRONG",
  });

  // Xử lý ảnh
  const [isEdit, setIsEdit] = useState(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (props.title == "Thêm cây trồng") {
      setIsEdit(false);
      const newAvatars = props.plant?.images;
      if (newAvatars && newAvatars.length > 0) {
        const urls = newAvatars.map((avatar) => URL.createObjectURL(avatar));
        setImageURLs(urls);

        return () => {
          urls.forEach((url) => URL.revokeObjectURL(url));
        };
      }
    } else {
      setIsEdit(true);
    }
  }, [props.plant?.images, props.title]);

  return (
    <DefaultModal
      overrideMaxWidth={{
        lg: "900px",
      }}
      title={props.title}
      onClose={props.handleCloseModal}
    >
      <Grid container spacing={3} className={cx("form-body-wrapper")}>
        <FormInput
          label={`Tên cây trồng`}
          placeholder={`Nhập tên cây trồng`}
          type="text"
          required
          value={props.plant.name ?? ""}
          onChange={(event) => {
            let newPlant = { ...props.plant };
            newPlant.name = event.currentTarget.value;
            props.setPlant(newPlant);
          }}
        />

        <FormInput
          label={`Loại bệnh`}
          placeholder={`Nhập loại bệnh thường gặp`}
          type="text"
          required
          value={`${props.plant?.disease ?? ""}`}
          onChange={(event) => {
            let newPlant: Plant = {
              ...props.plant,
              disease: event.currentTarget.value,
            };
            props.setPlant(newPlant);
          }}
        />

        <FormInput
          label={`Đặc tính sinh trưởng`}
          placeholder={`Nhập đặc tính sinh trưởng`}
          type="text"
          required
          value={`${props.plant?.growth ?? ""}`}
          onChange={(event) => {
            let newPlant: Plant = {
              ...props.plant,
              growth: event.currentTarget.value,
            };
            props.setPlant(newPlant);
          }}
        />

        <FormInput
          label={`Đặc tính sử dụng`}
          placeholder={`Nhập đặc tính sử dụng cây trồng`}
          type="text"
          required
          value={`${props.plant?.use ?? ""}`}
          onChange={(event) => {
            let newPlant: Plant = {
              ...props.plant,
              use: event.currentTarget.value,
            };
            props.setPlant(newPlant);
          }}
        />

        <FormInput
          label={`Thu hoạch`}
          placeholder={`Nhập thu hoạch`}
          type="text"
          required
          value={`${props.plant?.harvest ?? ""}`}
          onChange={(event) => {
            let newPlant: Plant = {
              ...props.plant,
              harvest: event.currentTarget.value,
            };
            props.setPlant(newPlant);
          }}
        />

        <FormInput
          label="Giá tiền"
          placeholder="Nhập giá của cây trồng"
          type="text"
          required
          value={`${String(props.plant?.price ?? "").replace(
            /(.)(?=(\d{3})+$)/g,
            "$1."
          )}`}
          onChange={(event) => {
            let newProvidor: Plant = {
              ...props.plant,
              price:
                parseInt(event.currentTarget.value.replaceAll(".", "")) || 0,
            };

            props.setPlant(newProvidor);
          }}
        />

        <FormDropdown
          label="Nhóm cây trồng"
          value={props.plant?.groupCrop ?? ""}
          defaultValue={""}
          required
          options={cropGr.map((u) => {
            return {
              name: u.name,
              value: u.id,
            } as DropdownOption;
          })}
          onChange={(event) => {
            let newPlant: Plant = {
              ...props.plant,
              groupCrop: event.target.value,
            };
            props.setPlant(newPlant);
          }}
        />

        <Grid style={{ width: "100%" }}>
          <Carousel>
            {imageURLs.length > 0 &&
              imageURLs.map((avatar, i) => (
                <img
                  src={avatar}
                  alt="Chọn hình ảnh"
                  key={i}
                  style={{
                    width: "100%",
                    height: "50vh",
                    objectFit: "contain",
                    margin: "5px",
                  }}
                />
              ))}
          </Carousel>
        </Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={7}>
          {!isEdit && (
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
                  props.setPlant((prevPlant) => ({
                    ...prevPlant,
                    images: files, // Set to an array containing the selected File objects
                  }));
                }
              }}
            />
          )}

          {!isEdit && (
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
          )}
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            color="success"
            onClick={() => props.onSubmit(props.plant)}
          >
            {props.submitButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default PlantModal;
