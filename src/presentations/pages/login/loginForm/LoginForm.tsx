// External files
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { CircularProgress, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Internal files
import UseLogin from "../../../../api/Login/useLogin";
import { Left, Right } from "../../../../api/Login/Result";
import UserAccount from "../../../../data/types/UserAccount";
// Styles

import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";
const cx = classNames.bind(styles);

const LoginForm = () => {
  let [isDisable, setDisable] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    // * Rule of formik.values
    validationSchema: Yup.object({
      username: Yup.string().required("Vui lòng nhập tên người dùng"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),

    onSubmit: async (credentials: UserAccount) => {
      setDisable(true);
      let api = new UseLogin();
      let signInResult = await api.signInWithUsernameAndPassword(credentials);
      // Handle login failed
      if (signInResult instanceof Left) {
        let errorMessage = signInResult.value;
        toast.error(errorMessage);
      }
      // Handle login succeed
      if (signInResult instanceof Right) {
        let token = signInResult.value;
        localStorage.setItem("token", token);
        window.location.href = "/";
      }
      setDisable(false);
    },
  });

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form className={cx("form-wrapper")} onSubmit={formik.handleSubmit}>
      <div className={cx("form-input-wrapper")}>
        <label htmlFor="username">Tài khoản</label>
        <input
          className={cx("input")}
          type="text"
          id="username"
          placeholder="Nhập tên người dùng..."
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <PersonIcon />
      </div>
      {formik.errors.username && (
        <p className={cx("errors")}>{formik.errors.username}</p>
      )}

      <div className={cx("form-input-wrapper")}>
        <label htmlFor="password">Mật khẩu</label>
        <input
          className={cx("input")}
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Nhập mật khẩu..."
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <LockIcon />
        {!showPassword ? (
          <VisibilityIcon
            className={cx(!formik.errors.password ? "" : "error")}
            onClick={togglePasswordVisibility}
            style={{
              right: "12px",
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          />
        ) : (
          <VisibilityOffIcon
            onClick={togglePasswordVisibility}
            className={cx(!formik.errors.password ? "" : "error")}
            style={{
              right: "12px",
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          />
        )}
      </div>
      {formik.errors.password && (
        <p className={cx("errors")}>{formik.errors.password}</p>
      )}

      <button type="submit" className={cx("btn", "login")} disabled={isDisable}>
        Đăng nhập
        {isDisable && (
          <CircularProgress
            size={14}
            style={{ color: "white", position: "absolute", right: 16 }}
          />
        )}
      </button>
    </form>
  );
};

export default LoginForm;
