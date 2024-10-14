// src/components/SparklineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SparklineChartProps {
  data: any[];
  type: 'adults' | 'children';
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, type }) => {
  const total = data.reduce((sum, record) => sum + parseInt(record[type]), 0);
  const chartData = {
    labels: data.map(record => `${record.arrival_date_day_of_month}-${record.arrival_date_month}-${record.arrival_date_year}`),
    datasets: [
      {
        label: `Total ${type.charAt(0).toUpperCase() + type.slice(1)} Visitors`,
        data: data.map(record => parseInt(record[type])),
        fill: false,
        borderColor: 'rgba(153,102,255,1)',
      },
    ],
  };

  return (
    <div>
      <h3>Total {type.charAt(0).toUpperCase() + type.slice(1)} Visitors: {total}</h3>
      <Line data={chartData} />
    </div>
  );
};

export default SparklineChart;
