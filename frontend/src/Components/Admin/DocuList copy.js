import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader' 
import { getToken } from '../../utils/helpers';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DocuList = () => {
    const [Documentations, setDocumentations] = useState([])
    const [error, setError] = useState('')
    const [deleteError, setDeleteError] = useState('')
     const [loading, setLoading] = useState(true)
    const [isDeleted, setIsDeleted] = useState(false)

    let navigate = useNavigate()
    const getAdminDocumentations = async () => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`http://localhost:3001/api/v1/Documentations`, config)
            console.log(data)
            setDocumentations(data.Documentations)
            setLoading(false)
        } catch (error) {

            setError(error.response.data.message)

        }
    }
    useEffect(() => {
        getAdminDocumentations()

        if (error) {
            // toast.error(error, {
            //     position: toast.POSITION.BOTTOM_RIGHT
            // });
        }

        if (deleteError) {
            // toast.error(deleteError, {
            //     position: toast.POSITION.BOTTOM_RIGHT
            // });
        }

        if (isDeleted) {
            // toast.success('Product deleted successfully', {
            //     position: toast.POSITION.BOTTOM_RIGHT
            // })
            navigate('/adminPage');
            
            setIsDeleted(false)
            setDeleteError('')

        }

    }, [error, deleteError, isDeleted,])

    const deleteProduct = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.delete(`http://localhost:3001/api/v1/admin/Documentation/${id}`, config)

            setIsDeleted(data.success)
            setLoading(false)
        } catch (error) {
            setDeleteError(error.response.data.message)

        }
    }



    const DocumentationsList = () => {
        const data = {
            columns: [
                {
                    label: 'id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'plantType',
                    field: 'plantType',
                    sort: 'asc',
                    
                },
                {
                    label: 'height',
                    field: 'height',
                    sort: 'asc'
                },
                
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        Documentations.forEach(product => {
            data.rows.push({
                id: product._id,
                plantType: product.plantType,
                height: product.height,
                 actions: <Fragment>
                    <Link to={`/admin/Documentation/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
        deleteProduct(id)
    }

    return (
        <Fragment>
            <MetaData title={'All Documentations'} />
            <div className="row">
                

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Documentations</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={DocumentationsList()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default DocuList