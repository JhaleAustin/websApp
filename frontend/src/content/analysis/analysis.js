import React, { Fragment, useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import Header from '../../Components/Layout/Header';  
import { toast } from 'react-toastify';


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

  const [plantLeavesWithMulch, setPlantLeavesWithMulch] = useState([]);

  const chartContainerRef = useRef(null);
  const [harvestLabel, setHarvestLabel] = useState('');
 
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
      legend: {
        labels: {
          colors: 'white',
          letterSpacing: '2px'
        },
      },
      chart: {
        id: "Predictive Growth Analysis",
        events: {
          markerClick: function (event, chartContext, { seriesIndex, dataPointIndex }) {
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

  const newAnalysis = async (formData) => {
    try {
      const { data } = await axios.post(`http://localhost:3001/api/v1/analysis`, formData);
      console.log("Analysis result:", data); // Assuming the server responds with the result
    } catch (error) {
      console.error(error);
    }
  };


  const handleInputChange = (key, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (inputValues.height <= 0 || inputValues.numberLeaves <= 0) {
      toast.error("INPUTS MUST BE GREATER THAN 0");
      return;
    }

    let  height = parseFloat(inputValues.height);
    let  numOfLeaves = inputValues.numberLeaves;
      
    
    const formData = {
      height: parseFloat(inputValues.height),
      numOfLeaves: parseInt(inputValues.numberLeaves),
    };
    
    await newAnalysis(formData);
    

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
 
 
      plantLeavesWithMulch.map((withouM, index) => {
        if (index >= 1) { 
            meanWithoutMulch += withouM;
            sumWithoutMulch += 1;
         
        }
      });
      meanWithoutMulch = parseFloat((meanWithoutMulch / sumWithoutMulch).toFixed(2));
     

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
      predictions2.push(Math.round(currentHeight));
       } else {
      const result = prev + ((prev + meanWithoutMulch) - prev) / ((i + 1) - i);
      prev = prev + meanWithoutMulch;
      predictions2.push(Math.round(result));
    }

// let  height = parseFloat(inputValues.height);
// let  numOfLeaves = inputValues.numberLeaves;
  

// const formData = {
//   height: parseFloat(inputValues.height),
//   numOfLeaves: parseInt(inputValues.numberLeaves),
// };

// await newAnalysis(formData);

}



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

   const lastPredictionHeight = predictions[predictions.length - 1];

   if (lastPredictionHeight >= 20 && lastPredictionHeight <= 30) {
     setHarvestLabel("READY TO HARVEST");
   } else if (lastPredictionHeight > 30) {
     setHarvestLabel("YOUR PETCHAY PLANT WILL START TO DECAY");
   } else {
     setHarvestLabel('');
   }

   if (chartContainerRef.current) {
    chartContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  
  setInputValues({
    height: 0,
    numberLeaves: 0,
  });

 
  
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

  console.log("WITHOUT" , heightsWithMulch22);
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

  setPlantLeavesWithMulch(resultAnalysisWithoutMulch);
   
  console.log("All lEAVES",plantLeavesWithMulch);
  }, [withMulch]);
  
  
  

  return (
    <Fragment>
      <Header />

      <div class="row analysisT">
        <div class="col-md-9">          
          <p>
            “Begin a journey of improved vegetable development with the use of peanut shells as mulch, 
              supported by our advanced predictive growth analysis. 
              Inputting essential information such as plant height and leaf count,
              a thorough 15-day growth prediction analysis, providing useful insights into the 
              probable outcomes of your petchay plant growth. Witness the exciting potential of 
              data-driven decision-making as our system solve the complex relationship between 
              peanut shell mulching and plant development. Our user-friendly interface 
              enables you to make informed decisions, resulting in more resilient and healthier crops. 
              With our innovative predictive analysis, 
              you can take your cultivation experience to the next level. 
              Keep in mind that your pechay plant used loam soil and should have already matured,
              exhibiting both height and leaf.”
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
        
      <div class="row ana" ref={chartContainerRef}>
        <div className="register-photo container">
                  <div className="form-container">
                    <div className="image-holder">
                      <h1>PREDICTIVE GROWTH ANALYSIS OF PETCHAY USING PEANUT SHELL MULCHING</h1>
                      <div className="chart-container">
                        <Chart options={state.options} series={state.series}  type="area" width="1000px" />
                      </div>
                      {harvestLabel && (
                          <div style={{ marginTop: '10px', color: 'white' }}>{harvestLabel}</div>
                        )}
                    </div>


                    
                  </div>
        </div>
      </div>
        
      
    </Fragment>
  );
}

export default Analysis;