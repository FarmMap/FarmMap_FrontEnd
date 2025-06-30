// External files
import { useState } from "react";
import Grid from "@mui/material/Grid";
// Internal files
import Sidebar from "../sidebar";
import HeaderApp from "../headerApp";
// Styles
import classNames from "classnames/bind";
import styles from "./DefaultAdminLayOut.module.scss";
const cx = classNames.bind(styles);

interface DefaultAdminLayOutProps {
  children: React.ReactElement;
}

const DefaultAdminLayOut: React.FC<DefaultAdminLayOutProps> = ({
  children,
}) => {
  // Open sidebar
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <Grid className={cx("wrapper")}>
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
          <div className={cx("content-body")}>{children}</div>
        </Grid>
      </div>
    </Grid>
  );
};

export default DefaultAdminLayOut;
