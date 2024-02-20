import React, { useState, useEffect } from 'react'; // Import useState from React

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import UIkit from 'uikit';
import 'bulma/css/bulma.min.css';
function Homepage() {


  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3; // Update this with the total number of slides

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const shiftSlides = () => {
    const nextIndex = (activeSlide + 1) % totalSlides;
    setActiveSlide(nextIndex);
  };


  useEffect(() => {
      const slider = UIkit.slider('.uk-slider-container-offset');


      return () => {
          slider.$destroy();
        };
      }, []); // Empty dependency array to run the effect once when the component mounts




  return (
    <div>

      <Carousel activeIndex={activeSlide} onSelect={(selectedIndex) => goToSlide(selectedIndex)} id="carouselExampleSlidesOnly" className="slide" interval={5000} controls={false}>
        <Carousel.Item>
          {/* First slide content */}
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x250"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          {/* Second slide content */}
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x250"
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          {/* Third slide content */}
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x250"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>


      <div className="tile is-ancestor" style={{ height: '500px' }}>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">Side column</p>
            <p className="subtitle">With some content</p>
            <div className="content">
           <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/640x480.png"/>
          </figure>
           </div>
        </article>
     
        </div>

        
        <div className="tile is-parent is-8">




        <div className="tile is-child box" style={{ width: '100%' }}> {/* Set initial width to 100% */}
        <div className="uk-slider-container-offset" uk-slider>
        <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1">
        <ul className="uk-slider-items uk-child-width-1-2@s uk-grid">
        <li>
          <div className="uk-card uk-card-default">
            <div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(0)}>
              <div className="uk-card-body">
                <h3 className="uk-card-title">Headline 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              </div>
             </div>
          </div>
          </li>
          <li>
          <div className="uk-card uk-card-default">
          <div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(1)}>
          <div className="uk-card-body">
          <h3 className="uk-card-title">Headline 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          </div>
          </div>
          </li>

          <li>
          <div className="uk-card uk-card-default">

          <div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(2)}>
          <div className="uk-card-body">
              <h3 className="uk-card-title">Headline 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
          </div>
          
          </div>
          </li>

          <li>
          <div className="uk-card uk-card-default">

          <div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(0)}>
          <div className="uk-card-body">
              <h3 className="uk-card-title">Headline 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
          </div>
          
          </div>
          </li>

          <li>
          <div className="uk-card uk-card-default">

          <div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(1)}>
          <div className="uk-card-body">
              <h3 className="uk-card-title">Headline 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
          </div>
          
          </div>
          </li>
          
        </ul>

        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="true" uk-slider-item="previous"></a>
        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next={true} uk-slider-item="next"></a>
      </div>

      <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>



    <div class="tile is-parent" style={{ height: '55%' }}>
      <article class="tile is-child notification is-danger">
        <p class="title">Wide tile</p>
        <p class="subtitle">Aligned with the right tile</p>
        <div class="content">
           Content 
        </div>
      </article>
    </div>
  




          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
