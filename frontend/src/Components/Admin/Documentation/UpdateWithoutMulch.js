import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MetaData from '../../Layout/MetaData' 
import { getToken } from '../../../utils/helpers';
import axios from 'axios'

import Sidebar from '../Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

const UpdateWithoutMulch = () => {
  const [users, setUsers] = useState([]);
  const [plantType, setPlantType] = useState();
  const [documentation, setDocumentation] = useState({})
  const [height, setHeight] = useState();
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [numOfLeaves, setNumOfLeaves] = useState();
  const [collectionDate, setCollectionDate] = useState('');

  const [images, setImages2] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [images2Preview, setImages2Preview] = useState([])

  const [loading, setLoading] = useState(true);
  const [updateError, setUpdateError] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');

  let navigate = useNavigate()
  let { id } = useParams();

  const getAdminWithoutMulch = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/documentation/${id}`)
      setDocumentation(data.getDocumentation)
      setLoading(false)

    } catch (error) {
      setError(error.response.data.message)

    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

        try {
            const updatedData = {
                height,
                collectionDate,
                leaves: {
                    length,
                    width,
                },
                numOfLeaves,
                images,
            };

            console.log(updatedData)
            const { data } = await axios.put(`http://localhost:3001/api/v1/admin/documentation/${id}`, updatedData,  {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${getToken()}`,
                },
              });;

            
            if (data.success) {
                setIsUpdated(true);
            } else {
                setUpdateError('FAILED TO UPDATE WITHOUT MULCHING DATA');
            }
        } catch (error) {
            setUpdateError(error.response?.data?.message || 'FAILED TO UPDATE WITHOUT MULCHING DATA');
        }
    };

useEffect(() => {
    if (Object.keys(documentation).length === 0) {
        getAdminWithoutMulch(id)
    } else {
        setCollectionDate(documentation.collectionDate)
        setHeight(documentation.height);
        setLength(documentation.leaves.length);
        setWidth(documentation.leaves.width);
        setNumOfLeaves(documentation.numOfLeaves);
        setOldImages(documentation.images)
    }
    if (error) {
        toast.error('FAILED TO UPDATE WITHOUT MULCH DATA');

    }
    if (updateError) {
        toast.error('FAILED TO UPDATE WITHOUT MULCH DATA');

    }
    if (isUpdated) {
      navigate('/admin/withoutmulch');
      toast.success('WITHOUT MULCH DATA IS UPDATED SUCCESSFULLY');

    }
  }, [error, isUpdated, updateError, documentation, id])

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

  const removeFile = (index) => 
  {
    const newFiles = [...images];
    newFiles.splice(index, 1);
    setImages2(newFiles);
  };

  const handleRemoveOldImage = (index) => {
    const newOldImages = [...oldImages];
    newOldImages.splice(index, 1);
    setOldImages(newOldImages);
};

 
  return (
    <Fragment>
    <MetaData title={'UPDATE DATA'} />
    <div className="row dlist">
        <div className="col-12 col-md-2">    
            <Sidebar />
        </div>
    
        <div className="np4 col-12 col-md-8">
            <div className="np wrapper my-5 home-form4" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
                <Fragment>
                
                    <form className="row g-3 form4" encType="multipart/form-data">
                        <h1 className="headerNew">UPDATE WITHOUT MULCHING DATA</h1>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="collectionDate" className="form-label-1">DATE:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="collectionDate"
                                    value={collectionDate}
                                    onChange={(e) => setCollectionDate(new Date(e.target.value).toISOString().split('T')[0])}
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
                                    {oldImages.map((oldImage, index) => (
                                            <div className="galleryItemRow" key={`old_${index}`}>
                                                <div className="gallery-item">
                                                    <img src={oldImage.url} alt={`Old Image ${index}`} />
                                                </div>
                                                <div>
                                                    <button type="button" onClick={() => handleRemoveOldImage(index)}>
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
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

export default UpdateWithoutMulch