 
import Chart from "react-apexcharts";

import regression from "regression";
import React, { Fragment, useState,useEffect } from "react";
import axios from 'axios';
 
import "../../App.css";

function Docu_Analysis(handleMaterialChange) {
  const [materials, setMaterials] = useState([]);
  const [plantHeight1, setPlantHeight1] = useState([]);
  const [leavesLength, setLeavesLength] = useState([]);
  const [leavesWidth, setLeavesWidth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const [plantHeightWithMulch, setPlantHeightWithMulch] = useState([]);

  const [plantHeightWithoutMulch, setPlantHeightWithoutMulch] = useState([]);

  
const getCategories = (timeframe) => {
  const numIntervals = 7;
  switch (timeframe) {
    case "week":
      return Array.from({ length: 7 }, (_, index) => `Day ${index + 1}`);
    case "month":
      return Array.from({ length: 31 }, (_, index) => `Day ${index + 1}`);
    case "year":
      // return Array.from({ length: 365 }, (_, index) => `Year ${index + 1}`);
    default:
      return [];
  }
};

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/Documentation`);
        console.log("Data" , response.data.Documentations);
        setMaterials(response.data.Documentations);
        setLoading(false);
      } catch (error) {
        console.error('ERROR FETCHING MATERIALS:', error);
        setError('ERROR FETCHING MATERIALS. PLEASE TRY AGAIN.');
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);





const [state, setState] = useState({
  selectedTimeframe: "week",
  options: {
    colors: ["#E91E63", "#FF9800", "#2196F3"], // Add color for the regression line
    chart: {
      id: "basic-bar",
      events: {
        markerClick: function (event, chartContext, { seriesIndex, dataPointIndex }) {
          // Handle drag event here
          console.log("Marker clicked!", seriesIndex, dataPointIndex);
        },
      },
    },
    xaxis: {
      categories: getCategories("week"),
    },
    yaxis: {
      min: 0,
      tickAmount: 6, // Adjust based on your preference
    },
  },
  series: [
    {
      name: "Plant Without Mulch",
      data: plantHeightWithoutMulch.map((value) => parseFloat(value)),
    },
    {
      name: "Plant With Mulch",
      data: plantHeightWithMulch.map((value) => parseFloat(value)),
    },
    // Add an empty series for the regression line
    {
      name: "Regression Line",
      type: "line",
      data: [], // The data points for the regression line will be added dynamically
    },
  ],
});



useEffect(() => {
  // Update the series data when plantHeightWithMulch changes
  setState((prevState) => ({
    ...prevState,
    series: [
      {
        ...prevState.series[0],
        data: plantHeightWithoutMulch.map((value) => parseFloat(value)),
       },
      {
        ...prevState.series[1],
        data: plantHeightWithMulch.map((value) => parseFloat(value)),
      },
    ],
  }));
}, [plantHeightWithMulch]);


 

useEffect(() => {
// Filter data where plantType is 'mulch'
const getwithMulch = materials.filter(material => material.plantType === 'With Mulch');
const heightsWithMulch = getwithMulch.map(material => material.height);
setPlantHeightWithMulch(heightsWithMulch);


const getwithoutMulch = materials.filter(material => material.plantType === 'Without Mulch');
const getwithoutMulchHeight = getwithoutMulch.map(material => material.height);

setPlantHeightWithoutMulch(getwithoutMulchHeight);

}, [materials]);



useEffect(() => {
  // Calculate regression line data
  const regressionDataWithoutMulch = regression.linear(
    plantHeightWithoutMulch.map((value, index) => [index, parseFloat(value)])
  );
  const regressionDataWithMulch = regression.linear(
    plantHeightWithMulch.map((value, index) => [index, parseFloat(value)])
  );

  // Update the state with regression line data
  setState((prevState) => ({
    ...prevState,
    series: [
      ...prevState.series.slice(0, 3), // Keep the first two series
      {
        name: "Regression Line - Without Mulch",
        type: "line",
        data: regressionDataWithoutMulch.points.map((point) => point[1]),
      },
      {
        name: "Regression Line - With Mulch",
        type: "line",
        data: regressionDataWithMulch.points.map((point) => point[1]),
      },
    ],
  }));
}, [plantHeightWithoutMulch, plantHeightWithMulch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Plant Growth Chart</h1>
    
    <div className="centeredDiv">
          <div className="row">
            <div className="col-8">
          

              <Chart options={state.options} series={state.series} type="area" width="850" />
            </div>
          </div>
        </div>
      </header>



    </div>
  );
}

export default Docu_Analysis;
