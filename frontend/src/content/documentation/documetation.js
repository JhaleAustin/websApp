
import React, { Fragment, useState } from "react";

import Chart from "react-apexcharts";
import "../../App.css";

import 'bulma/css/bulma.min.css';
import Documentation_1 from "./documentation_1";

import Documentation_withoutMulch from "./documentation_withoutMulch";

import Docu_AnalysisHeight from "./docu_analysisHeight";

import Docu_AnalysisLeaves from "./docu_analysiLeaves";
function Documentation() {

  return (
  <Fragment>
     <div    style={{ background: 'linear-gradient(to right, #9caa58, #f0cdaa), rgba(0, 0, 0, 1)' }}
  >
      <div className=" py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 class="display-4" className='custom-font2' style={{margin:50}}>
            <span style={{ borderBottom: '5px solid #006400', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
             Height Analysis
            </span>
          </h1>
    <Docu_AnalysisHeight/>
    </div> </div>  


    <div className=" py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 class="display-4" className='custom-font2' style={{margin:50}}>
            <span style={{ borderBottom: '5px solid #006400', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
             Leaves Analysis
            </span>
          </h1>
    <Docu_AnalysisLeaves/>
    </div> </div>  



    <div className="scroll-container">
    <h1 class="display-4" className='custom-font2' style={{margin:50}}>
            <span style={{ borderBottom: '5px solid #006400', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
             WITH MULCH
            </span>
          </h1>
      <Documentation_1 />
    </div>
  

 
    <div className="scroll-container">
    <h1 class="display-4" className='custom-font2' style={{margin:50}}>
            <span style={{ borderBottom: '5px solid #006400', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
             WITHOUT MULCH
            </span>
          </h1>
      <Documentation_withoutMulch />
    </div>
  

 
    </div>
  </Fragment>
  );
}

export default Documentation;
