import React, { useState, useEffect, Fragment } from 'react'; // Import useState from React
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import 'bulma/css/bulma.min.css';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function Homepage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [benefit, setBenefits] = useState([]);
  const [peanutshell, setPeanutShell] = useState([]);
  const [mulching, setMulching] = useState([]);
  const [peanutshellmulching, setPeanutShellMulching] = useState([]);

  useEffect(() => {

    const getAllHome = async () => {
      try {

        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/`);

        setBenefits(response.data.benefit);
        setMulching(response.data.mulching);
        setPeanutShell(response.data.peanutshell);
        setPeanutShellMulching(response.data.peanutshellmulching);

        // console.log(response.data.peanutshell)
        // console.log(response.data.benefit)
        // console.log(response.data.mulching)
        // console.log(response.data.peanutshellmulching)

        setLoading(false);

      } catch (error) {
        console.error('ERROR FETCHING TOPICS:', error);
        setError('ERROR FETCHING TOPICS. PLEASE TRY AGAIN.');

      }

    };

    getAllHome();

  }, [benefit, mulching, peanutshell, peanutshellmulching]);

  return (

    <Fragment >
      <div style={{ background: 'linear-gradient(to right, #9caa58, #f0cdaa), rgba(0, 0, 0, 1)' }}>


        <div class="hero_area" style={{ background: 'linear-gradient(to right, #9caa58, #f0cdaa), rgba(0, 0, 0, 1)' }}>

          <section class="slider_section "  >
            <div class="container ">
              <div class="row">
                <div class="col-md-6 ">
                  <div class="detail-box">
                    <h1>
                      {peanutshell[0] && peanutshell[0].topic}
                    </h1>
                    <p>
                      {peanutshell[0] && peanutshell[0].description}
                    </p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="img-box" style={{ margin: 100 }}>
                    <img src="https://th.bing.com/th/id/R.5d8287b39f5cafc8c4937fb20a56b0c9?rik=GSCnF4ov8ZbqIw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftransparent-peanut%2ftransparent-peanut-18.png&ehk=NSq5wcJJRVdLEsDGeHkNE0K9dZYaDmrcy8sofBS30vY%3d&risl=&pid=ImgRaw&r=0" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section class="feature_section" style={{ marginTop: 170 }}>
          <div class="container">
            <div class="feature_container" >
              <div class="box">

                <h1>
                  {peanutshell[1] && peanutshell[1].topic}
                </h1>
                <p>
                  {peanutshell[1] && peanutshell[1].description} </p>

              </div>
              <div class="box active">
                <h1>
                  {peanutshell[2] && peanutshell[2].topic}
                </h1>
                <p>
                  {peanutshell[2] && peanutshell[2].description} </p>

              </div>
              <div class="box">
                <h1>
                  {peanutshell[3] && peanutshell[3].topic}
                </h1>
                <p>
                  {peanutshell[3] && peanutshell[3].description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <div class="jumbotron text-center">
          <h1 class="display-4" className='custom-font2'>
            <span style={{ borderBottom: '5px solid #006400', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
              {mulching[0] && mulching[0].topic}
            </span>
          </h1>
          <div>
            <p className="custom-font">
              {mulching[0] && mulching[0].description}
            </p>
          </div>

          <div class="container">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{mulching[1] && mulching[1].topic}</h5>
                      <p class="card-text">{mulching[1] && mulching[1].description}</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{mulching[2] && mulching[2].topic}</h5>
                      <p class="card-text">{mulching[2] && mulching[2].description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{mulching[3] && mulching[3].topic}</h5>
                      <p class="card-text">{mulching[3] && mulching[3].description}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{mulching[4] && mulching[4].topic}</h5>
                      <p class="card-text">{mulching[4] && mulching[4].description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* <div class="row info-section">
            <div class="col-md-12">
              <h2 class="text-center">{peanutshellmulching[0] && peanutshellmulching[0].topic}</h2>
              <p class="text-center">{peanutshellmulching[0] && peanutshellmulching[0].description}</p>
            </div>
          </div>
        </div>

        <div class="container" >
          <div class="row fact-list mt-3 justify-content-center" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div class="col-md-8">
              <ul class="list-unstyled">

                <li class="fact-item">
                  <div class="fact-list-container">
                    <h2 class="text-center">{peanutshellmulching[0] && peanutshellmulching[0].topic}</h2>
                    <span class="fact-icon">&#10003;</span>
                    {peanutshellmulching[0] && peanutshellmulching[0].description}
                  </div>
                </li>


                <li class="fact-item">
                  <div class="fact-list-container">
                    <h2 class="text-center">{peanutshellmulching[0] && peanutshellmulching[0].topic}</h2>
                    <span class="fact-icon">&#10003;</span>
                    {peanutshellmulching[0] && peanutshellmulching[0].description}
                  </div>
                </li>

                <li class="fact-item">
                  <div class="fact-list-container">
                    <h2 class="text-center">{peanutshellmulching[0] && peanutshellmulching[0].topic}</h2>
                    <span class="fact-icon">&#10003;</span>
                    {peanutshellmulching[0] && peanutshellmulching[0].description}</div>
                </li>

                <li class="fact-item">
                  <div class="fact-list-container">
                    <h2 class="text-center">{peanutshellmulching[0] && peanutshellmulching[0].topic}</h2>
                    <span class="fact-icon">&#10003;</span>
                    {peanutshellmulching[0] && peanutshellmulching[0].description}</div>
                </li>

                <li class="fact-item">
                  <div class="fact-list-container">
                    <h2 class="text-center">{peanutshellmulching[0] && peanutshellmulching[0].topic}</h2>
                    <span class="fact-icon">&#10003;</span>
                    {peanutshellmulching[0] && peanutshellmulching[0].description}
                  </div>
                </li>

              </ul>

            </div>
          </div>
*/}



        </div>
      </div> 


      <h1 class="display-4" className='custom-font2'>
  <span style={{ borderBottom: '5px solid #006400', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
    &hellip; A peanutshell mulching technique for gardening &hellip;
  </span>
</h1>


      <section className="service-area pt-90 pb-90">
        <div className="container">
          <div className="row">


            <div className="col-md-4">
              <div className="single-service">
                <img className="d-block mx-auto img-fluid" src="https://assets.newatlas.com/dims4/default/84d485f/2147483647/strip/true/crop/1024x683+0+0/resize/1160x774!/quality/90/?url=https:%2F%2Fassets.newatlas.com%2Farchive%2Fpeanut-shell-air-filter-3.jpg" alt="" />
                <div className="desc">
                  <h2 className="text-uppercase font-bold">{peanutshellmulching[0] && peanutshellmulching[0].topic}</h2>
                  <p>
                    {peanutshellmulching[0] && peanutshellmulching[0].description} </p>
                {/* <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
                */}  </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="single-service">
                <div className="desc">
                  <h2 className="text-uppercase font-bold">{peanutshellmulching[1] && peanutshellmulching[1].topic}</h2>
                  <p>
                    {peanutshellmulching[1] && peanutshellmulching[1].description} </p>
                {/* <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
                */}   </div>
                <img className="d-block mx-auto img-fluid" src="https://www.budscape.net/wp-content/uploads/2018/02/peanut-shells-uses-homemade-organic-mulch.jpg" alt="" />
              </div>
            </div>

            <div className="col-md-4">
              <div className="single-service">
                <img className="d-block mx-auto img-fluid" src="https://th.bing.com/th/id/OIP.iAhcp6m_91O-ClK79h8EQQHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7" alt="" />
                <div className="desc">
                  <h2 className="text-uppercase font-bold">{peanutshellmulching[2] && peanutshellmulching[2].topic}</h2>
                  <p>
                    {peanutshellmulching[2] && peanutshellmulching[2].description} </p>
                  {/* <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
                */}</div> 
              </div>

            </div>
          </div>
        </div>
      </section>









      <div class="jumbotron2 text-center" >
        <h1 class="display-4">BENEFIT OF USING PEANUTSHELL & MULCHING</h1>
        {/* <p class="lead">{benefit[0] && benefit[0].description}</p> */}


        <section className="feature-bottom-area pt-100 pb-100">
          <div className="container light-blue-violet-bg">
            <div className="row">
              <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
                <div className="count">
                  <h1>01</h1>
                </div>
                <div className="desc">
                  <h2 className="text-uppercase">{benefit[0] && benefit[0].topic}</h2>
                  <p>
                    {benefit[0] && benefit[0].description}    </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
                <div className="count">
                  <h1>02</h1>
                </div>
                <div className="desc">
                  <h2 className="text-uppercase">{benefit[1] && benefit[1].topic}</h2>
                  <p>
                    {benefit[1] && benefit[1].description}    </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
                <div className="count">
                  <h1>03</h1>
                </div>
                <div className="desc">
                  <h2 className="text-uppercase">{benefit[2] && benefit[2].topic}</h2>
                  <p>
                    {benefit[2] && benefit[2].description}    </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
                <div className="count">
                  <h1>03</h1>
                </div>
                <div className="desc">
                  <h2 className="text-uppercase">{benefit[3] && benefit[3].topic}</h2>
                  <p>
                    {benefit[3] && benefit[3].description}    </p>
                </div>
              </div>


              <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
                <div className="count">
                  <h1>03</h1>
                </div>
                <div className="desc">
                  <h2 className="text-uppercase">{benefit[4] && benefit[4].topic}</h2>
                  <p>
                    {benefit[4] && benefit[4].description}    </p>
                </div>
              </div>


              <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
                <div className="count">
                  <h1>03</h1>
                </div>
                <div className="desc">
                  <h2 className="text-uppercase">{benefit[5] && benefit[5].topic}</h2>
                  <p>
                    {benefit[5] && benefit[5].description}    </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

   


    </Fragment>
  );
}

export default Homepage;
