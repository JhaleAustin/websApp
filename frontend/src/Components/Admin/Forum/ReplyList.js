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

const ReplyList = ({ followupRowId }) => {
    const [reply, setReply] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterOption, setFilterOption] = useState('All');

    const followupRowIdRef = useRef(null);

    useEffect(() => {
      followupRowIdRef.current = followupRowId; // Update the ref when followupRowId changes
    }, [followupRowId]);
  
    useEffect(() => {
      console.log('Inside useEffect - followupRowId:', followupRowId);
  
      const getAdminReply = async () => {
        const currentfollowupRowId = followupRowIdRef.current;
        console.log('Inside getAdminReply - currentfollowupRowId:', currentfollowupRowId);
  
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${getToken()}`
            }
          };
  
          const { data } = await axios.get(`http://localhost:3001/api/v1/admin/reply/${currentfollowupRowId}`, config);
  
          console.log('Response from API:', data.replies);
          setReply(data.replies);
          setLoading(false);
        } catch (error) {
          setError(error.response.data.message);
        }
      };
  
      getAdminReply();
    }, []);

    const handleFilterChange = (option) => {
        setFilterOption(option);
      };

    const replyList = () => {
        const filteredForum = reply.filter((replys) => {
            const adminCondition =
              filterOption === 'All' || replys.admin.name === filterOption;
            
            return adminCondition;
          });
        const data = {
            columns: [
                {
                     label: 'REPLIES',
                    field: 'reply',
                    sort: 'asc'
                },
                {
                    label: 'IMAGES',
                    field: 'images',
                    sort: 'asc'
                },
                {
                    label: 'ADMIN',
                    field: 'admin',
                    sort: 'asc'
                },
            ],
             rows: []
        };
        filteredForum.forEach(replys => {
                            data.rows.push({
                            
                                reply: (
                                    <div className="d-flex align-items-right">
                                        {replys.reply}
                                    </div>
                                ),
                                images: replys.images.map((image, index) => (
                                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                                )),
                                admin: (
                                    <div className="d-flex align-items-right">
                                        {replys.admin.name}
                                    </div>
                                ),
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
                                <select className="ftable" onChange={(e) => handleFilterChange(e.target.value)} value={filterOption}>
                                    <option value="All">ALL</option>
                                    <option value="Remdel">REMDEL</option>
                                    <option value="Athea">ATHEA</option>
                                    <option value="NhelCabatino">NHEL</option>
                                </select>
                            </div>
                            <MDBDataTableV5 data={replyList()} className="table-px-3" 
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

export default ReplyList;
