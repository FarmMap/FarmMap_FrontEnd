//ex
import React from "react";
import DefaultWebLayOut from "../../components/defaultWebLayOut/DefaultWebLayOut";
import { Grid } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CircleIcon from "@mui/icons-material/Circle";
import CloudIcon from "@mui/icons-material/Cloud";
// in
// Style imports
import classNames from "classnames/bind";
import styles from "./IotPage.module.scss";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

const IotPage = () => {
  const dataTemp = [
    {
      title: "Nhiệt độ",
      temp: "22.82",
    },
    {
      title: "Độ ẩm",
      temp: "77%",
    },
    {
      title: "Tốc dộ gió",
      temp: "3.1 km/h",
    },
  ];

  const boxTemps = [
    {
      title: "Thứ sáu - 4/8/2023",
      url: <CloudIcon />,
      temp: "22.06",
      status: "mây rải rác",
    },
    {
      title: "Thứ bảy - 5/8/2023",
      url: images.cloudRain,
      temp: "22.68",
      status: "mưa nhẹ",
    },
    {
      title: "Chủ nhật - 5/8/2023",
      url: images.cloudSun,
      temp: "22.61",
      status: "mây thưa",
    },
    {
      title: "Thứ hai - 6/8/2023",
      url: <CircleIcon />,
      temp: "22.24",
      status: "bầu trời quang đãng",
    },
  ];

  const dataIOT = [
    {
      thoiGian: "2023-11-14 15:20:00",
      nhietDoKhongKhi: "40.68",
      doAmKhongKhi: "45.76",
      doSang: "2498",
      cO2: "",
      nH3: "",
      doAmDat: "",
      ec: "",
      nhietDoDat: "",
      danDienDat: "",
      pHdat: "",
      danDienNuoc: "",
      pHnuoc: "",
      nhietDoNuoc: "",
      doMan: "",
    },
    {
      thoiGian: "2023-11-14 15:15:00",
      nhietDoKhongKhi: "40.15",
      doAmKhongKhi: "42.76",
      doSang: "",
      cO2: "",
      nH3: "",
      doAmDat: "",
      ec: "",
      nhietDoDat: "",
      danDienDat: "",
      pHdat: "",
      danDienNuoc: "",
      pHnuoc: "",
      nhietDoNuoc: "",
      doMan: "",
    },
    {
      thoiGian: "2023-11-14 15:5:00",
      nhietDoKhongKhi: "",
      doAmKhongKhi: "",
      doSang: "",
      cO2: "",
      nH3: "",
      doAmDat: "",
      ec: "",
      nhietDoDat: "",
      danDienDat: "",
      pHdat: "",
      danDienNuoc: "143",
      pHnuoc: "6.89",
      nhietDoNuoc: "23.26",
      doMan: "",
    },
    {
      thoiGian: "2023-11-14 15:00:00",
      nhietDoKhongKhi: "",
      doAmKhongKhi: "",
      doSang: "",
      cO2: "",
      nH3: "",
      doAmDat: "",
      ec: "",
      nhietDoDat: "",
      danDienDat: "",
      pHdat: "",
      danDienNuoc: "",
      pHnuoc: "",
      nhietDoNuoc: "",
      doMan: "",
    },
    {
      thoiGian: "2023-11-14 15:10:58",
      nhietDoKhongKhi: "40.68",
      doAmKhongKhi: "42.89",
      doSang: "",
      cO2: "",
      nH3: "",
      doAmDat: "",
      ec: "",
      nhietDoDat: "29",
      danDienDat: "43",
      pHdat: "",
      danDienNuoc: "",
      pHnuoc: "",
      nhietDoNuoc: "",
      doMan: "",
    },
  ];

  return (
    <DefaultWebLayOut>
      <Grid>
        <Grid className={cx("header")}>
          <WbSunnyIcon />
          <h4>Thời Tiết</h4>
        </Grid>

        <Grid className={cx("body")} columns={12} container>
          <Grid item className={cx("box")} lg={3.7}>
            <Grid className={cx("title")}>
              <p>Thời tiết - Hôm nay</p>
            </Grid>
            <Grid className={cx("content")}>
              <Grid className={cx("content-header")}>
                <p>
                  22.81 <sup>o</sup>C
                </p>
                <CircleIcon />
              </Grid>
              <Grid className={cx("content-footer")}>
                <p>bầu trời quang đãng</p>
              </Grid>
            </Grid>

            <Grid className={cx("box-footer")}>
              {dataTemp.map((data, i) => (
                <Grid key={i} className={cx("box-footer-row")}>
                  {i == 0 ? (
                    <>
                      <span>{data.title}: </span>
                      <span className={cx("strong")}>
                        {data.temp} <sup>o</sup>C
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{data.title}: </span>
                      <span className={cx("strong")}>{data.temp}</span>
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
          {boxTemps.map((boxTemp, i) => (
            <Grid item className={cx("box")} lg={2} key={i}>
              <Grid className={cx("title")} fontSize={"1.8rem"}>
                <p>{boxTemp.title}</p>
              </Grid>
              <Grid className={cx("body-box")}>
                {i == 0 || i == 3 ? (
                  <>
                    {boxTemp.url}{" "}
                    <span style={{ fontSize: "2.6rem" }}>
                      {boxTemp.temp} <br /> <sup>o</sup>C{" "}
                    </span>{" "}
                    <p className={cx("status")}>{boxTemp.status}</p>{" "}
                  </>
                ) : (
                  <>
                    <img src={boxTemp.url} alt="temp" />{" "}
                    <strong style={{ fontSize: "2.6rem" }}>
                      {boxTemp.temp} <br />
                      <sup>o</sup>C
                    </strong>{" "}
                    <p className={cx("status")}>{boxTemp.status}</p>{" "}
                  </>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid>
          <table className={cx("table")}>
            <thead>
              <tr>
                <th></th>
                <th style={{ borderRight: "none" }}></th>
                <th style={{ border: "none" }}></th>
                <th
                  style={{ border: "none", textAlign: "left", width: "92px" }}
                >
                  Không khí
                </th>
                <th style={{ border: "none" }}></th>
                <th></th>
                <th style={{ borderRight: "none" }}></th>
                <th style={{ border: "none" }}></th>
                <th style={{ border: "none", textAlign: "left" }}>Đất</th>
                <th style={{ border: "none" }}></th>
                <th></th>
                <th style={{ borderRight: "none" }}></th>
                <th style={{ border: "none" }}></th>
                <th style={{ border: "none", textAlign: "left" }}>Nước</th>
                <th></th>
              </tr>
              <tr>
                <th>Thời gian</th>
                <th style={{ width: "82px", borderTop: "1px solid #d5d7dc" }}>
                  Nhiệt độ
                </th>
                <th style={{ width: "82px", borderTop: "1px solid #d5d7dc" }}>
                  Độ ẩm
                </th>
                <th style={{ borderTop: "1px solid #d5d7dc" }}>Độ sáng</th>
                <th style={{ borderTop: "1px solid #d5d7dc" }}>CO2</th>
                <th style={{ borderTop: "1px solid #d5d7dc" }}>NH3</th>
                <th style={{ width: "82px", borderTop: "1px solid #d5d7dc" }}>
                  Độ ẩm
                </th>
                <th style={{ borderTop: "1px solid #d5d7dc" }}>EC (ppm)</th>
                <th style={{ width: "82px", borderTop: "1px solid #d5d7dc" }}>
                  Nhiệt độ
                </th>
                <th style={{ width: "85px", borderTop: "1px solid #d5d7dc" }}>
                  Dẫn điện
                </th>
                <th style={{ borderTop: "1px solid #d5d7dc" }}>pH</th>
                <th style={{ width: "85px", borderTop: "1px solid #d5d7dc" }}>
                  Dẫn điện
                </th>
                <th style={{ borderTop: "1px solid #d5d7dc" }}>pH</th>
                <th style={{ width: "82px", borderTop: "1px solid #d5d7dc" }}>
                  Nhiệt độ
                </th>
                <th style={{ width: "82px", borderTop: "1px solid #d5d7dc" }}>
                  Độ mặn
                </th>
              </tr>
            </thead>
            <tbody>
              {dataIOT.map((data, i) => (
                <tr key={i}>
                  <td>
                    <p>{data.thoiGian}</p>
                  </td>
                  <td>
                    <p>{data.nhietDoKhongKhi}</p>
                  </td>
                  <td>
                    <p>{data.doAmKhongKhi}</p>
                  </td>
                  <td>
                    <p>{data.doSang}</p>
                  </td>
                  <td>
                    <p>{data.cO2}</p>
                  </td>
                  <td>
                    <p>{data.nH3}</p>
                  </td>
                  <td>
                    <p>{data.doAmDat}</p>
                  </td>
                  <td>
                    <p>{data.ec}</p>
                  </td>
                  <td>
                    <p>{data.nhietDoDat}</p>
                  </td>
                  <td>
                    <p>{data.danDienDat}</p>
                  </td>
                  <td>
                    <p>{data.pHdat}</p>
                  </td>
                  <td>
                    <p>{data.danDienNuoc}</p>
                  </td>
                  <td>
                    <p>{data.pHnuoc}</p>
                  </td>
                  <td>
                    <p>{data.nhietDoNuoc}</p>
                  </td>
                  <td>
                    <p>{data.doMan}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </DefaultWebLayOut>
  );
};

export default IotPage;
