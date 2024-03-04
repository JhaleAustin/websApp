import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import Chart from "react-apexcharts";
import "../../App.css";
import UIkit from 'uikit';

function Documentation_1(handledocuChange) {
  const [withMulch, setWithMulch] = useState([]);

  const [withoutMulch, setWithoutMulch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedocu, setselectedocu] = useState(null);

  useEffect(() => {
    const fetchwithMulch = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/Documentations2`);
        console.log("Datat", response.data);

        setWithoutMulch(response.data.withoutMulch);
        setLoading(false);
      } catch (error) {
        console.error('ERROR FETCHING documentation:', error);
        setError('ERROR FETCHING documentation. PLEASE TRY AGAIN.');
        setLoading(false);
      }
    };

    fetchwithMulch();
  }, []);

  const openModal = (docu2) => {
    setselectedocu();
    setselectedocu(docu2);

    console.log("Select", selectedocu);
    const modal = UIkit.modal("#modal-center");
    if (modal) {
      modal.show();
    }
  };

  return (
    <Fragment>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">




        {withoutMulch.map((docu) => (

          <><div class="container text-center"
            style={{
              padding: 20,
              background: 'linear-gradient(to right, #b8ab9c, #c19c89, #a7836c)',
              border: '1px solid #ccc', // Border style and color
              boxShadow: '0 20px 20px rgba(0, 0, 0, 0.5)', // Box shadow with 10px distance
              borderRadius: '10px', // Border radius
            }}>
            <div class="row">
              <div class="col-sm-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {docu.plantType}</h2>
              </div>
              <p style={{ fontSize: 'medium', fontFamily: 'Inconsolata, sans-serif' }}>
                {docu.collectionDate}
              </p>
              <div className="uk-text-center">
              <p style={{ fontSize: '16px', background: 'linear-gradient(90deg, rgba(0,255,0,0.5), rgba(255,255,0,0.5))', color: '#000000', padding: '8px' }}>
               
                  {/* Display details from selectedocu */}
                  Height: {docu.height}
                </p>
                <p style={{ fontSize: '16px', background: 'linear-gradient(90deg, rgba(0,255,0,0.5), rgba(255,255,0,0.5))', color: '#000000', padding: '8px' }}>
                  {/* Display details from selectedocu */}
                  Leaves : {docu.numOfLeaves}</p>
                <table className="uk-table uk-table-hover uk-table-divider" style={{ height:100,backgroundColor: 'lightgreen', borderColor: 'lightyellowgreen' }}>
                  {/* Header row */}
                  <thead>
                    <tr>
                      <th>Length</th>
                      <th>Width</th>
                    </tr>
                  </thead>
                  {/* Mapping logic for leaves with alternating colors */}
                  <tbody>
                    {/* key={index} {selectedocu.leaves.map((leaf, index) => ( */}
                    {/* <tr style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}> */}
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                      <td>{docu.leaves.length.toString().replace(/,/g, '')}</td>

                      <td>{docu.leaves.width}</td>
                    </tr>
                    {/* ))} */}
                  </tbody>
                </table>

                {/* ... other details */}
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
 


                  <div  >
                    {docu.images.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt=""
                        className="rounded-lg bg-gray-100"
                        style={{ width: '300px', height: '300px' }} />
                    ))}
                  </div>
               
              </div>

            </div>

          </div></>

        ))}
      </div>

     

    </Fragment>
  );
}

export default Documentation_1;
