// src/App.tsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';
import { loadData } from './utils/dataLoader';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    loadData().then((data) => setData(data));
  }, []);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const filteredData = data.filter((record) => {
    const arrivalDate = new Date(
      record.arrival_date_year,
      record.arrival_date_month - 1,
      record.arrival_date_day_of_month
    );
    return (
      (!startDate || arrivalDate >= startDate) &&
      (!endDate || arrivalDate <= endDate)
    );
  });

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        selectsRange
        inline
      />
      <TimeSeriesChart data={filteredData} />
      <ColumnChart data={filteredData} />
      <SparklineChart data={filteredData} type="adults" />
      <SparklineChart data={filteredData} type="children" />
    </div>
  );
};

export default App;
