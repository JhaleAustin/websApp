 
import Chart from "react-apexcharts";

import React, { Fragment, useState,useEffect } from "react";
import axios from 'axios';
 
import "../App.css";

function Docu_Analysis(handleMaterialChange) {
  const [materials, setMaterials] = useState([]);
  const [plantHeight1, setPlantHeight1] = useState([]);
  const [leavesLength, setLeavesLength] = useState([]);
  const [leavesWidth, setLeavesWidth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/Documentation`);
        console.log(response.data);
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

  // useEffect(() => {
  //   // Filter data where plantType is 'mulch'
  //   const mulchMaterials = materials.filter(material => material.plantType === 'With Mulch');
  //   console.log(mulchMaterials);
  //   // Extract heights and store in plantHeight1 array
  //   let heights = [];
    
  //   heights =  mulchMaterials.map(material => material.height);
  //   setPlantHeight1(heights);
  //   console.log(plantHeight1);
    
  // }, [materials]);



  const [plantHeightWithoutMulch, setPlantHeightWithoutMulch] = useState([]);
const [plantHeightWithMulch, setPlantHeightWithMulch] = useState([]);


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
  // Filter data where plantType is 'mulch'
  const mulchMaterials = materials.filter(material => material.plantType === 'With Mulch');
  console.log(mulchMaterials);

  // Extract heights and update state variables
  const heightsWithoutMulch = materials.map(material => material.height);
  const heightsWithMulch = mulchMaterials.map(material => material.height);

  setPlantHeightWithoutMulch(heightsWithoutMulch);
  setPlantHeightWithMulch(heightsWithMulch);
}, [materials]);


const [state, setState] = useState({
  
  selectedTimeframe: "week",
  options: {
    colors: ["#E91E63", "#FF9800"],
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
  },
  series: [
    {
      name: "Plant Without Mulch",
      data: [12,2,12,33,23,2],
    },
    {
      name: "Plant With Mulch",
      data: plantHeightWithMulch,
    },
  ],
});
useEffect(() => {
  console.log("State:", state);
}, [state]);

useEffect(() => {
  console.log("Plant Without Mulch:", plantHeightWithoutMulch);
  console.log("Plant With Mulch:", plantHeightWithMulch);
}, [plantHeightWithoutMulch, plantHeightWithMulch]);


    const [regressionState, setRegressionState] = useState(null);

  // const [state, setState] = useState({
  //   selectedTimeframe: "week",
  //   options: {
  //     colors: ["#E91E63", "#FF9800"],
  //     chart: {
  //       id: "basic-bar",
  //       events: {
  //         markerClick: function (event, chartContext, { seriesIndex, dataPointIndex }) {
  //           // Handle drag event here
  //           console.log("Marker clicked!", seriesIndex, dataPointIndex);
  //         },
  //       },
  //     },
  //     xaxis: {
  //       categories: getCategories("week"),
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Plant Without Mulch",
  //       data:plantHeight1,
  //     },
  //     {
  //       name: "Plant With Mulch",
  //       data: plantHeight1,
  //     },
  //   ],
  // });

  const handleTimeframeChange = (timeframe) => {
    setState((prev) => ({
      ...prev,
      selectedTimeframe: timeframe,
      options: {
        ...prev.options,
        xaxis: {
          categories: getCategories(timeframe),
        },
      },
      series: [
        { name: "Plant Without Mulch", data: calculatePlantHeight(1.5, 0.5, timeframe).withoutMulch },
        { name: "Plant With Mulch", data: calculatePlantHeight(1.5, 0.5, timeframe).withMulch },
      ],
    }));
  };

  const calculatePlantHeight = (growthRate, mulchFactor, timeframe) => {
    const numIntervals = 7;
    const currentDate = new Date();
    const daysInTimeframe = getDaysInTimeframe(timeframe, currentDate);

    const withoutMulchData = Array.from({ length: daysInTimeframe }, (_, index) => {
      
        const day = index + 1;
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + day);
      return (growthRate * day) + inputValues.plant1Height;
    });

    const withMulchData = Array.from({ length: daysInTimeframe }, (_, index) => {
      const day = index + 1;
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + day);
      return (growthRate * day) + mulchFactor +  inputValues.plant2Height;
    });

    return {
      withoutMulch: withoutMulchData,
      withMulch: withMulchData,
    };
  };

  const getDaysInTimeframe = (timeframe, currentDate) => {
    switch (timeframe) {
      case "week":
        return 7;
      case "month":
       return 31; 
      case "year":
         return 365;
      default:
        return 0;
    }
  };

  const [inputValues, setInputValues] = useState({
    plant1Height: 0,
    plant2Height: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

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
