import { Button } from "@mui/material";
import Tippy from "@tippyjs/react";
import React from "react";

// Style
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

const KhoDashBoard = () => {
  return (
    <table className={cx("table")}>
      <thead>
        <tr>
          <th>Hàng hóa</th>
          <th>Nguyên liệu</th>
          <th>Thu hoạch</th>
          <th>Nhập kho</th>
          <th>Đang cất hàng</th>
          <th>Tổng</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p>34</p>
          </td>
          <td>
            <p>40</p>
          </td>
          <td>
            <p>23</p>
          </td>
          <td>
            <p>120</p>
          </td>
          <td>
            <p>30</p>
          </td>
          <td>
            <p>247</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default KhoDashBoard;
