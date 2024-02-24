
import React, { Fragment, useState } from "react";

import Chart from "react-apexcharts";

import Process_1 from "./process_1";

import Process_2 from "./process_2";
import "../../App.css";

function Process() {

 
   
    
     return (
       <Fragment>

 <Process_1/>
        <Process_2/>

  <div class="container mt-4">

  <div class="row mt-4">
    <div class="col-md-12 text-center">
      <h3>Additional Title at the Bottom</h3>
      <div class="center-video">
        <iframe width="1200" height="600" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
  <div class="row">  


    <div class="col-md-6 center-both">
      <h2>Your Content Goes Here</h2>
      <p>This is where your text content will be.</p>
    </div>
 
    <div class="col-md-6">
      <img src="https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15.jpg" alt="Your Image" class="img-fluid"/>
    </div>
  </div>


  <div class="row">  
    <div class="col-md-6">
      <img src="https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15.jpg" alt="Your Image" class="img-fluid"/>
    </div>
    
     <div class="col-md-6 center-both">
      <h2>Your Content Goes Here</h2>
      <p>This is where your text content will be.</p>
    </div>
 
   
  </div>


  <div class="row">  
    <div class="col-md-6 center-both">
      <h2>Your Content Goes Here</h2>
      <p>This is where your text content will be.</p>
    </div>
 
    <div class="col-md-6">
      <img src="https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15.jpg" alt="Your Image" class="img-fluid"/>
    </div>
  </div>
</div>
       </Fragment>
      )
    
  
}

export default Process;
