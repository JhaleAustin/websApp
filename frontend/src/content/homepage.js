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
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [all, setAll] = useState([]); 
  
  const [Benefits, setBenefits] = useState([]); 
  
  const [PeanutShell, setPeanutShell] =useState([]);
  const [Mulching, setMulching] = useState([]);
  const [peanutshellmulching, setpeanutshellmulching] = useState([]); 
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/`);
            //console.log("Data" , response.data.benefits);
            const benefits = response.data.benefits;

            const mulching = response.data.mulching;
            const peanuts = response.data.peanutshell;
            const Peanutshellmulching = response.data.peanutshellmulching;
            setBenefits(benefits);
            setMulching(mulching);
            setPeanutShell(peanuts);
            setpeanutshellmulching(Peanutshellmulching);
            console.log(":",PeanutShell[0].topic);
            // benefits,
            // mulching,
            // peanutshell,
            // peanutshellmulching
    
            // if (!topics || topics.length === 0) {
            //     console.log('NO TOPICS FOUND');
            //     setAll([]);
            //     setLoading(false);
            //     return;
            // }
    
            // console.log('Topics with Populated Fields:', topics);
            // setAll(topics);
            // setLoading(false);
        } catch (error) {
            console.error('ERROR FETCHING TOPICS:', error);
            setError('ERROR FETCHING TOPICS. PLEASE TRY AGAIN.');
            setLoading(false);
        }
    };
    

    fetchAll();
   
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`);
        // setMaterials(response.data.allmaterials[0].topic);
        // setLoading(false);
      } catch (error) {
        console.error('ERROR FETCHING MATERIALS:', error);
        setError('ERROR FETCHING MATERIALS. PLEASE TRY AGAIN.');
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);
  return (

<Fragment >
  <div     style={{ background: 'linear-gradient(to right, #f0cdaa, #816d50), rgba(0, 0, 0, 1)' }}
 >


<div class="hero_area"    style={{ background: 'linear-gradient(to right, #9caa58, #f0cdaa), rgba(0, 0, 0, 1)' }}
 >
   
    <section class="slider_section "  >
      <div class="container ">
        <div class="row">
          <div class="col-md-6 ">
            <div class="detail-box">
              {/* <h1>
              {PeanutShell[0].topic}
              </h1>
             <p>
               {PeanutShell[0].description} </p>
             */}
            </div>
          </div>
          <div class="col-md-6">
            <div class="img-box" style={{margin:100}}>
              <img src="https://th.bing.com/th/id/R.5d8287b39f5cafc8c4937fb20a56b0c9?rik=GSCnF4ov8ZbqIw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftransparent-peanut%2ftransparent-peanut-18.png&ehk=NSq5wcJJRVdLEsDGeHkNE0K9dZYaDmrcy8sofBS30vY%3d&risl=&pid=ImgRaw&r=0" alt=""/>
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
         
          {/* <h5 class="name">
          {PeanutShell[1].topic}
             
          </h5>
          <p>
               {PeanutShell[1].description}
              </p> */}
        </div>
        <div class="box active">
          
          <h5 class="name">
            Improve
          </h5>
          <p>
                when looking at its layout. The point of using Lorem Ipsum is
                that it has a more-or-less normal
              </p>
        </div>
        <div class="box">
         
          <h5 class="name">
            Maintain
          </h5>
          <p>
                when looking at its layout. The point of using Lorem Ipsum is
                that it has a more-or-less normal
              </p>
        </div>
      </div>
    </div>
  </section>



  <div>
      <div class="jumbotron text-center">
      <h1 class="display-4" style={{ fontFamily: 'Madimi One', position: 'relative' }}>
  <span style={{ borderBottom: '5px solid #006400', position: 'relative', display: 'inline-block', padding: '0 10px' }}>
    PEANUT SHELL
  </span>
</h1>
 </div>

      <div class="container">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Types of Peanuts</h5>
                  <p class="card-text">Learn about different types of peanuts and their characteristics.</p>
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Peanut Cultivation</h5>
                  <p class="card-text">Explore the process of growing and cultivating peanuts in fields.</p>
                </div>
              </div>
            </div>
          </div>

  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Peanut Products</h5>
          <p class="card-text">Discover various products made from peanuts, from peanut butter to snacks.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Nutritional Value</h5>
          <p class="card-text">Learn about the nutritional benefits of peanuts and how they contribute to a healthy diet.</p>
        </div>
      </div>
    </div>
  </div>
</div>

        <div class="row info-section">
          <div class="col-md-12">
            <h2 class="text-center">About Peanut shell as mulching</h2>
            <p class="text-center">Peanuts are also known as groundnuts and goobers. They belong to the legume family and are an excellent source of protein.</p>
          </div>
        </div>
      </div>

      <div class="container" >
     <div class="row fact-list mt-3 justify-content-center" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div class="col-md-8">
  <ul class="list-unstyled">
    
     <li class="fact-item">
     <div class="fact-list-container">
      <span class="fact-icon">&#10003;</span>
      Peanuts are not actually nuts; they are legumes.
      </div>
    </li>


    <li class="fact-item">
     <div class="fact-list-container">
      <span class="fact-icon">&#10003;</span>
      Peanuts are not actually nuts; they are legumes.
      </div>
    </li>

    <li class="fact-item">
     <div class="fact-list-container">
      <span class="fact-icon">&#10003;</span>
      Peanuts are not actually nuts; they are legumes.
      </div>
    </li>

    <li class="fact-item">
     <div class="fact-list-container">
      <span class="fact-icon">&#10003;</span>
      Peanuts are not actually nuts; they are legumes.
      </div>
    </li>

    <li class="fact-item">
     <div class="fact-list-container">
      <span class="fact-icon">&#10003;</span>
      Peanuts are not actually nuts; they are legumes.
      </div>
    </li>
   
  </ul>

          </div>
        </div>
      
      </div>

    

























 








 

    <div class="jumbotron2 text-center"
     style={{ background: 'linear-gradient(to right, #b8aa19, #006400), rgba(0, 0, 0, 0.5)' }}>
   
        <h1 class="display-4">Benefitst Peanuts</h1>
        <p class="lead">Discover interesting facts and information about peanuts!</p>
      

      


    <section className="feature-bottom-area pt-100 pb-100">
      <div className="container light-blue-violet-bg">
        <div className="row">
          <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
            <div className="count">
              <h1>01</h1>
            </div>
            <div className="desc">
              <h2 className="text-uppercase">Responsive View</h2>
              <p>
                Usage of the Internet is becoming more common due to the rapid advancement of technology and the power of globalization.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
            <div className="count">
              <h1>02</h1>
            </div>
            <div className="desc">
              <h2 className="text-uppercase">Multiple Layouts</h2>
              <p>
                Usage of the Internet is becoming more common due to the rapid advancement of technology and the power of globalization.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 single-feat2 d-flex justify-content-between align-items-top">
            <div className="count">
              <h1>03</h1>
            </div>
            <div className="desc">
              <h2 className="text-uppercase">Flexible Design</h2>
              <p>
                Usage of the Internet is becoming more common due to the rapid advancement of technology and the power of globalization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>





      </div>







      

      <section className="service-area pt-90 pb-90">
      <div className="container">
        <div className="row">

          
          <div className="col-md-4">
            <div className="single-service">
              <img className="d-block mx-auto img-fluid" src="https://th.bing.com/th/id/OIP.iAhcp6m_91O-ClK79h8EQQHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7" alt="" />
              <div className="desc">
                <h2 className="text-uppercase font-bold">The Importance of Food</h2>
                <p>
                  Usage of the Internet is becoming more common due to the rapid advancement of technology and the power of globalization. Societies globalization. Societies and the power of globalization. Societies globalization. Societies.
                </p>
                <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="single-service">
              <div className="desc">
                <h2 className="text-uppercase font-bold">The Importance of Food</h2>
                <p>
                  Usage of the Internet is becoming more common due to the rapid advancement of technology and the power of globalization. Societies globalization. Societies and the power of globalization. Societies globalization. Societies.
                </p>
                <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
              </div>
              <img className="d-block mx-auto img-fluid" src="https://th.bing.com/th/id/OIP.iAhcp6m_91O-ClK79h8EQQHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7" alt="" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="single-service">
              <img className="d-block mx-auto img-fluid" src="https://th.bing.com/th/id/OIP.iAhcp6m_91O-ClK79h8EQQHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7" alt="" />
              <div className="desc">
                <h2 className="text-uppercase font-bold">The Importance of Food</h2>
                <p>
                  Usage of the Internet is becoming more common due to the rapid advancement of technology and the power of globalization. Societies globalization. Societies and the power of globalization. Societies globalization. Societies.
                </p>
                <a className="text-uppercase view-details" href="#" style={{ backgroundColor: 'white', height: '30px', display: 'inline-block', padding: '5px 10px', margin: '10px 0' }}>View Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>

      

    </div>
</Fragment>
  );
}

export default Homepage;
