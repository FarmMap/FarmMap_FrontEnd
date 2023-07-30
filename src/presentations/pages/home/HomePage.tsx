import React, { Fragment } from "react";
// Ex
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import { Grid } from "@mui/material";

// In
import images from "../../../assets/images";
import RechartsPage from "../../components/chart/RechartPage";
import ChartPage from "../../components/chart/ChartPage";
// Style
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

const HomePage = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const headerData = [
    {
      title: "Doanh thu",
      quality: "$50",
      percent: 22,
      srcVector: images.vector1,
      isIncrease: true,
      color: "var(--orange-color)",
    },
    {
      title: "Khoản chi khác",
      percent: 5.7,
      srcVector: images.vector2,
      quality: "20$",
      isIncrease: true,
      color: "var(--second-color)",
    },
    {
      title: "Người truy cập",
      percent: 18,
      srcVector: images.vector3,
      quality: "160",
      isIncrease: false,
      color: "#25a150",
    },
    {
      title: "Lợi nhuận",
      percent: 12,
      srcVector: images.vector4,
      quality: "28%",
      isIncrease: true,
      color: "var(--orange-color)",
    },
  ];
  return (
    <DefaultWebLayOut>
      <Grid>
        <Grid>
          <h4>Dashboard</h4>
        </Grid>
        <Grid
          mt={"12px"}
          columns={12}
          container
          justifyContent={"space-between"}
        >
          {headerData.map((data, i) => (
            <Grid
              className={cx("box-wrapper")}
              key={i}
              item
              lg={2.8}
              md={5.7}
              sm={5.7}
              xs={12}
              sx={{
                marginTop: { lg: "0", md: "10px", sm: "10px", xs: "10px" },
              }}
            >
              <Grid display={"flex"} justifyContent={"space-between"}>
                <span className={cx("title")}>{data.title}</span>
                <span
                  className={cx("percent")}
                  style={{ color: `${data.color}`, fontWeight: 600 }}
                >
                  {data.isIncrease ? "+" : ""} {data.percent}%
                </span>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"space-between"}
                mt={"5px"}
              >
                <span className={cx("quality")}>{data.quality}</span>
                <img
                  className={cx("vector")}
                  alt="vector"
                  src={data.srcVector}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid mt={"20px"}>
          <ChartPage />
        </Grid>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default HomePage;
