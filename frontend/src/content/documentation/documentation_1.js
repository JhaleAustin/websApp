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
        setWithMulch(response.data.withMulch);
        
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


  return (
    <Fragment>
      
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 dataCC">
       
      

       
        {withMulch.map((docu,index) => (

          <><div class="container text-center"   > 
          
            <div class="row">
              <div class="col-md-12">
                <div class="row dataCCC">
                  <p style={{ fontFamily: 'Inconsolata, sans-serif' }}>
                  {docu.collectionDate}
                  </p>
                  <div className="uk-text-center">
                    <table className="uk-table uk-table-hover uk-table-divider" style={{ height: 100, backgroundColor: '#abc32f', borderColor: 'lightyellowgreen' }}>
                      <thead>
                        <tr>
                          <th colSpan="2" style={{ backgroundColor: 'white'}}>WITH MULCH</th>
                          <th colSpan="2" style={{ backgroundColor: 'white'}}>WITHOUT MULCH</th>
                        </tr>
                        <tr>
                          <th>HEIGHT</th>
                          <th>NUMBER OF LEAVES</th>
                          <th>HEIGHT</th>
                          <th>NUMBER OF LEAVES</th>
                        </tr>
                      </thead>
      
                      <tbody>
                        {/* Replace docu.leaves with your actual data structure */}
                        <tr style={{ backgroundColor: '#abc32f' }}>
                          {/* WITH MULCH */}
                          <td>{docu.height}</td>
                          <td>{docu.numOfLeaves}</td>

                          {/* WITHOUT MULCH */}
                          <td>{withoutMulch[index].height}</td>
                          <td>{withoutMulch[index].numOfLeaves}</td>
                        </tr>

                      
                      </tbody>
                      
                      <thead>
                      <tr>          
                        <th colSpan="4" style={{ textAlign: 'center', backgroundColor:'white'}}>LEAVES</th>
                      </tr>
                        <tr>
                          <th>LENGTH</th>
                          <th>WIDTH</th>
                          <th>LENGTH</th>
                          <th>WIDTH</th>
                        </tr>
                      </thead>

                      <tbody>


                        <tr style={{ backgroundColor: '#abc32f' }}>
                          {/* WITH MULCH */}
                          <td>{docu.leaves.length}</td>
                          <td>{docu.leaves.width}</td>

                          {/* WITHOUT MULCH */}
                          <td>{withoutMulch[index].leaves.length}</td>
                          <td>{withoutMulch[index].leaves.width}</td>
                        </tr>

                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
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
                          style={{ width: '600px', height: '500px' }} />
                      ))}
                    </div>                  
                  </div>
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
