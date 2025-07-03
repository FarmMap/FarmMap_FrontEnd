// External files
import { Fragment } from "react";
import { Link } from "react-router-dom";
// Internal files
import { RightIcon, LeftIcon } from "./SidebarData";
import images from "../../../assets/images";
// Styles
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);

interface HeaderSideBarProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const HeaderSideBar: React.FC<HeaderSideBarProps> = (props) => {
  const { openSidebar, setOpenSidebar } = props;
  return (
    //  Header Sidebar logic css
    <div
      className={!openSidebar ? cx("header") : cx("header", "header-active")}
    >
      <Fragment>
        {/* Sidebar Large => Show Logo */}
        {openSidebar && (
          <Link to="/">
            <img src={images.logoCty} alt="AgriLogo" className={cx("logo")} />
          </Link>
        )}

        <button
          className={cx("btn-header")}
          // Toggle sidebar
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          {/* Logic OpenSideBarIcon and CloseSideBarIcon */}
          {!openSidebar ? (
            <RightIcon className={cx("icon")} />
          ) : (
            <LeftIcon className={cx("icon")} />
          )}
        </button>
      </Fragment>
    </div>
  );
};

export default HeaderSideBar;
