import React, { Fragment, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import {getUser, getToken} from '../../utils/helpers'

import Header from '../../Components/Layout/Header'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  



function Forum() {
    const [user, setUser] = useState(getUser())

    const [allInquiries, setAllInquiries] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);

    const [answer, setAnswer] = useState();
    const [inquiry, setInquiry] = useState();
    const [images, setImages2] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    
    const [showModal, setShowModal] = useState(false);
    const [showReplySection, setShowReplySection] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [answerToDeleteId, setAnswerToDeleteId] = useState(null);
    const [selectedInquiryId, setSelectedInquiryId] = useState(null);
    const [replySubmitted, setReplySubmitted] = useState(false);



    // let { id } = useParams();

    const getAllInquiries =  async () => {
        try {

            const response = await axios.get(`http://localhost:3001/api/v1/inquiries`);

            setAllInquiries(response.data.inquiries);

            console.log(response.data.inquiries)

            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const getAllAnswers =  async () => {
        try {

            const response = await axios.get(`http://localhost:3001/api/v1/answers`);

            setAllAnswers(response.data.answers);

            console.log(response.data.answers)

            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    useEffect(() => {
        
        getAllInquiries();
        getAllAnswers();

        if (error) {
            toast.error('FAILED TO DELETE YOUR REPLY');
        }

        if (deleteError) {
            toast.error('FAILED TO DELETE YOUR REPLY');
        }

        if (isDeleted) {

            toast.success('YOUR REPLY IS DELETED SUCCESSFULLY');
            getAllAnswers();

            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);
  
    const submitInquiry = async () => {

        const formData = new FormData();
        formData.append('inquiry', inquiry);
    
        images.forEach(image => {
            formData.append('images', image);
        });
           
        try {
            const { data } = await axios.post(`http://localhost:3001/api/v1/inquiry`, formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(formData);
            setSuccess(data.success);
        
                toast.success('POST ADDED');
                closeModal();
                setInquiry('');
                setImages2([]);
                setImagesPreview([]);

                getAllInquiries();

          } catch (error) 
          {
            setError(error.response.data.message);
            toast.error('FAILED TO POST');
          }
        };

    const submitAnswer = async (id) => {

        const formData = new FormData();
        formData.append('answer', answer);
        images.forEach(image => {
            formData.append('images', image);
        });
           
        try {
          
            const { data } = await axios.post(`http://localhost:3001/api/v1/answer/${id}`, formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`,
              },
            });
            
            setSuccess(data.success);
            
                toast.success('REPLY ADDED');
                setReplySubmitted(true);
                setAnswer('');
                setImages2([]);
                setImagesPreview([]);

                getAllAnswers();

            
          } catch (error) 
          {
            setError(error.response.data.message);
            toast.error('FAILED TO REPLY');
          }
        };

    const deleteAnswer = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/answers/${id}`, config);
            
            setIsDeleted(data.success);
            setLoading(false);

        } catch (error) {
            setDeleteError(error.response.data.message);
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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showDeleteModalHandler = (answerId) => {
    setShowDeleteModal(true);
    setAnswerToDeleteId(answerId);
};

    const hideDeleteModalHandler = () => {
        setShowDeleteModal(false);
        setAnswerToDeleteId(null);
    };

  const toggleReplySection = (inquiryId) => {
    setShowReplySection(!showReplySection);
    setSelectedInquiryId(inquiryId);
    setReplySubmitted(false);

  };

  const getAnswersForInquiry = (inquiryId) => {
    return allAnswers.filter((allAnswers) => allAnswers.inquiry === inquiryId);
  };

  useEffect(() => {
    const fileInput = document.getElementById('customFile');
    const cameraIcon = document.querySelector('.camera-icon');

    if (fileInput && cameraIcon) {
      cameraIcon.addEventListener('click', function () {
        fileInput.click();
      });
    }

    return () => {
      // Remove the event listener when the component is unmounted
      if (fileInput && cameraIcon) {
        cameraIcon.removeEventListener('click', function () {
          fileInput.click();
        });
      }
    };
  }, []);


  return (
    <Fragment>
        <Header />
        <div className="row">
            <div class="container bootdey">
                <div class="col-md-12 bootstrap snippets">
                    <div class="panel">
                        <div class="panel-body">
                            <textarea 
                                class="form-control postS" 
                                rows="2" 
                                placeholder="Post something..."
                                onClick={openModal}
                                />

                                {/* MODAL */}

                                {showModal && (
                                        <div className="modal" style={{ display: 'block' }}>
                                            <div className="modal-content">
                                                <span className="close" onClick={closeModal}>
                                                CANCEL
                                                </span>
                                                <span className="title">CREATE NEW POST</span>
                                                {/* Add your modal content here */}
                                                <textarea 
                                                    class="form-control" 
                                                    id="inquiry"
                                                    placeholder="Write your post..."
                                                    value={inquiry}
                                                    onChange={(e) => setInquiry(e.target.value)}   
                                                />
                                                <div className="col-md-12">
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
                                                
                                                <div class="mar-top clearfix">
                                                    <button 
                                                        class="btn btn-sm btn-primary pull-right" 
                                                        onClick={submitInquiry}>
                                                        POST
                                                    </button>
                                                    <label htmlFor="customFile" className="camera-icon">
                                                        <i className="fa fa-camera"></i>
                                                    </label>
                                                        <input
                                                            type="file"
                                                            name="images"
                                                            id="customFile"
                                                            onChange={onChange}
                                                            multiple
                                                            style={{ display: 'none' }}
                                                        />
                                                
                                                </div>
                                            </div>
                                        </div>
                                        
                                    )}
                                
                                {/* END OF MODAL */}

                        </div>
                    </div>

                    {allInquiries.map((allInquiry) => (
                        
                    
                    <div class="panel" key={allInquiry._id}>
                        <div class="panel-body postSo">
                        
                            <div class="media-block">
                                
                                <div class="media-body">
                                    <div class="media-left" href="#">
                                        <img class="img-circle img-sm" alt="Profile Picture" 
                                            src="/images/avatar.png" />                   
                                    </div>
                                    <div class="mar-btm">
                                        <h1>ANONYMOUS</h1>
                                        <p class="text-muted text-sm dateD">
                                            {new Date(allInquiry.inputDate).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>
                                    
                                    <p className="detailsD">{allInquiry.inquiry}</p>
                                    <div className="col-md-12">
                                        <div className="gallery replyShowI">
                                            {allInquiry.images.map((img, index) => (
                                                <div key={index} className="gallery-item">
                                                    <img src={img.url} alt={`Image ${index + 1}`} className="img-responsive thumbnail" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {user && user.role === 'admin' && (
                                    <Fragment>
                                        <div class="pad-ver">
                                            <a class="replyShow" 
                                            onClick={() => toggleReplySection(allInquiry._id)}>Reply</a>
                                        </div>

                                        {showReplySection && selectedInquiryId === allInquiry._id && (

                                            <div className="answerC">
                                                <textarea 
                                                class="form-control" 
                                                id="answer"
                                                placeholder="Reply..."
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}   
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

                                                <div class="mar-top clearfix replyACR" style={{ textAlign: 'right' }}>
                                                <label htmlFor="customFile" className="camera-icon replyAC">
                                                    <i className="fa fa-camera"></i>
                                                </label>
                                                    <input
                                                        type="file"
                                                        name="images"
                                                        id="customFile"
                                                        onChange={onChange}
                                                        multiple
                                                        style={{ display: 'none' }}
                                                    />
                                                <button 
                                                    class="btn btn-sm btn-primary pull-right replyA" 
                                                    onClick={() => {
                                                        console.log('Clicked with ID:', allInquiry._id);
                                                        submitAnswer(allInquiry._id);
                                                    }}>
                                                    REPLY
                                                </button>
                                                

                                                </div>
                                            </div>

                                        )}
                                    </Fragment> 
                                    )}
                                    
                                    <hr />

                                    {getAnswersForInquiry(allInquiry._id).map((allAnswer) => (
                                        
                                        <div key={allAnswer._id}>
                                            <div class="media-block replyD">
                                              
                                                <div class="media-body">
                                                    <div class="media-left">
                                                        <img class="img-circle img-sm" alt="Profile Picture" 
                                                            src="/images/avatar.png" />
                                                    </div>
                                                    <div class="mar-btm">
                                                        <h1 className="text-uppercase">ADMIN</h1>
                                                        <p class="text-muted text-sm dateD">
                                                            {new Date(allAnswer.answerDate).toLocaleString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                                hour12: true,
                                                            })}
                                                        </p>
                                                    </div>

                                                    <p>{allAnswer.answer}</p>
                                                    <div className="col-md-12">
                                                        <div className="gallery">
                                                            {allAnswer.images.map((img, index) => (
                                                                <div key={index} className="gallery-item">
                                                                    <img src={img.url} alt={`Image ${index + 1}`} className="img-responsive thumbnail" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {user && user.role === 'admin' && (
                                                    <div class="pad-ver">
                                                        
                                                        <a class="btn btn-sm btn-default btn-hover-primary" onClick={() => showDeleteModalHandler(allAnswer._id)}>Delete</a>
                                                    </div>
                                                    )}

                                                    {/* DELETE MODAL */}
                                                    {showDeleteModal && (
                                                        <div className="modal deleteM" style={{ display: 'block' }}>
                                                            <div className="modal-content">
                                                                
                                                                <span className="title">CONFIRM DELETION</span>                                                                <p>Are you sure you want to delete this answer?</p>
                                                                <div class="mar-top clearfix">
                                                                    <button 
                                                                        class="btn btn-sm btn-danger pull-right" 
                                                                        onClick={() => {
                                                                            console.log('Clicked to delete with ID:', answerToDeleteId);
                                                                            deleteAnswer(answerToDeleteId);
                                                                            hideDeleteModalHandler();
                                                                        }}>
                                                                        DELETE
                                                                    </button>
                                                                    <span className="close" onClick={hideDeleteModalHandler}>
                                                                    CANCEL
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* END OF DELETE MODAL */}
                                                <hr />
                                                </div>
                                            </div>
                                        </div>
                                    
                                    ))}
                                    </div>
                                    
                            </div>
                    
                            
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </Fragment>
  )
}


export default Forum;