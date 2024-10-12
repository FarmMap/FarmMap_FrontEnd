import React, { useEffect, useRef, useState } from "react";

// Ex
import {
  Autocomplete,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

// In
import FormInput from "../../components/formInput/FormInput";
import DefaultModal from "../../components/defaultModal";

import FormDropdown, {
  DropdownOption,
} from "../../components/formDropDown/FormDropdown";
import ImageIcon from "@mui/icons-material/Image";
import Material from "../../../data/types/Material";
import useFetchProvinceList from "../../../api/Farm/useFetchCategoryList";
import Providor from "../../../data/types/Providor";
import Carousel from "react-material-ui-carousel";
// Style imports
import classNames from "classnames/bind";
import styles from "./Material.module.scss";

const cx = classNames.bind(styles);

interface MaterialModalProps {
  title: string;
  handleCloseModal: () => void;
  submitButtonLabel: string;
  material: Material | undefined;
  setMaterial: React.Dispatch<React.SetStateAction<Material>>;
  onSubmit: (material: Material | undefined) => void;
}

const MaterialModal = (props: MaterialModalProps) => {
  // fetch materialGr
  const { provinces: materialGr } = useFetchProvinceList({
    type: "NHOM_VAT_TU",
  });

  // Xử lý ảnh
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const fileInputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const BASE_URL = "http://118.69.126.49:8878/";

  useEffect(() => {
    console.log(props.material);
  }, [props.material]);

  useEffect(() => {
    const newAvatars = props.material?.images;

    if (newAvatars && newAvatars.length > 0) {
      const urls = newAvatars.map((avatar) => {
        if (isEdit) {
          return URL.createObjectURL(avatar);
        } else {
          const imageUrlsWithBaseUrl = BASE_URL + avatar;
          return imageUrlsWithBaseUrl;
        }
      });
      setImageURLs(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [isEdit, props.material?.images]);

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
          label={`Tên vật tư`}
          placeholder={`Nhập tên vật tư`}
          type="text"
          required
          value={props.material?.name ?? ""}
          onChange={(event) => {
            let newMaterial: Material = {
              ...props.material,
            };
            newMaterial.name = event.currentTarget.value;
            props.setMaterial(newMaterial);
          }}
        />

        <FormInput
          label="Số lượng"
          placeholder="Nhập số lượng của vật tư"
          type="text"
          required
          value={`${String(props.material?.quantity ?? "").replace(
            /(.)(?=(\d{3})+$)/g,
            "$1."
          )}`}
          onChange={(event) => {
            let newMaterial: Material = {
              ...props.material,
              quantity:
                parseInt(event.currentTarget.value.replaceAll(".", "")) || 0,
            };

            props.setMaterial(newMaterial);
          }}
        />

        <Grid margin={"10px 0"} container spacing={3}>
          <Grid pt={"0 !important"} item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-area")} htmlFor="nhom-vat-tu">
              Nhóm vật tư <span>*</span>
            </label>
          </Grid>
          <Grid pt={"0 !important"} item lg={7} md={7} xs={12} sm={12}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={
                props.material?.materialGroup?.name !== undefined &&
                props.material?.materialGroup?.name !== null
                  ? props.material.materialGroup?.name
                  : null
              }
              options={materialGr.map((group) => group.name)}
              getOptionLabel={(option: string) => option}
              noOptionsText="Không tìm thấy nhóm vật tư nào"
              onChange={(event, value: string | null) => {
                event.preventDefault();
                if (value == null) return;
                const selectedGroup = materialGr.find(
                  (group) => group.name === value
                );
                if (selectedGroup) {
                  props.setMaterial((prevMaterial) => ({
                    ...prevMaterial,
                    materialGroup: selectedGroup,
                    materialGroupId: selectedGroup.id,
                  }));
                }
              }}
              sx={{ width: "100%" }}
              renderOption={(props, option) => (
                <MenuItem {...props} divider>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "1.3rem" }}
                    secondaryTypographyProps={{ fontSize: "1.2rem" }}
                    primary={option}
                  />
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Chọn nhóm vật tư" />
              )}
            />
          </Grid>
        </Grid>

        <FormInput
          label={`Ghi chú`}
          placeholder={`Nhập ghi chú`}
          type="text"
          required
          value={props.material?.description ?? ""}
          onChange={(event) => {
            let newMaterial = { ...props.material };
            newMaterial.description = event.currentTarget.value;
            props.setMaterial(newMaterial);
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
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            id="file-input"
            multiple // Cho phép chọn nhiều tệp
            onChange={(e) => {
              setIsEdit(true);
              const fileInput = e.target;
              if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const files = Array.from(fileInput.files); // Chuyển đổi FileList thành mảng các File objects

                // Cập nhật state land.images với mảng chứa các File ảnh đã chọn
                props.setMaterial((prevMaterial) => ({
                  ...prevMaterial,
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
              color="success"
              component="span"
            >
              Thêm ảnh
            </Button>
          </label>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            color="success"
            onClick={() => props.onSubmit(props.material)}
          >
            {props.submitButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default MaterialModal;
