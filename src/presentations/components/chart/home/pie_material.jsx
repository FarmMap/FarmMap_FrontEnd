import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  {
    id: "Kho hàng hóa",
    label: "Kho hàng hóa",
    value: 34,
    color: "var(--second-color)",
  },
  {
    id: "Kho nguyên liệu",
    label: "Kho nguyên liệu",
    value: 40,
    color: "var(--yellow-color)",
  },
  {
    id: "Kho thu hoạch",
    label: "Kho thu hoạch",
    value: 23,
    color: "var(--green-hover-color)",
  },
];

const PieMaterialHomeChart = () => (
  <PieChart
    series={[
      {
        data,
        cx: 120, // căn chỉnh chart hai bên
        cy: 120,
        innerRadius: 40,

        outerRadius: 100, // size chart lớn nhỏ
        highlightScope: { faded: "global", highlighted: "item" },
        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
      },
    ]}
    height={250}
    theme={{
      background: {
        color: "#fff", // Set the background color to white
      },
    }}
  />
);

export default PieMaterialHomeChart;
