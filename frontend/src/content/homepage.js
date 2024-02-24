import React, { useState, useEffect } from 'react'; // Import useState from React

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import UIkit from 'uikit';
import 'bulma/css/bulma.min.css';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

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

  const features = [
    {
      name: 'Push to deploy.',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'SSL certificates.',
      description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
      icon: LockClosedIcon,
    },
    {
      name: 'Database backups.',
      description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
      icon: ServerIcon,
    },
  ]
  
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



     

    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                iste dolor cupiditate blanditiis ratione.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>




    <div class="jumbotron text-center">
  <h1 class="display-4">All About Peanuts</h1>
  <p class="lead">Discover interesting facts and information about peanuts!</p>
</div>

<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <img src="https://th.bing.com/th/id/OIP.bpJTixcJ9eRwEFjKsApJ8QHaEo?rs=1&pid=ImgDetMain" class="card-img-top" alt="Peanut Image"/>
        <div class="card-body">
          <h5 class="card-title">Types of Peanuts</h5>
          <p class="card-text">Learn about different types of peanuts and their characteristics.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <img src="https://th.bing.com/th/id/OIP.bpJTixcJ9eRwEFjKsApJ8QHaEo?rs=1&pid=ImgDetMain" class="card-img-top" alt="Peanut Field"/>
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
        <img src="https://th.bing.com/th/id/OIP.bpJTixcJ9eRwEFjKsApJ8QHaEo?rs=1&pid=ImgDetMain" class="card-img-top" alt="Peanut Products"/>
        <div class="card-body">
          <h5 class="card-title">Peanut Products</h5>
          <p class="card-text">Discover various products made from peanuts, from peanut butter to snacks.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <img src="https://th.bing.com/th/id/OIP.bpJTixcJ9eRwEFjKsApJ8QHaEo?rs=1&pid=ImgDetMain" class="card-img-top" alt="Peanut Nutrition"/>
        <div class="card-body">
          <h5 class="card-title">Nutritional Value</h5>
          <p class="card-text">Learn about the nutritional benefits of peanuts and how they contribute to a healthy diet.</p>
        </div>
      </div>
    </div>
  </div>

   <div class="row info-section">
    <div class="col-md-12">
      <h2 class="text-center">Did You Know?</h2>
      <p class="text-center">Peanuts are also known as groundnuts and goobers. They belong to the legume family and are an excellent source of protein.</p>
    </div>
  </div>
</div>


<div class="container">
   <div class="row fact-list mt-3 justify-content-center">
    <div class="col-md-8">
      <ul class="list-unstyled">
        <li class="fact-item">
          <span class="fact-icon">&#10003;</span>
          Peanuts are not actually nuts; they are legumes.
        </li>
        <li class="fact-item">
          <span class="fact-icon">&#10003;</span>
          The peanut plant originated in South America.
        </li>
        <li class="fact-item">
          <span class="fact-icon">&#10003;</span>
          Peanut butter was first introduced at the 1904 World's Fair.
        </li>
        <li class="fact-item">
          <span class="fact-icon">&#10003;</span>
          Peanuts are rich in monounsaturated fats, the type of fat that is emphasized in the heart-healthy Mediterranean diet.
        </li>
        <li class="fact-item">
          <span class="fact-icon">&#10003;</span>
          The peanut plant flowers above the ground, but the peanut grows below the ground.
        </li>
        <li class="fact-item">
          <span class="fact-icon">&#10003;</span>
          The peanut is also known as the groundnut and goober pea.
        </li>
        <li class="fact-item">
          <span class="fact-icon">&#10003;</span>
          Peanuts are a good source of protein, fiber, and various essential nutrients.
        </li>
      </ul>
    </div>
  </div>
 
</div>




    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
              molestiae. Numquam corrupti in laborum sed rerum et corporis.”
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              className="mx-auto h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">Judith Black</div>
              <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <div className="text-gray-600">CEO of Workcation</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>








    </div>
  );
}

export default Homepage;
