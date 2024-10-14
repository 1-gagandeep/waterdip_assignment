// src/components/ColumnChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ColumnChartProps {
  data: any[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const countries = [...new Set(data.map(record => record.country))];
  const visitorsPerCountry = countries.map(country => 
    data.filter(record => record.country === country)
        .reduce((sum, record) => sum + parseInt(record.adults) + parseInt(record.children) + parseInt(record.babies), 0)
  );

  const chartData = {
    labels: countries,
    datasets: [
      {
        label: 'Number of Visitors',
        data: visitorsPerCountry,
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ColumnChart;
