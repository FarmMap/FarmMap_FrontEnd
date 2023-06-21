// External imports
import { Grid, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Fragment } from "react";

// Style imports
import classNames from "classnames/bind";
import styles from "./FormDropdown.module.scss";
const cx = classNames.bind(styles);

export interface DropdownOption {
  name: string;
  value: any;
}

export interface FormDropdownProps {
  label: string;
  value: any;
  defaultValue?: any;
  required?: boolean;
  options: DropdownOption[];
  onChange: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

const FormDropdown = (props: FormDropdownProps) => (
  <Fragment>
    <Grid
      item
      lg={3}
      md={4}
      sm={4}
      xs={12}
      className={cx("form-control-wrapper")}
    >
      <label className={cx("form-input-label")} htmlFor={props.label}>
        {props.label}
        {props.required && <span style={{ color: "red" }}>*</span>}
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
      <Select
        disabled={props.disabled}
        MenuProps={{
          style: { zIndex: 999999999 },
        }}
        className={cx("form-input")}
        id={props.label}
        sx={{ fontSize: "1.2rem", boxShadow: "none" }}
        value={props.value}
        defaultValue={props.defaultValue}
        displayEmpty
        onChange={props.onChange}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ fontSize: "1.2rem" }}
            value={option.value}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  </Fragment>
);

export default FormDropdown;
