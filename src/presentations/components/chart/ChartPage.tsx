import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels: string[] = ["2017", "2018", "2019", "2020", "2021", "2022"];

const options = {
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const data: ChartData = {
  labels,
  datasets: [
    {
      label: "Khách hàng mới",
      data: [32, 42, 51, 60, 51, 95],
      backgroundColor: "#2196F3",
      borderColor: "#2196F3",
    },

    {
      label: "Khách hàng thân thiết",
      data: [60, 54, 54, 53, 57, 65],
      backgroundColor: "#FFCA29",
      borderColor: "#FFCA29",
    },
  ],
};

const ChartJsExample: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "538px" }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartJsExample;
