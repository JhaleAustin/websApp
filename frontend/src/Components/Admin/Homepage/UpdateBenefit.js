import React, { Fragment, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MetaData from '../../Layout/MetaData' 
import { getToken } from '../../../utils/helpers';
import axios from 'axios'
import Sidebar from '../Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const UpdateBenefit = () => {
  const [users, setUsers] = useState([]);
  const [benefit, setBenefits] = useState({});
  const [types, setTypes] = useState();
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');
  const [updateError, setUpdateError] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)

  let { id } = useParams();
  let navigate = useNavigate()

  const getTopicDetails =  async (id) => {
    try {
       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/home/show/benefit/${id}`)
       setBenefits(data.benefit)
      //  console.log(id)
       console.log(data.benefit)
       setLoading(false)
       
    } catch (error) {
        setError(error.response.data.message)
        
    }
}
    useEffect(() => {
      if (Object.keys(benefit).length === 0) {
          getTopicDetails(id);
      } else {
          setTopic(benefit.topic);
          setDescription(benefit.description);
      }

        if (error) {
        toast.error('FAILED TO UPDATE PEANUT SHELL DESCRIPTION');
            
        }
        if (updateError) {
          toast.error('FAILED TO UPDATE PEANUT SHELL DESCRIPTION');
           
        }
        if (isUpdated) {
            toast.success('PEANUT SHELL DESCRIPTION IS UPDATED SUCCESSFULLY');
            navigate('/admin/benefit');
           
        }

  }, [error, isUpdated, updateError, benefit, id]);

    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
          const updatedData = {
              topic,
              description,
          };
  
          const { data } = await axios.put(`http://localhost:3001/api/v1/home/benefit/${benefit._id}`, updatedData);
  
          if (data.success) {
              setIsUpdated(true);
          } else {
              setUpdateError('Failed to update peanut shell information.');
          }
      } catch (error) {
          setUpdateError(error.response?.data?.message || 'Failed to update peanut shell information.');
      }
  };

  return (
    <Fragment>
    <MetaData title={'UPLOAD TOPIC'} />
    <div className="row dlist">
      <div className="col-12 col-md-2">    
        <Sidebar />
      </div>
        
      <div className="np col-12 col-md-8">
        <div className="np wrapper my-5 home-form" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
          <Fragment> 
            <form className="row g-3 form3" encType="multipart/form-data">
              <div className="col-12">
                <label htmlFor="Content" className="form-label1">TOPIC:</label>
                <input
                  type="text"
                  className="form-control topic"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  readOnly 
                />
              </div>

              <div className="col-12">
                <label htmlFor="description" className="form-label2">DESCRIPTION:</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ height: '300px', resize: 'none' }} // Disable textarea resizing if needed
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


export default UpdateBenefit