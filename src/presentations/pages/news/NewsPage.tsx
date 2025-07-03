import React from "react";
import classNames from "classnames/bind";
import styles from "./NewsPage.module.scss";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Import CSS của thư viện react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DefaultWebLayOutPage from "../../components/defautWebLayOut/DefaultWebLayOutPage";
import useFetchBlogs from "../../../data/api/Blog/useFetchBlogs";
import BlogType from "../../../data/types/Blog/BlogType";

const cx = classNames.bind(styles);

// 1. Định nghĩa kiểu dữ liệu cho một bài tin tức
interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  link: string;
}

// 2. Gán kiểu dữ liệu cho mảng tin tức
const newsData: NewsItem[] = [
  {
    id: 1,
    title: "BỐC XẾP KHU VỰC LONG KHÁNH",
    imageUrl: "https://placehold.co/600x400/3a5a40/white?text=News+1",
    description:
      "Bốc xếp khu vực Long Khánh – Khang Thịnh Logistic giải pháp chuyên nghiệp...",
    link: "/tin-tuc/bai-viet-1",
  },
  {
    id: 2,
    title: "VẬN CHUYỂN ĐỒNG NAI: TẠI SAO NÊN CHỌN DỊCH VỤ",
    imageUrl: "https://placehold.co/600x400/588157/white?text=News+2",
    description:
      "Tìm hiểu lý do nên chọn dịch vụ vận chuyển Đồng Nai thay vì tự vận chuyển...",
    link: "/tin-tuc/bai-viet-2",
  },
  {
    id: 3,
    title: "DỊCH VỤ BỐC XẾP HÀNG HÓA CHUYÊN NGHIỆP",
    imageUrl: "https://placehold.co/600x400/a3b18a/white?text=News+3",
    description:
      "Trong ngành vận tải và logistics, bốc xếp hàng hóa đóng vai trò then chốt...",
    link: "/tin-tuc/bai-viet-3",
  },
  {
    id: 4,
    title: "5 LỢI ÍCH KHI SỬ DỤNG DỊCH VỤ VẬN CHUYỂN",
    imageUrl: "https://placehold.co/600x400/dad7cd/white?text=News+4",
    description:
      "Trong thời đại công nghiệp hóa và hiện đại hóa, nhu cầu vận chuyển...",
    link: "/tin-tuc/bai-viet-4",
  },
  {
    id: 5,
    title: "BÍ QUYẾT ĐÓNG GÓI HÀNG HÓA AN TOÀN",
    imageUrl: "https://placehold.co/600x400/344e41/white?text=News+5",
    description:
      "Đóng gói đúng cách là bước quan trọng nhất để đảm bảo hàng hóa của bạn...",
    link: "/tin-tuc/bai-viet-5",
  },
  {
    id: 6,
    title: "XU HƯỚNG LOGISTICS THÔNG MINH NĂM 2025",
    imageUrl: "https://placehold.co/600x400/8c9b7d/white?text=News+6",
    description:
      "Công nghệ đang thay đổi bộ mặt của ngành logistics với các giải pháp tự động...",
    link: "/tin-tuc/bai-viet-6",
  },
];

// 3. Định nghĩa component là một React Functional Component
const NewsSection: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  // 4. Gán kiểu dữ liệu cho tham số của hàm
  const renderNewsCard = (
    newsItem: BlogType // newsItem có kiểu NewsItem với 'id'
  ) => (
    <div key={newsItem.id} className={cx("news-card-wrapper")}>
      <div className={cx("news-card")}>
        {/* Sửa lại prop 'to' của Link */}
        <Link to={`/tin-tuc/${newsItem.id}`} className={cx("image-link")}>
          <img
            className={cx("card-image")}
            src={`http://118.69.126.49:3998/${newsItem.image}`}
            alt={newsItem.title}
          />
        </Link>
        <div className={cx("card-content")}>
          <h3 className={cx("card-title")}>
            {/* Sửa cả link ở đây */}
            <Link to={`/tin-tuc/${newsItem.id}`}>{newsItem.title}</Link>
          </h3>
          <p className={cx("card-description")}>{newsItem.description}</p>
          <Link to={`/tin-tuc/${newsItem.id}`} className={cx("read-more")}>
            Xem tất cả <span className={cx("arrow")}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );

  const { blogs } = useFetchBlogs({
    page: 1,
  });

  return (
    <DefaultWebLayOutPage>
      <div>
        <section className={cx("wrapper")}>
          <div className={cx("container")}>
            <div className={cx("title-block")}>
              <h2 className={cx("title")}>TIN TỨC MỚI</h2>
            </div>

            {blogs.length > 4 ? (
              <div className={cx("news-slider")}>
                <Slider {...sliderSettings}>{blogs.map(renderNewsCard)}</Slider>
              </div>
            ) : (
              <div className={cx("news-grid")}>{blogs.map(renderNewsCard)}</div>
            )}
          </div>
        </section>
      </div>
    </DefaultWebLayOutPage>
  );
};

export default NewsSection;
