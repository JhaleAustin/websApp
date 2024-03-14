import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { getToken } from '../../../../utils/helpers';

function WeeklyAnalysisChart() {
  const [analysis, setAnalysis] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to the current month
  const XAXISRANGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

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
        acc[date] = (acc[date] || 0) + 7;
        return acc;
      }, {});

      const analyzedDataWithCount = response.data.analyze.map(item => ({
        ...item,
        inputCount: countedData[new Date(item.analysisDate).toDateString()] || 0,
      }));

      setAnalysis(analyzedDataWithCount);
    } catch (error) {
      console.error("Error fetching weekly data:", error);
    }
  };

  useEffect(() => {

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 7 * 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedMonth]);

  const options = {
    chart: {
      id: 'WEEKLY ANALYSIS REPORT',
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
      text: 'WEEKLY ANALYSIS REPORT',
      align: 'center',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      range: XAXISRANGE,
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

export default WeeklyAnalysisChart;
