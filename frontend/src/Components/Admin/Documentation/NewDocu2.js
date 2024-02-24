import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../Layout/MetaData' 
import { getToken } from '../../../utils/helpers';
import axios from 'axios'

import Sidebar from '../../Admin/Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
const NewDocu = () => {
  const [users, setUsers] = useState([]);
  const [plantType, setType] = useState();
  const [height, setHeight] = useState();
  const [createdAt, setCreatedAt] = useState('');
  const [files, setImages] = useState([]);
  const [inputs, setInputs] = useState([]); 
  const [error, setError] = useState('')
  const [images, setImages2] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])

 

  const submit = () => {
    // Assuming you want to submit all values including dynamic inputs
    const formData = {
      plantType,
      height,
      createdAt,
      leaves: inputs,
      images: images,
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
             const { data } = await axios.post(`http://localhost:3001/api/v1/Documentation/new`, formData )
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
      <form className="row g-3" encType='multipart/form-data'>
            <div className="col-12">
              <label htmlFor="createdAt" className="form-label">Date :</label>
              <input
                type="date"
                className="form-control"
                id="createdAt"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="height" className="form-label">Height</label>
              <input
                type="number"
                className="form-control"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="plantType" className="form-label">Plant Type</label>
              <select
                id="plantType"
                className="form-select"
                value={plantType}
                onChange={(e) => setType(e.target.value)}
              >
                <option selected>Choose...</option>
                <option>With Mulch</option>
                <option>Without Mulch</option>
              </select>
            </div>

            {/* <div style={{ maxHeight: '150px',width:'100',overflowY: 'auto' }}> {/* Adjust the maxHeight as needed */}
     

            <div className="row">
  <div className="col-md-6">
    <button type="button" onClick={addInput}>
      Add Leaves
    </button>
    <div className="scroll-container">
      {inputs.map((value, index) => (
        <div key={index} className="form-row">
          <div className="col">
            <label htmlFor={`inputLeavesLength${index}`} className="form-label">
              Length:
            </label>
            <input
              type="text"
              className="form-control"
              id={`inputLeavesLength${index}`}
              value={value.length}
              onChange={(e) => handleInputChange(index, 'length', e.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor={`inputLeavesWidth${index}`} className="form-label">
              Width:
            </label>
            <input
              type="text"
              className="form-control"
              id={`inputLeavesWidth${index}`}
              value={value.width}
              onChange={(e) => handleInputChange(index, 'width', e.target.value)}
            />
          </div>
          <button type="button" onClick={() => removeInput(index)}>
            x
          </button>
        </div>
      ))}
    </div>
  </div>

  <div className="col-md-6">
    <div className="form-group">
      <label>Images</label>
      <div className="custom-file">
        <input
          type="file"
          name="images"
          className="custom-file-input"
          id="customFile"
          onChange={onChange}
          multiple
        />
        <label className="custom-file-label" htmlFor="customFile">
          Choose Images
        </label>
      </div>
      <div className="gallery">
        {images.map((file, index) => (
          <div key={index} className="gallery-item">
            <img src={file} alt={file} />
            <button type="button" onClick={() => removeFile(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div> <div className="col-12">
              <button type="button" className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
  </div>
</div>





           
          </form> 
          </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NewDocu