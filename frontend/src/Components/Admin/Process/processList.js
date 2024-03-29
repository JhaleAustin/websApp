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

const ProcessList = () => {
    const [processes, setProcess] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedProcess, setSelectedProcess] = useState([]);

    let navigate = useNavigate();
   
    const getAdminProcess = async () => {
         try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`http://localhost:3001/api/v1/admin/process`, config);

            console.log(data.process);
            setProcess(data.process);
            setLoading(false);

        } catch (error) {
            setError(error.response.data.message);
        }
    };


    useEffect(() => {
        getAdminProcess();

        if (error) {
            toast.error('FAILED TO DELETE STEP');
        }

        if (deleteError) {
            toast.error('FAILED TO DELETE STEP');
        }

        if (isDeleted) {
            toast.success('STEP IS DELETED SUCCESSFULLY');
            navigate('/admin/process');
            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);

    const deleteProcess= async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/admin/process/${id}`,config);

            setIsDeleted(data.success);
            setLoading(false);
        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    const toggleProcessselection = (id) => {
        const isSelected = selectedProcess.includes(id);
        if (isSelected) {
            setSelectedProcess(selectedProcess.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedProcess([...selectedProcess, id]);
        }
    };

    const toggleAllProcessSelection = () => {
        if (selectedProcess.length === processes.length) {
            // If all processes are selected, unselect all
            setSelectedProcess([]);
        } else {
            // Otherwise, select all processes
            setSelectedProcess(processes.map((processes) => processes._id));
        }
    };

    
  

    const processList = () => {
        const data = {
            columns: [
                {
                    label: (
                        <div className="d-flex align-items-center ptable">
                            <input
                                type="checkbox"
                                checked={selectedProcess.length === processes.length}
                                onChange={toggleAllProcessSelection}
                            />
                            <button
                                className="button-delete-selected btn btn-danger py-1 px-2 ml-2"
                                onClick={deleteProcessHandler2}
                                disabled={selectedProcess.length === 0 }
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
                     label: 'TITLE',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'CONTENT',
                   field: 'content',
                   sort: 'asc'
               },
                {
                    label: 'ACTIONS',
                    field: 'actions',
                },
            ],
             rows: []
        };
                
                        processes.forEach(process => {
                            data.rows.push({
                                select: (
                                    <div className="d-flex align-items-right">
                                        <input
                                            type="checkbox"
                                            checked={selectedProcess.includes(process._id)}
                                            onChange={() => toggleProcessselection(process._id)}
                                        />
                                    </div>
                                ),
                                id: (
                                    <div className="d-flex align-items-right">
                                        {process._id}
                                    </div>
                                ),
                                title: (
                                    <div className="d-flex align-items-right">
                                        {process.title}
                                    </div>
                                ),
                                content: (
                                    <div className="d-flex align-items-right">
                                        {process.content}
                                    </div>
                                ),
                                actions: 
                                    <div className="d-flex">
                                        <Link to={`/admin/updateprocess/${process._id}`} className="etable btn btn-primary py-1 px-2">
                                            <i className="fa fa-pen"></i>
                                        </Link>
                                        <button className="dtable btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProcessHandler(process._id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
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
        <MetaData title={'PROCESS'} />
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
                                <h1 className="table-title-my-5">DATA COLLECTION AND OBSERVATION STEPS</h1>
                                <Link to={`/admin/new/process`} className="ptable btn btn-primary py-1 px-2">
                                    <i className="fa fa-plus"></i>
                                </Link>
                            </div>
                            <MDBDataTableV5 data={processList()} className="table-px-3" 
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

export default ProcessList;
