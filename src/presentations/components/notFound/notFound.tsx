// External files
import React from "react";
import { Button, Grid } from "@mui/material";
// Internal files
// Styles
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import DefaultWebLayOut from "../defaultWebLayOut/DefaultWebLayOut";
const cx = classNames.bind(styles);

const NotFound = () => {
  return (
    <DefaultWebLayOut>
      <Grid className={cx("wrapper")}>
        <Grid className={cx("container")}></Grid>
        <p className={cx("title")}>Page Not Found</p>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default NotFound;
