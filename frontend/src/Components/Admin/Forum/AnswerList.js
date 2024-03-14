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

const AnswerList = ({ inquiryRowId, onAnswerRowClick }) => {
    const [answer, setAnswer] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterOption, setFilterOption] = useState('All');
    const [selectedanswerRowId, setSelectedanswerRowId] = useState(null);

    const inquiryRowIdRef = useRef(null);

    useEffect(() => {
      inquiryRowIdRef.current = inquiryRowId; // Update the ref when rowId changes
    }, [inquiryRowId]);
  
    useEffect(() => {
      console.log('Inside useEffect - inquiryRowId:', inquiryRowId);
  
      const getAdminAnswer = async () => {
        const currentinquiryRowId = inquiryRowIdRef.current;
        console.log('Inside getAdminAnswer - currentinquiryRowId:', currentinquiryRowId);
  
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${getToken()}`
            }
          };
  
          const { data } = await axios.get(`http://localhost:3001/api/v1/admin/answers/${currentinquiryRowId}`, config);
  
          console.log('Response from API:', data.answers);
          setAnswer(data.answers);
          setLoading(false);
        } catch (error) {
          setError(error.response.data.message);
        }
      };
  
      getAdminAnswer();
    }, [selectedanswerRowId]);

    const handleFilterChange = (option) => {
        setFilterOption(option);
      };

    const handleRowClick = (answerRowId) => {
        setSelectedanswerRowId((prevanswerRowId) => (prevanswerRowId=== answerRowId ? null : answerRowId));
        onAnswerRowClick(answerRowId);
    };

    const answerList = () => {
        const filteredForum = answer.filter((answers) => {
            const adminCondition =
              filterOption === 'All' || answers.admin.name === filterOption;
            
            return adminCondition;
          });

        const data = {
            columns: [
                {
                     label: 'ANSWER',
                    field: 'answer',
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
            filteredForum.forEach(answers => {
                            data.rows.push({
                            
                                answer: (
                                    <div
                                        className="d-flex align-items-right"
                                        onClick={() => handleRowClick(answers._id)}
                                        style={{
                                            backgroundColor: selectedanswerRowId === answers._id ? '#abc32f' : 'transparent',
                                        }}
                                        >  {answers.answer}
                                    </div>
                                ),
                                images: answers.images.map((image, index) => (
                                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                                )),
                                admin: (
                                    <div className="d-flex align-items-right">
                                        {answers.admin.name}
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
                                
                                <h1 className="table-title-my-5">ANSWERS</h1>
                                <select className="ftable" onChange={(e) => handleFilterChange(e.target.value)} value={filterOption}>
                                    <option value="All">ALL</option>
                                    <option value="Remdel">REMDEL</option>
                                    <option value="Athea">ATHEA</option>
                                    <option value="NhelCabatino">NHEL</option>
                                </select>
                
                            </div>
                            <MDBDataTableV5 data={answerList()} className="table-px-3" 
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

export default AnswerList;
