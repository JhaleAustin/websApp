import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import Header from '../../Components/Layout/Header';  // Add this line


function Process() {

  const [processes, setProcesss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProcess = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/process`);
        console.log(response.data);
        setProcesss(response.data.process);
        setLoading(false);

      } catch (error) {
        console.error('ERROR FETCHING PROCESS:', error);
        setError('ERROR FETCHING PROCESS. PLEASE TRY AGAIN.');
        setLoading(false);
      }
    };

    getProcess();
  }, []);



  return (
    <Fragment>
      <Header />

          <div class="row">
            <div class="col-12 pfront1">
              <div class="container pfront2">
                <div class="row">
                  <div class="col-md-12 text-center">
                    <div class="center-video">
                      <iframe width="1200" height="600" src="https://www.youtube.com/embed/wXTmnv9Povg" frameborder="0" allowfullscreen></iframe>
                    </div>
                  </div>
                </div>
              
                <div class="row step">
                  <div class="col-md-4 desc">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                          {processes[0] && processes[0].title}
                        </h2>
                        <p className="mt-3">
                          {processes[0] && processes[0].content}
                        </p>      
                     
                  </div>    
                  
                  <div class="col-md-8 desc" id="right-video">
                      <iframe width="720" height="360" src="https://www.youtube.com/embed/cxmA6k6d4h4" frameborder="0" allowfullscreen></iframe>
                  </div>
                </div>

                <div class="row step">
                  <div class="col-md-8 desc" id="left-video">
                    <iframe width="720" height="360" src="https://www.youtube.com/embed/rvy65Z6v77g" frameborder="0" allowfullscreen></iframe>
                  </div>
                  <div class="col-md-4 desc" id="ldesc">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {processes[1] && processes[1].title}
                    </h2>
                    <p className="mt-3">
                      {processes[1] && processes[1].content}
                    </p>               
                  </div>
                </div>  
      
                <div class="row step">
                  <div class="col-md-4 desc">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {processes[2] && processes[2].title}
                    </h2>
                    <p className="mt-3">
                      {processes[2] && processes[2].content}</p>
                  </div>
                    
                  <div class="col-md-8 desc" id="right-video">
                    <iframe width="720" height="360" src="https://www.youtube.com/embed/QuWQ-ihdlU8" frameborder="0" allowfullscreen></iframe>
                  </div>  
                </div>

                <div class="row step">
                  <div class="col-md-8 desc" id="left-video">
                    <iframe width="720" height="360" src="https://www.youtube.com/embed/LuWgFLx4ySk" frameborder="0" allowfullscreen></iframe>
                  </div>
                  <div class="col-md-4 desc" id="ldesc">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {processes[3] && processes[3].title}
                    </h2>
                    <p className="mt-3">
                      {processes[3] && processes[3].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Fragment>
  )
  


}

export default Process;
