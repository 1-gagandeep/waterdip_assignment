// src/utils/dataLoader.ts
import Papa from 'papaparse';

export const loadData = async () => {
  const response = await fetch('/hotel_bookings_1000.csv');
  const text = await response.text();

  return new Promise<any[]>((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: any) => {
        reject(error);
      },
    });
  });
};
