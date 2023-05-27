// External files
import React from "react";
import { Button, Grid } from "@mui/material";
// Internal files
// Styles
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
const cx = classNames.bind(styles);

const NotFound = () => {
  const handleBackToHome = () => {
    window.location.href = "/";
  };
  return (
    <Grid className={cx("wrapper")}>
      <Grid className={cx("container")}></Grid>
      <p className={cx("title")}>Page Not Found</p>
      <Button
        onClick={handleBackToHome}
        className={cx("back-btn")}
        variant="contained"
      >
        Back to Home
      </Button>
    </Grid>
  );
};

export default NotFound;
