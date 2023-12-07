// External files
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
// Internal files
import Sidebar from "../sidebar";
import HeaderApp from "../headerApp";
// Styles
import classNames from "classnames/bind";
import styles from "./DefaultWebLayOut.module.scss";
import images from "../../../assets/images";
const cx = classNames.bind(styles);

interface DefaultWebLayOutProps {
  children: React.ReactElement;
}

const DefaultWebLayOut: React.FC<DefaultWebLayOutProps> = ({ children }) => {
  // Open sidebar
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [checkCooperator, setCheckCooperator] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/tu-van"
    ) {
      setCheckCooperator(true);
    } else {
      setCheckCooperator(false);
    }
  }, [checkCooperator]);

  return (
    <Grid>
      <Grid
        className={cx("wrapper")}
        sx={{
          display: {
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
          },
        }}
      >
        {/* Sidebar */}
        <Sidebar
          className={
            !openSidebar ? cx("sidebar") : cx("sidebar", "active-sidebar")
          }
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <div
          className={
            !openSidebar
              ? cx("content-wrapper")
              : cx("content-wrapper", "active-content-wrapper")
          }
        >
          {/* Modal show Sidebar */}

          {openSidebar && (
            <Grid
              className={cx("modal")}
              sx={{
                display: {
                  lg: "none",
                  md: "none",
                  sm: "block",
                  xs: "block",
                },
              }}
              onClick={() => setOpenSidebar(!openSidebar)}
            ></Grid>
          )}

          {/* Header */}
          <Grid
            sx={{
              display: { lg: "block", md: "block", sm: "block", xs: "block" },
            }}
          >
            <HeaderApp
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
          </Grid>

          {/* Content */}
          <Grid className={cx("content-body-wrapper")}>
            <div
              className={
                !checkCooperator ? cx("content-body") : cx("content-body-gray")
              }
            >
              {children}
            </div>
          </Grid>
        </div>
      </Grid>

      <Grid
        sx={{
          display: {
            lg: "none",
            md: "none",
            sm: "flex",
            xs: "flex",
          },
        }}
        className={cx("phone-wrapper")}
      >
        <img
          className={cx("phone-on-mobile")}
          src={images.phone}
          alt="ITFS phone"
        />

        <p className={cx("text-phone")}>
          Hệ thống đang phát triển, vui lòng quay ngang thiết bị hoặc sử dụng
          máy tính/laptop để có trải nghiệm tốt nhất
        </p>
      </Grid>
    </Grid>
  );
};

export default DefaultWebLayOut;
