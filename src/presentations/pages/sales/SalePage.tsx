import React from "react";
import DefaultWebLayOut from "../../components/defaultWebLayOut";
import { Grid } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import images from "../../../assets/images";
import SalesChart from "./components/SalesChart";

//Style
import classNames from "classnames/bind";
import styles from "./Sale.module.scss";

const cx = classNames.bind(styles);

const SalePage = () => {
  const headerData = [
    {
      title: "Tổng doanh thu",
      quality: "$46,34k",
      percent: 22,
      srcVector: images.vector1,
      isIncrease: true,
      color: "var(--orange-color)",
    },
    {
      title: "Tổng số tiền hoàn lại",
      quality: "$895,02",
      percent: 5.7,
      srcVector: images.vector2,
      isIncrease: true,
      color: "var(--second-color)",
    },
    {
      title: "Người truy cập",
      percent: 18,
      srcVector: images.vector3,
      quality: "6,985",
      isIncrease: false,
      color: "#25a150",
    },
    {
      title: "Đơn đặt hàng",
      percent: 12,
      srcVector: images.vector4,
      quality: "12,584",
      isIncrease: true,
      color: "var(--orange-color)",
    },
  ];

  return (
    <DefaultWebLayOut>
      <Grid className={cx("wrapper")}>
        <Grid className={cx("header")}>
          <h5>Phân tích bán hàng</h5>
          <span className={cx("sup-heading")}>
            Dashonic <ChevronRightIcon /> Phân tích bán hàng
          </span>
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

        <Grid>
          <SalesChart />
        </Grid>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default SalePage;
