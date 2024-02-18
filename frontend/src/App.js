import React, { useState, useEffect } from 'react'; // Import useState from React

import Nav from "./content/nav"; 

import carouselP from "./content/carouselPage"; 
import { Route } from 'react-router-dom';
function App() {





  return (
    <div>

      <Nav />
   <carouselP/>
     

    
    </div>
  );
}

export default App;
