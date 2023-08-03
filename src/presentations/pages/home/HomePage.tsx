import React, { Fragment } from "react";
// Ex
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import { Box, Grid } from "@mui/material";

// In
import images from "../../../assets/images";
import RechartsPage from "../../components/chart/RechartPage";
import ChartPage from "../../components/chart/ChartPage";
import PieChart from "../../components/chart/Pie";
import RadialBar from "../../components/chart/RadialBar";
import DataGridComponent from "../../components/chart/DataGrid";
import VerticalChart from "../../components/chart/VerticalChart";
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
      quality: "10.000.000",
      percent: 22,
      srcVector: images.vector1,
      isIncrease: true,
      color: "var(--orange-color)",
    },
    {
      title: "Khoản chi khác",
      percent: 5.7,
      srcVector: images.vector2,
      quality: "5.000.000",
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

        <Grid
          mt={"20px"}
          columns={12}
          container
          justifyContent={"space-between"}
        >
          <Grid
            item
            lg={7}
            display={"flex"}
            height={"55vh"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            boxShadow={"0px 8px 32px rgba(51, 38, 174, 0.08)"}
            padding={"10px 12px 12px 12px"}
          >
            {" "}
            <span style={{ fontWeight: 600, marginBottom: "20px" }}>
              Bảng điều khiển
            </span>
            <VerticalChart />
          </Grid>
          <Grid
            lg={4.8}
            item
            height={"55vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            boxShadow={"0px 8px 32px rgba(51, 38, 174, 0.08)"}
            padding={"10px 12px 32px 12px"}
          >
            <span style={{ fontWeight: 600, marginBottom: "10px" }}>
              Thống kê
            </span>
            <PieChart />
          </Grid>
        </Grid>
        <Grid
          height="100%"
          boxShadow={"0px 8px 32px rgba(51, 38, 174, 0.08)"}
          padding={"20px 10px"}
          mt={"12px"}
        >
          <span style={{ fontWeight: 600, margin: "0 0 10px 25px" }}>
            Người dùng
          </span>
          <DataGridComponent />
        </Grid>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default HomePage;
