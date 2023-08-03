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
      text: "Doanh thu đến ngày 8/3/2023",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Khấu hao",
      data: [5, 1, 5, 6.4, 6.2, 3, 6, 2, 8, 5, 2, 9],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Lợi nhuận (triệu)",
      data: [6, 5, 7, 8, 10, 4, 6, 7, 6, 4, 7, 7],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
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
