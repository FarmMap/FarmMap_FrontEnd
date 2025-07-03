import React from "react";
import classNames from "classnames/bind";
import styles from "./AboutPage.module.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import images from "../../../../../assets/images";
const cx = classNames.bind(styles);

function AboutPage() {
  return (
    <section className={cx("wrapper")}>
      <div className={cx("container")}>
        {/* Cột trái: Cụm hình ảnh */}
        <div className={cx("image-collage")}>
          <img src={images.about1} alt="Tòa nhà 1" className={cx("img-1")} />
          <img src={images.about2} alt="Tòa nhà 2" className={cx("img-2")} />
          <img src={images.about3} alt="Tòa nhà 3" className={cx("img-3")} />
        </div>

        {/* Cột phải: Nội dung giới thiệu */}
        <div className={cx("text-content")}>
          <p className={cx("subtitle")}>WELCOME TO</p>
          <div className={cx("decorator")}></div>
          <h2 className={cx("title")}>
            XÂY DỰNG <span style={{ color: "#FF0000" }}>AN PHÚC KHANG</span>
          </h2>
          <p className={cx("description")}>
            <strong>XÂY DỰNG AN PHÚC KHANG</strong> chắc chắn rằng: Sau khi đọc
            xong bài viết này Quý vị sẽ hiểu hơn về chúng tôi, biết được lý do
            chúng tôi thành lập, biết được những giá trị mà chúng tôi mang tới
            cho Quý Khách hàng sản phẩm tốt, chất lượng cao mà còn mang lại giá
            trị về mặt kinh tế. Quý vị sẽ biết được chúng tôi luôn đề cao, tôn
            trọng những người lao động tạo ra sản phẩm cuối cùng và luôn tạo
            điều kiện tốt nhất cho người lao động phát triển
          </p>
          <a href="/gioi-thieu" className={cx("cta-button")}>
            XEM TẤT CẢ <ArrowRightAltIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
