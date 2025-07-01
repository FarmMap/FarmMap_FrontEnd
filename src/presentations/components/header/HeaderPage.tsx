import React, { useState } from "react"; // Import useState
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faCaretDown,
  faSearch,
  faBars,
  faTimes,
  faHomeLg,
} from "@fortawesome/free-solid-svg-icons"; // Thêm faBars và faTimes
import images from "../../../assets/images";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const cx = classNames.bind(styles);

function Header() {
  // State để theo dõi trạng thái đóng/mở của menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hàm để bật/tắt menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("top-bar")}>
        {/* ...Nội dung top-bar không đổi... */}
        <div className={cx("container")}>
          <p>
            CHÀO MỪNG QUÝ KHÁCH ĐẾN VỚI XÂY DỰNG DƯ AN PHÁT VỚI TIÊU CHÍ ĐẶT UY
            TÍN VÀ CHẤT LƯỢNG LÊN HÀNG ĐẦU .
          </p>
          <a href="mailto:tranduanxddd@gmail.com" className={cx("email-link")}>
            <FontAwesomeIcon icon={faEnvelope} className={cx("icon")} />
            <span>Email: tranduanxddd@gmail.com</span>
          </a>
        </div>
      </div>
      {/* Thêm class 'menu-open' khi state là true */}
      <nav className={cx("main-nav", { "menu-open": isMenuOpen })}>
        <div className={cx("container")}>
          <a href="#" className={cx("logo")}>
            <img src={images.logoCty} alt="Logo Xây dựng An Phát" />
          </a>

          {/* Thêm nút hamburger, chỉ hiển thị trên mobile */}
          <div className={cx("menu-toggle")} onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>

          <ul className={cx("nav-links")}>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faHomeLg} className={cx("home-icon")} />
              </a>
            </li>
            <li>
              <a href="#">GIỚI THIỆU</a>
            </li>
            <li className={cx("dropdown")}>
              <a href="#">
                XÂY DỰNG{" "}
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={cx("caret-icon")}
                />
              </a>
              <ul className={cx("dropdown-content")}>
                <li>
                  <a href="#">Mục 1</a>
                </li>
                <li>
                  <a href="#">Mục 2</a>
                </li>
                <li>
                  <a href="#">Mục 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">THIẾT KẾ NỘI THẤT</a>
            </li>
            <li>
              <a href="#">BẢNG GIÁ</a>
            </li>
            <li>
              <a href="#">TIN TỨC</a>
            </li>
            <li>
              <a href="#">LIÊN HỆ</a>
            </li>
          </ul>

          <div className={cx("search-icon")}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
