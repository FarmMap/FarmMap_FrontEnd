import { Button } from "@mui/material";
import Tippy from "@tippyjs/react";
import React from "react";

// Style
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

const XuatKhoDashBoard = () => {
  return (
    <table className={cx("table")}>
      <thead>
        <tr>
          <th>Tổng</th>
          <th>Kho hàng hóa</th>
          <th>Kho nguyên liệu</th>
          <th>Kho thu hoạch</th>
          <th>Nhập kho</th>
          <th>Đang xuất kho</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p>150</p>
          </td>
          <td>
            <p>28</p>
          </td>
          <td>
            <p>34</p>
          </td>
          <td>
            <p>90</p>
          </td>
          <td>
            <p>120</p>
          </td>
          <td>
            <p>80</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default XuatKhoDashBoard;
