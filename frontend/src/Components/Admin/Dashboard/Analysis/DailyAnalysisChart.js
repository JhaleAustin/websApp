import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { getToken } from '../../../../utils/helpers';

function DailyAnalysisChart() {
  const [analysis, setAnalysis] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to the current month
  const XAXISRANGE = 24 * 60 * 60 * 1000 * 30; // 30 days in milliseconds

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
        }
      };

      const response = await axios.get(`http://localhost:3001/api/v1/admin/analysis`, config);

      const countedData = response.data.analyze.reduce((acc, item) => {
        const date = new Date(item.analysisDate).toDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const analyzedDataWithCount = response.data.analyze.map(item => ({
        ...item,
        inputCount: countedData[new Date(item.analysisDate).toDateString()] || 0,
      }));

      setAnalysis(analyzedDataWithCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedMonth]);

  const options = {
    chart: {
      id: 'ANALYSIS REPORT',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'ANALYSIS REPORT',
      align: 'center',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      range: XAXISRANGE,
      min: new Date(new Date().getFullYear(), selectedMonth, 1).getTime(),
      max: new Date(new Date().getFullYear(), selectedMonth + 1, 0).getTime(),
    },
    yaxis: {
      max: 20,
    },
    legend: {
      show: false,
    },
  };

  const series = [{
    data: analysis.map(item => ({ x: new Date(item.analysisDate).getTime(), y: item.inputCount })),
  }];

  return (
    <div>
      <label>Select Month: </label>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
        ))}
      </select>

      <Chart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default DailyAnalysisChart;
