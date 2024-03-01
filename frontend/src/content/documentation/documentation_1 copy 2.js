import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import Chart from "react-apexcharts";
import "../../App.css";
import UIkit from 'uikit';

function Documentation_1(handleMaterialChange) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/Documentations`);
        console.log("Datat",response.data);
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

  const openModal = (material) => {
    setSelectedMaterial(material);
    const modal = UIkit.modal("#modal-center");
    if (modal) {
      modal.show();
    }
  };

  return (
    <Fragment>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        {materials.map((material) => (

          <><div class="container text-center">
            <div class="row">
              <div class="col-sm-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {material.plantType}</h2>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">

               
 <button className="uk-button" onClick={() => openModal(material)}>
              <div
                key={material.id}
                className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8"
                style={{ maxHeight: '800px', maxWidth: '1000px', overflowY: 'auto', border: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
              >


                <div className="">
                  {material.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt=""
                      className="rounded-lg bg-gray-100"
                      style={{ width: '1000px', height: '500px' }} />
                  ))}
                </div>
              </div>
            </button>
              </div>

            </div>

          </div></> 
         
        ))}
      </div>

      <div id="modal-center" className="uk-flex-top" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button className="uk-modal-close-default" type="button" uk-close></button>
          {selectedMaterial && (
            <div className="scroll-container">
              <p>
                {/* Display details from selectedMaterial */}
                Height: {selectedMaterial.height}
                Leaves:
                <table className="uk-table uk-table-hover uk-table-divider">
                  {/* Mapping logic for leaves */}
                  {selectedMaterial.leaves.map((leaf, index) => (
                    <tr key={index}>
                      <td>{leaf.length}</td>
                      <td>{leaf.width}</td>
                    </tr>
                  ))}
                </table>
              </p>
              {/* ... other details */}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Documentation_1;