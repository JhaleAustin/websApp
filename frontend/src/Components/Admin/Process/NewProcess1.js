import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../Layout/MetaData';
import { getToken } from '../../../utils/helpers';
import axios from 'axios';
import Sidebar from '../../Admin/Sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewProcess1 = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  let navigate = useNavigate();

  const submit = async () => {
    const formData = {
      title,
      content,
    };

    console.log(formData)
    newProcess(formData)
  };


  const newProcess = async (formData) => {

    try {
      // const config = {
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `Bearer ${getToken()}`
      //     }
      // }
      // console.log(formData);

      const { data } = await axios.post('http://localhost:3001/api/v1/process/new', formData)

      toast.success('STEP IS CREATED SUCCESSFULLY');

      navigate('/admin/process');
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO UPLOAD STEP');
    }
  };

  return (
    <Fragment>
      <MetaData title={'UPLOAD STEP'} />
      <div className="row dlist">
        <div className="col-12 col-md-2">    
          <Sidebar />
        </div>

        <div className="np col-12 col-md-8">
          <div className="np wrapper my-5 home-form" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
            <Fragment>
              <form className="row g-3 form3" encType="multipart/form-data">
                <div className="col-12">
                  <label htmlFor="Content" className="form-label1">
                    TITLE:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="Content" className="form-label3">
                    CONTENT:
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ height: '300px', resize: 'none' }}
                  ></textarea>
                </div>

                <div className="col-12">
                  <button type="button" className="btn btn-primary" onClick={submit}>
                    SUBMIT
                  </button>
                </div>
              </form>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProcess1;
