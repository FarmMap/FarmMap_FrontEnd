import React, { Fragment, useEffect, useRef, useState } from "react";

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
import HomeWorkIcon from "@mui/icons-material/HomeWork";
// In
import FormInput from "../../components/formInput/FormInput";
import DefaultModal from "../../components/defaultModal";

import ImageIcon from "@mui/icons-material/Image";
import ArgiProduct from "../../../data/types/ArgiProduct";
import Carousel from "react-material-ui-carousel";
// Style imports
import classNames from "classnames/bind";
import styles from "./ArgiProduct.module.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useFetchFarmList from "../../../api/Farm/useFetchFarmList";
import FormDropdown, {
  DropdownOption,
} from "../../components/formDropDown/FormDropdown";

const cx = classNames.bind(styles);

interface ArgiProductModalProps {
  title: string;
  handleCloseModal: () => void;
  submitButtonLabel: string;
  argiProduct: ArgiProduct | undefined;
  setArgiProduct: React.Dispatch<React.SetStateAction<ArgiProduct>>;
  onSubmit: (argiProduct: ArgiProduct | undefined) => void;
}

const ArgiProductModal = (props: ArgiProductModalProps) => {
  // Xử lý ảnh
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const fileInputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const BASE_URL = "http://116.118.49.43:8878/";

  //Fetch Farm
  const { farms } = useFetchFarmList({});

  useEffect(() => {
    const newAvatars = props.argiProduct?.images;

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
  }, [isEdit, props.argiProduct?.images]);

  return (
    <DefaultModal
      overrideMaxWidth={{
        lg: "900px",
      }}
      title={props.title}
      onClose={props.handleCloseModal}
    >
      <Grid className={cx("area-wrapper")} container columns={12}>
        <Grid item lg={3} md={4} xs={4} sm={12}>
          <label className={cx("label-area")} htmlFor="khu-dat">
            Vùng canh tác <span>*</span>
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
            options={farms}
            defaultValue={props.argiProduct?.farm ?? ""}
            getOptionLabel={(option: ArgiProduct) => option.name as string}
            noOptionsText="Không tìm thấy trang trại nào"
            onChange={(event, value: ArgiProduct | null) => {
              if (value == null) return;
              if (props.argiProduct?.farm !== undefined) {
                props.setArgiProduct({
                  ...props.argiProduct,
                  farm: value.id,
                });
              }
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
        <Grid container spacing={3} className={cx("form-body-wrapper")}>
          <FormInput
            label={`Tên sản phẩm`}
            placeholder={`Nhập tên sản phẩm`}
            type="text"
            required
            value={props.argiProduct?.name ?? ""}
            onChange={(event) => {
              let newArgiProduct: ArgiProduct = {
                ...props.argiProduct,
              };
              newArgiProduct.name = event.currentTarget.value;
              props.setArgiProduct(newArgiProduct);
            }}
          />

          <FormInput
            label="Giá tiền"
            placeholder="Nhập giá tiền của sản phẩm"
            type="text"
            required
            value={`${String(props.argiProduct?.money ?? "").replace(
              /(.)(?=(\d{3})+$)/g,
              "$1."
            )}`}
            onChange={(event) => {
              let newArgiProduct: ArgiProduct = {
                ...props.argiProduct,
                money:
                  parseInt(event.currentTarget.value.replaceAll(".", "")) || 0,
              };

              props.setArgiProduct(newArgiProduct);
            }}
          />

          <FormInput
            label={`Số lượng`}
            placeholder={`Nhập số lượng sản phẩm`}
            type="text"
            required
            value={props.argiProduct?.quantity ?? ""}
            onChange={(event) => {
              let newArgiProduct = { ...props.argiProduct };
              newArgiProduct.quantity = event.currentTarget.value;
              props.setArgiProduct(newArgiProduct);
            }}
          />

          <FormInput
            label={`Trọng lượng`}
            placeholder={`Nhập trọng lượng sản phẩm`}
            type="text"
            required
            value={props.argiProduct?.weight ?? ""}
            onChange={(event) => {
              let newArgiProduct = { ...props.argiProduct };
              newArgiProduct.weight = event.currentTarget.value;
              props.setArgiProduct(newArgiProduct);
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
                Ngày thực hiện<span style={{ color: "red" }}>*</span>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Thời gian"
                    value={dayjs(props.argiProduct?.time)}
                    onChange={(date: Dayjs | null) => {
                      // Convert the selected Dayjs date to an ISO string and update the state
                      props.setArgiProduct({
                        ...props.argiProduct,
                        time: date?.toISOString() ?? "",
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Fragment>

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
                if (
                  fileInput &&
                  fileInput.files &&
                  fileInput.files.length > 0
                ) {
                  const files = Array.from(fileInput.files); // Chuyển đổi FileList thành mảng các File objects

                  // Cập nhật state land.images với mảng chứa các File ảnh đã chọn
                  props.setArgiProduct((prevArgiProduct) => ({
                    ...prevArgiProduct,
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
              startIcon={<SaveIcon />}
              onClick={() => props.onSubmit(props.argiProduct)}
            >
              {props.submitButtonLabel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default ArgiProductModal;
