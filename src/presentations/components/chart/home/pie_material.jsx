import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  {
    id: "Kho hàng hóa",
    label: "Kho hàng hóa",
    value: 34,
    color: "#092eda",
  },
  {
    id: "Kho nguyên liệu",
    label: "Kho nguyên liệu",
    value: 40,
    color: "#dfe2e6",
  },
  {
    id: "Kho thu hoạch",
    label: "Kho thu hoạch",
    value: 23,
    color: "#5fd0f3",
  },
];

const PieMaterialHomeChart = () => (
  <PieChart
    series={[
      {
        data,
        highlightScope: { faded: "global", highlighted: "item" },
        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
      },
    ]}
    height={300}
    theme={{
      background: {
        color: "#fff", // Set the background color to white
      },
    }}
  />
);

export default PieMaterialHomeChart;
