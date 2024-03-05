
import React, { Fragment, useState } from "react";

import "../../App.css";
import Header from '../../Components/Layout/Header'; 

import 'bulma/css/bulma.min.css';
import Documentation_1 from "./documentation_1";

import Docu_AnalysisHeight from "./docu_analysisHeight";

import Docu_AnalysisLeaves from "./docu_analysiLeaves";
function Documentation() {

  return (
  <Fragment>
    <Header />
     <div class="row">
      <div class="col-12 pfront1">
        <div class="container pfront2"> 
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 class="display-4" className='custom-font3' style={{margin:25}}>
              <span style={{ borderBottom: ' solid #164006', position: 'relative', display: 'inline-block'  }}>
                HEIGHT GROWTH ANALYSIS
              </span>
            </h1>
    
            <Docu_AnalysisHeight/>
          </div>    
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 class="display-4" className='custom-font3' style={{margin:25}}>
              <span style={{ borderBottom: 'solid #006400', position: 'relative', display: 'inline-block' }}>
                NUMBER OF LEAVES GROWTH ANALYSIS
              </span>
            </h1>
            <Docu_AnalysisLeaves/>
          </div> 

          <div className="mx-auto max-w-7xl px-6 lg:px-8 dataC">
            <h1 class="display-4" className='custom-font3'  style={{margin:25}}>
              <span style={{ borderBottom: 'solid #006400', position: 'relative', display: 'inline-block'  }}>
              DATA COLLECTION
              </span>
            </h1>
            <Documentation_1 />
          </div>
        </div>
      </div>
    </div>
  </Fragment>
  );
}

export default Documentation;
