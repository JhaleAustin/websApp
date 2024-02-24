import React, { useState, useEffect } from 'react'; // Import useState from React
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import 'bulma/css/bulma.min.css';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

function Homepage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`);
        setMaterials(response.data.allmaterials);
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
    <div>
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
    </div>
  );
}

export default Homepage;
