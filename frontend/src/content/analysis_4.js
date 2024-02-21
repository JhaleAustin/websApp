import React, { Fragment, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import regression from "regression";

function Analysis() {

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
        categories: getCategories("week"),
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
      },
      {
        name: "Regression Line - Without Mulch",
        type: "line",
        data: [],
      },
      {
        name: "Regression Line - With Mulch",
        type: "line",
        data: [],
      },
    ],
  });

  const [inputValues, setInputValues] = useState({
    height: 0,
  });

  const [inputs, setInputs] = useState([]);

  const [plantHeightWithoutMulch, setPlantHeightWithoutMulch] = useState([]);
  const [plantHeightWithMulch, setPlantHeightWithMulch] = useState([]);

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
        {
          ...prevState.series[0],
          data: plantHeightWithoutMulch.map((value) => parseFloat(value)),
        },
        {
          ...prevState.series[1],
          data: plantHeightWithMulch.map((value) => parseFloat(value)),
        },
        {
          ...prevState.series[2],
          data: regressionDataWithoutMulch.points.map((point) => point[1]),
        },
        {
          ...prevState.series[3],
          data: regressionDataWithMulch.points.map((point) => point[1]),
        },
      ],
    }));
  }, [plantHeightWithoutMulch, plantHeightWithMulch]);

  const handleInputChange = (key, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to update plantHeightWithoutMulch and plantHeightWithMulch based on form values
    // For example, push the height value to the respective arrays
    setPlantHeightWithoutMulch([...plantHeightWithoutMulch, inputValues.height]);
    // Reset input values
    setInputValues({
      height: 0,
    });
  };

  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, { length: '', width: '' }]);
  };

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

              <div className="scroll-container">
                <button type="button" onClick={addInput}>
                  Add Leaves
                </button>
                {inputs.map((value, index) => (
                  <div key={index} className="form-row">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="number"
                        name="length"
                        placeholder="Length"
                        value={value.length}
                        onChange={(e) => handleInputChange(index, 'length', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        className="form-control"
                        type="number"
                        name="width"
                        placeholder="Width"
                        value={value.width}
                        onChange={(e) => handleInputChange(index, 'width', e.target.value)}
                      />
                    </div>

                    <button type="button" onClick={() => removeInput(index)}>
                      x
                    </button>
                  </div>
                ))}
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
