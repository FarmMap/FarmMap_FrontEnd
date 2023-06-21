// External files
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// Internal files

// Styles
// import LoginCredentials from "../../../../data/types/LoginCredentials";
// import CarRentalApi from "../../../../data/api/CarRentalApi";
import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";
// import { Left, Right } from "../../../../core/Result";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

const LoginForm = () => {
  let [isDisable, setDisable] = useState(false);
  let [errorMessage, setErrorMessage] = useState(null);

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

    onSubmit: async () => {
      //   setDisable(true);
      //   let api = new CarRentalApi();
      //   let signInResult = await api.signInWithUsernameAndPassword(credentials);
      //   // Handle login failed
      //   if (signInResult instanceof Left) {
      //     let errorMessage = signInResult.value;
      //     toast.error(errorMessage);
      //   }
      //   // Handle login succeed
      //   if (signInResult instanceof Right) {
      //     let token = signInResult.value;
      //     localStorage.setItem("token", token);
      //     window.location.href = "/";
      //   }
      //   setDisable(false);
    },
  });

  return (
    <form className={cx("form-wrapper")} onSubmit={formik.handleSubmit}>
      <label htmlFor="username">TÊN NGƯỜI DÙNG</label>
      <input
        type="text"
        id="username"
        placeholder="Nhập tên người dùng..."
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      {formik.errors.username && (
        <p className={cx("errors")}>{formik.errors.username}</p>
      )}

      <label htmlFor="password">MẬT KHẨU</label>
      <input
        type="password"
        id="password"
        placeholder="Nhập mật khẩu..."
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.errors.password && (
        <p className={cx("errors")}>{formik.errors.password}</p>
      )}

      <button type="submit" className={cx("btn", "login")} disabled={isDisable}>
        ĐĂNG NHẬP
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
