import React from "react";
import classNames from "classnames/bind";
import styles from "./FeaturedProjectsPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

// Dữ liệu mẫu cho các dự án
const projectData = [
  {
    id: 1,
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/645x348x1/upload/news/200-2966.webp",
    size: "large",
    clipped: "left",
  },
  {
    id: 2,
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/645x348x1/upload/news/biet-thu-nha-vuon-cap-4-dep-tinh-te-ngo-nhu-khong-gian-trieu-do-3-4040.jpg",
    size: "large",
    clipped: "right",
  },
  {
    id: 3,
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/380x297x1/upload/news/nha-pho-5-tang-ket-hop-kinh-doanh-anh-bia-400x267-2705.jpg",
  },
  {
    id: 4,
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/380x297x1/upload/news/nha-pho-hien-dai-5-3353.jpg",
  },
  {
    id: 5,
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/380x297x1/upload/news/thiet-ke-nha-pho-3-tang-6790.jpg",
  },
  {
    id: 6,
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/380x297x1/upload/news/top-9-mau-nha-cap-4-3-phong-ngu-300-trieu-dep-va-toi-uu-cong-nang-nhat-2023-645b3e104f323ca9306d2c50-3474.webp",
  },
  {
    id: 7,
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/380x297x1/upload/news/mau-nha-cap-4-mai-thai-100-trieu-tiet-kiem-chi-phi-9773.jpg",
  },
  {
    id: 8,
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/380x297x1/upload/news/top-29-mau-nha-cap-4-dep-me-ly-van-nguoi-me-645356894719fca7bfdc45b5-8845.webp",
  },
];

function FeaturedProjects() {
  return (
    <section className={cx("wrapper")}>
      <div className={cx("container")}>
        {/* Tiêu đề */}
        <div className={cx("title-block")}>
          <h2 className={cx("title")}>DỰ ÁN NỔI BẬT</h2>
          <div className={cx("decorator")}></div>
        </div>

        {/* Lưới dự án */}
        <div className={cx("projects-grid")}>
          {projectData.map((project) => (
            <div
              key={project.id}
              className={cx(
                "project-item",
                { "large-item": project.size === "large" },
                { "clipped-left": project.clipped === "left" },
                { "clipped-right": project.clipped === "right" }
              )}
            >
              <img src={project.imgUrl} alt={`Dự án ${project.id}`} />
              <div className={cx("overlay")}>
                {/* Bạn có thể đặt logo hoặc icon ở đây */}
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          ))}
        </div>

        {/* Nút xem tất cả */}
        <div className={cx("cta-wrapper")}>
          <a href="/du-an" className={cx("cta-button")}>
            XEM TẤT CẢ
          </a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
