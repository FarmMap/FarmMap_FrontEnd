import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  TextField,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import DefaultModal from "../../components/defaultModal";
import FormInput from "../../components/formInput/FormInput";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Carousel from "react-material-ui-carousel";

import Plant from "../../../data/types/Plant";
import useFetchProvinceList from "../../../api/Farm/useFetchCategoryList";
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
  const { provinces: cropGr } = useFetchProvinceList({
    type: "NHOM_CAY_TRONG",
  });

  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <DefaultModal
      overrideMaxWidth={{ lg: "900px" }}
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
          onChange={(event) =>
            props.setPlant({ ...props.plant, name: event.currentTarget.value })
          }
        />

        <FormInput
          label="Bệnh"
          placeholder="Nhập bệnh"
          required
          value={props.plant.disease ?? ""}
          onChange={(event) =>
            props.setPlant({
              ...props.plant,
              disease: event.currentTarget.value,
            })
          }
          type={""}
        />

        <FormInput
          label="Tăng trưởng"
          placeholder="Nhập tăng trưởng"
          required
          value={props.plant.growth ?? ""}
          onChange={(event) =>
            props.setPlant({
              ...props.plant,
              growth: event.currentTarget.value,
            })
          }
          type={""}
        />

        <FormInput
          label="Sử dụng"
          placeholder="Nhập sử dụng"
          required
          value={props.plant.use ?? ""}
          onChange={(event) =>
            props.setPlant({ ...props.plant, use: event.currentTarget.value })
          }
          type={""}
        />

        <FormInput
          label="Thu hoạch"
          placeholder="Nhập thu hoạch"
          required
          value={props.plant.harvest ?? ""}
          onChange={(event) =>
            props.setPlant({
              ...props.plant,
              harvest: event.currentTarget.value,
            })
          }
          type={""}
        />
        <FormInput
          label="Giá"
          placeholder="Nhập giá"
          type="text"
          required
          value={props.plant.price.toString()}
          onChange={(event) =>
            props.setPlant({
              ...props.plant,
              price: Number(event.currentTarget.value),
            })
          }
        />

        <FormInput
          label="Nhóm cây"
          placeholder="Nhập nhóm cây"
          required
          value={props.plant.groupCrop ?? ""}
          onChange={(event) =>
            props.setPlant({
              ...props.plant,
              groupCrop: event.currentTarget.value,
            })
          }
          type={""}
        />

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

        <Grid item xs={3}></Grid>
        <Grid item xs={7}>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            id="file-input"
            multiple // Cho phép chọn nhiều tệp
            onChange={(e) => {
              const fileInput = e.target;
              if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const files = Array.from(fileInput.files); // Chuyển đổi FileList thành mảng các File objects

                // Cập nhật state area.avatars với mảng chứa các File ảnh đã chọn
                props.setPlant((prevPlant) => ({
                  ...prevPlant,
                  images: files, // Set to an array containing the selected File objects
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
