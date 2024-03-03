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
                  <div class="col-md-6">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                      <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          {processes[0] && processes[0].title}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                          {processes[0] && processes[0].content}
                        </p>      
                      </div>
                    </div>
                  </div>    
                  
                  <div class="col-md-6" id="right-video">
                      <iframe width="720" height="360" style={{ marginTop: 50 }} src="https://www.youtube.com/embed/cxmA6k6d4h4" frameborder="0" allowfullscreen></iframe>
                  </div>
                </div>

                <div class="row step">
                <div class="col-md-6">
                    <iframe width="95%" height="350" style={{ marginTop: 50, marginLeft: 37 }} src="https://www.youtube.com/embed/rvy65Z6v77g" frameborder="0" allowfullscreen></iframe>
                  </div>
                  <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                      <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          {processes[1] && processes[1].title}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                          {processes[1] && processes[1].content}
                        </p>                  </div>
                      </div>
                    </div>
                </div>  
      
                <div class="row step">
                <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                      <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          {processes[2] && processes[2].title}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                          {processes[2] && processes[2].content}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                      <iframe width="95%" height="350" style={{ marginTop: 50 }} src="https://www.youtube.com/embed/QuWQ-ihdlU8" frameborder="0" allowfullscreen></iframe>
                  </div>  
                </div>

                <div class="row step">
                  <div class="col-md-6">
                    <iframe width="95%" height="350" style={{ marginTop: 50, marginLeft: 37 }} src="https://www.youtube.com/embed/LuWgFLx4ySk" frameborder="0" allowfullscreen></iframe>
                  </div>
                  <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                      <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          {processes[3] && processes[3].title}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                          {processes[3] && processes[3].content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Fragment>
  )
  


}

export default Process;
