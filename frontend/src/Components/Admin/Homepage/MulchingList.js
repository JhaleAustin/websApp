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

const MulchingList = () => {
    const [mulching, setMulching] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedMulching, setSelectedMulching] = useState([]);

    let navigate = useNavigate();

    const getAdminMulching = async () => {
        try {
           // const config = {
           //     headers: {
           //         'Content-Type': 'multipart/form-data',
           //         'Authorization': `Bearer ${getToken()}`
           //     }
           // };

           const { data } = await axios.get(`http://localhost:3001/api/v1/`);

           setMulching(data.mulching);

           console.log(data.peanutshell);

           setLoading(false);
       } catch (error) {
           setError(error.response.data.message);
       }
   };

   useEffect(() => {
        getAdminMulching();

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

            navigate('/admin/mulching');

            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);

    const deletePeanutShell = async (id) => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/home/mulching/${id}`);
            
            setIsDeleted(data.success);
            setLoading(false);

        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    const toggleMulchingSelection = (id) => {
        const isSelected = selectedMulching.includes(id);
        if (isSelected) {
            setSelectedMulching(selectedMulching.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedMulching([...selectedMulching, id]);
        }
    };

    const toggleAllMulchingSelection = () => {
        if (selectedMulching.length === mulching.length) {
            setSelectedMulching([]);
        } else {
            setSelectedMulching(mulching.map((mulchings) => mulchings._id));
        }
    };

    const mulchingList = () => {
        const data = {
            columns: [
                {
                    label: (
                        <div className="d-flex align-items-center ptable">
                            <input
                                type="checkbox"
                                checked={selectedMulching.length === mulching.length}
                                onChange={toggleAllMulchingSelection}
                            />
                            <button
                                className="button-delete-selected btn btn-danger py-1 px-2 ml-2"
                                onClick={deletePeanutShellHandler2}
                                disabled={selectedMulching.length === 0 }
                            >
                                DELETE SELECTED
                            </button>
                        </div>
                        ),
                    field: 'select',
                    sort: 'asc',
                },
                {
                    label: 'MULCHING ID',
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
                
        mulching.forEach(peanutshell => {
            data.rows.push({
                select: (
                    <div className="d-flex align-items-right">
                        <input
                            type="checkbox"
                            checked={selectedMulching.includes(peanutshell._id)}
                            onChange={() => toggleMulchingSelection(peanutshell._id)}
                        />
                    </div>
                        ),
                id: (
                        <div className="d-flex align-items-right">
                        {peanutshell._id}
                        </div>
                    ),
                description: 
                    (
                        <div className="d-flex align-items-right">
                        {peanutshell.description}
                        </div>
                    ),
                actions: (
                    <div className="d-flex">
                        <Link to={`/admin/updatepeanutshell/${peanutshell._id}`} className="etable btn btn-primary py-1 px-2">
                            <i className="fa fa-pen"></i>
                        </Link>
                        <button className="dtable btn btn-danger py-1 px-2 ml-2" onClick={() => deletePeanutShellHandler(peanutshell._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                        )
                                
                    });
                });
                
            return data;
        };
                

    const deletePeanutShellHandler = (id) => {
        deletePeanutShell(id);
    };

    const deletePeanutShellHandler2 = async () => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };

            const deleteRequests = selectedMulching.map(async (id) => {
              return axios.delete(`${process.env.REACT_APP_API}/api/v1/home/mulching/${id}`);
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
        <MetaData title={'PEANUT SHELLS'} />
        <div className="row">
            <div className="col-12 col-md-2"style={{  marginBottom: "2px" }}>
                <div style={{  height: '100vh', overflow: 'scroll initial' }}>
                    <Sidebar />
                </div>
            </div>
            <div className="col-12 col-md-10">
                <div className="table-container">
                <Fragment>
                        <h1 className="table-title-my-5">MULCHING INFORMATION</h1>
                        {loading ? (
                            <Loader />
                        ) : (
                        <div>
                            <MDBDataTable data={mulchingList()} className="table-px-3" bordered striped hover responsive noBottomColumns/>
                        </div>
                    )}
                </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
    );
};

export default MulchingList;
