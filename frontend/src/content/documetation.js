
import React, { Fragment, useState } from "react";

import Chart from "react-apexcharts";
import "../App.css";

import 'bulma/css/bulma.min.css';
import Documentation_1 from "./documentation_1";

import Documentation_2 from "./documentation_2";
import AllMaterials from "./AllMaterials";

import Docu_Analysis from "./docu_analysis";
function Documentation() {

  return (
  <Fragment>
    <Documentation_2/>
    <div className="scroll-container">
      <Documentation_1 />
    </div>
    <Docu_Analysis/>
    
    
  </Fragment>
  );
}

export default Documentation;
