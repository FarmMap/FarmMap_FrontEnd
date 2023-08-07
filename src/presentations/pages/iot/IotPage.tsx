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
      </Grid>
    </DefaultWebLayOut>
  );
};

export default IotPage;
