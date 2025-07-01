import React from "react";
import Slider from "react-slick";
import classNames from "classnames/bind";

// Import CSS của thư viện
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import file SCSS module của bạn
import styles from "./SlidePage.module.scss";

const cx = classNames.bind(styles);

// Thay đổi props để nhận một mảng các URL hình ảnh
interface SlidePageProps {
  imageUrls: string[];
}

function SlidePage({ imageUrls }: SlidePageProps) {
  // Dùng destructuring để code gọn hơn
  // Cấu hình cho slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  // Kiểm tra nếu không có ảnh thì không render gì cả
  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className={cx("carousel-wrapper")}>
      <Slider {...settings}>
        {/* Dùng hàm map() để tự động tạo các slide từ mảng imageUrls */}
        {imageUrls.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlidePage;
