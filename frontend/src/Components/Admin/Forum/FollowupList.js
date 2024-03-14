import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../Sidebar'
import MetaData from '../../Layout/MetaData'
import { getToken } from '../../../utils/helpers';
import Loader from '../../Layout/Loader'

const FollowupList = ({ answerRowId, onFollowupRowClick }) => {
    const [followup, setFollowup] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterOption, setFilterOption] = useState('All');
    const [selectedFollowupRowId, setSelectedFollowupRowId] = useState(null);

    const answerRowIdRef = useRef(null);

    useEffect(() => {
      answerRowIdRef.current = answerRowId; // Update the ref when answerRowId changes
    }, [answerRowId]);
  
    useEffect(() => {
      console.log('Inside useEffect - answerRowId:', answerRowId);
  
      const getAdminFollowup = async () => {
        const currentanswerRowId = answerRowIdRef.current;
        console.log('Inside getAdminFollowup - currentanswerRowId:', currentanswerRowId);

        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${getToken()}`
            }
          };
  
          const { data } = await axios.get(`http://localhost:3001/api/v1/admin/followup/${currentanswerRowId}`, config);
  
          console.log('Response from API:', data.followups);
          setFollowup(data.followups);
          setLoading(false);
        } catch (error) {
          setError(error.response.data.message);
        }
      };
  
      getAdminFollowup();
    }, [selectedFollowupRowId]);

    const handleRowClick = (followupRowId) => {
        setSelectedFollowupRowId((prevfollowupRowId) => (prevfollowupRowId=== followupRowId ? null : followupRowId));
        onFollowupRowClick(followupRowId);
    };

    const followupList = () => {
    
        const data = {
            columns: [
                {
                     label: 'FOLLOW UP',
                    field: 'followup',
                    sort: 'asc'
                },
                {
                    label: 'IMAGES',
                    field: 'images',
                    sort: 'asc'
                },
            ],
             rows: []
        };
            followup.forEach(followups => {
                            data.rows.push({
                            
                                followup: (
                                    <div
                                        className="d-flex align-items-right"
                                        onClick={() => handleRowClick(followups._id)}
                                        style={{
                                            backgroundColor: selectedFollowupRowId === followups._id ? '#abc32f' : 'transparent',
                                        }}
                                        >  
                                        {followups.followup}
                                    </div>
                                ),
                                images: followups.images.map((image, index) => (
                                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                                )),
                            });
                        });
                
                        return data;
                    };
                
    return (

        <Fragment>
                <Fragment>
                        {loading ? (
                            <Loader />
                        ) : (
                        <div class="dataTabP">
                            <div class="dataHead">
                                
                                <h1 className="table-title-my-5">FOLLOW UP</h1>
                                
                            </div>
                            <MDBDataTableV5 data={followupList()} className="table-px-3" 
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
    </Fragment>
    );
};

export default FollowupList;
