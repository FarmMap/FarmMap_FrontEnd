import { Grid } from "@mui/material";
import { Fragment, FormEvent } from "react";

// Style imports
import classNames from "classnames/bind";
import styles from "./FormInput.module.scss";
const cx = classNames.bind(styles);

interface FormInputProps {
  label?: string;
  placeholder: string;
  type: string;
  value: string;
  readOnly?: boolean;
  disable?: boolean;
  required?: boolean;
  onChange?: (event: FormEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: FormEvent<HTMLInputElement>) => void;
}

const FormInput = (props: FormInputProps) => {
  return (
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
        <input
          className={cx("form-input")}
          id={props.label}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          min={0}
          onKeyUp={props.onKeyUp}
          readOnly={props.readOnly}
          onChange={props.onChange}
          disabled={props.disable}
        />
      </Grid>
    </Fragment>
  );
};

export type { FormInputProps };
export default FormInput;
