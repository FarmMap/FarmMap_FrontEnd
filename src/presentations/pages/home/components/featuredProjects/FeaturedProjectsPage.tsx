import React from "react";
import classNames from "classnames/bind";
import styles from "./FeaturedProjectsPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import images from "../../../../../assets/images";

const cx = classNames.bind(styles);

// Dữ liệu mẫu cho các dự án
const projectData = [
  {
    id: 1,
    imgUrl: images.project1,
    size: "large",
    clipped: "left",
  },
  {
    id: 2,
    imgUrl: images.project2,
    size: "large",
    clipped: "right",
  },
  {
    id: 3,
    imgUrl: images.project3,
  },
  {
    id: 4,
    imgUrl: images.project4,
  },
  {
    id: 5,
    imgUrl: images.project5,
  },
  {
    id: 6,
    imgUrl: images.project6,
  },
  {
    id: 7,
    imgUrl: images.project7,
  },
  {
    id: 8,
    imgUrl: images.project8,
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
