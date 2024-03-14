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

        const answeruniqueDates = new Set();
        const answerdateCountMap = {};

        responseAnswer.data.answer.forEach(item => {
          const date = new Date(item.answerDate).toDateString();
          answeruniqueDates.add(date);
          answerdateCountMap[date] = (answerdateCountMap[date] || 0) + 1;
        });

        const answerDataWithCount = Array.from(answeruniqueDates).map(date => ({
          date,
          inputCount: answerdateCountMap[date] || 0
        }));

        answerDataWithCount.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setAnswer(answerDataWithCount);

        const responseFollowUp = await axios.get(`http://localhost:3001/api/v1/followups`, config);
        
        const followupuniqueDates = new Set();
        const followupdateCountMap = {};

        responseFollowUp.data.followUp.forEach(item => {
          const date = new Date(item.followupDate).toDateString();
          followupuniqueDates.add(date);
          followupdateCountMap[date] = (followupdateCountMap[date] || 0) + 1;
        });

        const followupDataWithCount = Array.from(followupuniqueDates).map(date => ({
          date,
          inputCount: followupdateCountMap[date] || 0
        }));

        followupDataWithCount.sort((a, b) => new Date(a.date) - new Date(b.date));

        setFollowUp(followupDataWithCount);

        const responseReplies = await axios.get(`http://localhost:3001/api/v1/replies`, config);

        const replyuniqueDates = new Set();
        const replydateCountMap = {};

        responseReplies.data.replies.forEach(item => {
          const date = new Date(item.replyDate).toDateString();
          replyuniqueDates.add(date);
          replydateCountMap[date] = (replydateCountMap[date] || 0) + 1;
        });

        const replyDataWithCount = Array.from(replyuniqueDates).map(date => ({
          date,
          inputCount: replydateCountMap[date] || 0
        }));

        replyDataWithCount.sort((a, b) => new Date(a.date) - new Date(b.date));

        setReplies(replyDataWithCount);

        const responseInquiries = await axios.get(`http://localhost:3001/api/v1/inquiries`, config);
        
        const inquiryuniqueDates = new Set();
        const inquirydateCountMap = {};

        responseInquiries.data.inquiries.forEach(item => {
          const date = new Date(item.inquiryDate).toDateString();
          inquiryuniqueDates.add(date);
          inquirydateCountMap[date] = (inquirydateCountMap[date] || 0) + 1;
        });

        const inquiryDataWithCount = Array.from(inquiryuniqueDates).map(date => ({
          date,
          inputCount: inquirydateCountMap[date] || 0
        }));

        inquiryDataWithCount.sort((a, b) => new Date(a.date) - new Date(b.date));

        setInquiries(inquiryDataWithCount);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(() =>
      fetchData, 24 * 60 * 60 * 1000); // Fetch data every 24 hours
    return () => clearInterval(interval);
  }, [selectedMonth]);

  const maxInputCount = Math.max(
    ...[answer, followUp, replies, inquiries].flatMap(data => data.map(item => item.inputCount))
  );
  const maxInputCountAdjusted = Math.ceil(maxInputCount / 10) * 10;

  const options = {
    chart: {
      id: 'DAILY INTERACTION REPORT',
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
      data: answer.map(item => ({ x: new Date(item.date).getTime(), y: item.inputCount })),
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
