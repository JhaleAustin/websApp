import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../Sidebar'
import MetaData from '../../Layout/MetaData'
import { getToken } from '../../../utils/helpers';
import Loader from '../../Layout/Loader'

const AnalysisList = () => {
    const [analysis, setAnalysis] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
   
    const getAdminAnalysis = async () => {
         try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`http://localhost:3001/api/v1/admin/analysis`, config);

            // const { data } = await axios.get(`http://localhost:3001/api/v1/admin/analysis`);

            console.log(data.analyze);
            setAnalysis(data.analyze);
            setLoading(false);

        } catch (error) {
            setError(error.response.data.message);
        }
    };


    useEffect(() => {
        getAdminAnalysis();
    }, []);

    const analysisList = () => {
        
        const data = {
            columns: [
                {
                    label: 'HEIGHT',
                    field: 'height',
                    sort: 'asc'
                },
                {
                    label: 'NUMBER OF LEAVES',
                    field: 'numOfLeaves',
                    sort: 'asc'
                },
                {
                    label: 'DATE',
                   field: 'analysisDate',
                   sort: 'asc'
                },

            ],
             rows: []
        };
            analysis.forEach(analysiss => {
                            data.rows.push({
                                height: (
                                    <div className="d-flex align-items-right">
                                        {analysiss.height}
                                    </div>
                                ),

                                numOfLeaves: (
                                    <div className="d-flex align-items-right">
                                        {analysiss.numOfLeaves}
                                    </div>
                                ),

                                analysisDate: (
                                    <div className="d-flex align-items-right">
                                        {analysiss.analysisDate}
                                    </div>
                                ),
                            });
                        });
                
                        return data;
                    };
                
    return (

        <Fragment>
        <MetaData title={'ANALYSIS'} />
        <div className="row dlist">
            <div className="col-12 col-md-2">    
                    <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <div className="table-container">
                <Fragment>
                        {loading ? (
                            <Loader />
                        ) : (
                        <div class="dataTabP">
                            <div class="dataHead">
                                
                                <h1 className="table-title-my-5">ANALYSIS</h1>
                
                            </div>
                            <MDBDataTableV5 data={analysisList()} className="table-px-3" 
                                bordered 
                                striped 
                                hover 
                                responsive 
                                noBottomColumns 
                                searching={false} 
                                noRecordsPerPageLabel={true} 
                                fullPagination  
                                entriesOptions={[5, 10]} 
                                entries={5} 
                                pagesAmount={4}
                                sortable={false}
                                />
                        </div>
                    )}
                </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
    );
};

export default AnalysisList;
