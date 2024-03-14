import React, { Fragment, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import {getUser, getToken} from '../../utils/helpers'

import Header from '../../Components/Layout/Header'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Filter from 'bad-words'; 

function Forum() {
    const [user, setUser] = useState(getUser())
    const [displayedItems, setDisplayedItems] = useState(2);
 
    const [allInquiries, setAllInquiries] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const [allFollowups, setAllFollowups] = useState([]);
    const [allReplies, setAllReplies] = useState([]);

    const [answer, setAnswer] = useState();
    const [inquiry, setInquiry] = useState('');
    const [followup, setFollowUp] = useState();
    const [reply, setReply] = useState();

    const [images, setImages2] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    
    const [showModal, setShowModal] = useState(false);

    const [showDeleteInquiryModal, setShowDeleteInquiryModal] = useState(false);
    const [inquiryToDeleteId, setInquiryToDeleteId] = useState(null);
    const [inquirySubmitted, setInquirySubmitted] = useState(false);
    const [selectedInquiryId, setSelectedInquiryId] = useState(null);
    
    const [showAnswerSection, setShowAnswerSection] = useState(false);
    const [showDeleteAnswerModal, setShowDeleteAnswerModal] = useState(false);
    const [answerToDeleteId, setAnswerToDeleteId] = useState(null);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);
    const [selectedAnswerId, setSelectedAnswerId,] = useState(null);
    
    const [showFollowUpSection, setShowFollowUpSection] = useState(false);
    const [showDeleteFollowUpModal, setShowDeleteFollowUpModal] = useState(false);
    const [followupToDeleteId, setFollowupToDeleteId] = useState(null);
    const [followupSubmitted, setFollowupSubmitted] = useState(false);
    const [selectedFollowupId, setSelectedFollowupId,] = useState(null);
    
    const [showReplySection, setShowReplySection] = useState(false);
    const [showDeleteReplyModal, setShowDeleteReplyModal] = useState(false);
    const [replyToDeleteId, setReplyToDeleteId] = useState(null);
    const [replySubmitted, setReplySubmitted] = useState(false);
    const [selectedReplyId, setSelectedReplyId,] = useState(null);

const customBadWords = [
'tangina', 'putangina', 'gago', 'hudas', //tagalog
'puta', 'kingina', 'lintik', 'ulol', 'ulul',
'gaga', 'gagi', 'tarantado', 'tado', 'bwiset',
'bwisit', 'buset', 'kupal', 'punyeta', 'pakyu', 
'pakingshet', 'shet', 'ogag', 'leche', 'puchang', 
'peste', 'piste', 
'ukinam', 'yawa', //bisaya
'puke', 'titi', 'tite', 'tete', 'puki', 'burat', //sexual
'fucker', 'shit', 'hole', 'stupid', 'cunt' //english
]; 

  const generateRegex = (word) => {
    const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return new RegExp(`\\b${escapedWord}\\b|${escapedWord}`, 'gi');
  };

  const badWordsFilter = new Filter({ list: customBadWords });

  const filterBadWords = (text) => {
    const lines = text.split('\n');
    const filteredLines = lines.map((line) => {
      return badWordsFilter.clean(line, (match) => {
        return '*'.repeat(match.length);
      });
    });

    // Apply custom filtering using regular expressions
    const customFilteredLines = filteredLines.map((line) => {
      return customBadWords.reduce((result, word) => {
        const regex = generateRegex(word);
        return result.replace(regex, (match) => '*'.repeat(match.length));
      }, line);
    });

    return customFilteredLines.join('\n');
  };

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
    
    const getAllReplies =  async () => {
        try {

            const response = await axios.get(`http://localhost:3001/api/v1/replies`);

            setAllReplies(response.data.replies);

            console.log(response.data.replies)

            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const getAllFollowUps =  async () => {
        try {

            const response = await axios.get(`http://localhost:3001/api/v1/followups`);

            setAllFollowups(response.data.followups);

            console.log(response.data.followups)

            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    useEffect(() => {
        
        getAllInquiries();
        getAllAnswers();
        getAllReplies();
        getAllFollowUps();

        if (error) {
            toast.error('FAILED TO DELETE');
        }

        if (deleteError) {
            toast.error('FAILED TO DELETE');
        }

        if (isDeleted) {

            toast.success('DELETED SUCCESSFULLY');
            getAllAnswers();

            setIsDeleted(false);
            setDeleteError('');
        }
    }, [error, deleteError, isDeleted]);
  
  // Define inquiry state variable and its setter function

  const submitInquiry = async () => {
    // Check if the inquiry text is blank
    if (inquiry.trim() === '') {
        // Display a toast notification indicating that the user must input in the text field
        toast.error('Please enter your inquiry before submitting.');
        return; // Stop further execution
    } else {
        const filteredInquiry = filterBadWords(inquiry); // Filter bad words from the inquiry text

        const formData = new FormData();
        formData.append('inquiry', filteredInquiry);

        images.forEach(image => {
            formData.append('images', image);
        });

        try {
            const { data } = await axios.post(`http://localhost:3001/api/v1/inquiry`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(formData);
            setSuccess(data.success);

            toast.success('POST ADDED');
            closeModal();
            setInquiry(''); // Reset inquiry input after submission
            setImages2([]);
            setImagesPreview([]);

            getAllInquiries();
        } catch (error) {
            setError(error.response.data.message);
            toast.error('FAILED TO POST');
        }
    }
};

    const submitAnswer = async (id) => {
        if (answer.trim() === '') {
            // Display a toast notification indicating that the user must input in the text field
            toast.error('Please enter your inquiry before submitting.');
            return; // Stop further execution
        } else {
        const filteredAnswer = filterBadWords(answer); // Filter bad words from the answer text

        const formData = new FormData();
        formData.append('answer', filteredAnswer);
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
            
                toast.success('COMMENTED SUCCESSFULLY');
                setAnswerSubmitted(true);
                setAnswer('');
                setImages2([]);
                setImagesPreview([]);

                getAllAnswers();

            
          } catch (error) 
          {
            setError(error.response.data.message);
            toast.error('FAILED TO REPLY');
          }}
        };

    const submitFollowup = async (id) => {
        if (followup.trim() === '') {
            // Display a toast notification indicating that the user must input in the text field
            toast.error('Please enter your inquiry before submitting.');
            return; // Stop further execution
        } else {
        const filteredAnswer = filterBadWords(followup); // Filter bad words from the answer text

        const formData = new FormData();
        formData.append('followup', filteredAnswer);
        images.forEach(image => {
            formData.append('images', image);
        });
           
        try {
          
            const { data } = await axios.post(`http://localhost:3001/api/v1/followup/${id}`, formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            
            setSuccess(data.success);
            
                toast.success('COMMENTED SUCCESSFULLY');
                setFollowupSubmitted(true);
                setFollowUp('');
                setImages2([]);
                setImagesPreview([]);

                getAllFollowUps();

            
          } catch (error) 
          {
            setError(error.response.data.message);
            toast.error('FAILED TO REPLY');
          }}
        };

    const submitReply = async (id) => {
        if (reply.trim() === '') {
            // Display a toast notification indicating that the user must input in the text field
            toast.error('Please enter your inquiry before submitting.');
            return; // Stop further execution
        } else {
            const filteredAnswer = filterBadWords(reply); // Filter bad words from the answer text
    
            const formData = new FormData();
            formData.append('reply', filteredAnswer);
            images.forEach(image => {
                formData.append('images', image);
            });
               
            try {
              
                const { data } = await axios.post(`http://localhost:3001/api/v1/reply/${id}`, formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`,
                  },
                });
                
                setSuccess(data.success);
                
                    toast.success('COMMENTED SUCCESSFULLY');
                    setFollowupSubmitted(true);
                    setReply('');
                    setImages2([]);
                    setImagesPreview([]);
    
                    getAllReplies();
    
                
              } catch (error) 
              {
                setError(error.response.data.message);
                toast.error('FAILED TO REPLY');
              }}
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
            getAllAnswers();


        } catch (error) {
            setDeleteError(error.response.data.message);
        }
    };

    const deleteInquiry = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/inquiry/${id}`, config);
            
            setIsDeleted(data.success);
            setLoading(false);
            getAllInquiries();


        } catch (error) {
            setDeleteError(error.response.data.message);
        }


    };

    const deleteFollowUp = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/followups/${id}`, config);
            
            setIsDeleted(data.success);
            setLoading(false);
            getAllFollowUps();


        } catch (error) {
            setDeleteError(error.response.data.message);
        }


    };

    const deleteReply = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };
            const { data } = await axios.delete(`http://localhost:3001/api/v1/replies/${id}`, config);
            
            setIsDeleted(data.success);
            setLoading(false);
            getAllReplies();


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

  const ShowDeleteAnswerModalHandler = (answerId) => {
    setShowDeleteAnswerModal(true);
    setAnswerToDeleteId(answerId);
    };

    const hideDeleteModalHandler = () => {
        setShowDeleteAnswerModal(false);
        setAnswerToDeleteId(null);
    };

    const ShowDeleteInquiryModalHandler = (inquiryId) => {

    setShowDeleteInquiryModal(true);
    setInquiryToDeleteId(inquiryId);
};

    const hideDeleteInquiryModalHandler = () => {
        setShowDeleteInquiryModal(false);
        setInquiryToDeleteId(null);
    };

    const ShowDeleteFollowupModalHandler = (followupId) => {
        console.log('follow: ', followupId)
        setShowDeleteFollowUpModal(true);
        setFollowupToDeleteId(followupId);
    };
    
    const hideDeleteFollowupModalHandler = () => {
            setShowDeleteFollowUpModal(false);
            setFollowupToDeleteId(null);
    };

    const ShowDeleteReplyModalHandler = (replyId) => {
        console.log('follow: ', replyId)
        setShowDeleteReplyModal(true);
        setReplyToDeleteId(replyId);
    };
    
    const hideDeleteReplyModalHandler = () => {
        setShowDeleteReplyModal(false);
        setReplyToDeleteId(null);
    };

    const toggleAnswerSection = (inquiryId) => {
        setShowAnswerSection(!showAnswerSection);
        setSelectedInquiryId(inquiryId);
        setAnswerSubmitted(false);

        setShowFollowUpSection(false);
        setShowReplySection(false);

    };

    const toggleFollowUpSection = (answerId) => {
        setShowFollowUpSection(!showFollowUpSection);
        setSelectedAnswerId(answerId);
        setFollowupSubmitted(false);

        setShowAnswerSection(false);
        setShowReplySection(false);

    };

    const toggleReplySection = (followupId) => {
        setShowReplySection(!showReplySection);
        setSelectedFollowupId(followupId);
        setReplySubmitted(false);

        setShowAnswerSection(false);
        setShowFollowUpSection(false);
    };

    const getAnswersForInquiry = (inquiryId) => {
        return allAnswers.filter((allAnswers) => allAnswers.inquiry === inquiryId);
    };

    const getFollowUpsForAnswer = (answerId) => {
        // Use a Set to keep track of unique follow-up IDs
        return allFollowups.filter((allFollowups) => allFollowups.answer === answerId);
    }
    
    const getRepliesForFollowUp = (followupId) => {
        return allReplies.filter((allReplies) => allReplies.followup === followupId);
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
                                readOnly/>

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
                                        <div class="pad-ver inq">
                                            <a class="replyShow" 
                                            onClick={() => toggleAnswerSection(allInquiry._id)}>Reply</a>
                                            <a class="deleteShow" onClick={() => ShowDeleteInquiryModalHandler(allInquiry._id)}>Delete</a>
                                        </div>

                                        {/* DELETE MODAL */}
                                        {showDeleteInquiryModal && (
                                            <div className="modal deleteM" style={{ display: 'block' }}>
                                                <div className="modal-content">
                                                                
                                                    <span className="title">CONFIRM DELETION</span>                                                                <p>Are you sure you want to delete this answer?</p>
                                                        <div class="mar-top clearfix">
                                                            <button 
                                                                class="btn btn-sm btn-danger pull-right" 
                                                                    onClick={() => {
                                                                        console.log('Clicked to delete with ID:', answerToDeleteId);
                                                                        deleteInquiry(inquiryToDeleteId);
                                                                        hideDeleteInquiryModalHandler();
                                                                    }}>
                                                                        DELETE
                                                            </button>
                                                            <span className="close" onClick={hideDeleteInquiryModalHandler}>
                                                                CANCEL
                                                            </span>
                                                        </div>
                                                </div>
                                            </div>
                                            )}
                                        {/* END OF DELETE MODAL */}                                

                                        {showAnswerSection && selectedInquiryId === allInquiry._id && (

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
                                                    onClick={() => {                                                        submitAnswer(allInquiry._id);
                                                    }}>
                                                    REPLY
                                                </button>
                                                

                                                </div>
                                            </div>

                                        )}
                                    </Fragment> 
                                    )}


                                    {getAnswersForInquiry(allInquiry._id).slice(0, displayedItems).map((allAnswer) => (
                                        
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
                                                    <div class="pad-ver">
                                                        <a class="replyShow" 
                                                            onClick={() => toggleFollowUpSection(allAnswer._id)}>Reply</a>
                                                    
                                                        {user && user.role === 'admin' && (                                                
                                                        <a class="deleteShow" onClick={() => ShowDeleteAnswerModalHandler(allAnswer._id)}>Delete</a>
                                                        )}
                                                    </div>
                                                    

                                                    {/* DELETE MODAL */}
                                                    {showDeleteAnswerModal && (
                                                        <div className="modal deleteM" style={{ display: 'block' }}>
                                                            <div className="modal-content">
                                                                
                                                                <span className="title">CONFIRM DELETION</span>                                                                <p>Are you sure you want to delete this answer?</p>
                                                                <div class="mar-top clearfix">
                                                                    <button 
                                                                        class="btn btn-sm btn-danger pull-right" 
                                                                        onClick={() => {                                                                            deleteAnswer(answerToDeleteId);
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

                                                    {showFollowUpSection && selectedAnswerId === allAnswer._id && (

                                                            <div className="answerC">
                                                                <textarea 
                                                                class="form-control" 
                                                                id="followup"
                                                                placeholder="Reply..."
                                                                value={followup}
                                                                onChange={(e) => setFollowUp(e.target.value)}   
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
                                                                        submitFollowup(allAnswer._id);
                                                                    }}>
                                                                    REPLY
                                                                </button>
                                                                

                                                                </div>
                                                            </div>

                                                        )}
                                                        
                                                
                                                <hr />

                                                {getFollowUpsForAnswer(allAnswer._id).slice(0, displayedItems).map((allFollowup) => (
                                        
                                                    <div key={allFollowup._id}>
                                                        <div class="media-block replyD">
                                                        
                                                            <div class="media-body">
                                                                <div class="media-left">
                                                                    <img class="img-circle img-sm" alt="Profile Picture" 
                                                                        src="/images/avatar.png" />
                                                                </div>
                                                                <div class="mar-btm">
                                                                    <h1 className="text-uppercase">ANONYMOUS</h1>
                                                                    <p class="text-muted text-sm dateD">
                                                                        {new Date(allFollowup.followupDate).toLocaleString('en-US', {
                                                                            year: 'numeric',
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                            hour12: true,
                                                                        })}
                                                                    </p>
                                                                </div>

                                                                <p>{allFollowup.followup}</p>
                                                                <div className="col-md-12">
                                                                    <div className="gallery">
                                                                        {allFollowup.images.map((img, index) => (
                                                                            <div key={index} className="gallery-item">
                                                                                <img src={img.url} alt={`Image ${index + 1}`} className="img-responsive thumbnail" />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                {user && user.role === 'admin' && ( 
                                                                <div class="pad-ver">
                                                                    <a class="replyShow" 
                                                                        onClick={() => toggleReplySection(allFollowup._id)}>Reply</a>                                                            
                                                                
                                                                                                                   
                                                                    <a class="deleteShow" onClick={() => ShowDeleteFollowupModalHandler(allFollowup._id)}>Delete</a>
                                                                    
                                                                </div>
                                                                )}
                                                    

                                                                {/* DELETE MODAL */}
                                                                {showDeleteFollowUpModal && (
                                                                    <div className="modal deleteM" style={{ display: 'block' }}>
                                                                        <div className="modal-content">
                                                                            
                                                                            <span className="title">CONFIRM DELETION</span>                                                                <p>Are you sure you want to delete this answer?</p>
                                                                            <div class="mar-top clearfix">
                                                                                <button 
                                                                                    class="btn btn-sm btn-danger pull-right" 
                                                                                    onClick={() => {
                                                                                        deleteFollowUp(followupToDeleteId);
                                                                                        hideDeleteFollowupModalHandler();
                                                                                    }}>
                                                                                   DELETE
                                                                                </button>
                                                                                <span className="close" onClick={hideDeleteFollowupModalHandler}>
                                                                                CANCEL
                                                                            </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {/* END OF DELETE MODAL */}

                                                                {showReplySection && selectedFollowupId === allFollowup._id && (

                                                                        <div className="answerC">
                                                                            <textarea 
                                                                            class="form-control" 
                                                                            id="reply"
                                                                            placeholder="Reply..."
                                                                            value={reply}
                                                                            onChange={(e) => setReply(e.target.value)}   
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
                                                                                    submitReply(allFollowup._id);
                                                                                }}>
                                                                                REPLY
                                                                            </button>
                                                                            

                                                                            </div>
                                                                        </div>

                                                                )}

                                                                
                                                               
                                                            
                                                            <hr />

                                                            {getRepliesForFollowUp(allFollowup._id).slice(0, displayedItems).map((allReply) => (

                                                                <div key={allReply._id}>
                                                                    <div class="media-block replyD">
                                                                    
                                                                        <div class="media-body">
                                                                            <div class="media-left">
                                                                                <img class="img-circle img-sm" alt="Profile Picture" 
                                                                                    src="/images/avatar.png" />
                                                                            </div>
                                                                            <div class="mar-btm">
                                                                                <h1 className="text-uppercase">ADMIN</h1>
                                                                                <p class="text-muted text-sm dateD">
                                                                                    {new Date(allReply.replyDate).toLocaleString('en-US', {
                                                                                        year: 'numeric',
                                                                                        month: 'short',
                                                                                        day: 'numeric',
                                                                                        hour: 'numeric',
                                                                                        minute: 'numeric',
                                                                                        hour12: true,
                                                                                    })}
                                                                                </p>
                                                                            </div>

                                                                            <p>{allReply.reply}</p>
                                                                            <div className="col-md-12">
                                                                                <div className="gallery">
                                                                                    {allReply.images.map((img, index) => (
                                                                                        <div key={index} className="gallery-item">
                                                                                            <img src={img.url} alt={`Image ${index + 1}`} className="img-responsive thumbnail" />
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <div class="pad-ver">
                                                                                {user && user.role === 'admin' && (                                                
                                                                                <a class="deleteReply" onClick={() => ShowDeleteReplyModalHandler(allReply._id)}>Delete</a>
                                                                                )}
                                                                            </div>
                                                                

                                                                            {/* DELETE MODAL */}
                                                                            {showDeleteReplyModal && (
                                                                                <div className="modal deleteM" style={{ display: 'block' }}>
                                                                                    <div className="modal-content">
                                                                                        
                                                                                        <span className="title">CONFIRM DELETION</span>                                                                <p>Are you sure you want to delete this answer?</p>
                                                                                        <div class="mar-top clearfix">
                                                                                            <button 
                                                                                                class="btn btn-sm btn-danger pull-right" 
                                                                                                onClick={() => {
                                                                                                    deleteReply(replyToDeleteId);
                                                                                                    hideDeleteReplyModalHandler();
                                                                                                }}>
                                                                                            DELETE
                                                                                            </button>
                                                                                            <span className="close" onClick={hideDeleteReplyModalHandler}>
                                                                                            CANCEL
                                                                                        </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            {/* END OF DELETE MODAL */}

                                                                        
                                                                        <hr />                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {getRepliesForFollowUp(allFollowup._id).length > displayedItems && (
                                                                <div className="showMoreLessButtons">
                                                                    <button onClick={() => setDisplayedItems(displayedItems + 2)}>Show More</button>
                                                                        {displayedItems > 2 && <button class="showLess"onClick={() => setDisplayedItems(2)}>Show Less</button>}
                                                                </div>
                                                            )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {getFollowUpsForAnswer(allAnswer._id).length > displayedItems && (
                                                    <div className="showMoreLessButtons">
                                                        <button onClick={() => setDisplayedItems(displayedItems + 2)}>Show More</button>
                                                            {displayedItems > 2 && <button class="showLess"onClick={() => setDisplayedItems(2)}>Show Less</button>}
                                                    </div>
                                                )}
                                                
                                                </div>
                                            </div>
                                        </div>
                                    ))}     
                                    {getAnswersForInquiry(allInquiry._id).length > displayedItems && (
                                        <div className="showMoreLessButtons">
                                            <button onClick={() => setDisplayedItems(displayedItems + 2)}>Show More</button>
                                                {displayedItems > 2 && <button class="showLess"onClick={() => setDisplayedItems(2)}>Show Less</button>}
                                            </div>
                                    )}      
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