
import React, { Fragment, useState } from "react";

import Chart from "react-apexcharts";
import "../App.css";

function Analysis() {
    const [regressionState, setRegressionState] = useState(null);

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
        data: Array.from({ length: 7 }, (_, index) => 10),
      },
      {
        name: "Plant With Mulch",
        data: Array.from({ length: 7 }, (_, index) => 10),
      },
    ],
  });

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

    <Fragment>
  
     
  <div className="register-photo">
    <div className="form-container">


    <div className="image-holder">
  <h1>Plant Growth Chart</h1> <div className="chart-container">
   
    <Chart options={state.options} series={state.series} type="area" width="1000px" />
  </div>
</div>




<div class="container text-center">
 

    <form method="post">
                <h2 class="text-center"><strong>Create</strong> an account.</h2>
                <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email"/></div>
                <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password"/></div>
                <div class="form-group"><input class="form-control" type="password" name="password-repeat" placeholder="Password (repeat)"/></div>
                <div class="form-group">
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox"/>I agree to the license terms.</label></div>
                </div>
                <div class="form-group"><button class="btn btn-primary btn-block" type="submit">Sign Up</button></div><a href="#" class="already">You already have an account? Login here.</a>
                </form>
 </div> </div>

</div>
   
      </Fragment>
  );
}

export default Analysis;
