import React, { Fragment, useEffect, useState } from 'react'  
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewProcess1 = () => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState();
  const [height, setHeight] = useState();
  const [Content, setContent] = useState('');
  const [files, setImages] = useState([]);
  const [inputs, setInputs] = useState([]); 
  const [error, setError] = useState('')
  const [images, setImages2] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])

 

  const submit = () => {
    // Assuming you want to submit all values including dynamic inputs
    const formData = {
      title,
      Content,
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
    <Fragment> <form className="row g-3" encType='multipart/form-data'>
            <div className="col-12">
              <label htmlFor="Content" className="form-label">Title :</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={Content}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="Content" className="form-label">Content :</label>
              <textarea
                type="text"
                className="form-control"
                id="title"
                value={Content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

              <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>

                                    <div className="gallery">
                  {images.map((file, index) => (
                    <div key={index} className="gallery-item">
                      <img src={file} alt={file} />
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

export default NewProcess1