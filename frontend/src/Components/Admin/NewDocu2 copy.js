import React, { Fragment, useEffect, useState } from 'react'  
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewDocu = () => {
  const [users, setUsers] = useState([]);
  const [plantType, setType] = useState();
  const [height, setHeight] = useState();
  const [createdAt, setCreatedAt] = useState('');
  const [files, setImages] = useState([]);
  const [inputs, setInputs] = useState(['']); 
  const [error, setError] = useState('')
   
 

  const submit = () => {
    // Assuming you want to submit all values including dynamic inputs
    const formData = {
      plantType,
      height,
      createdAt,
      leaves: inputs,
      images: files,
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

             const { data } = await axios.post(`http://localhost:3001/api/v1/Documentation/new`, formData )
             console.log(data);
             // setLoading(false)
            // setSuccess(data.success)
            // setProduct(data.product)
        } catch (error) {
            setError(error.response.data.message)

        }
    }

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // const addInput = () => {
  //   setInputs([...inputs, '']);
  // };

  const addInput = () => {
    const newInputs = [...inputs, ''];
    setInputs(newInputs);

    // Scroll to the newly added input
    const lastIndex = newInputs.length - 1;
    const newInputId = `inputZip${lastIndex}`;
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


  const handleFileChange = (e) => {
    const fileList = e.target.files;
    setImages([...files, ...fileList]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setImages(newFiles);
  };

 
  return (
    <Fragment> <form className="row g-3">
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
     

            <div className="col-md-6">
                <button type="button" onClick={addInput}>Add</button>
                {inputs.map((value, index) => (
                  
                  <div key={index} className="col-md-2">
                    <label htmlFor={`inputLeaves${index}`} className="form-label">
                      No. Leaves
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`inputLeaves${index}`}
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    <button type="button" onClick={() => removeInput(index)}>x</button>
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <label htmlFor="fileInput" className="form-label">Upload Images</label>
                <input
                  type="file"
                  id="imagesInput"
                  className="form-control"
                  multiple
                  onChange={handleFileChange}
                />
                <div className="gallery">
                  {files.map((file, index) => (
                    <div key={index} className="gallery-item">
                      <img src={URL.createObjectURL(file)} alt={`Uploaded file ${index + 1}`} />
                      <button type="button" onClick={() => removeFile(index)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
           
          

            <div className="col-12">
              <button type="button" className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
          </form> 

    </Fragment>
    )
}

export default NewDocu