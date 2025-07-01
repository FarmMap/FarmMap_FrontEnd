import React from "react";
import classNames from "classnames/bind";
import styles from "./ContactSection.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ContactForm() {
  return (
    <div>
      <div className={cx("banner-wrap")}>
        <img
          src="https://xaydungduanphat.com/thumbs/1366x396x1/upload/photo/quangcao1-9023.jpg"
          alt="XÂY DỰNG DƯ AN PHÁT"
        />
      </div>

      <div className={cx("form-control")}>
        <div className={cx("form-content")}>
          <div className={cx("form-box")}>
            <div className={cx("title")}>
              <span>Đăng ký nhận tin</span>
            </div>

            <form action="" className={cx("form")}>
              <div className={cx("group_input")}>
                <div className="">
                  <input
                    type="text"
                    className={cx("input_sign")}
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className={cx("input_sign")}
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    className={cx("input_sign")}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className={cx("newsletter-button")}>
                <input
                  type="submit"
                  className={cx("btn_sign")}
                  name="submit-newsletter"
                  value="Gửi ngay"
                />
                <input type="hidden" name="newsletter" value="submit" />
                <input
                  type="hidden"
                  className=""
                  name="recaptcha_response_newsletter"
                  id="recaptchaResponseNewsletter"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
