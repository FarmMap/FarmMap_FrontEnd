// External
import LogoutIcon from "@mui/icons-material/Logout";

// Internal
import images from "../../../assets/images";
import DefaultAvatar from "../defaultAvatar";

// Styles
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);

interface FooterSideBarProps {
  openSidebar: boolean;
  handleLogOut: () => void;
}

const FooterSideBar: React.FC<FooterSideBarProps> = (props) => {
  const { openSidebar, handleLogOut } = props;
  return (
    <div className={cx("profile_content")}>
      <div className={cx("profile")}>
        {openSidebar && (
          <div className={cx("profile_details")}>
            <DefaultAvatar avatar={images.avatar} medium />
            <div className={cx("name_job")}>
              <div className={cx("name")}>Thiên Ân</div>
              <div className={cx("job")}>Quản trị</div>
            </div>
          </div>
        )}
        <button className={cx("log-out-btn")} onClick={handleLogOut}>
          <LogoutIcon
            className={
              openSidebar
                ? cx("log-out-icon")
                : cx("log-out-icon", "log-out-icon-hide")
            }
          />
        </button>
      </div>
    </div>
  );
};

export default FooterSideBar;
