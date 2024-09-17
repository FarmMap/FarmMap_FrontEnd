import React, { Fragment, useState } from "react";

// Ex
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import dayjs, { Dayjs } from "dayjs";
import {
  Autocomplete,
  Button,
  FormControlLabel,
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
import Checkbox from "@mui/material/Checkbox";
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
import useFetchProductType from "../../../api/Land/useFetchProductType";

// Style imports
import classNames from "classnames/bind";
import styles from "./Expense.module.scss";

const cx = classNames.bind(styles);

interface ExpenseModalProps {
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

const ExpenseModal = (props: ExpenseModalProps) => {
  // fetch lands
  const { lands } = useFetchLandList({});

  const { users } = useFetchUserList({});

  const [farmCalendar, setFarmCalendar] = useState<FarmCalendar>(
    props.farmCalendar ?? {}
  );
  const unit = ["Quả", "Tấn", "Cây", "Tạ", "Kí"];
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
        <Grid container spacing={3} className={cx("form-body-wrapper")}>
          <FormInput
            label="Số tiền (đ)"
            placeholder="Nhập số tiền "
            type="text"
            required
            value={`${String(farmCalendar.expectOutput ?? "").replace(
              /(.)(?=(\d{3})+$)/g,
              "$1."
            )}`}
            onChange={(event) => {
              let newfarmCalendar: FarmCalendar = {
                ...farmCalendar,
                expectOutput:
                  parseInt(event.currentTarget.value.replaceAll(".", "")) || 0,
              };

              setFarmCalendar(newfarmCalendar);
            }}
          />
        </Grid>
        <Grid className={cx("area-wrapper")} container columns={12}>
          <Grid item lg={3} md={4} xs={4} sm={12}>
            <label className={cx("label-area")} htmlFor="khu-dat">
              Đối tượng giao dịch <span>*</span>
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
              disabled={props.farmCalendar !== undefined}
              defaultValue={props.land}
              getOptionLabel={(option: Land) => option.name as string}
              noOptionsText="Không tìm thấy đối tượng giao dịch nào"
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
                <TextField {...params} label="Nguyễn Thiên Ân" />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={cx("form-body-wrapper")}>
          <FormInput
            label="Ghi chú"
            placeholder="Nhập ghi chú"
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
            label="Loại phiếu chi"
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

          <FormDropdown
            label="Phương thức chuyển tiền"
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
                Ngày chứng từ <span style={{ color: "red" }}>*</span>
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
                    label="Ngày chứng từ"
                    value={dayjs(farmCalendar.startDay)}
                    onChange={(date: Dayjs | null) => {
                      // Convert the selected Dayjs date to an ISO string and update the state
                      setFarmCalendar({
                        ...farmCalendar,
                        startDay: date?.toISOString() ?? "",
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Fragment>

          <Grid className={cx("area-wrapper")} container columns={12}>
            <Grid item lg={3} md={4} xs={4} sm={12}>
              {/* <label className={cx("label-area")} htmlFor="khu-dat">
                Đối tượng giao dịch <span>*</span>
              </label> */}
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
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                }
                label="Hạch toán vào hoạt động kinh doanh"
              />
            </Grid>
          </Grid>

          <Grid item xs={3}></Grid>
          <Grid item xs={7}>
            <Button
              variant="contained"
              disableElevation={true}
              startIcon={<SaveIcon />}
              color="success"
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

export default ExpenseModal;
