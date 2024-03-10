import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { getToken } from '../../../utils/helpers';

function AnalysisChart() {
  const [analysis, setAnalysis] = useState([]);
  const XAXISRANGE = 24;

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
        }
      };

      const response = await axios.get(`http://localhost:3001/api/v1/admin/analysis`, config);
      setAnalysis(response.data.analyze);
      console.log(response.data.analyze)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    const interval = setInterval(() => {
      fetchData();
    }, 3600000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
    },
    yaxis: {
      max: 20,
    },
    legend: {
      show: false,
    },
  };

  const series = [{
    data: analysis.map(item => ({ x: item.analysisDate, y: item.numOfLeaves })),
  }];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
}

export default AnalysisChart;
