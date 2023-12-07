import React from "react";

// Ex
import { Grid, Button } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
// In
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import DefaultAvatar from "../../components/defaultAvatar";
import images from "../../../assets/images";
import ProfileUserPage from "./ProfileUserPage";
// Styles
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

const ProfilePage = () => {
  return (
    <DefaultWebLayOut>
      <Grid className={cx("wrapper")}>
        <Grid className={cx("header")}>
          <p>Trang cá nhân</p>
          <HelpIcon />
          <span className={cx("header-createAt")}>
            Tài khoản được tạo vào ngày 03/11/2023
          </span>
        </Grid>

        <Grid className={cx("avt-wrapper")}>
          <p>Ảnh đại diện </p>
          <Grid className={cx("img-wrapper")}>
            <DefaultAvatar medium avatar={images.avatar} large />
            <Button className={cx("update-btn")} variant="contained">
              Cập nhật
            </Button>
            <Button disabled className={cx("remove-btn")} variant="outlined">
              Xóa ảnh
            </Button>
          </Grid>
        </Grid>

        <Grid mt={"12px"}>
          <ProfileUserPage />
        </Grid>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default ProfilePage;
