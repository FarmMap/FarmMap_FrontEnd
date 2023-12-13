import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  {
    id: "Phiếu đã duyệt",
    label: "Phiếu đã duyệt",
    value: 50,
    color: '#092eda',

  },
  {
    id: "Phiếu chờ duyệt",
    label: "Phiếu chờ duyệt",
    value: 20,
    color: '#dfe2e6',
  },
  {
    id: "Đã hủy phiếu",
    label: "Đã hủy phiếu",
    value: 30,
    color: '#5fd0f3',
  },

];

const PieSuppliesHomeChart = () => (
  <PieChart
    series={[
      {
        data,
        cx: 200,// căn chỉnh chart hai bên
        cy: 150,
        innerRadius: 40,
        outerRadius: 120, // size chart lớn nhỏ
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      },

    ]}
    height={300}
    theme={{
      background: {
        color: '#fff', // Set the background color to white
      },
    }}
  />
);

export default PieSuppliesHomeChart;
