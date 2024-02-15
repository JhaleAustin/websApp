import React, { useState, useEffect } from 'react'; // Import useState from React

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CarouselPage() { // Use PascalCase for the component name
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
    </div>
  );
}

export default CarouselPage; // Export CarouselPage with the corrected name
