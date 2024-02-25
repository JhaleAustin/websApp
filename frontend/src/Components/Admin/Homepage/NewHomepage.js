import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../Layout/MetaData' 
import { getToken } from '../../../utils/helpers';
import axios from 'axios'

import Sidebar from '../Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
const NewHomepage = () => {
  const [users, setUsers] = useState([]);
  const [topic, setTopic] = useState();
  const [height, setHeight] = useState();
  const [description, setDescription] = useState('');
  const [files, setImages] = useState([]);
  const [inputs, setInputs] = useState([]); 
  const [error, setError] = useState('')
  const [images, setImages2] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])

 

  const submit = () => {
    // Assuming you want to submit all values including dynamic inputs
    const formData = {
      topic,
      description,
    };

    
    newProduct(formData)
 
  };


   const newProduct = async (formData) => {
       
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // }
            console.log(formData);
             const { data } = await axios.post(`http://localhost:3001/api/v1/Process/new`, formData )
             console.log(data);
             // setLoading(false)
            // setSuccess(data.success)
            // setProduct(data.product)
        } catch (error) {
            setError(error.response.data.message)

        }
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

  const onChange = e => {
    const files = Array.from(e.target.files)
    setImagesPreview([]);
    setImages2([])
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview(oldArray => [...oldArray, reader.result])
                setImages2(oldArray => [...oldArray, reader.result])
            }
        }
        
        reader.readAsDataURL(file)
      
    })
   
}

  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };


  const handleFileChange = (e) => {
    const fileList = e.target.files;
    setImages([...files, ...fileList]);
  };

  const removeFile = (index) => {
    const newFiles = [...images];
    newFiles.splice(index, 1);
    setImages2(newFiles);
  };

 
  return (
    <Fragment>
    <MetaData title={'NEW MATERIAL'} />
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
 

                <div className="radio-container">
        <div className="radio-option">
          <label htmlFor="benefits" className="form-label">
            Benefits:
          </label>
          <input
            type="radio"
            id="benefits"
            name="radioGroup"
            value="1"
            className="radio-button"
          />
        </div>

        <div className="radio-option">
          <label htmlFor="mulching" className="form-label">
            Mulching:
          </label>
          <input
            type="radio"
            id="mulching"
            name="radioGroup"
            value="2"
            className="radio-button"
          />
        </div>

        <div className="radio-option">
          <label htmlFor="peanut" className="form-label">
            Peanut:
          </label>
          <input
            type="radio"
            id="peanut"
            name="radioGroup"
            value="3"
            className="radio-button"
          />
        </div>

        <div className="radio-option">
          <label htmlFor="peanutMulch" className="form-label">
            Peanut with Mulch:
          </label>
          <input
            type="radio"
            id="peanutMulch"
            name="radioGroup"
            value="4"
            className="radio-button"
          />
        </div>
      </div>


            <div className="col-12">
              <label htmlFor="Content" className="form-label">Topic :</label>
              <input
                type="text"
                className="form-control"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="Content" className="form-label">Description :</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="col-12">
              <button type="button" className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
          </form> 
          </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NewHomepage