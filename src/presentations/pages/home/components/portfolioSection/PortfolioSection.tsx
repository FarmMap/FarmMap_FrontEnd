import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./PortfolioSection.module.scss";

const cx = classNames.bind(styles);

// Dữ liệu mẫu cho các dự án với các danh mục khác nhau
const allProjects = [
  {
    id: 1,
    title: "Nhà Anh Thọ Hồng Ngự",
    category: "Thiết kế",
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/279x295x1/upload/news/anh-man-hinh-2025-02-14-luc-085322-5015.png",
  },
  {
    id: 2,
    title: "Nhà Chị Phương Cao Lãnh",
    category: "Thi công",
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/279x295x1/upload/news/anh-man-hinh-2025-02-14-luc-085231-5831.png",
  },
  {
    id: 3,
    title: "Nhà Dì Thơ Cao Lãnh",
    category: "Sửa nhà",
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/279x295x1/upload/news/anh-man-hinh-2025-02-14-luc-085047-9885.png",
  },
  {
    id: 4,
    title: "Nhà Chú Hiền Vĩnh Long",
    category: "Thi công",
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/279x295x1/upload/news/anh-man-hinh-2025-02-14-luc-084940-3517.png",
  },
  {
    id: 5,
    title: "Cải tạo Loteria Nguyễn Huệ",
    category: "Sửa nhà",
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/279x295x1/upload/news/anh-man-hinh-2025-02-14-luc-084836-6516.png",
  },
  {
    id: 6,
    title: "Nhà Anh Công Cao Lãnh",
    category: "Cầu đường",
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/279x295x1/upload/news/anh-man-hinh-2025-02-14-luc-084601-4105.png",
  },
  {
    id: 7,
    title: "Nhà bác 7 Thành",
    category: "Thiết kế",
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/279x295x1/upload/news/anh-man-hinh-2025-02-13-luc-141808-4863.png",
  },
  {
    id: 8,
    title: "Nhà chị Nguyên",
    category: "Thi công",
    imgUrl:
      "https://xaydungduanphat.com/watermark/news/279x295x1/upload/news/anh-man-hinh-2025-02-13-luc-140615-2561.png",
  },
];

const filterCategories = [
  "Tất cả",
  "Thiết kế",
  "Thi công",
  "Sửa nhà",
  "Cầu đường",
];

function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  useEffect(() => {
    if (activeFilter === "Tất cả") {
      setFilteredProjects(allProjects);
    } else {
      const newProjects = allProjects.filter(
        (p) => p.category === activeFilter
      );
      setFilteredProjects(newProjects);
    }
  }, [activeFilter]);

  return (
    <section className={cx("wrapper")}>
      <div className={cx("container")}>
        {/* Tiêu đề */}
        <div className={cx("title-block")}>
          <h2 className={cx("title")}>LĨNH VỰC HOẠT ĐỘNG</h2>
          <div className={cx("decorator")}></div>
        </div>

        {/* Bộ lọc */}
        <div className={cx("filter-nav")}>
          {filterCategories.map((category) => (
            <button
              key={category}
              className={cx("filter-btn", {
                active: activeFilter === category,
              })}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lưới dự án */}
        <div className={cx("project-grid")}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={cx("project-item")}>
              <img src={project.imgUrl} alt={project.title} />
              <div className={cx("caption-overlay")}>
                <p>{project.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
