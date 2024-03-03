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

const WithoutMulchingList = () => {
    const [withoutmulch, setWithoutMulch] = useState([]);
    const [planttypes, setPlantTypes] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedWithoutMulch, setSelectedWithoutMulch] = useState([]);

    let navigate = useNavigate();

    const getAdminWithoutMulch = async () => {
        try {
           const config = {
               headers: {
                   'Content-Type': 'multipart/form-data',
                   'Authorization': `Bearer ${getToken()}`
               }
           };

           const { data } = await axios.get(`http://localhost:3001/api/v1/documentation/show/withoutmulch`, config);

           setWithoutMulch(data.withoutMulch);
           setPlantTypes(data.plantTypes)

           console.log(data.withoutMulch)
 
           setLoading(false);
       } catch (error) {
           setError(error.response.data.message);
       }
   };

   useEffect(() => {
        getAdminWithoutMulch();

        if (error) {
            toast.error('FAILED TO DELETE WITHOUT MULCH DATA');
        }

        if (deleteError) {
            toast.error('FAILED TO DELETE WITHOUT MULCH DATA');
        }

        if (isDeleted) {

            toast.success('WITHOUT MULCH DATA IS DELETED SUCCESSFULLY');

            navigate('/admin/withoutmulch');

            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);

    const deleteWithoutMulchs = async (id) => {
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

    const toggleWithoutMulchSelection = (id) => {
        const isSelected = selectedWithoutMulch.includes(id);
        if (isSelected) {
            setSelectedWithoutMulch(selectedWithoutMulch.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedWithoutMulch([...selectedWithoutMulch, id]);
        }
    };

    const toggleAllWithoutMulchSelection = () => {
        if (selectedWithoutMulch.length === withoutmulch.length) {
            setSelectedWithoutMulch([]);
        } else {
            setSelectedWithoutMulch(withoutmulch.map((withoutmulch) => withoutmulch._id));
        }
    };

    const withoutmulchList = () => {
        const data = {
            columns: [
                {
                    label: (
                        <div className="d-flex align-items-center ptable">
                            <input
                                type="checkbox"
                                checked={selectedWithoutMulch.length === withoutmulch.length}
                                onChange={toggleAllWithoutMulchSelection}
                            />
                            <button
                                className="button-delete-selected btn btn-danger py-1 px-2 ml-2"
                                onClick={deleteWithoutMulchsHandler2}
                                disabled={selectedWithoutMulch.length === 0 }
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
                    label: 'NUMBER OF LEAVES',
                    field: 'numOfLeaves',
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
                
        withoutmulch.forEach(withoutmulchs => {
            console.log(withoutmulchs);
            data.rows.push({
                select: (
                    <div className="d-flex align-items-right">
                        <input
                            type="checkbox"
                            checked={selectedWithoutMulch.includes(withoutmulchs._id)}
                            onChange={() => toggleWithoutMulchSelection(withoutmulchs._id)}
                        />
                    </div>
                        ),
                id: (
                        <div className="d-flex align-items-right">
                        {withoutmulchs._id}
                        </div>
                    ),

                collectionDate: (
                    <div className="d-flex align-items-right">
                    {withoutmulchs.collectionDate}
                    </div>
                ),
  
                height: (
                    <div className="d-flex align-items-right">
                    {withoutmulchs.height}
                    </div>
                ),

                length:(
                    <div className="d-flex align-items-right">
                    {withoutmulchs.leaves && withoutmulchs.leaves.length}
                    </div>
                ),

                width: (
                    <div className="d-flex align-items-right">
                    {withoutmulchs.leaves && withoutmulchs.leaves.width}
                    </div>
                ),
                numOfLeaves: (
                    <div className="d-flex align-items-right">
                    {withoutmulchs.numOfLeaves}
                    </div>
                ),     
                images: withoutmulchs.images.map((image, index) => (
                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                )),

                actions: (
                    <div className="d-flex">
                        <Link to={`/admin/update/withoutmulch/${withoutmulchs._id}`} className="etable btn btn-primary py-1 px-2">
                            <i className="fa fa-pen"></i>
                        </Link>
                        <button className="dtable btn btn-danger py-1 px-2 ml-2" onClick={() => deleteWithoutMulchsHandler(withoutmulchs._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                        )
                                
                    });
                });
                
            return data;
        };
                

    const deleteWithoutMulchsHandler = (id) => {
        deleteWithoutMulchs(id);
    };

    const deleteWithoutMulchsHandler2 = async () => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };

            const deleteRequests = selectedWithoutMulch.map(async (id) => {
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
        <MetaData title={'WITHOUT MULCH'} />
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
                        <h1 className="table-title-my-5">WITHOUT MULCHING DATA COLLECTION</h1>
                        <Link to={`/admin/new/withoutmulch/${planttypes}`} className="ptable btn btn-primary py-1 px-2">
                            <i className="fa fa-plus"></i>
                        </Link>
                    </div>
                        <MDBDataTableV5 data={withoutmulchList()} className="table-px-3" 
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

export default WithoutMulchingList;
