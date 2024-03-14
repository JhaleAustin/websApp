import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { getToken } from '../../../../utils/helpers';

function DailyAnalysisChart() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()), XAXISRANGE = 24 * 60 * 60 * 1000 * 30; // 30 days in milliseconds

  const [analysis, setAnalysis] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
          }
        };

        const response = await axios.get(`http://localhost:3001/api/v1/admin/analysis`, config);

        const uniqueDates = new Set();
        const dateCountMap = {};

        response.data.analyze.forEach(item => {
          const date = new Date(item.analysisDate).toDateString();
          uniqueDates.add(date);
          dateCountMap[date] = (dateCountMap[date] || 0) + 1;
        });

        const analyzedDataWithCount = Array.from(uniqueDates).map(date => ({
          date,
          inputCount: dateCountMap[date] || 0
        }));

        // Sort the analyzed data by date in ascending order
        analyzedDataWithCount.sort((a, b) => new Date(a.date) - new Date(b.date));

        setAnalysis(analyzedDataWithCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 24 * 60 * 60 * 1000); // Fetch data every 24 hours

    return () => clearInterval(interval);
  }, [selectedMonth]);

  // Calculate the maximum input count
  const maxInputCount = Math.max(...analysis.map(item => item.inputCount));

  // Ensure the maximum input count is divisible by 10
  const maxInputCountAdjusted = Math.ceil(maxInputCount / 10) * 10;

  const options = {
    chart: {
      colors: ["#abc32f"],
      id: 'DAILY ANALYSIS REPORT',
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
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
        autoSelected: 'zoom', 
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'DAILY ANALYSIS REPORT',
      align: 'center',
      style: {
        color: '#164006',
        fontSize: '20px',
      }
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      range: XAXISRANGE,
      min: new Date(new Date().getFullYear(), selectedMonth, 1).getTime(),
      max: new Date(new Date().getFullYear(), selectedMonth + 1, 0).getTime(),
      labels: {
        style: {
          colors: 'white',
        },
      },
    },
    yaxis: {
      max: maxInputCountAdjusted,
      labels: {
        style: {
          colors: 'white',
        },
      },
    },
  };

  const series = [{
    name: 'Number of users', 
    data: analysis.map(item => ({ x: new Date(item.date).getTime(), y: item.inputCount })),
    color: '#abc32f' 
  }];

  return (
    <div className="chartAnalysis">
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="ftable"
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
