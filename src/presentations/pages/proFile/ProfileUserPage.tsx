import React from "react";
import { Grid, Button } from "@mui/material";
// Styles
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

const ProfileUserPage = () => {
  return (
    <Grid className={cx("profileUser-wrap")}>
      <p>Thông tin cá nhân</p>

      <Grid className={cx("userForm-wrapper")}>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="fullName">Họ và tên</label>
          <input
            type="text"
            id="fullName"
            value={"Nguyễn Thiên Ân"}
            className={cx("userForm-input")}
            placeholder="Nhập họ và tên"
          />
        </Grid>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="job">Nghề nghiệp</label>
          <input
            type="text"
            id="job"
            value={"Sinh viên"}
            className={cx("userForm-input")}
            placeholder="Nhập họ và tên"
          />
        </Grid>
      </Grid>

      <Grid className={cx("userForm-wrapper")}>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="description">Mô tả</label>
          <input
            type="text"
            id="description"
            value={"Sinh viên năm 2"}
            className={cx("userForm-input")}
            placeholder="Nhập họ và tên"
          />
        </Grid>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={"thienan041803@gmail.com"}
            className={cx("userForm-input")}
            placeholder="Nhập họ và tên"
          />
        </Grid>
      </Grid>

      <Grid className={cx("userForm-wrapper")}>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            value={"0336844690"}
            className={cx("userForm-input")}
            placeholder="Nhập họ và tên"
          />
        </Grid>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="email">Vai trò</label>
          <input
            type="text"
            id="email"
            value={"Admin"}
            className={cx("userForm-input")}
            placeholder="Nhập họ và tên"
          />
        </Grid>
      </Grid>

      <Grid className={cx("userForm-wrapper")}>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="hometown">Quê quán</label>
          <input
            type="text"
            id="hometown"
            value={"Nam Định"}
            className={cx("userForm-input")}
            placeholder="Nhập quê quán"
          />
        </Grid>
        <Grid className={cx("userForm-input-wrapper")}>
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            value={"105/31 khu phố 6 phường Tân Mai"}
            className={cx("userForm-input")}
            placeholder="Nhập địa chỉ"
          />
        </Grid>
      </Grid>

      <Grid className={cx("button-wrapper")}>
        <Button disabled variant="outlined">
          Hủy
        </Button>
        <Button variant="contained">Cập nhật</Button>
      </Grid>
    </Grid>
  );
};

export default ProfileUserPage;
