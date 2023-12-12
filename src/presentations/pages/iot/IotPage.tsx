//ex
import React, { useEffect, useState } from "react";
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

const getRandomFloat = (min: number, max: number) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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

  const getDayOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay() + 1; // Tăng thêm 1 để bắt đầu từ 1
    return dayOfWeek;
  };

  // Sử dụng hàm để lấy thứ hôm nay
  const today = getDayOfWeek();
  console.log(today); // In ra số thứ hiện tại (1 - 7)

  const boxTemps = [
    {
      title: `${today + 1 !== 8 ? "Thứ" : ""} ${
        today + 1 == 8 ? "Chủ nhật" : today + 1
      } - ${new Date().getDate() + 0 + 1}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      url: <CloudIcon />,
      temp: "22.06",
      status: "Mây rải rác",
    },
    {
      title: `${today + 2 !== 8 ? "Thứ" : ""} ${
        today + 2 == 8 ? "Chủ nhật" : today + 2
      } - ${new Date().getDate() + 1 + 1}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      url: images.cloudRain,
      temp: "22.68",
      status: "Mưa nhẹ",
    },
    {
      title: `${today + 3 !== 8 ? "Thứ" : ""} ${
        today + 3 == 8 ? "Chủ nhật" : today + 3
      } - ${new Date().getDate() + 2 + 1}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      url: images.cloudSun,
      temp: "22.61",
      status: "Mây thưa",
    },
    {
      title: `${today + 4 !== 8 ? "Thứ" : ""} ${
        today + 4 == 8 ? "Chủ nhật" : today + 4
      } - ${new Date().getDate() + 3 + 1}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      url: <CircleIcon />,
      temp: "22.24",
      status: "Bầu trời quang đãng",
    },
  ];

  const generateRandomDataIOT = () => {
    return {
      thoiGian: new Date().toLocaleString(),
      nhietDoKhongKhi: getRandomFloat(20, 30),
      doAmKhongKhi: getRandomInt(50, 90),
      doSang: getRandomInt(1000, 3000),
      cO2: getRandomInt(300, 500),
      nH3: getRandomInt(10, 50),
      doAmDat: getRandomInt(30, 60),
      ec: getRandomFloat(1, 3),
      nhietDoDat: getRandomFloat(20, 30),
      danDienDat: getRandomInt(30, 50),
      pHdat: getRandomFloat(5, 7),
      danDienNuoc: getRandomInt(100, 200),
      pHnuoc: getRandomFloat(6, 8),
      nhietDoNuoc: getRandomFloat(20, 30),
      doMan: getRandomFloat(5, 15),
    };
  };

  const updatedDataIOT = Array.from({ length: 5 }, (_, i) =>
    generateRandomDataIOT()
  );
  // Function to generate random temperature and humidity
  const generateRandomData = () => {
    return {
      temp: `${getRandomFloat(20, 30)}`, // Change the range as needed
      humidity: `${getRandomInt(50, 90)}%`, // Change the range as needed
    };
  };

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
                  {i === 0 ? (
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
              {updatedDataIOT.map((data, i) => (
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
