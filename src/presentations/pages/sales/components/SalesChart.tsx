import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EastIcon from "@mui/icons-material/East";
import { PieChart } from "@mui/x-charts/PieChart";
import { Alert, Button, Grid } from "@mui/material";
import images from "../../../../assets/images";
//Style
import classNames from "classnames/bind";
import styles from "./SalesChart.module.scss";
import VerticalChart from "../../../components/chart/VerticalChart";

const cx = classNames.bind(styles);

const SalesChart = () => {
  const pieParams = { height: 200, margin: { right: 5 } };

  return (
    <Grid className={cx("wrapper")} mt={"20px"}>
      <Grid
        className={cx("container")}
        container
        justifyContent={"space-between"}
      >
        <Grid item lg={4} className={cx("dashboard-item")}>
          <Grid className={cx("upgrade-wrapper")}>
            <Grid className={cx("upgrade-heading")}>
              <Alert severity="warning" className={cx("alert")}>
                <Grid className={cx("alert-wrapper")}>
                  <span> Bản dùng thử miễn phí của bạn đã hết hạn sau</span>
                  <p>Nâng cấp</p>
                </Grid>
              </Alert>
            </Grid>
            <Grid className={cx("upgrade-body")} mt={"16px"}>
              <Grid className={cx("upgrade-content-wrapper")}>
                <p>
                  Nâng cấp gói của bạn từ <span>bản dùng thử miễn phí</span> lên
                  'Gói cao cấp'
                </p>
              </Grid>
              <Grid className={cx("upgrade-img-wrapper")}>
                <img src={images.coGaiVoTri} alt="ITFSD-coTraiVoTri" />
              </Grid>
            </Grid>
            <Grid mt={"12px"} className={cx("upgrade-footer")}>
              <Button variant="contained" size="large">
                Nâng cấp tài khoản
              </Button>
            </Grid>
          </Grid>

          <Grid className={cx("upgrade-wrapper")} mt={"20px"}>
            <Grid className={cx("report-header")}>
              <p className={cx("report-heading")}>Báo cáo thu nhập</p>
              <Grid className={cx("report-heading-reportBy")}>
                <p>
                  Báo cáo theo: <span>Hàng tháng</span>
                </p>
              </Grid>
            </Grid>

            <Grid
              container
              className={cx("report-chart-wrapper")}
              mt={"24px"}
              justifyContent={"space-between"}
            >
              <Grid className={cx("number-wrapper")} item lg={6.4}>
                <Grid className={cx("month-wrapper")}>
                  <Grid className={cx("month-content")}>
                    <h5>Tháng này</h5>
                    <p>$12,582</p>
                    <span className={cx("month-content-percent")}>+15%</span>
                  </Grid>
                  <Grid className={cx("month-content")}>
                    <h5>Tháng trước</h5>
                    <p>$98,71</p>
                  </Grid>
                </Grid>

                <Grid mt={"16px"} className={cx("percentLast-wrapper")}>
                  <p>
                    <span>
                      25.2% <ArrowUpwardIcon />
                    </span>
                    Từ kỳ trước
                  </p>
                </Grid>

                <Grid className={cx("report-footer-wrapper")} mt={"24px"}>
                  <Button variant="contained" endIcon={<EastIcon />}>
                    Tạo báo cáo
                  </Button>
                </Grid>
              </Grid>

              <Grid item lg={5.4}>
                <Grid width={"100%"} display={"flex"}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { value: 10, color: "#5fd0f3" },
                          { value: 15, color: "#dfe2e6" },
                          { value: 20, color: "#038edc" },
                        ],
                      },
                    ]}
                    {...pieParams}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={7.8} className={cx("dashboard-wrapper")}>
          <Grid>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Phân tích bán hàng
            </h4>
          </Grid>
          <Grid container padding={"20px 0"}>
            <Grid item lg={4} className={cx("dashboard-right-item")}>
              <p>
                <span>$3,85K</span> Thu nhập
              </p>
            </Grid>
            <Grid item lg={4} className={cx("dashboard-right-item")}>
              <p>
                <span>258</span> Việc bán hàng
              </p>
            </Grid>
            <Grid item lg={4} className={cx("dashboard-right-item")}>
              <p>
                <span>52K</span> Người dùng
              </p>
            </Grid>
          </Grid>
          <Grid>
            {" "}
            <VerticalChart />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SalesChart;
