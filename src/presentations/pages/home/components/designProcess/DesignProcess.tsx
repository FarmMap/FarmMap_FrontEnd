import React from "react";
import classNames from "classnames/bind";
import styles from "./DesignProcess.module.scss";

const cx = classNames.bind(styles);

// Dữ liệu cho các bước trong quy trình
const processData = [
  {
    number: "01",
    title: "Tiếp Nhận Thông Tin",
    description:
      "Chúng tôi tiếp nhận thông tin của quý khách và phát thảo bản vẽ về công trình",
  },
  {
    number: "02",
    title: "Ký Hợp Đồng",
    description:
      "Sau khi phác thảo bản vẽ chúng tôi sẽ soạn thảo một bản hợp đồng làm việc với...",
  },
  {
    number: "03",
    title: "Thiết Kế Nội Ngoại Thất",
    description:
      "Xong phần ngoại thất chúng tôi sẽ tiến hành tới phần nội thất trong ngôi nhà của quý...",
  },
  {
    number: "04",
    title: "Thi Công Công Trình",
    description:
      "Tiếp nhận công trình từ quý khách và thi công thiết kế theo bản vẽ ban đầu.",
  },
  {
    number: "05",
    title: "Bàn Giao Hồ Sơ",
    description: "Bàn giao công trình và thanh toán hợp đồng",
  },
  {
    number: "06",
    title: "Thiết Kế Hồ Sơ Thi Công",
    description:
      "Hoàn thiện xong công trình từ ngoại thất đến nội thất và chuẩn bị bàn giao công trình",
  },
];

function DesignProcess() {
  return (
    <section className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("title-block")}>
          <h2 className={cx("title")}>QUY TRÌNH THIẾT KẾ</h2>
          <div className={cx("decorator")}></div>
        </div>

        <div className={cx("timeline-wrapper")}>
          {processData.map((step, index) => (
            <div key={index} className={cx("timeline-item")}>
              {/* Nội dung của mỗi bước */}
              <div className={cx("timeline-content")}>
                {/* Khối lục giác */}
                <div className={cx("hexagon")}>
                  <span>{step.number}</span>
                </div>
                {/* Khối văn bản */}
                <div className={cx("text-wrapper")}>
                  <h3 className={cx("step-title")}>{step.title}</h3>
                  <p className={cx("step-description")}>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DesignProcess;
