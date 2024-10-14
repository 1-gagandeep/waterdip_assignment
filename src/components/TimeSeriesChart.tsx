// src/components/TimeSeriesChart.tsx
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

interface TimeSeriesChartProps {
  data: any[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(record => `${record.arrival_date_day_of_month}-${record.arrival_date_month}-${record.arrival_date_year}`),
    datasets: [
      {
        label: 'Number of Visitors',
        data: data.map(record => parseInt(record.adults) + parseInt(record.children) + parseInt(record.babies)),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TimeSeriesChart;
