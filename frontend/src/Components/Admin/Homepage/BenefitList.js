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

const BenefitList = () => {
    const [benefit, setBenefit] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedBenefit, setSelectedBenefit] = useState([]);

    let navigate = useNavigate();

    const getAdminBenefit = async () => {
        try {
           // const config = {
           //     headers: {
           //         'Content-Type': 'multipart/form-data',
           //         'Authorization': `Bearer ${getToken()}`
           //     }
           // };

           const { data } = await axios.get(`http://localhost:3001/api/v1/`);

           setBenefit(data.benefit);

           setLoading(false);
       } catch (error) {
           setError(error.response.data.message);
       }
   };

   useEffect(() => {
        getAdminBenefit();

        if (error) {
            toast.error('FAILED TO DELETE BENEFIT INFORMATION');
        }

        if (deleteError) {
            toast.error('FAILED TO DELETE BENEFIT INFORMATION');
        }

        if (isDeleted) {

            toast.success('BENEFIT INFORMATION IS DELETED SUCCESSFULLY');

            navigate('/admin/benefit');

            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);

    const deleteBenefit = async (id) => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/home/benefit/${id}`);
            
            setIsDeleted(data.success);
            setLoading(false);

        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    const toggleBenefitSelection = (id) => {
        const isSelected = selectedBenefit.includes(id);
        if (isSelected) {
            setSelectedBenefit(selectedBenefit.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedBenefit([...selectedBenefit, id]);
        }
    };

    const toggleAllBenefitSelection = () => {
        if (selectedBenefit.length === benefit.length) {
            setSelectedBenefit([]);
        } else {
            setSelectedBenefit(benefit.map((benefits) => benefits._id));
        }
    };

    const benefitList = () => {
        const data = {
            columns: [
                {
                    label: (
                        <div className="d-flex align-items-center ptable">
                            <input
                                type="checkbox"
                                checked={selectedBenefit.length === benefit.length}
                                onChange={toggleAllBenefitSelection}
                            />
                            <button
                                className="button-delete-selected btn btn-danger py-1 px-2 ml-2"
                                onClick={deleteBenefitHandler2}
                                disabled={selectedBenefit.length === 0 }
                            >
                                DELETE SELECTED
                            </button>
                        </div>
                        ),
                    field: 'select',
                    sort: 'asc',
                },
                {
                    label: 'BENEFIT ID',
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
                
        benefit.forEach(benefits => {
            data.rows.push({
                select: (
                    <div className="d-flex align-items-right">
                        <input
                            type="checkbox"
                            checked={selectedBenefit.includes(benefits._id)}
                            onChange={() => toggleBenefitSelection(benefits._id)}
                        />
                    </div>
                        ),
                id: (
                        <div className="d-flex align-items-right">
                        {benefits._id}
                        </div>
                    ),
                description: 
                    (
                        <div className="d-flex align-items-right">
                        {benefits.description}
                        </div>
                    ),
                actions: (
                    <div className="d-flex">
                        <Link to={`/admin/updatebenefit/${benefits._id}`} className="etable btn btn-primary py-1 px-2">
                            <i className="fa fa-pen"></i>
                        </Link>
                        <button className="dtable btn btn-danger py-1 px-2 ml-2" onClick={() => deleteBenefitHandler(benefits._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                        )
                                
                    });
                });
                
            return data;
        };
                

    const deleteBenefitHandler = (id) => {
        deleteBenefit(id);
    };

    const deleteBenefitHandler2 = async () => {
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // };

            const deleteRequests = selectedBenefit.map(async (id) => {
              return axios.delete(`${process.env.REACT_APP_API}/api/v1/home/benefit/${id}`);
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
        <MetaData title={'BENEFITS'} />
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
                        <div class="dataTab">
                            <div class="dataHead">
                                <h1 className="table-title-my-5">BENEFITS INFORMATION</h1>
                                <Link to={`/admin/homepage`} className="ptable btn btn-primary py-1 px-2">
                                    <i className="fa fa-plus"></i>
                                </Link>
                            </div>
                            <MDBDataTableV5 data={benefitList()} className="table-px-3"
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

export default BenefitList;
