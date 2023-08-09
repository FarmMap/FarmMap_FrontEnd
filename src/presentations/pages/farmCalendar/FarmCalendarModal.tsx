import React, { Fragment, useState } from "react";

// Ex
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import dayjs, { Dayjs } from "dayjs";
import {
  Autocomplete,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  Popper,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// In
import FormInput from "../../components/formInput/FormInput";
import useFetchLandList from "../../../api/Land/useFetchLandList";
import DefaultModal from "../../components/defaultModal";
import Land from "../../../data/types/Land";
import FarmCalendar from "../../../data/types/FarmCalendar";
import FormDropdown, {
  DropdownOption,
} from "../../components/formDropDown/FormDropdown";
import useFetchUserList from "../../../api/Login/useFetchUserList";
import UserAccount from "../../../data/types/UserAccount";
// Style imports
import classNames from "classnames/bind";
import styles from "./FarmCalendar.module.scss";
import useFetchProductType from "../../../api/Land/useFetchProductType";

const cx = classNames.bind(styles);

interface FarmCalendarModalProps {
  title: string;
  handleCloseModal: () => void;
  submitButtonLabel: string;
  land?: Land;
  setLand: React.Dispatch<React.SetStateAction<Land>>;
  farmCalendar?: FarmCalendar;
  user: UserAccount[];
  setUser: React.Dispatch<React.SetStateAction<UserAccount[]>>;
  onSubmit: (farmCalendar: FarmCalendar | undefined) => void;
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#0abb87",
    },
  },
};

const FarmCalendarModal = (props: FarmCalendarModalProps) => {
  // fetch lands
  const { lands } = useFetchLandList({});

  const { users } = useFetchUserList({});

  const [farmCalendar, setFarmCalendar] = useState<FarmCalendar>(
    props.farmCalendar ?? {}
  );
  const unit = ["Quả", "Tấn", "Cây", "Tạ", "Kí"];
  const { productTypes } = useFetchProductType({});

  console.log(props.farmCalendar?.productType?.name);

  return (
    <DefaultModal
      overrideMaxWidth={{
        lg: "900px",
      }}
      title={props.title}
      onClose={props.handleCloseModal}
    >
      <Grid>
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
              options={lands}
              defaultValue={props.land}
              disabled={props.farmCalendar !== undefined}
              getOptionLabel={(option: Land) => option.name as string}
              noOptionsText="Không tìm thấy vùng canh tác nào"
              onChange={(event, value: Land | null) => {
                if (value == null) return;
                if (props.land !== undefined) {
                  props.setLand({
                    ...props.land,
                    id: value.id,
                    name: value.name,
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
                <TextField {...params} label="Chọn vùng canh tác" />
              )}
            />
          </Grid>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-area")} htmlFor="khu-dat">
              Người thực hiện <span>*</span>
            </label>
          </Grid>
          <Grid
            item
            lg={7.3}
            mt={"10px"}
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
              multiple // Thêm thuộc tính multiple để chọn nhiều giá trị
              defaultValue={props.farmCalendar !== undefined ? props.user : []}
              options={users} // Đảm bảo users là một mảng
              getOptionLabel={(option: UserAccount) =>
                option.fullName as string
              }
              noOptionsText="Không tìm thấy người thực hiện nào"
              onChange={(event, values: UserAccount[]) => {
                // Sử dụng values để lấy danh sách người được chọn
                props.setUser(
                  values.map((user) => ({
                    ...props.user,
                    id: user.id,
                  }))
                );
              }}
              sx={{ width: "100%" }}
              renderOption={(props, option) => (
                <MenuItem {...props} divider>
                  <AccountCircleIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "1.3rem" }}
                    secondaryTypographyProps={{ fontSize: "1.2rem" }}
                    primary={option.fullName}
                  />
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Chọn người thực hiện" />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={cx("form-body-wrapper")}>
          <FormInput
            label="Tên sản phẩm"
            placeholder="Nhập tên sản phẩm"
            type="text"
            required
            value={farmCalendar.product_name ?? ""}
            onChange={(event) => {
              let newFarmCalendar: FarmCalendar = {
                ...farmCalendar,
                product_name: event.currentTarget.value,
              };
              setFarmCalendar(newFarmCalendar);
            }}
          />

          <FormDropdown
            label="Loại sản phẩm"
            value={
              farmCalendar.productType !== undefined
                ? props.farmCalendar?.productType?.name
                : farmCalendar.productType
            }
            required
            defaultValue={props.farmCalendar?.productType?.name}
            options={productTypes.map((u) => {
              return {
                name: u.name,
                value: u.id,
              } as DropdownOption;
            })}
            onChange={(event) => {
              let newFarmCalendar: FarmCalendar = {
                ...farmCalendar,
                productTypeId: event.target.value,
              };
              setFarmCalendar(newFarmCalendar);
            }}
          />

          <FormInput
            label="Số lượng giống"
            placeholder="Nhập số lượng giống"
            required
            type="number"
            value={farmCalendar.numberOfVarites?.toString() ?? ""}
            onChange={(event) => {
              let newFarmCalendar: FarmCalendar = {
                ...farmCalendar,
                numberOfVarites: parseInt(event.currentTarget.value),
              };
              setFarmCalendar(newFarmCalendar);
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
                Thời gian thu hoạch <span style={{ color: "red" }}>*</span>
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
                    label="Ngày bắt đầu"
                    value={dayjs(farmCalendar.startDay)}
                    onChange={(date: Dayjs | null) => {
                      // Convert the selected Dayjs date to an ISO string and update the state
                      setFarmCalendar({
                        ...farmCalendar,
                        startDay: date?.toISOString() ?? "",
                      });
                    }}
                  />

                  <DatePicker
                    label="Ngày kết thúc"
                    value={dayjs(farmCalendar.endDate)}
                    onChange={(date: Dayjs | null) => {
                      // Convert the selected Dayjs date to an ISO string and update the state
                      setFarmCalendar({
                        ...farmCalendar,
                        endDate: date?.toISOString() ?? "",
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Fragment>

          <FormInput
            label="Nhà cung cấp"
            required
            placeholder="Nhập tên nhà cung cấp"
            type="text"
            value={farmCalendar.seedProvider ?? ""}
            onChange={(event) => {
              let newFarmCalendar: FarmCalendar = {
                ...farmCalendar,
                seedProvider: event.currentTarget.value,
              };
              setFarmCalendar(newFarmCalendar);
            }}
          />

          <FormInput
            label="Sản lượng dự kiến"
            required
            placeholder="Nhập sản lượng dự kiến"
            type="number"
            value={farmCalendar.expectOutput?.toString() ?? ""}
            onChange={(event) => {
              let newFarmCalendar: FarmCalendar = {
                ...farmCalendar,
                expectOutput: parseInt(event.currentTarget.value),
              };
              setFarmCalendar(newFarmCalendar);
            }}
          />

          <FormDropdown
            label="Đơn vị"
            value={farmCalendar.unit}
            defaultValue={""}
            required
            options={unit.map((u) => {
              return {
                name: u,
                value: u,
              } as DropdownOption;
            })}
            onChange={(event) => {
              let newFarmCalendar: FarmCalendar = {
                ...farmCalendar,
                unit: event.target.value,
              };
              setFarmCalendar(newFarmCalendar);
            }}
          />

          <Grid item xs={3}></Grid>
          <Grid item xs={7}>
            <Button
              variant="contained"
              disableElevation={true}
              startIcon={<SaveIcon />}
              onClick={() => props.onSubmit(farmCalendar)}
            >
              {props.submitButtonLabel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default FarmCalendarModal;
