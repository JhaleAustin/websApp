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

const DocumentationsList = () => {
    const [documentation, setDocumentation] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selecteddocumentation, setSelecteddocumentation] = useState([]);

    let navigate = useNavigate();

    const getAdmindocumentation = async () => {
        try {
           // const config = {
           //     headers: {
           //         'Content-Type': 'multipart/form-data',
           //         'Authorization': `Bearer ${getToken()}`
           //     }
           // };

           const { data } = await axios.get(`http://localhost:3001/api/v1/Documentations`);

           setDocumentation(data.Documentations);
 
           setLoading(false);
       } catch (error) {
           setError(error.response.data.message);
       }
   };

   useEffect(() => {
        getAdmindocumentation();

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

            navigate('/admin/documentationList');

            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);

    const deleteDocumentations = async (id) => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/admin/Documentation/${id}`);
            
            setIsDeleted(data.success);
            setLoading(false);

        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    const toggledocumentationSelection = (id) => {
        const isSelected = selecteddocumentation.includes(id);
        if (isSelected) {
            setSelecteddocumentation(selecteddocumentation.filter((selectedId) => selectedId !== id));
        } else {
            setSelecteddocumentation([...selecteddocumentation, id]);
        }
    };

    const toggleAlldocumentationSelection = () => {
        if (selecteddocumentation.length === documentation.length) {
            setSelecteddocumentation([]);
        } else {
            setSelecteddocumentation(documentation.map((documentation) => documentation._id));
        }
    };

    const documentationList = () => {
        const data = {
            columns: [
                {
                    label: (
                        <div className="d-flex align-items-center ptable">
                            <input
                                type="checkbox"
                                checked={selecteddocumentation.length === documentation.length}
                                onChange={toggleAlldocumentationSelection}
                            />
                            <button
                                className="button-delete-selected btn btn-danger py-1 px-2 ml-2"
                                onClick={deleteDocumentationsHandler2}
                                disabled={selecteddocumentation.length === 0 }
                            >
                                DELETE SELECTED
                            </button>
                        </div>
                        ),
                    field: 'select',
                    sort: 'asc',
                },
                {
                    label: 'DOCUMENTATION ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                     label: 'PLANTYPE',
                    field: 'plantType',
                    sort: 'asc'
                },
                {
                    label: 'HEIGHT',
                   field: 'height',
                   sort: 'asc'
               },
               
               {
                label: 'LEAVES',
                field: 'leaves',
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
                
        documentation.forEach(Documentations => {
            data.rows.push({
                select: (
                    <div className="d-flex align-items-right">
                        <input
                            type="checkbox"
                            checked={selecteddocumentation.includes(Documentations._id)}
                            onChange={() => toggledocumentationSelection(Documentations._id)}
                        />
                    </div>
                        ),
                id: (
                        <div className="d-flex align-items-right">
                        {Documentations._id}
                        </div>
                    ),
                    plantType: 
                    (
                        <div className="d-flex align-items-right">
                        {Documentations.plantType}
                        </div>
                    ),

                    
                height: 
                (
                    <div className="d-flex align-items-right">
                    {Documentations.height}
                    </div>
                ),

                leaves:
                (

                <>
                <div className="leaves-container">
                <div className="leaves-row">
                    <div className="length-header">Length</div>
                    <div className="width-header">Width</div>
                </div>
                {Documentations.leaves.map((leaves, index) => (
                    <div className="d-flex align-items-right leaves-row" key={index}>
                        <div className="length-column">{leaves.length}</div>
                        <div className="width-column">{leaves.width}</div>
                    </div>
                ))}
                </div>
       
                </>


                ),
                
                // Documentations.leaves.map((leaves, index) => (
                //     <div className="d-flex align-items-right" key={index}>
                //         <div className="width-column">{leaves.width}</div>
                //         <div className="length-column">{leaves.length}</div>
                //     </div>
                // )),
                
                        
                images: Documentations.images.map((image, index) => (
                    <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
                )),

                actions: (
                    <div className="d-flex">
                        <Link to={`/admin/updatedocumentation/${Documentations._id}`} className="etable btn btn-primary py-1 px-2">
                            <i className="fa fa-pen"></i>
                        </Link>
                        <button className="dtable btn btn-danger py-1 px-2 ml-2" onClick={() => deleteDocumentationsHandler(Documentations._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                        )
                                
                    });
                });
                
            return data;
        };
                

    const deleteDocumentationsHandler = (id) => {
        deleteDocumentations(id);
    };

    const deleteDocumentationsHandler2 = async () => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };

            const deleteRequests = selecteddocumentation.map(async (id) => {
              return axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/Documentation/${id}`);
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
                        <h1 className="table-title-my-5">DOCUMENTATION INFORMATION</h1>
                        {loading ? (
                            <Loader />
                        ) : (
                        <div>
                            <MDBDataTable data={documentationList()} className="table-px-3" bordered striped hover responsive noBottomColumns/>
                        </div>
                    )}
                </Fragment>
                </div>
            </div>
        </div>
    </Fragment>
    );
};

export default DocumentationsList;
