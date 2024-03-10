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

const ForumList = () => {
    const [forum, setForum] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterOption, setFilterOption] = useState('All'); // Default option
    const [inquiryFilter, setInquiryFilter] = useState(''); // Inquiry filter



    let navigate = useNavigate();
   
    const getAdminForum = async () => {
         try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`http://localhost:3001/api/v1/forum`, config);

            // const { data } = await axios.get(`http://localhost:3001/api/v1/forum`);

            console.log(data.answers);
            setForum(data.answers);
            setLoading(false);

        } catch (error) {
            setError(error.response.data.message);
        }
    };


    useEffect(() => {
        getAdminForum();
    }, []);

    const handleFilterChange = (option) => {
        setFilterOption(option);
      };

      const handleInquiryFilterChange = (value) => {
        setInquiryFilter(value);
      };

    const forumList = () => {
        const filteredForum = forum.filter((forums) => {
            const adminCondition =
              filterOption === 'All' || forums.admin.name === filterOption;
            const inquiryCondition =
              inquiryFilter === '' ||
              forums.inquiry.inquiry.toLowerCase().includes(inquiryFilter.toLowerCase());
      
            return adminCondition && inquiryCondition;
          });

        const data = {
            columns: [
                {
                    label: 'INQUIRY',
                    field: 'inquiry',
                    sort: 'asc'
                },
                {
                    label: 'IMAGES',
                    field: 'inquiryimages',
                    sort: 'asc'
                },
                {
                     label: 'REPLY',
                    field: 'answer',
                    sort: 'asc'
                },
                {
                    label: 'IMAGES',
                    field: 'replyimages',
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
            filteredForum.forEach(forums => {
                            data.rows.push({
                                inquiry: (
                                    <div className="d-flex align-items-right">
                                        {forums.inquiry.inquiry}
                                    </div>
                                ),
                                inquiryimages: forums.inquiry.images.map((image, index) => (
                                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                                )),
                                answer: (
                                    <div className="d-flex align-items-right">
                                        {forums.answer}
                                    </div>
                                ),
                                replyimages: forums.images.map((image, index) => (
                                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                                )),
                                admin: (
                                    <div className="d-flex align-items-right">
                                        {forums.admin.name}
                                    </div>
                                ),
                            });
                        });
                
                        return data;
                    };
                
    return (

        <Fragment>
        <MetaData title={'FORUM'} />
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
                                
                                <h1 className="table-title-my-5">FORUM</h1>
                                <input
                                    type="text"
                                    className="stable"
                                    placeholder="SEARCH INQUIRY"
                                    value={inquiryFilter}
                                    onChange={(e) => handleInquiryFilterChange(e.target.value)}
                                />
                                <select className="ftable" onChange={(e) => handleFilterChange(e.target.value)} value={filterOption}>
                                    <option value="All">ALL</option>
                                    <option value="Remdel">REMDEL</option>
                                    <option value="Athea">ATHEA</option>
                                    <option value="NhelCabatino">NHEL</option>
                                </select>
                
                            </div>
                            <MDBDataTableV5 data={forumList()} className="table-px-3" 
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

export default ForumList;
