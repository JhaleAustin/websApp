import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../Sidebar'
import MetaData from '../../Layout/MetaData'
// import Sidebar from './SideBar'
import { getToken } from '../../../utils/helpers';
import Loader from '../../Layout/Loader'

const ProcessList = () => {
    const [process, setProcess] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedProcess, setSelectedProcess] = useState([]);

    let navigate = useNavigate();

    const toggleProcessselection = (id) => {
        const isSelected = selectedProcess.includes(id);
        if (isSelected) {
            setSelectedProcess(selectedProcess.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedProcess([...selectedProcess, id]);
        }
    };

   
    const getAdminProcess = async () => {
         try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };

            const { data } = await axios.get(`http://localhost:3001/api/v1/process`);

              setProcess(data.Processs);
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    };


    useEffect(() => {
        getAdminProcess();

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
            toast.success('STEP DELETED SUCCESSFULLY', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            navigate('/admin/processList');
            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);


    const toggleAllProcessSelection = () => {
        if (selectedProcess.length === process.length) {
            // If all processes are selected, unselect all
            setSelectedProcess([]);
        } else {
            // Otherwise, select all processes
            setSelectedProcess(process.map((processes) => processes._id));
        }
    };

    
    const deleteProcess= async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/admin/process/${id}`);

            setIsDeleted(data.success);
            setLoading(false);
        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    const processList = () => {
        const data = {
            columns: [
                {
                    label: (      <input
                        type="checkbox"
                        checked={selectedProcess.length === process.length}
                        onChange={toggleAllProcessSelection}
                    />
                    ),
                              label: (      <input
                                        type="checkbox"
                                        checked={selectedProcess.length === process.length}
                                        onChange={toggleAllProcessSelection}
                                    />
                                ),
                                    field: 'select',
                                    sort: 'asc',
                                },
                                {
                                    label: 'Title',
                                    field: 'title',
                                    sort: 'asc'
                                },
                                {
                                    label: 'Content',
                                    field: 'content',
                                    sort: 'asc'
                                },
                              
                                {
                                    label: 'Actions',
                                    field: 'actions',
                                },
                            ],
                            rows: []
                        };
                
                        process.forEach(processes => {
                            data.rows.push({
                                select: (
                                    <input
                                        type="checkbox"
                                        checked={selectedProcess.includes(processes._id)}
                                        onChange={() => toggleProcessselection(processes._id)}
                                    />
                                ),
                                title: processes.title,
                                content: processes.content, actions: <Fragment>
                                        <Link to={`/admin/updateprocess/${processes._id}`} className="btn btn-primary py-1 px-2">
                                            <i className="fa fa-pen"></i>
                                        </Link>
                                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProcessHandler(processes._id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </Fragment>
                                
                            });
                        });
                
                        return data;
                    };
                

    const deleteProcessHandler = (id) => {
        deleteProcess(id);
    };



    const deleteProcessHandler2 = async () => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };

            // Send a request to delete multiple processes
            const deleteRequests = selectedProcess.map(async (id) => {
              return axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/process/${id}`);
            });

            // Wait for all delete requests to complete
            const responses = await Promise.all(deleteRequests);

            // Check if all requests were successful
            const allSuccess = responses.every((response) => response.data.success);

            setIsDeleted(allSuccess);
            setLoading(false);
        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    return (

        <Fragment>
        <MetaData title={'All Processes'} />
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
            <div className="col-12 col-md-10" style={{  paddingLeft: "70px", marginBottom: "70px" }}>
                <Fragment>
                        <h1 className="my-5">DATA COLLECTION AND OBSERVATION PROCESS</h1>
                        {loading ? (
                            <Loader />
                        ) : (
                            <div>
                            <div>
                                <button
                                    className="btn btn-danger py-1 px-2 mb-2"
                                    onClick={deleteProcessHandler2}
                                    disabled={selectedProcess.length === 0}
                                >
                                    Delete Selected
                                </button>
                            </div>
                            <MDBDataTable data={processList()} className="px-3" bordered striped hover />
                    
                        </div>
                    )}
                    </Fragment>
                </div>
            </div>
    </Fragment>
    );
};

export default ProcessList;
