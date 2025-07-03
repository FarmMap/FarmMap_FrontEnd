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
import { NavLink } from "react-router-dom";

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
            CHÀO MỪNG QUÝ KHÁCH ĐẾN VỚI XÂY DỰNG AN PHÚC KHANG VỚI UY TÍN VÀ
            CHẤT LƯỢNG ĐẶT LÊN HÀNG ĐẦU .
          </p>
          <NavLink
            to="mailto:anphuckhangcompany@gmail.com"
            className={cx("email-link")}
          >
            <FontAwesomeIcon icon={faEnvelope} className={cx("icon")} />
            <span>Email: anphuckhangcompany@gmail.com</span>
          </NavLink>
        </div>
      </div>
      {/* Thêm class 'menu-open' khi state là true */}
      <nav className={cx("main-nav", { "menu-open": isMenuOpen })}>
        <div className={cx("container")}>
          <NavLink to="#" className={cx("logo")}>
            <img src={images.logoCty} alt="Logo Xây dựng An Phát" />
          </NavLink>

          {/* Thêm nút hamburger, chỉ hiển thị trên mobile */}
          <div className={cx("menu-toggle")} onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>

          <ul className={cx("nav-links")}>
            <li>
              <NavLink to="/">
                <FontAwesomeIcon icon={faHomeLg} className={cx("home-icon")} />
              </NavLink>
            </li>
            <li>
              <NavLink to="#">GIỚI THIỆU</NavLink>
            </li>
            <li className={cx("dropdown")}>
              <NavLink to="#">
                XÂY DỰNG{" "}
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={cx("caret-icon")}
                />
              </NavLink>
              <ul className={cx("dropdown-content")}>
                <li>
                  <NavLink to="#">Mục 1</NavLink>
                </li>
                <li>
                  <NavLink to="#">Mục 2</NavLink>
                </li>
                <li>
                  <NavLink to="#">Mục 3</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="#">THIẾT KẾ NỘI THẤT</NavLink>
            </li>
            <li>
              <NavLink to="#">VẬT LIỆU XÂY DỰNG</NavLink>
            </li>
            <li>
              <NavLink to="/tin-tuc">TIN TỨC</NavLink>
            </li>
            <li>
              <NavLink to="#">LIÊN HỆ</NavLink>
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
