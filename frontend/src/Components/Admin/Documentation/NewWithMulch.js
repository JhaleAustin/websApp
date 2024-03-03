import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MetaData from '../../Layout/MetaData' 
import { getToken } from '../../../utils/helpers';
import axios from 'axios'

import Sidebar from '../Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

const NewWithMulch = () => {
  const [users, setUsers] = useState([]);
  const [plantTypes, setPlantType] = useState();
  const [height, setHeight] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [numOfLeaves, setNumOfLeaves] = useState();
  const [collectionDate, setCollectionDate] = useState('');
  const [error, setError] = useState('')
  const [images, setImages2] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])
  const [success, setSuccess] = useState('');

  let navigate = useNavigate()
  let { id } = useParams();

  const submit = async () => {

    const formData = new FormData();
    formData.append('height', height);
    formData.append('collectionDate', collectionDate);
    formData.append('leaves', JSON.stringify({ length, width })); 
    formData.append('numOfLeaves', numOfLeaves);


    images.forEach(image => {
        formData.append('images', image);
    });
       
    try {
        const { data } = await axios.post(`http://localhost:3001/api/v1/admin/documentation/${id}`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`,
          },
        });
        console.log(formData);
        setSuccess(data.success);
    
            toast.success('DATA IS ADDED SUCCESSFULLY');
            navigate('/admin/withmulch');

        
        
      } catch (error) {
        setError(error.response.data.message);
        toast.error('FAILED TO ADD DATA');
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

  const removeFile = (index) => {
    const newFiles = [...images];
    newFiles.splice(index, 1);
    setImages2(newFiles);
  };

 
  return (
    <Fragment>
    <MetaData title={'NEW DATA'} />
    <div className="row dlist">
        <div className="col-12 col-md-2">    
            <Sidebar />
        </div>
    
        <div className="np4 col-12 col-md-8">
            <div className="np wrapper my-5 home-form4" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
                <Fragment>
                
                    <form className="row g-3 form4" encType="multipart/form-data">
                        <h1 className="headerNew">ADD NEW WITH MULCH DATA</h1>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="collectionDate" className="form-label-1">DATE:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="collectionDate"
                                    value={collectionDate}
                                    onChange={(e) => setCollectionDate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="height" className="form-label-2">HEIGHT: (CM)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="length" className="form-label-3">LENGTH: (CM)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="length"
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                />
                            </div>  
                            <div className="col-md-4">
                                <label htmlFor="width" className="form-label-4">WIDTH: (CM)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="width"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                />
                            </div>  
                            <div className="col-md-4">
                                <label htmlFor="numOfLeaves" className="form-label-5">NUMBER OF LEAVES:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numOfLeaves"
                                    value={numOfLeaves}
                                    onChange={(e) => setNumOfLeaves(e.target.value)}
                                />
                            </div>  
                        </div>

                        <div className="row" id="imagesRow">
                            <div className="col-md-6"> 
                                <label className="custom-file-label" htmlFor="customFile">
                                    <i class="fa fa-camera"></i>UPLOAD IMAGES
                                </label>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <input
                                        type="file"
                                        name="images"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChange}
                                        multiple
                                    />
                                    

                                    <div className="gallery">
                                        {images.map((file, index) => (
                                            <div className="galleryItemRow">
                                                <div key={index} className="gallery-item">
                                                    <img src={file} alt={file} />
                                                
                                                </div>
                                                <div>
                                                    <button type="button" onClick={() => removeFile(index)}>
                                                    REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
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

export default NewWithMulch