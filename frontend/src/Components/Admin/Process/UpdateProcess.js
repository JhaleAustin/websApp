import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../../Layout/MetaData'
import Sidebar from '../Sidebar'
import { getToken } from '../../../utils/helpers';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';



const UpdateProcess = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('')
    const [processes, setProcess] = useState({})
    const [loading, setLoading] = useState(true)
    const [updateError, setUpdateError] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)

    let { id } = useParams();
    let navigate = useNavigate();
    
    const getProcessDetails =  async (id) => {
        try {
           const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/process/show/${id}`)
           setProcess(data.process)
           console.log(data.process)
           setLoading(false)
           
        } catch (error) {
            setError(error.response.data.message)
            
        }
    }
      
    const submitHandler = async (e)  => {
        e.preventDefault();

        try {

            const updatedData = {
              title,
              content,
          };

            const { data } = await axios.put(`http://localhost:3001/api/v1/admin/process/${id}`, updatedData, {
                  headers: {
                      'Content-Type':   'multipart/form-data', 
                      'Authorization': `Bearer ${getToken()}`
                  }
              });
           
            if (data.success) {
              setIsUpdated(true);
            } else {
              setUpdateError('FAILED TO UPDATE STEP');
            }
           
        } catch (error) {
          setError(error.response.data.message)
          toast.error('FAILED TO UPDATE STEP');
        }
    }

    useEffect(() => {
        if (Object.keys(processes).length === 0) {
            getProcessDetails(id)
        } else {
            setTitle(processes.title);
            setContent(processes.content); 
        }

        if (error) {
          console.error('Error:', error); // Log the error
          toast.error('FAILED TO UPDATE STEP');
              
          }
          if (updateError) {
            toast.error('FAILED TO UPDATE STEP');
             
          }
          if (isUpdated) {
              toast.success('STEP IS UPDATED SUCCESSFULLY');
              navigate('/admin/process');
             
          }
    }, [error, isUpdated, updateError, processes, id])

    return (
      <Fragment>
    <MetaData title={'UPDATE STEP'} />
    <div className="row dlist">
      <div className="col-12 col-md-2">    
        <Sidebar />
      </div>
        
      <div className="np col-12 col-md-8">
        <div className="np wrapper my-5 home-form" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
          <Fragment> 
            <form className="row g-3 form3" encType="multipart/form-data">
            <div className="col-12">
                  <label htmlFor="Content" className="form-label1">
                    TITLE:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    readOnly
                  />
                </div>

              <div className="col-12">
                  <label htmlFor="Content" className="form-label3">
                    CONTENT:
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ height: '300px', resize: 'none' }}
                  ></textarea>
                </div>


              <div className="col-12">
                <button type="button" className="btn btn-primary" onClick={submitHandler}>SUBMIT</button>
              </div>
            </form> 
          </Fragment>
        </div>
      </div>


    </div>
    </Fragment>
    )
}

export default UpdateProcess