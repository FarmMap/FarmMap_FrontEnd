import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Grid } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `Thống kê sản lượng - Tăng 33.1% so với năm ngoái`,
    },
  },
};

const labels = [
  "Th 1",
  "Th 2",
  "Th 3",
  "Th 4",
  "Th 5",
  "Th 6",
  "Th 7",
  "Th 8",
  "Th 9",
  "Th 10",
  "Th 11",
  "Th 12",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Năm trước",
      data: [
        800, 1800, 2800, 2500, 2600, 2400, 2100, 2000, 1800, 1900, 2000, 2200,
      ],
      backgroundColor: "#cfd4db",
    },
    {
      label: "Năm nay",
      data: [
        1000, 2000, 3000, 2700, 2800, 2600, 2100, 2000, 1800, 1900, 2000, 2200,
      ],
      backgroundColor: "#3a79fc",
    },
  ],
};

export default function VerticalChart() {
  return (
    <Grid height={"100%"}>
      {" "}
      <Bar options={options} data={data} />
    </Grid>
  );
}
