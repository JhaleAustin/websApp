import React, { Fragment, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
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
        return Array.from({ length: 14 }, (_, index) => `Day ${index + 1}`);
       default:
        return [];
    }
  };

  const [state, setState] = useState({
    selectedTimeframe: "Day",
    options: {
      colors: ["#E91E63", "#FF9800", "#2196F3"],
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
        categories: getCategories("Day"),
      },
      yaxis: {
        min: 0,
        tickAmount: 6,
      },
    },
    series: [
      {
        name: "Plant Without Mulch",
        data: [],
      },
      {
        name: "Plant With Mulch",
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
 
    

      plantHeightWithoutMulch.map((withouM, index) => {
        if (index >= 1) { 
            meanWithoutMulch += withouM;
            sumWithoutMulch += 1;
         
        }
      });
    
      meanWithoutMulch = parseFloat((meanWithoutMulch / sumWithoutMulch).toFixed(2));
    console.log("MEAN WITHOUT", meanWithoutMulch);
    
//     for (let i = 0; i < withMulch.length; i++) {
//       if (i < 1) {
//         const currentHeight = parseFloat(inputValues.height);
//         prev = currentHeight;
//         setpredictwithM(parseFloat(currentHeight.toFixed(2)));
        
// console.log("Current  : ",currentHeight);
//       } else {
//         const result = prev + ((prev + meanWithMulch)-prev) / ((i + 1) - i);
//         prev = prev + meanWithMulch;
        
// console.log("Result  : ",result);
//      setpredictwithM(parseFloat(result.toFixed(2)));
//          }
//     }

// console.log("Predicted Analysis : ",predictwithM);


const predictions = [];

for (let i = 0; i < withMulch.length; i++) {
    if (i < 1) {
        const currentHeight = parseFloat(inputValues.height);
        prev = currentHeight;
        predictions.push(parseFloat(currentHeight.toFixed(2)));
        console.log("Current  : ", currentHeight);
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

  console.log("Plant With " ,heightsWithMulch22);

  setPlantHeightWithMulch(heightsWithMulch22);
  
   
  const resultAnalysisWithoutMulch = withoutMulch.map((withouM, index) => {
    if (index < 1) {
      const currentHeight = withouM.height;
      prev = currentHeight; 
      prevIndex=0;
   
    } else {
       const height2 =withouM.height;
       
      const result = height2 - prev ;
      prev = height2 ;
     
      return parseFloat(result.toFixed(2));
    }
  });
  setPlantHeightWithoutMulch(resultAnalysisWithoutMulch);
   
  console.log("Plant Height WithMulch :",plantHeightWithMulch);

  
  console.log("Plant Height Without Mulch :",plantHeightWithMulch);

  }, [withMulch]);
  
  
  

  return (
    <Fragment>
      <div className="register-photo">
        <div className="form-container">
          <div className="image-holder">
            <h1>Plant Growth Chart</h1>
            <div className="chart-container">
              <Chart options={state.options} series={state.series} type="area" width="1000px" />
            </div>
          </div>

          <div className="container2">
            <form onSubmit={handleFormSubmit}>
              <h2 className="text-center">
                <strong>Independent Variable</strong>
              </h2>
              <div className="form-group">
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
                <input
                  className="form-control"
                  type="number"
                  name="numberLeaves"
                  placeholder="HeinumberLeavesght"
                  value={inputValues.numberLeaves}
                  onChange={(e) => handleInputChange('numberLeaves', e.target.value)}
                />
              </div>
            

              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Analysis;
