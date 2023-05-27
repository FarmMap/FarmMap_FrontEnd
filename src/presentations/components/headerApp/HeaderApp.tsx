// External files
import { useState } from "react";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

// Internal files
import HeaderRight from "./headerRight";
import images from "../../../assets/images";
// Styles
import classNames from "classnames/bind";
import styles from "./HeaderApp.module.scss";
const cx = classNames.bind(styles);

interface HeaderAppProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const HeaderApp = (props: HeaderAppProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Grid>
      <Grid
        sx={{
          display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
        }}
        className={
          !props.openSidebar ? cx("wrapper") : cx("wrapper", "active-wrapper")
        }
      >
        {/* <HeaderLeft /> */}

        <HeaderRight />
      </Grid>
      {/* Header on Mobile and Ipad */}
      <Grid
        sx={{
          display: { lg: "none", md: "none", sm: "flex", xs: "flex" },
        }}
      >
        <Grid
          className={cx("wrapper")}
          sx={{
            display: { lg: "none", md: "none", sm: "flex", xs: "flex" },
          }}
        >
          <Link to="/">
            <img
              src={images.logoAgri}
              alt="logo Mai Group"
              className={cx("logo-mobile")}
            />
          </Link>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              minWidth: "80px",
              alignItems: "center",
            }}
          >
            <button
              className={cx("btn-menu-mobile")}
              onClick={() => props.setOpenSidebar(!props.openSidebar)}
            >
              <MenuIcon className={cx("icon-menu-mobile")} />
            </button>
          </div>
        </Grid>

        <Grid
          style={{
            transition: "all ease-in 0.3s",
            transform: "translateY(65px)",
            width: "100%",
            boxShadow: " 0px 0px 40px 0px rgb(82 63 105 / 10%)",
          }}
        >
          {/* <HeaderLeft /> */}
          <HeaderRight />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderApp;
