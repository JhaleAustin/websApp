import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'uikit/dist/css/uikit.min.css';
import navBar from "./content/nav";
function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3; // Update this with the total number of slides

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const shiftSlides = () => {
    const nextIndex = (activeSlide + 1) % totalSlides;
    setActiveSlide(nextIndex);
  };

  return (
    <div> 
              <navBar/>


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
      

      <div className="uk-child-width-1-2 uk-child-width-1-4@s uk-grid-match" uk-grid>
        <div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(0)}>
          <div className="uk-card uk-card-default uk-card-body uk-animation-slide-right-medium">
            <p className="uk-text-center">Slide 1</p>
          </div>
        </div>
        <div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(1)}>
          <div className="uk-card uk-card-default uk-card-body uk-animation-slide-right-medium">
            <p className="uk-text-center">Slide 2</p>
          </div>
        </div>
        <div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(2)}>
          <div className="uk-card uk-card-default uk-card-body uk-animation-slide-right-medium">
            <p className="uk-text-center">Slide 3</p>
          </div>
        </div>
        <div className="uk-animation-toggle" tabIndex="0" onClick={shiftSlides}>
          <div className="uk-card uk-card-default uk-card-body uk-animation-slide-right-medium">
            <p className="uk-text-center">Shift Slides</p>
          </div>
        </div>
      </div>


      <div class="uk-slider-container-offset" uk-slider>

    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">

        <ul class="uk-slider-items uk-child-width-1-2@s uk-grid">
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/photo.jpg" width="1800" height="1200" alt=""/>
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/dark.jpg" width="1800" height="1200" alt=""/>
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/light.jpg" width="1800" height="1200" alt=""/>
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/photo2.jpg" width="1800" height="1200" alt=""/>
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/photo3.jpg" width="1800" height="1200" alt=""/>
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>
        </ul>

        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href uk-slidenav-next uk-slider-item="next"></a>

    </div>

    <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>

</div>





<div class="tile is-ancestor">
  <div class="tile is-parent">
    <article class="tile is-child box">
      <p class="title">Side column</p>
      <p class="subtitle">With some content</p>
      <div class="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
      </div>
    </article>
  </div>
  <div class="tile is-parent is-8">
    <article class="tile is-child box">
      <p class="title">Main column</p>
      <p class="subtitle">With some content</p>
      <div class="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
      </div>
    </article>
  </div>
</div>
    </div>
  );
}

export default App;
