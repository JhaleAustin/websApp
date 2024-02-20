
import React, { Fragment, useState,useEffect } from "react";
import axios from 'axios';

import Chart from "react-apexcharts";
import "../App.css";

function Documentation_1(handleMaterialChange) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const  response  = await axios.get(`http://localhost:3001/api/v1/Documentation`);

        console.log(response.data);
        setMaterials(response.data.Documentations);
       setLoading(false);
      } catch (error) {
        console.error('ERROR FETCHING MATERIALS:', error);
        setError('ERROR FETCHING MATERIALS. PLEASE TRY AGAIN.');
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const features = [
    { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
    { name: 'Material', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
    { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
    { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
    { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
    { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
  ]
  
return (
  <Fragment>
    <a class="uk-button uk-button-default" href="#modal-center" uk-toggle>Open</a>

<div id="modal-center" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <button class="uk-modal-close-default" type="button" uk-close></button>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    </div>
</div>
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
     {materials.map((material) => (
      <div
        key={material.id}
        className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8"
        style={{ maxHeight: '800px', overflowY: 'auto', border: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
           <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{material.plantType}</h2>
            {/* <p className="mt-4 text-gray-500">
              The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated
              steel divider separates active cards from new ones, or can be used to archive important task lists.
            </p> */}
  
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8"> 
          <div key={material.height} className="border-t border-gray-200 pt-4">
             <dt className="font-medium text-gray-900">Height</dt>
             <dd className="mt-2 text-sm text-gray-500">{material.height}</dd>
          </div>
          <div key={material.height} className="border-t border-gray-200 pt-4">
             <dt className="font-medium text-gray-900">leaves</dt>
             <dd className="mt-2 text-sm text-gray-500">
          
          <table class="uk-table uk-table-hover uk-table-divider">
    <thead>
        <tr>
            <th>Length</th>
            <th>Width</th>
        </tr>
    </thead>
    <tbody>
    {/* Your mapping logic here */}
    {material.leaves.map((leaf, index) => (
      <tr key={index}>
        <td>{leaf.length}</td>
        <td>{leaf.width}</td>
      </tr>
    ))}
  </tbody>
</table>

          
          

             </dd>
          </div>
            </dl>

          </div>
          
          
         
          <div className="">
  {material.images.map((img, index) => (
    <img
      key={index}
      src={img.url}
      alt=""
      className="rounded-lg bg-gray-100"
      style={{ width: '1000px', height: '500px' }}
    />
  ))}
</div>

        </div>
        ))}
      </div>
  
  </Fragment>
  );
}

export default Documentation_1;
