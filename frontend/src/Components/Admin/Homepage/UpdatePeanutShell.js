import React, { Fragment, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MetaData from '../../Layout/MetaData' 
import { getToken } from '../../../utils/helpers';
import axios from 'axios'
import Sidebar from '../Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const UpdatePeanutShell = () => {
  const [users, setUsers] = useState([]);
  const [peanutshell, setPeanutShells] = useState({});
  const [types, setTypes] = useState();
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');
  const [updateError, setUpdateError] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)

  const [selectedTopic, setSelectedTopic] = useState('');

  let { id } = useParams();
  let navigate = useNavigate()

    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });

  const getTopicDetails =  async (id) => {
    try {
       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/home/show/peanutshell/${id}`)
       setPeanutShells(data.peanutshell)
      //  console.log(id)
       console.log(data.peanutshell)
       setLoading(false)
       
    } catch (error) {
        setError(error.response.data.message)
        
    }
}

  //  const UpdateTopic = async (id, peanutshellsData ) => {
       
  //       try {
  //           // const config = {
  //           //     headers: {
  //           //         'Content-Type': 'application/json',
  //           //         'Authorization': `Bearer ${getToken()}`
  //           //     }
  //           // }
  //           // console.log(formData);

  //            const { data } = await axios.put(`http://localhost:3001/api/v1/home/peanutshell/${id}`, peanutshellsData  )
  //            console.log(data);
  //            setIsUpdated(data.success)

  //       } catch (error) {
  //           setUpdateError(error.response.data.message)
  //           if (error.response && error.response.status === 400 && error.response.data.errors) {
  //               // If the server returns validation errors, display them to the user
  //               const validationErrors = error.response.data.errors;
  //               validationErrors.forEach(errorMessage => {
  //                   toast.error(errorMessage, {
  //                       position: toast.POSITION.BOTTOM_RIGHT
  //                   });
  //               });
  //           } 

  //       }
  //   }

    useEffect(() => {
      if (Object.keys(peanutshell).length === 0) {
          getTopicDetails(id);
      } else {
          setTopic(peanutshell.topic);
          setDescription(peanutshell.description);
      }

      if (error) {
            errMsg(error)
            
        }
        if (updateError) {
            errMsg(updateError);
           
        }
        if (isUpdated) {
            navigate('/home/peanutshell');
            successMsg('PEANUT SHELL DESCRIPTION IS UPDATED SUCCESSFULLY');
           
        }

  }, [error, isUpdated, updateError, peanutshell, id]);

    // useEffect(() => {
    //     if (peanutshell && peanutshell._id !== id) {
    //       getTopicDetails(id)
    //     } else {
    //         setTopic(peanutshell.topic);
    //         setDescription(peanutshell.description);
    //     }
    //     if (error) {
    //         errMsg(error)
            
    //     }
    //     if (updateError) {
    //         errMsg(updateError);
           
    //     }
    //     if (isUpdated) {
    //         navigate('/home/peanutshell');
    //         successMsg('PEANUT SHELL DESCRIPTION IS UPDATED SUCCESSFULLY');
           
    //     }
    // }, [error, isUpdated, updateError, peanutshell, id])

    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
          const updatedData = {
              topic,
              description,
          };
  
          const { data } = await axios.put(`http://localhost:3001/api/v1/home/peanutshell/${peanutshell._id}`, updatedData);
  
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
    <div className="row">
      <div className="col-12 col-md-2"style={{  marginBottom: "2px" }}>
        <div style={{  height: '100vh', overflow: 'scroll initial' }}>
          <Sidebar />
        </div>
      </div>
        
      <div className="np col-12 col-md-8">
        <div className="np wrapper my-5" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
          <Fragment> 
            <form className="row g-3 form1" encType="multipart/form-data">

              {/* <div className="col-12">
                <label htmlFor="Content" className="form-label">Topic :</label>
                <input
                  type="text"
                  className="form-control"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div> */}

              <div className="col-12">
                <label htmlFor="Content" className="form-label">TOPIC:</label>
                <input
                  type="text"
                  className="form-control"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  readOnly 
                />
              </div>

              <div className="col-12">
                <label htmlFor="Content" className="form-label">DESCRIPTION:</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="col-12">
                <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
              </div>
            </form> 
          </Fragment>
        </div>
      </div>
    </div>
    </Fragment>
    )
}


export default UpdatePeanutShell