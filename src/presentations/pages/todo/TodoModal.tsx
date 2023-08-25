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
import Todo from "../../../data/types/Todo";
import FormDropdown, {
  DropdownOption,
} from "../../components/formDropDown/FormDropdown";
import useFetchUserList from "../../../api/Login/useFetchUserList";
import useFetchProductType from "../../../api/Land/useFetchProductType";

// Style imports
import classNames from "classnames/bind";
import styles from "./Todo.module.scss";
import useFetchPlants from "../../../api/Plant/useFetchPlants";
import Plant from "../../../data/types/Plant";

const cx = classNames.bind(styles);

interface TodoModalProps {
  title: string;
  handleCloseModal: () => void;
  submitButtonLabel: string;
  land?: Land;
  setLand: React.Dispatch<React.SetStateAction<Land>>;
  todo?: Todo;
  crop: Plant | undefined;
  setCrop: React.Dispatch<React.SetStateAction<Plant>>;
  onSubmit: (todo: Todo | undefined) => void;
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#0abb87",
    },
  },
};

const TodoModal = (props: TodoModalProps) => {
  // fetch lands
  const { lands } = useFetchLandList({});

  const { plants } = useFetchPlants({
    page: 1,
  });

  const [todo, setTodo] = useState<Todo>(props.todo ?? {});

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
          <Grid className={cx("area-wrapper")} container columns={12}>
            <Grid item lg={3} md={4} xs={4} sm={12}>
              <label className={cx("label-area")} htmlFor="cay-trong">
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
                disabled={props.todo !== undefined}
                getOptionLabel={(option: Land) => option.name as string}
                noOptionsText="Không tìm thấy vùng canh tác nào"
                onChange={(event, value: Land | null) => {
                  if (value == null) return;
                  if (props.land !== undefined) {
                    props.setLand({
                      ...props.land,
                      id: value.id,
                    });
                    console.log("hiu", props.land);
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
            <Grid
              className={cx("area-wrapper")}
              container
              columns={12}
              mt={"10px"}
            >
              <Grid item lg={3} md={4} xs={4} sm={12}>
                <label className={cx("label-area")} htmlFor="cay-trong">
                  Cây trồng<span>*</span>
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
                  options={plants}
                  disabled={props.todo !== undefined}
                  defaultValue={props.crop}
                  getOptionLabel={(option: Plant) => option.name as string}
                  noOptionsText="Không tìm thấy cây trồng nào"
                  onChange={(event, value: Plant | null) => {
                    if (value == null) return;
                    if (props.crop !== undefined) {
                      props.setCrop({
                        ...props.crop,
                        id: value.id,
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
                    <TextField {...params} label="Chọn cây trồng" />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={cx("form-body-wrapper")}>
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
                    label="Ngày bắt đầu"
                    value={dayjs(todo.implement_at)}
                    onChange={(date: Dayjs | null) => {
                      // Convert the selected Dayjs date to an ISO string and update the state
                      setTodo({
                        ...todo,
                        implement_at: date?.toISOString() ?? "",
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Fragment>

          <FormInput
            label="Thời gian hoàn thành"
            required
            placeholder="Nhập thời gian hoàn thành"
            type="text"
            value={todo.completed_at ?? ""}
            onChange={(event) => {
              let newTodo: Todo = {
                ...todo,
                completed_at: event.currentTarget.value,
              };
              setTodo(newTodo);
            }}
          />

          <FormInput
            label="Công việc"
            required
            placeholder="Nhập công việc"
            type="text"
            value={todo?.job ?? ""}
            onChange={(event) => {
              let newTodo: Todo = {
                ...todo,
                job: event.currentTarget.value,
              };
              setTodo(newTodo);
            }}
          />
          <FormInput
            label="Ghi chú"
            required
            placeholder="Nhập ghi chú"
            type="text"
            value={todo?.description ?? ""}
            onChange={(event) => {
              let newTodo: Todo = {
                ...todo,
                description: event.currentTarget.value,
              };
              setTodo(newTodo);
            }}
          />

          <Grid item xs={3}></Grid>
          <Grid item xs={7}>
            <Button
              variant="contained"
              disableElevation={true}
              startIcon={<SaveIcon />}
              onClick={() => props.onSubmit(todo)}
            >
              {props.submitButtonLabel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </DefaultModal>
  );
};

export default TodoModal;
