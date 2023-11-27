import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  {
    id: "Nông trại",
    label: "Nông trại",
    value: 52,
    color: "#092eda",
  },
  {
    id: "Khu đất",
    label: "Khu đất",
    value: 20,
    color: "#dfe2e6",
  },
  {
    id: "Vùng đất",
    label: "Vùng đất",
    value: 25,
    color: "#038edc",
  },
  {
    id: "Nhân viên",
    label: "Nhân viên",
    value: 40,
    color: "#5fd0f3",
  },
];

const PieAgri = () => (
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

export default PieAgri;
