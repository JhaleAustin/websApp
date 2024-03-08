import React, { useState, useEffect, Fragment } from 'react'; // Import useState from React
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import 'bulma/css/bulma.min.css';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

import Slider from 'react-slick';
import Header from '../Components/Layout/Header';  // Add this line
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
      <Header />
      <div class="row">
        <div class="col-12 pfront1">
          <div class="container pfront2">
            <div class="homepageP">
              <div class="hero_area">
                <section class="slider_section "  >
                  <div class="container ">
                    <div class="row">
                      <div class="col-md-6 ">
                        <div class="detail-box">        
                          <h1 className="text-uppercase">
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

              <section class="feature_section">
                <div class="container">
                  <div class="feature_container" >
                    <div class="box">

                      <h1 className="text-uppercase">
                        {peanutshell[1] && peanutshell[1].topic}
                      </h1>
                      <p>
                        {peanutshell[1] && peanutshell[1].description} </p>

                    </div>
                    <div class="box active">
                      <h1 className="text-uppercase">
                        {peanutshell[2] && peanutshell[2].topic}
                      </h1>
                      <p>
                        {peanutshell[2] && peanutshell[2].description} </p>

                    </div>
                    <div class="box">
                      <h1 className="text-uppercase">
                        {peanutshell[3] && peanutshell[3].topic}
                      </h1>
                      <p>
                        {peanutshell[3] && peanutshell[3].description}
                      </p>
                    </div> 
                  </div>
                  <a className="sources" href="https://foodsnutrients.com/what-is-the-use-of-peanut-shells/">CLICK TO VIEW SOURCE</a>
                </div>
                   
                <hr></hr>
              </section>

            
            </div>

            
            <div class="homepageM">
              <div class="jumbotron text-center">
                <h1 class="display-4" className='custom-font2  text-uppercase'>
                  <span>
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
                            <h5 class="card-title text-uppercase">{mulching[1] && mulching[1].topic}</h5>
                            <p class="card-text">{mulching[1] && mulching[1].description}</p>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title text-uppercase">{mulching[2] && mulching[2].topic}</h5>
                            <p class="card-text">{mulching[2] && mulching[2].description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title text-uppercase">{mulching[3] && mulching[3].topic}</h5>
                            <p class="card-text">{mulching[3] && mulching[3].description}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title text-uppercase">{mulching[4] && mulching[4].topic}</h5>
                            <p class="card-text">{mulching[4] && mulching[4].description}</p>
                          </div>
                        </div>
                      </div>
                      <a className="sourcesY" href="https://homesteadandchill.com/garden-mulch-101/">CLICK TO VIEW SOURCE</a>

                    </div>

                  </div>


                </div>
                
              </div>
              
            </div> 
            <hr></hr>
           
            <div class="homepagePSM">
              <h1 class="display-4" className='custom-font3  text-uppercase'>
                <span style={{ borderBottom: '5px solid #164006', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
                  &hellip; A peanutshell mulching technique for gardening &hellip;
                </span>
              </h1>

              <section className="service-area pt-90 pb-90">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="single-service">
                        <img className="d-block mx-auto img-fluid" src="images/1.jpg" alt="" />
                        <div className="desc">
                          <h2 className="text-uppercase">{peanutshellmulching[0] && peanutshellmulching[0].topic}</h2>
                          <p>
                            {peanutshellmulching[0] && peanutshellmulching[0].description} </p>
                        {/* <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
                        */}  </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="single-service active">
                        <div className="desc">
                          <h2 className="text-uppercase">{peanutshellmulching[1] && peanutshellmulching[1].topic}</h2>
                          <p>
                            {peanutshellmulching[1] && peanutshellmulching[1].description} </p>
                        {/* <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
                        */}   </div>
                        <img className="d-block mx-auto img-fluid" src="images/2.jpg" alt="" />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="single-service">
                        <img className="d-block mx-auto img-fluid" src="images/3.jpg" alt="" />
                        <div className="desc">
                          <h2 className="text-uppercase">{peanutshellmulching[2] && peanutshellmulching[2].topic}</h2>
                          <p>
                            {peanutshellmulching[2] && peanutshellmulching[2].description} </p>
                          {/* <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
                        */}</div> 
                      </div>

                    </div>
                  </div>
                </div>
              </section>
              
            </div>
            <hr></hr>

            <div class="homepageB">
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
                          <h1>04</h1>
                        </div>
                        <div className="desc">
                          <h2 className="text-uppercase">{benefit[3] && benefit[3].topic}</h2>
                          <p>
                            {benefit[3] && benefit[3].description}    </p>
                        </div>
                      </div>


                      <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
                        <div className="count">
                          <h1>05</h1>
                        </div>
                        <div className="desc">
                          <h2 className="text-uppercase">{benefit[4] && benefit[4].topic}</h2>
                          <p>
                            {benefit[4] && benefit[4].description}    </p>
                        </div>
                      </div>


                      <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
                        <div className="count">
                          <h1>06</h1>
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
                <a className="sourcesX" href="https://offgridgrandpa.com/benefits-of-mulching/">CLICK TO VIEW SOURCE</a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Homepage;
