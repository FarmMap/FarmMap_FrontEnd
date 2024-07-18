import React, { Fragment, useEffect, useRef, useState } from "react";

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
import Ingredient from "../../../data/types/Ingredient";
import Carousel from "react-material-ui-carousel";
// Style imports
import classNames from "classnames/bind";
import styles from "./ProductDelivery.module.scss";
import { STATUSINGREDIENT } from "../../../constants/Constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const cx = classNames.bind(styles);

interface IngredientModalProps {
  title: string;
  handleCloseModal: () => void;
  submitButtonLabel: string;
  ingredient: Ingredient | undefined;
  setIngredient: React.Dispatch<React.SetStateAction<Ingredient>>;
  onSubmit: (ingredient: Ingredient | undefined) => void;
}

const ProductDeliveryModal = (props: IngredientModalProps) => {
  // Xử lý ảnh
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const fileInputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const BASE_URL = "http://118.69.126.49:8878/";

  // useEffect(() => {
  //   if (props.title == "Cập nhật nguyên liệu") setIsEdit(true);
  //   else setIsEdit(false);
  //   console.log(isEdit);
  // }, [props.title]);

  useEffect(() => {
    const newAvatars = props.ingredient?.images;

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
  }, [isEdit, props.ingredient?.images]);

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
          label={`Tên sản phẩm`}
          placeholder={`Nhập tên sản phẩm`}
          type="text"
          required
          value={props.ingredient?.name ?? ""}
          onChange={(event) => {
            let newIngredient: Ingredient = {
              ...props.ingredient,
            };
            newIngredient.name = event.currentTarget.value;
            props.setIngredient(newIngredient);
          }}
        />

        <FormInput
          label="Số lượng"
          placeholder="Nhập số lượng"
          type="text"
          required
          value={`${String(props.ingredient?.money ?? "").replace(
            /(.)(?=(\d{3})+$)/g,
            "$1."
          )}`}
          onChange={(event) => {
            let newIngredient: Ingredient = {
              ...props.ingredient,
              money:
                parseInt(event.currentTarget.value.replaceAll(".", "")) || 0,
            };

            props.setIngredient(newIngredient);
          }}
        />

        <FormInput
          label={`Đơn vị`}
          placeholder={`Đơn vị tính`}
          type="text"
          required
          value={props.ingredient?.quantity ?? ""}
          onChange={(event) => {
            let newIngredient: Ingredient = {
              ...props.ingredient,
            };
            newIngredient.quantity = event.currentTarget.value;
            props.setIngredient(newIngredient);
          }}
        />

        <FormDropdown
          label="Trạng thái"
          value={props.ingredient?.status ?? ""}
          required
          options={STATUSINGREDIENT.map((u) => {
            return {
              name: u.name,
              value: u.value,
            } as DropdownOption;
          })}
          onChange={(event) => {
            let newIngredient: Ingredient = {
              ...props.ingredient,
              status: parseInt(event.target.value),
            };
            props.setIngredient(newIngredient);
          }}
        />

        <FormInput
          label={`Người thực hiện`}
          placeholder={`Thêm người thực hiện`}
          type="text"
          required
          value={props.ingredient?.information ?? ""}
          onChange={(event) => {
            let newIngredient = { ...props.ingredient };
            newIngredient.information = event.currentTarget.value;
            props.setIngredient(newIngredient);
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
              Ngày xuất<span style={{ color: "red" }}>*</span>
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
                  label="Chọn ngày xuất"
                  value={dayjs(props.ingredient?.time)}
                  onChange={(date: Dayjs | null) => {
                    // Convert the selected Dayjs date to an ISO string and update the state
                    props.setIngredient({
                      ...props.ingredient,
                      time: date?.toISOString() ?? "",
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <FormInput
            label={`Nơi nhận`}
            placeholder={`Thêm nơi nhận`}
            type="text"
            required
            value={props.ingredient?.quantity ?? ""}
            onChange={(event) => {
              let newIngredient: Ingredient = {
                ...props.ingredient,
              };
              newIngredient.quantity = event.currentTarget.value;
              props.setIngredient(newIngredient);
            }}
          />
          <FormInput
            label={`Thành tiền`}
            placeholder={`Thêm đơn giá`}
            type="text"
            required
            value={props.ingredient?.quantity ?? ""}
            onChange={(event) => {
              let newIngredient: Ingredient = {
                ...props.ingredient,
              };
              newIngredient.quantity = event.currentTarget.value;
              props.setIngredient(newIngredient);
            }}
          />
          <FormInput
            label={`Ghi chú`}
            placeholder={`Ghi chú`}
            type="text"
            required
            value={props.ingredient?.quantity ?? ""}
            onChange={(event) => {
              let newIngredient: Ingredient = {
                ...props.ingredient,
              };
              newIngredient.quantity = event.currentTarget.value;
              props.setIngredient(newIngredient);
            }}
          />
        </Fragment>

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
                props.setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  images: files, // Set to an array containing the selected File objects
                }));
              }
            }}
          />

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => props.onSubmit(props.ingredient)}
          >
            {props.submitButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default ProductDeliveryModal;
