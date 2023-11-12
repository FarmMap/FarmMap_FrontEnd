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
          <th>Hàng hóa</th>
          <th>Nguyên liệu</th>
          <th>Thu hoạch</th>
          <th>Đang lấy hàng</th>
          <th>Đang chờ xuất</th>
          <th>Đã xuất kho</th>
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
            <p>50</p>
          </td>
          <td>
            <p>10</p>
          </td>
          <td>
            <p>80</p>
          </td>
          <td>
            <p>237</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default XuatKhoDashBoard;
