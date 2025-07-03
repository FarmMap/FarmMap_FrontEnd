import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./PortfolioSection.module.scss";
import images from "../../../../../assets/images";

const cx = classNames.bind(styles);

// Dữ liệu mẫu cho các dự án với các danh mục khác nhau
const allProjects = [
  {
    id: 1,
    title: "Tấm alu ngoài trời Viva Crema­ Valencia VA905­",
    category: "Vật liệu ốp tường",
    imgUrl: "https://vlxdgiatot.com/wp-content/uploads/2025/03/VA905.jpg",
  },
  {
    id: 2,
    title: "Tấm alu ngoài trời Viva ­elZinc­ GoldV Z9907",
    category: "Vật liệu ốp tường",
    // imgUrl: images.portfolio,
    imgUrl: "https://vlxdgiatot.com/wp-content/uploads/2025/03/product_977.jpg",
  },
  {
    id: 3,
    title: "GẠCH VIETCERAMICS SUPER STONE ALCHEMY 600PXALC1",
    category: "Gạch ốp lát",
    imgUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2024/12/GACH-VIETCERAMICS-SUPER-STONE-ALCHEMY-600PXALC1.jpg",
  },
  {
    id: 4,
    title: "Tấm alu ngoài trời Viva Cork­ Wood VA402­",
    category: "Vật liệu ốp trần",
    imgUrl: "https://vlxdgiatot.com/wp-content/uploads/2025/03/VA402.jpg",
  },
  {
    id: 5,
    title: "GẠCH VIETCERAMICS SUPER STONE AKOYA 612AKSI",
    category: "Gạch ốp lát",
    imgUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2024/12/GACH-VIETCERAMICS-SUPER-STONE-AKOYA-612AKSI-612AKSIKRY.jpg",
  },
  {
    id: 6,
    title: "Giường Ngủ Cao Cấp Melamine",
    category: "Nội thất",
    imgUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2025/01/snapedit_1732866639346-1.png",
  },
  {
    id: 7,
    title: "Giường Ngủ Gỗ MDF ",
    category: "Nội thất",
    imgUrl:
      "https://vlxdgiatot.com/wp-content/uploads/2025/01/snapedit_1732863543219-1.png",
  },
  {
    id: 8,
    title: "Tấm alu ngoài trời Viva Corten­ Steel­2 VA8016­",
    category: "Vật liệu ốp trần",
    imgUrl: "https://vlxdgiatot.com/wp-content/uploads/2025/03/VA8016.jpg",
  },
];

const filterCategories = [
  "Tất cả",
  "Vật liệu ốp tường",
  "Vật liệu ốp trần",
  "Gạch ốp lát",
  "Nội thất",
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
          <h2 className={cx("title")}>VẬT LIỆU XÂY DỰNG</h2>
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
                <p style={{ color: "var(--yellow-color)" }}>Liên hệ</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
