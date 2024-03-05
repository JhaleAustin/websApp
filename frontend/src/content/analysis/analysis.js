import React, { Fragment, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import Header from '../../Components/Layout/Header';  // Add this line


function Analysis() {

  const [withMulch, setWithMulch] = useState([]);
  
  
  const [meanWM, setmeanwM] = useState();
  const [meanWwM, setmeanWwM] = useState([]);
  const [predictwitouthM, setpredictwithoutM] = useState();
  const [predictwithM, setpredictwithM] = useState([]);
  const [withoutMulch, setWithoutMulch] = useState([]);
  const [plantHeight1, setPlantHeight1] = useState([]);
  const [leavesLength, setLeavesLength] = useState([]);
  const [leavesWidth, setLeavesWidth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [plantHeightWithMulch, setPlantHeightWithMulch] = useState([]);

  const [plantHeightWithoutMulch, setPlantHeightWithoutMulch] = useState([]);

 
 
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/Documentations2`);
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


 


  const getCategories = (timeframe) => {
    const numIntervals = 7;
    switch (timeframe) {
      case "Day":
        return Array.from({ length: 15 }, (_, index) => `Day ${index + 1}`);
       default:
        return [];
    }
  };

  const [state, setState] = useState({
    selectedTimeframe: "Day",
    options: {
      colors: ["#abc32f", "#E4ED22"],
      chart: {
        id: "Predictive Growth Analysis",
        events: {
          markerClick: function (event, chartContext, { seriesIndex, dataPointIndex }) {
            // Handle drag event here
            console.log("Marker clicked!", seriesIndex, dataPointIndex);
          },
        },
      },
      xaxis: {
        categories: getCategories("Day"),
        labels: {
          style: {
            colors: 'white',
          },
        },
      },
      yaxis: {
        min: 0,
        tickAmount: 6,
        labels: {
          style: {
            colors: 'white',
          },
        },
      },
      
    },
    series: [
      {
        name: "HEIGHT",
        data: [],
      },
      {
        name: "NUMBER OF LEAVES",
        data: [],
      }
    ],
  });

  const [inputValues, setInputValues] = useState({
    height: 0,
    numberLeaves:0
  });

  const [inputs, setInputs] = useState([]);


  const handleInputChange = (key, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  //  setPlantHeightWithoutMulch([...plantHeightWithoutMulch, inputValues.height]);
    let prev = 0,prevIndex=0,h2=0;

    let meanWithMulch = 0, sumWithMulch = 0;
    let meanWithoutMulch = 0,sumWithoutMulch=0;

  
    plantHeightWithMulch.map((withM, index) => {
      if (index >= 1) {
        meanWithMulch += withM;
        sumWithMulch += 1;
      }
    });
    
    meanWithMulch = parseFloat((meanWithMulch / sumWithMulch).toFixed(2));
 
    
  console.log("List Leaves :",plantHeightWithoutMulch);
  
      plantHeightWithoutMulch.map((withouM, index) => {
        if (index >= 1) { 
            meanWithoutMulch += withouM;
            sumWithoutMulch += 1;
         
        }
      });
      meanWithoutMulch = parseFloat((meanWithoutMulch / sumWithoutMulch).toFixed(2));
      console.log("List Leaves MEAN:",meanWithoutMulch);
  

const predictions = [];

for (let i = 0; i < withMulch.length; i++) {
    if (i < 1) {
        const currentHeight = parseFloat(inputValues.height);
        prev = currentHeight;
        predictions.push(parseFloat(currentHeight.toFixed(2)));
    } else {
        const result = prev + ((prev + meanWithMulch) - prev) / ((i + 1) - i);
     
        prev = prev + meanWithMulch;
        predictions.push(parseFloat(result.toFixed(2)));
         }
}


const predictions2 = [];

for (let i = 0; i < withoutMulch.length; i++) {
    if (i < 1) {
        const currentHeight = parseFloat(inputValues.numberLeaves);
        prev = currentHeight;
        console.log("Result WITHOUT  : ",prev);
   
        predictions2.push(parseFloat(currentHeight.toFixed(2)));
         } else {
        const result = prev + ((prev + meanWithoutMulch) - prev) / ((i + 1) - i);
        console.log("Result WITHOUT  : ", prev);
        prev = prev + meanWithoutMulch;
        predictions2.push(parseFloat(result.toFixed(2)));
        console.log("Result WITHOUT  : ", prev);
   }
}

// setpredictwithM(predictions);

// console.log("Predicted Analysis : ",predictwithM);

//    //setpredictwithoutM
     
   setState((prevState) => ({
     ...prevState,
     series: [
       {
         ...prevState.series[0],
         data: predictions.map((value) => parseFloat(value)),
       },
       {
         ...prevState.series[1],
         data: predictions2.map((value) => parseFloat(value)),
       }
     ],
   }));
  };

  
useEffect(() => {

  let prev = 0,prevIndex=0;
   const heightsWithMulch22 = withMulch.map((wMulch, index) => {
    if (index < 1) {
      const currentHeight = wMulch.height;
      prev = currentHeight; 
      prevIndex=0;
   
    } else {
       const height2 =wMulch.height;
       
      const result = height2 - prev ;
      prev = height2 ;
     
      return parseFloat(result.toFixed(2));
    }
  });

  setPlantHeightWithMulch(heightsWithMulch22);
  
   
  const resultAnalysisWithoutMulch = withMulch.map((withouM, index) => {
    if (index < 1) {
      const currentHeight = withouM.numOfLeaves;
      prev = currentHeight; 
      prevIndex=0;
   
    } else {
       const height2 =withouM.numOfLeaves;
       
      const result = height2 - prev ;
      prev = height2 ;
     
      return parseFloat(result.toFixed(2));
    }
  });

  setPlantHeightWithoutMulch(resultAnalysisWithoutMulch);
   
  console.log("All lEAVES",plantHeightWithoutMulch);
  }, [withMulch]);
  
  
  

  return (
    <Fragment>
      <Header />

      <div class="row analysisT">
        <div class="col-md-9">          
          <p>
            “Begin a journey of improved vegetable development with the use of peanut shells as mulch, supported by our advanced predictive analysis technology. Inputting essential information such as plant height and leaf count yields a thorough 14-day growth forecast graph, providing useful insights into the probable outcomes of your gardening methods. Witness the exciting potential of data-driven decision-making as our computers solve the complex relationship between peanut shell mulching and plant development. Our user-friendly interface enables you to make informed decisions, resulting in more resilient and healthier crops. With our innovative predictive analysis, 
              you can take your cultivation experience to the next level.”
          </p> 
        </div>
              
        <div className="col-md-3">
          <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label id="heightx">HEIGHT:</label>
            <input
              className="form-control"
              type="number"
              name="height"
              placeholder="Height"
              value={inputValues.height}
               onChange={(e) => handleInputChange('height', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label id="leaves">NUMBER OF LEAVES:</label>
            <input
              className="form-control"
              type="number"
              name="numberLeaves"
              value={inputValues.numberLeaves}
              onChange={(e) => handleInputChange('numberLeaves', e.target.value)}
            />
          </div>
                      
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
        </div>
      </div>
        
      <div class="row ana">
        <div className="register-photo container">
                  <div className="form-container">
                    <div className="image-holder">
                      <h1>PREDICTIVE GROWTH ANALYSIS OF PETCHAY USING PEANUT SHELL MULCHING</h1>
                      <div className="chart-container">
                        <Chart options={state.options} series={state.series} type="area" width="1000px" />
                      </div>
                    </div>


                    
                  </div>
        </div>
      </div>
        
      
    </Fragment>
  );
}

export default Analysis;
