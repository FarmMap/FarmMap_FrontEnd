// External
import LockIcon from "@mui/icons-material/Lock";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";
// Internal
import DefaultAvatar from "../../defaultAvatar";
import images from "../../../../assets/images";
// import { ROLES } from "../../../../constant/Constants";
// import UserAccount from "../../../../data/types/UserAccount";
// Styles
import classNames from "classnames/bind";
import styles from "./HeaderRight.module.scss";
const cx = classNames.bind(styles);

type AccountInfoProps = {};

const AccountInfo = (props: AccountInfoProps) => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className={cx("account-dropdown-wrapper")}>
      <div className={cx("header-account")}>
        <Tippy content={`thienan1804`} placement="bottom" theme="light">
          <div className={cx("user-cart-avt")}>
            <DefaultAvatar avatar={images.avatar} large />
          </div>
        </Tippy>
        <div className={cx("user-cart-name")}>
          <Tippy content={`thienan1804`} placement="right" theme="light">
            <span className={cx("accountinfo-username")}>Nguyễn Thiên Ân</span>
          </Tippy>
          <span className={cx("accountinfo-role")}>Quản trị</span>
        </div>
      </div>
      <div className={cx("change-pass")}>
        <div className={cx("change-pass-icon")}>
          <LockIcon />
        </div>
        <div className={cx("change-pass-title")}>
          <p>Đổi mật khẩu</p>
        </div>
        <span className={cx("change-nav-pass-icon")}>
          <KeyboardArrowRightIcon />
        </span>
      </div>
      <div className={cx("log-out-wrapper")}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogOut}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default AccountInfo;
