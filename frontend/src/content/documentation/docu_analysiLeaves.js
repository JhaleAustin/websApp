 
import Chart from "react-apexcharts";

import regression from "regression";
import React, { Fragment, useState,useEffect } from "react";
import axios from 'axios';
 
import "../../App.css";

function Docu_Analysis(handleMaterialChange) {
  const [withMulch, setWithMulch] = useState([]);
  
  const [withoutMulch, setWithoutMulch] = useState([]);
  const [plantHeight1, setPlantHeight1] = useState([]);
  const [leavesLength, setLeavesLength] = useState([]);
  const [leavesWidth, setLeavesWidth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/Documentations2`);
        console.log("Data" , response.data.withMulch);
        setWithMulch(response.data.withMulch);
        setWithoutMulch(response.data.withoutMulch);
        setLoading(false);
      } catch (error) {
        console.error('ERROR FETCHING MATERIALS:', error);
        setError('ERROR FETCHING MATERIALS. PLEASE TRY AGAIN.');
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);



  const [plantHeightWithMulch, setPlantHeightWithMulch] = useState([]);

  const [plantHeightWithoutMulch, setPlantHeightWithoutMulch] = useState([]);

  
const getCategories = (timeframe) => {
  const numIntervals = 7;
  switch (timeframe) {
    case "Day":
      return Array.from({ length: 14 }, (_, index) => `Day ${index + 1}`);
    default:
      return [];
  }
};

  const [state, setState] = useState({
    selectedTimeframe: "Day",
    options: {
      colors:  ["#abc32f", "#E4ED22"],
      chart: {
        id: "Predictive Growth Analysis ",
        events: {
          markerClick: function (event, chartContext, { seriesIndex, dataPointIndex }) {
            // Handle drag event here
            console.log("Marker clicked!", seriesIndex, dataPointIndex);
          },
        },
      },
      legend: {
        labels: {
          colors: 'white', // Color for the legend text
          letterSpacing: '2px'
        },
      },
      xaxis: {
        categories: getCategories("week"),
        labels:
        {
          style: {
            colors: 'white',
          },
        }
      },
      yaxis: {
        min: 0,
        tickAmount: 6, // Adjust based on your preference
        labels: {
          formatter: function (value) {
            // Format the y-axis labels to two decimal places
            return parseFloat(value).toFixed(2);
          },
          style: {
            colors: 'white',
          },
        },
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
    ],
  });

  // useEffect(() => {
  //   // Filter data where plantType is 'mulch'
  //   const mulchMaterials = materials.filter((material) => material.plantType === 'With Mulch');
  //   console.log("Mulchinggg", mulchMaterials);
  //   // Extract heights and update state variables
  //   const heightsWithMulch = mulchMaterials.map((material) => material.height);
  //   setPlantHeightWithMulch(heightsWithMulch);
  //   console.log("Planting", plantHeightWithMulch);
  // }, [materials]);

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



 
useEffect(() => {

// let prev = 0;
// let prevIndex = 0;

// const heightsWithMulch22 = heightsWithMulch.map((material, index) => {

//   console.log("TEIRLADAS",material)
//   if (index < 1) {
//     console.log(index)
//     // If it's the first iteration, just return the current height
//     const currentHeight = material;
//     prev = currentHeight;
//     prevIndex = index; // Set prev for the next iteration
//     return currentHeight ;
//   } else {
//     console.log("Index",index)
 
//     // For subsequent iterations, calculate using the sum of the first and second heights
//     const height1 = prev;
//     const height2 = material;
//     console.log("height1",height1,"height2",height2)
 
//     const result = height1 + (height2+height1) / (index-prevIndex);
//     prev = height2; // Update prev for the next iteration
//     return result ;
//   }
// });
// console.log("Leg result:",heightsWithMulch22)
//   setPlantHeightWithMulch(heightsWithMulch22);
let prev = 0,prevIndex=0;
 const heightsWithMulch22 = withMulch.map((wMulch, index) => {
  if (index < 1) {
    const currentHeight = wMulch.numOfLeaves;
    prev = currentHeight; 
    prevIndex=0;
     return currentHeight;
  } else {
     const height2 =wMulch.numOfLeaves;
    const result = prev + (height2 - prev) / ((index+1) - prevIndex);
    prev = result; 
    return Math.round(result);

  }
});
setPlantHeightWithMulch(heightsWithMulch22);

 
const resultAnalysisWithoutMulch = withoutMulch.map((withouM, index) => {
  if (index < 1) {
  
    const currentHeight = withouM.numOfLeaves;
    prev = currentHeight; 
    prevIndex=0;
   
    return currentHeight;
  } else {
    const height2 = withouM.numOfLeaves;
    const result = prev + (height2 - prev) / ((index+1) - prevIndex);
    prev = result; 
    return Math.round(result);

  }
});
setPlantHeightWithoutMulch(resultAnalysisWithoutMulch);

}, [withMulch]);






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
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Plant Growth Chart</h1>
    
    // <div className="centeredDiv">
    //       <div className="row">
    //         <div className="col-8">
          

    //           <Chart options={state.options} series={state.series} type="area" width="850" />
    //         </div>
    //       </div>
    //     </div>
    //   </header>



    // </div>



<div className="register-photo2" >
<div className="form-container">
  <div className="image-holder">
    <div className="chart-container">
      <Chart options={state.options} series={state.series} type="area" width="1000px" />
    </div>
  </div> 
</div>
</div>
  );
}

export default Docu_Analysis;
