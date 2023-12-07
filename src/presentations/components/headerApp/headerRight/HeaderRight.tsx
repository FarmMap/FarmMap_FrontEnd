// External
import React, { useState } from "react";

import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

// Internal files
import DefaultDropDown from "../../defaultDropDown";
import AccountInfo from "./AccountInfo";
import images from "../../../../assets/images";
import DefaultAvatar from "../../defaultAvatar";
// import { UserContext } from "../../../../shared/Context";
// import { ROLES } from "../../../../constant/Constants";

// Styles
import classNames from "classnames/bind";
import styles from "./HeaderRight.module.scss";
const cx = classNames.bind(styles);

interface HeaderRightProps {
  //   onChangePasswordClick: () => void;
}

const HeaderRight: React.FC<HeaderRightProps> = (props: HeaderRightProps) => {
  const [showAccount, setShowAccount] = useState<boolean>(false);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-icon")}>
        <Tippy content={`Tìm kiếm`} theme="light">
          <div className={cx("icon-item")}>
            <span className={cx("span-icon")}>
              <Link to="/notify/Notimonth-contract" className={cx("link-icon")}>
                <SearchOutlinedIcon />
              </Link>
            </span>
          </div>
        </Tippy>

        <Tippy content={`Cài đặt`} theme="light">
          <div className={cx("icon-item")}>
            <span className={cx("span-icon")}>
              <Link to="/notify/Notiwarranty " className={cx("link-icon")}>
                <GridViewOutlinedIcon />
              </Link>
            </span>
          </div>
        </Tippy>

        <Tippy content={`Thông báo`} theme="light">
          <div className={cx("icon-item")}>
            <span className={cx("span-icon")}>
              <Link to="/notify/Noticontract" className={cx("link-icon")}>
                <NotificationsOutlinedIcon />
              </Link>
            </span>
          </div>
        </Tippy>

        <Tippy content={`WebApps`} theme="light">
          <div className={cx("icon-item")}>
            <span className={cx("span-icon")}>
              <Link to="/notify/Notimonth-contract" className={cx("link-icon")}>
                <SettingsOutlinedIcon />
              </Link>
            </span>
          </div>
        </Tippy>
      </div>
      <DefaultDropDown
        childrenRender={
          <AccountInfo
          // user={user}
          // onChangePasswordClick={() => props.onChangePasswordClick()}
          />
        }
        visible={showAccount}
      >
        <Tippy content={`thienan1804`} placement="bottom" theme="light">
          <div
            className={cx("accout-wrapper")}
            onClick={() => setShowAccount(!showAccount)}
          >
            <div className={cx("username-wrapper")}>
              <span className={cx("username")}>Nguyễn Thiên Ân</span>
              <p className={cx("role")}>Quản trị</p>
            </div>
            <DefaultAvatar avatar={images.avatar} small />
          </div>
        </Tippy>
      </DefaultDropDown>
    </div>
  );
};

export default HeaderRight;
