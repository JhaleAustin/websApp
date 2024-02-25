import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import Chart from "react-apexcharts";

import Process_1 from "./process_1";

import Process_2 from "./process_2";
import "../../App.css";

function Process() {

  const [process, setProcesss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/Processs`);
        console.log(response.data);
        setProcesss(response.data.Processs);
        setLoading(false);
      } catch (error) {
        console.error('ERROR FETCHING MATERIALS:', error);
        setError('ERROR FETCHING MATERIALS. PLEASE TRY AGAIN.');
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

   
    
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



  {process.map((processs, index) => (
  <>   
    <div class="row">  
      <div class={`col-md-6 ${index % 2 === 0 ? 'center-both' : ''}`}>
        <h2>{processs.title}</h2>
        <p>This is where your text content will be.</p>
      </div>
      <div class="col-md-6">
           
      {processs.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt=""
                      class="img-fluid"
                        
                      style={{ width: '1000px', height: '500px' }} />
                  ))}  </div>
    </div>

    <div class="row">  
      <div class="col-md-6">

    
      {processs.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt=""
                      class="img-fluid"
                        
                      style={{ width: '1000px', height: '500px' }} />
                  ))}

          </div>
      <div class={`col-md-6 ${index % 2 !== 0 ? 'center-both' : ''}`}>
      <h2>{processs.title}</h2>
        <p>This is where your text content will be.</p>
      </div>
    </div>
  </>           
))}
</div>
       </Fragment>
      )
    
  
}

export default Process;
