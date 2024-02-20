import React, { Fragment, useEffect, useState } from 'react'  
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [plantType, setType] = useState();
  const [height, setHeight] = useState();
  const [createdAt, setCreatedAt] = useState('');

  const [inputs, setInputs] = useState(['']); // Initial state with one input

  useEffect(() => {
    axios.get('http://localhost:3001/getUser')
      .then((users) => {
        setUsers(users.data);
      })
      .catch(err => console.log(err));
  }, []);

  const submit = () => {
    // Assuming you want to submit all values including dynamic inputs
    const formData = {
      plantType,
      height,
      createdAt,
      zipCodes: inputs,
    };

    axios.post('http://localhost:3001/createUser', formData)
      .then((users) => {
        console.log(users);
      })
      .catch(err => console.log(err));
  };

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

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    setFiles([...files, ...fileList]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

 
  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <article className="tile is-child box">
        <form className="row g-3">
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
                    <label htmlFor={`inputZip${index}`} className="form-label">
                      No. Leaves
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`inputZip${index}`}
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    <button type="button" onClick={() => removeInput(index)}>x</button>
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <label htmlFor="fileInput" className="form-label">Upload Files</label>
                <input
                  type="file"
                  id="fileInput"
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
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" htmlFor="gridCheck">
                  Check me out
                </label>
              </div>
            </div>

            <div className="col-12">
              <button type="button" className="btn btn-primary" onClick={submit}>Sign in</button>
            </div>
          </form> 
        </article>
    </div>

    <div class="tile is-parent">
          <article class="tile is-child box">
          <table class="uk-table uk-table-striped">
    <thead>
        <tr>
            <th>Table Heading</th>
            <th>Table Heading</th>
            <th>Table Heading</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
        </tr>
        <tr>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
        </tr>
        <tr>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>Table Data</td>
        </tr>
    </tbody>
</table>
          </article>
        </div>
    </div>
    )
}

export default AdminPage