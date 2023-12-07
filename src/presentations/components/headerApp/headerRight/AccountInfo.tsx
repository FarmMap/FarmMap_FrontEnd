// External
import LogoutIcon from "@mui/icons-material/Logout";
import Tippy from "@tippyjs/react";
import "tippy.js/themes/light.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
// Internal
import DefaultAvatar from "../../defaultAvatar";
import images from "../../../../assets/images";

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
            <DefaultAvatar avatar={images.avatar} medium />
          </div>
        </Tippy>
        <div className={cx("user-cart-name")}>
          <Tippy content={`thienan1804`} placement="right" theme="light">
            <span className={cx("accountinfo-username")}>Nguyễn Thiên Ân</span>
          </Tippy>
          <span className={cx("accountinfo-role")}>Quản trị</span>
        </div>
      </div>
      <div
        className={cx("change-pass")}
        onClick={() => {
          window.location.href = "/trang-ca-nhan";
        }}
      >
        <div className={cx("change-pass-icon")}>
          <PersonRoundedIcon />
        </div>
        <div className={cx("change-pass-title")}>
          <p>Trang cá nhân</p>
        </div>
      </div>
      <div className={cx("change-pass")}>
        <div className={cx("change-pass-icon")}>
          <NightsStayRoundedIcon />
        </div>
        <div className={cx("change-pass-title")}>
          <p>Màn hình và trợ năng</p>
        </div>
      </div>
      <div
        className={cx("change-pass")}
        onClick={() => {
          window.location.href = "/tu-van";
        }}
      >
        <div className={cx("change-pass-icon")}>
          <RecordVoiceOverIcon />
        </div>
        <div className={cx("change-pass-title")}>
          <p>Trợ giúp và tư vấn</p>
        </div>
      </div>
      <div className={cx("change-pass")} onClick={handleLogOut}>
        <div className={cx("change-pass-icon")}>
          <LogoutIcon />
        </div>
        <div className={cx("change-pass-title")}>
          <p>Đăng xuất</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
