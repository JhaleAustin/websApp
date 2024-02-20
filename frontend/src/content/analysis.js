
import React, { Fragment, useState } from "react";

import Analysis_1 from "./analysis_1";
import Analysis_2 from "./analysis_2";
import Analysis_3 from "./analysis_3";
import Chart from "react-apexcharts";
import "../App.css";
function Analysis() {
  return (
    <Fragment>
      <Analysis_1/>
      <Analysis_2/>
      <Analysis_3/>
    </Fragment>
  );
}

export default Analysis;
