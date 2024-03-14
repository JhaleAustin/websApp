import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { getToken } from '../../../../utils/helpers';

function DailyAnalysisChart() {
  const [answer, setAnswer] = useState([]);
  const [followUp, setFollowUp] = useState([]);
  const [replies, setReplies] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const XAXISRANGE = 24 * 60 * 60 * 1000 * 30; // 30 days in milliseconds

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        };

        const responseAnswer = await axios.get(`http://localhost:3001/api/v1/answers`, config);
        const countedDataAnswer = responseAnswer.data.answers.reduce((acc, item) => {
          const date = new Date(item.answerDate).toDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        const analyzedDataWithCountAnswer = responseAnswer.data.answers.map(item => ({
          ...item,
          inputCount: countedDataAnswer[new Date(item.answerDate).toDateString()] || 0,
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        setAnswer(analyzedDataWithCountAnswer);

        const responseFollowUp = await axios.get(`http://localhost:3001/api/v1/followups`, config);
        const countedDataFollowUp = responseFollowUp.data.followups.reduce((acc, item) => {
          const date = new Date(item.followupDate).toDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        const analyzedDataWithCountFollowUp = responseFollowUp.data.followups.map(item => ({
          ...item,
          inputCount: countedDataFollowUp[new Date(item.followupDate).toDateString()] || 0,
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        setFollowUp(analyzedDataWithCountFollowUp);

        const responseReplies = await axios.get(`http://localhost:3001/api/v1/replies`, config);
        const countedDataReplies = responseReplies.data.replies.reduce((acc, item) => {
          const date = new Date(item.replyDate).toDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        const analyzedDataWithCountReplies = responseReplies.data.replies.map(item => ({
          ...item,
          inputCount: countedDataReplies[new Date(item.replyDate).toDateString()] || 0,
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        setReplies(analyzedDataWithCountReplies);

        const responseInquiries = await axios.get(`http://localhost:3001/api/v1/inquiries`, config);
        const countedDataInquiries = responseInquiries.data.inquiries.reduce((acc, item) => {
          const date = new Date(item.inputDate).toDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        const analyzedDataWithCountInquiries = responseInquiries.data.inquiries.map(item => ({
          ...item,
          inputCount: countedDataInquiries[new Date(item.inputDate).toDateString()] || 0,
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        setInquiries(analyzedDataWithCountInquiries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 24 * 60 * 60 * 1000); // Fetch data every 24 hours

    return () => clearInterval(interval);
  }, [selectedMonth]);

  const maxInputCount = Math.max(
    ...[answer, followUp, replies, inquiries].flatMap(data => data.map(item => item.inputCount))
  );
  const maxInputCountAdjusted = Math.ceil(maxInputCount / 10) * 10;

  const options = {
    chart: {
      id: 'analysis-report',
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
      text: 'DAILY INTERACTION REPORT',
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

  const series = [
    {
      name: 'Answers',
      data: answer.map(item => ({ x: new Date(item.answerDate).getTime(), y: item.inputCount })),
      color: '#3F704D',
    },
    {
      name: 'Follow-ups',
      data: followUp.map(item => ({ x: new Date(item.followupDate).getTime(), y: item.inputCount })),
      color: '#8F9779',
    },
    {
      name: 'Replies',
      data: replies.map(item => ({ x: new Date(item.replyDate).getTime(), y: item.inputCount })),
      color: '#29AB87',
    }, 
    {
      name: 'Inquiries',
      data: inquiries.map(item => ({ x: new Date(item.inputDate).getTime(), y: item.inputCount })),
      color: '#abc32f',
    }
  ];

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
