/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import classNames from "classnames/bind";
import styles from "./FooterPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faGlobe,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faGooglePlusG, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import images from "../../../assets/images";
import PhoneIcon from "@mui/icons-material/Phone";

const cx = classNames.bind(styles);

function FooterPage() {
  // Hàm xử lý cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className={cx("wrapper")}>
        <div className={cx("container")}>
          {/* Cột 1: Thông tin liên hệ */}
          <div className={cx("footer-col", "contact-info")}>
            <a href="/" className={cx("logo")}>
              <img src={images.logoCty} alt="Logo Xây Dựng An Phúc Khang" />
            </a>
            <p className={cx("address")}>
              Võ Văn Kiệt, khóm 4, phường Long Đức, Vĩnh Long
            </p>
            <p>
              <PhoneIcon />
              <strong>Hotline:</strong> 0939 076 567
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              <strong> Email:</strong> anphuckhangcompany@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faGlobe} />
              <strong> Website:</strong> anphuckhang.com
            </p>
            <div className={cx("social-links")}>
              <span>Mạng xã hội:</span>
              <a href="#">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              {/* Thêm các icon mạng xã hội khác nếu cần */}
            </div>
          </div>

          {/* Cột 2: Chính sách */}
          <div className={cx("footer-col", "policy-links")}>
            <h3 className={cx("footer-heading")}>Chính sách</h3>
            <ul>
              <li>
                <a href="#">Chính Sách Bảo Mật</a>
              </li>
              <li>
                <a href="#">Chính Sách Đổi Trả</a>
              </li>
              <li>
                <a href="#">Khách Hàng</a>
              </li>
              <li>
                <a href="#">Chính Sách Thanh Toán</a>
              </li>
              <li>
                <a href="#">Chính Sách Đặt Hàng</a>
              </li>
              <li>
                <a href="#">Chăm Sóc</a>
              </li>
            </ul>
            <br />
            <br />
            <h3 className={cx("footer-heading")}>Giới thiệu & Thông tin</h3>
            <ul>
              <li>
                <a href="#">Giới Thiệu</a>
              </li>
              <li>
                <a href="#">Xây Dựng</a>
              </li>
              <li>
                <a href="#">Nội Thất</a>
              </li>
              <li>
                <a href="#">Vật Liệu Xây Dựng</a>
              </li>
              <li>
                <a href="#">Tin Tức</a>
              </li>
              <li>
                <a href="#">Liên Hệ</a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Bản đồ và Facebook */}
          <div className={cx("footer-col", "embed-section")}>
            <div className={cx("facebook-embed")}>
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="130"
                style={{ border: 0, overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
            <div className={cx("map-embed")}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.636780963013!2d105.65873497585038!3d10.37189196655518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a6de7f564177b%3A0x6288929e701a539b!2zWMOkeSBk4buxbmcgRHUgQW4gUGjDoXQ!5e0!3m2!1svi!2s!4v1720448839063!5m2!1svi!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </footer>

      {/* Thanh Copyright */}
      <div className={cx("copyright-bar")}>
        2025 Copyright © XÂY DỰNG AN PHÚC KHANG.
      </div>

      {/* Các nút liên hệ cố định */}
      <div className={cx("fixed-buttons")}>
        <a
          href="https://zalo.me/0939076567"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={images.zaloIcon} alt="Zalo" />
        </a>
        <a href="tel:0939076567">
          <FontAwesomeIcon icon={faPhone} />
        </a>
        <a
          href="https://m.me/your-facebook-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={images.messengerIcon} alt="Messenger" />
        </a>
        <button onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </>
  );
}

export default FooterPage;
