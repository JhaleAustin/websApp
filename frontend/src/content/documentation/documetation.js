
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
        <h1 class="display-4" className='custom-font2' style={{margin:25}}>
            <span style={{ borderBottom: ' solid #006400', position: 'relative', display: 'inline-block'  }}>
             Height Analysis
            </span>
          </h1>
    <Docu_AnalysisHeight/>
    </div>    


        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 class="display-4" className='custom-font2' style={{margin:25}}>
            <span style={{ borderBottom: 'solid #006400', position: 'relative', display: 'inline-block' }}>
             Leaves Analysis
            </span>
          </h1>
    <Docu_AnalysisLeaves/>
    </div> 


    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      
  <h1 class="display-4" className='custom-font2'  style={{margin:25}}>
            <span style={{ borderBottom: 'solid #006400', position: 'relative', display: 'inline-block'  }}>
             WITH MULCH
            </span>
          </h1>
          </div>
      <Documentation_1 />
   
  

 
    {/* <h1 class="display-4" className='custom-font2' style={{margin:50}}>
            <span style={{ borderBottom: '5px solid #006400', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
             WITHOUT MULCH
            </span>
          </h1>
      <Documentation_withoutMulch />
    

  */}
    </div>
    </div>
    </div>
  </Fragment>
  );
}

export default Documentation;
