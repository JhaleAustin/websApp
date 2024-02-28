import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../Sidebar'
import MetaData from '../../Layout/MetaData'
import { getToken } from '../../../utils/helpers';
import Loader from '../../Layout/Loader'

const TypesList = () => {
    const [hometypes, setHomeTypes] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedHomeTypes, setSelectedHomeTypes] = useState([]);

    let navigate = useNavigate();

    const getAdminHomeTypes = async () => {
        try {
           // const config = {
           //     headers: {
           //         'Content-Type': 'multipart/form-data',
           //         'Authorization': `Bearer ${getToken()}`
           //     }
           // };

           const { data } = await axios.get(`http://localhost:3001/api/v1/topics`);

           setHomeTypes(data.hometypes);

           setLoading(false);
       } catch (error) {
           setError(error.response.data.message);
       }
   };

   useEffect(() => {
        getAdminHomeTypes();

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

        if (deleteError) {
            toast.error(deleteError, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

        if (isDeleted) {

            toast.success('DESCRIPTION DELETED SUCCESSFULLY', {
                position: toast.POSITION.BOTTOM_RIGHT
            });

            navigate('/admin/peanutshellmulching');

            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);

    const hometypeList = () => {
        const data = {
            columns: [
                {
                    label: 'TYPES ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                     label: 'DESCRIPTION',
                    field: 'description',
                    sort: 'asc'
                },
                {
                    label: 'ACTIONS',
                    field: 'actions',
                },
            ],
             rows: []
        };
                
        hometypes.forEach(hometype => {
            data.rows.push({
                id: (
                        <div className="d-flex align-items-right">
                        {hometype._id}
                        </div>
                    ),
                description: 
                    (
                        <div className="d-flex align-items-right">
                        {hometype.description}
                        </div>
                    ),
                actions: (
                    <div className="d-flex">
                        <Link to={`/admin/updatepeanutshell/${hometype._id}`} className="etable btn btn-primary py-1 px-2">
                            <i className="fa fa-pen"></i>
                        </Link>
                        <button className="dtable btn btn-danger py-1 px-2 ml-2" onClick={() => deletePeanutShellMulchingHandler(hometype._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                        )
                                
                    });
                });
                
            return data;
        };
                

    const deletePeanutShellMulchingHandler = (id) => {
        deletePeanutShellMulching(id);
    };

    const deletePeanutShellMulchingHandler2 = async () => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };

            const deleteRequests = selectedPeanutShellMulching.map(async (id) => {
              return axios.delete(`${process.env.REACT_APP_API}/api/v1/home/peanutshellmulching/${id}`);
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
        <MetaData title={'PEANUT SHELLS MULCHING'} />
        <div className="row">
            <div className="col-12 col-md-2"style={{  marginBottom: "2px" }}>
                <div style={{  height: '100vh', overflow: 'scroll initial' }}>
                    <Sidebar />
                </div>
            </div>
            <div className="col-12 col-md-10">
                <div className="table-container">
                <Fragment>
                        <h1 className="table-title-my-5">PEANUT SHELLS INFORMATION</h1>
                        {loading ? (
                            <Loader />
                        ) : (
                        <div>
                            <MDBDataTable data={peanutshellmulchingList()} className="table-px-3" bordered striped hover responsive noBottomColumns/>
                        </div>
                    )}
                </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
    );
};

export default TypesList;
