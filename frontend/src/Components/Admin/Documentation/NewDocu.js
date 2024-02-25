import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../Layout/MetaData' 
import { getToken } from '../../../utils/helpers';
import axios from 'axios'

import Sidebar from '../../Admin/Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewDocumentation = () => {

    const [plantType, setPlantType] = useState('');
    const [height, setHeight] = useState(0);
    // const [description, setDescription] = useState('');
    // const [category, setCategory] = useState('');
    // const [stock, setStock] = useState(0);
    // const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState('')
    const [product, setProduct] = useState({})

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    let navigate = useNavigate()
    
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('plantType', plantType);
        formData.set('height', height);
        // formData.set('description', description);
        // formData.set('category', category);
        // formData.set('stock', stock);
        // formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image)
        })
        
        newProduct(formData)
    }

    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagesPreview([]);
        setImages([])
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            
            reader.readAsDataURL(file)
            // console.log(reader)
        })
       
    }
    const newProduct = async (formData) => {
       
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

             const { data } = await axios.post(`http://localhost:3001/api/v1/Documentation/new`, formData, config)
             console.log(data);
             // setLoading(false)
            // setSuccess(data.success)
            // setProduct(data.product)
        } catch (error) {
            setError(error.response.data.message)

        }
    }
    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

        if (success) {
            navigate('/adminPage');
            toast.success('Product created successfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })

        }

    }, [error, success,])


    return (
        <Fragment>
        <MetaData title={'NEW MATERIAL'} />
        <div className="row">

        <div className="col-12 col-md-2"style={{  marginBottom: "2px" }}>
        <div style={{  height: '100vh', overflow: 'scroll initial' }}>
            {/* <Sidebar /> */}
            </div>
        </div>
            <div className="np col-12 col-md-8">
                <div className="np wrapper my-5" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
                    <Fragment>
                               <form className="shadow-lg form1" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">plantType</label>
                                    <input
                                        type="text"
                                        id="plantType"
                                        className="form-control"
                                        value={plantType}
                                        onChange={(e) => setPlantType(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">height</label>
                                    <input
                                        type="text"
                                        id="height"
                                        className="form-control"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                </div>

                                {/* <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div> */}

                                {/* <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div> */}
                                {/* <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div> */}

                                {/* <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div> */}

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

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                // disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                            </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default NewDocumentation
