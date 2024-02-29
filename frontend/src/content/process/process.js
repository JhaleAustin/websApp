import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';

function Process() {

  const [process, setProcesss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/process`);
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
    <div   style={{ background: 'linear-gradient(to right, #b8aa19, #006400), rgba(0, 0, 0, 1)' }}
    />
      <div class="container mt-4">

        <div class="row mt-4">
          <div class="col-md-12 text-center">

            <div class="center-video">
              <iframe width="1200" height="600" src="https://www.youtube.com/embed/4hXNXb6o7y8" frameborder="0" allowfullscreen></iframe>
            </div>

            <div class="row" style={{ margin: 20 }}>
              <div class="col-md-6 d-flex align-items-center justify-content-center">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">

                {process.length > 1 && (

<div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">



  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
    {process[0].title}
  </h2>
  <p className="mt-6 text-lg leading-8 text-gray-300">
    {process[0].content}</p>

</div>
)}



                </div>
              </div>



              <div class="col-md-6">
                <iframe width="95%" height="350" style={{ marginTop: 50 }} src="https://www.youtube.com/embed/ANOTHER_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>








            <div class="row" style={{ margin: 20 }}>
              <div class="col-md-6">
                <iframe width="95%" height="350" style={{ marginTop: 50, marginLeft: 37 }} src="https://www.youtube.com/embed/ANOTHER_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
              </div>
              <div class="col-md-6 d-flex align-items-center justify-content-center">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">

                  {process.length > 1 && (

                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">



                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {process[0].title}
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-gray-300">
                        {process[0].content}</p>

                    </div>
                  )}


                </div>
              </div>
            </div>
            {/* 
<div class="row">
  <div class="col-md-6 d-flex align-items-center justify-content-center">
    {process.length > 1 && (
      <div class="card" style={{ height: '200px', width: '300px' }}>
        <div class="card-body text-center">
          <h5 class="card-title">{process[0].title}</h5>
          <p class="card-text">{process[0].content}</p>
        </div>
      </div>
    )}
  </div>
  <div class="col-md-6">
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/ANOTHER_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
  </div>
</div> */}



          </div>
        </div>
      </div>









    </Fragment>
  )


}

export default Process;
