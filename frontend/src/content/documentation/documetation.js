
import React, { Fragment, useState } from "react";

import Chart from "react-apexcharts";
import "../../App.css";

import 'bulma/css/bulma.min.css';
import Documentation_1 from "./documentation_1";

import Documentation_2 from "./documentation_2";

import Docu_Analysis from "./docu_analysis";
function Documentation() {

  return (
  <Fragment>
     <div    style={{ background: 'linear-gradient(to right, #9caa58, #f0cdaa), rgba(0, 0, 0, 1)' }}
  >
    <Documentation_2/>
    <div className="scroll-container">
      <Documentation_1 />
    </div>
    <div className=" py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
         
    <Docu_Analysis/>
    </div> </div>  

 
    </div>
  </Fragment>
  );
}

export default Documentation;
