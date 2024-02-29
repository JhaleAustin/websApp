import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../../Layout/MetaData'
import Sidebar from '../Sidebar'
import { getToken } from '../../../utils/helpers';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';



const UpdateProcess = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    // const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [images2Preview, setImages2Preview] = useState([])
    const [error, setError] = useState('')
    const [docu, setDocu] = useState({})
    const [loading, setLoading] = useState(true)
    const [updateError, setUpdateError] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
    const [inputs, setInputs] = useState([]); 
    let { id } = useParams();
    let navigate = useNavigate();
    
  const [images, setImages2] = useState([]);

    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });

    const getdocuDetails =  async (id) => {
        try {
           const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/process/${id}`)
            setDocu(data.getProcess)
           setLoading(false)
           
        } catch (error) {
            setError(error.response.data.message)
            
        }
    }
      
    const updateDocu = async (id, docuData)  => {
        try {
           
            const config = {
                headers: {
                    'Content-Type':   'multipart/form-data', 
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/Documentation/${id}`, docuData, config)
            setIsUpdated(data.success)
           
        } catch (error) {
            setUpdateError(error.response.data.message)
            if (error.response && error.response.status === 400 && error.response.data.errors) {
                // If the server returns validation errors, display them to the user
                const validationErrors = error.response.data.errors;
                validationErrors.forEach(errorMessage => {
                    toast.error(errorMessage, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                });
            } 
        }
    }
    useEffect(() => {
        if (docu && docu._id !== id) {
            getdocuDetails(id)
        } else {
 
            setTitle(docu.title);
            setContent(docu.content); 
        }
        if (error) {
            errMsg(error)
            
        }
        if (updateError) {
            errMsg(updateError);
           
        }
        if (isUpdated) {
            navigate('/admin/docus'); 
            successMsg('docu updated successfully');
           
        }
    }, [error, isUpdated, updateError, docu, id])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('title', title);
        formData.set('content', content);
        
      
        updateDocu(docu._id, formData)
    }
    const onChange = e => {
        const files = Array.from(e.target.files)
        setImages2Preview([]);
        setImages2([])
        setOldImages([])
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages2Preview(oldArray => [...oldArray, reader.result])
                    setImages2(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }



    const handleInputChange = (index, key, value) => {
      const newInputs = [...inputs];
      newInputs[index] = { ...newInputs[index], [key]: value };
      setInputs(newInputs);
    };
  
    const addInput = () => {
      setInputs([...inputs, { length: '', width: '' }]);
  
      // Scroll to the newly added input
      const lastIndex = inputs.length;
      const newInputId = `inputLeavesLength${lastIndex}`;
      const newInputElement = document.getElementById(newInputId);
  
      if (newInputElement) {
        newInputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    };
 

  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

 

  const removeFile = (index) => {
    const newFiles = [...images];
    newFiles.splice(index, 1);
    setImages2(newFiles);
  };




    return (
      <Fragment>
    <MetaData title={'NEW DOCUMENTATION'} />
    <div className="row">

    <div className="col-12 col-md-2"style={{  marginBottom: "2px" }}>
    <div style={{  height: '100vh', overflow: 'scroll initial' }}>
        <Sidebar />
        </div>
    </div>

            <div className="np col-12 col-md-8">
            <div className="np wrapper my-5" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
                <Fragment>
      <form className="row g-3 form1" encType='multipart/form-data'>
       


      <div className="col-12">
                  <label htmlFor="Content" className="form-label">
                    Title :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="Content" className="form-label">
                    Content :
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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

export default UpdateProcess