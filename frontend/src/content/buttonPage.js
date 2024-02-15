import React, { useEffect } from 'react';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import UIkit from 'uikit';
function ButtonPage({ goToSlide  }) {
   useEffect(() => {
    // Initialize the UIkit slider
    const slider = UIkit.slider('.uk-slider-container-offset');

    // Optionally, you can add some additional options for the slider
    // const options = { /* your options here */ };
    // UIkit.slider('.uk-slider-container-offset', options);

    // Clean up when the component is unmounted
    return () => {
      slider.$destroy();
    };
  }, []); // Empty dependency array to run the effect once when the component mounts

  return (
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

<div className="uk-animation-toggle" tabIndex="0" onClick={() => goToSlide(0)}>
<div className="uk-card-body">
    <h3 className="uk-card-title">Headline 1</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
  </div>
</div>
 
</div>
          </li>
         
         
          {/* Add more slider items as needed */}
        </ul>

        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
      </div>

      <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>
  );
}

export default ButtonPage;
