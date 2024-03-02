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

const WithMulchingList = () => {
    const [withmulch, setWithMulch] = useState([]);
    const [planttypes, setPlantTypes] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedWithMulch, setSelectedWithMulch] = useState([]);

    let navigate = useNavigate();

    const getAdminWithMulch = async () => {
        try {
           const config = {
               headers: {
                   'Content-Type': 'multipart/form-data',
                   'Authorization': `Bearer ${getToken()}`
               }
           };

           const { data } = await axios.get(`http://localhost:3001/api/v1/documentation/show/withmulch`, config);

           setWithMulch(data.withMulch);
           setPlantTypes(data.plantTypes)

           console.log(data.withmulch)
 
           setLoading(false);
       } catch (error) {
           setError(error.response.data.message);
       }
   };

   useEffect(() => {
        getAdminWithMulch();

        if (error) {
            toast.error('FAILED TO DELETE WITH MULCH DATA');
        }

        if (deleteError) {
            toast.error('FAILED TO DELETE WITH MULCH DATA');
        }

        if (isDeleted) {

            toast.success('WITH MULCH DATA IS DELETED SUCCESSFULLY');

            navigate('/admin/withmulch');

            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);

    const deleteWithMulchs = async (id) => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/admin/documentation/${id}`);
            
            setIsDeleted(data.success);
            setLoading(false);

        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    const toggleWithMulchSelection = (id) => {
        const isSelected = selectedWithMulch.includes(id);
        if (isSelected) {
            setSelectedWithMulch(selectedWithMulch.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedWithMulch([...selectedWithMulch, id]);
        }
    };

    const toggleAllWithMulchSelection = () => {
        if (selectedWithMulch.length === withmulch.length) {
            setSelectedWithMulch([]);
        } else {
            setSelectedWithMulch(withmulch.map((withmulch) => withmulch._id));
        }
    };

    const withmulchList = () => {
        const data = {
            columns: [
                {
                    label: (
                        <div className="d-flex align-items-center ptable">
                            <input
                                type="checkbox"
                                checked={selectedWithMulch.length === withmulch.length}
                                onChange={toggleAllWithMulchSelection}
                            />
                            <button
                                className="button-delete-selected btn btn-danger py-1 px-2 ml-2"
                                onClick={deleteWithMulchsHandler2}
                                disabled={selectedWithMulch.length === 0 }
                            >
                                DELETE SELECTED
                            </button>
                        </div>
                        ),
                    field: 'select',
                    sort: 'asc',
                },
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'DATE',
                   field: 'collectionDate',
                   sort: 'asc'
               },
                {
                    label: 'HEIGHT',
                   field: 'height',
                   sort: 'asc'
               },
               
               {
                label: 'LENGTH',
                field: 'length',
                sort: 'asc'
                },
                {
                    label: 'WIDTH',
                    field: 'width',
                    sort: 'asc'
                    },
                {
                    label: 'IMAGES',
                    field: 'images',
                    sort: 'asc'
                },

                {
                    label: 'ACTIONS',
                    field: 'actions',
                },
            ],
             rows: []
        };
                
        withmulch.forEach(withmulchs => {
            console.log(withmulchs);
            data.rows.push({
                select: (
                    <div className="d-flex align-items-right">
                        <input
                            type="checkbox"
                            checked={selectedWithMulch.includes(withmulchs._id)}
                            onChange={() => toggleWithMulchSelection(withmulchs._id)}
                        />
                    </div>
                        ),
                id: (
                        <div className="d-flex align-items-right">
                        {withmulchs._id}
                        </div>
                    ),
                 collectionDate: (
                    <div className="d-flex align-items-right">
                    {withmulchs.collectionDate}
                    </div>
                ),
  
                height: (
                    <div className="d-flex align-items-right">
                    {withmulchs.height}
                    </div>
                ),

                length:(
                    <div className="d-flex align-items-right">
                    {withmulchs.leaves && withmulchs.leaves.length}
                    </div>
                ),

                width: (
                    <div className="d-flex align-items-right">
                    {withmulchs.leaves && withmulchs.leaves.width}
                    </div>
                ),
                        
                images: withmulchs.images.map((image, index) => (
                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                )),

                actions: (
                    <div className="d-flex">
                        <Link to={`/admin/update/withmulch/${withmulchs._id}`} className="etable btn btn-primary py-1 px-2">
                            <i className="fa fa-pen"></i>
                        </Link>
                        <button className="dtable btn btn-danger py-1 px-2 ml-2" onClick={() => deleteWithMulchsHandler(withmulchs._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                        )
                                
                    });
                });
                
            return data;
        };
                

    const deleteWithMulchsHandler = (id) => {
        deleteWithMulchs(id);
    };

    const deleteWithMulchsHandler2 = async () => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };

            const deleteRequests = selectedWithMulch.map(async (id) => {
              return axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/documentation/${id}`);
            });

            const responses = await Promise.all(deleteRequests);

            const allSuccess = responses.every((response) => response.data.success);

            setIsDeleted(allSuccess);
            setLoading(false);
        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    return (

        <Fragment>
        <MetaData title={'WITH MULCH'} />
        <div className="row dlist">
            <div className="col-12 col-md-2">    
                    <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <div className="table-container2">
                <Fragment> 
                    {loading ? (
                        <Loader />
                    ) : (
                <div class="dataTab">
                    <div class="dataHead">
                        <h1 className="table-title-my-5">WITH MULCHING DATA COLLECTION</h1>
                        <Link to={`/admin/new/withmulch/${planttypes}`} className="ptable btn btn-primary py-1 px-2">
                            <i className="fa fa-plus"></i>
                        </Link>
                    </div>
                        <MDBDataTableV5 data={withmulchList()} className="table-px-3" 
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

export default WithMulchingList;
