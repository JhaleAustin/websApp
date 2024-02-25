import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../Layout/MetaData';
import { getToken } from '../../../utils/helpers';
import axios from 'axios';
import Sidebar from '../../Admin/Sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewProcess1 = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videos, setVideo] = useState(null);

  const navigate = useNavigate();

  const submit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('videos', videos);

    try {
      const { data } = await axios.post('http://localhost:3001/api/v1/process/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${getToken()}`,
        },
      });

      console.log(formData)
      toast.success('STEP IS CREATED SUCCESSFULLY');

      navigate('/admin/processList');
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO UPLOAD STEP');
    }
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
  };

  return (
    <Fragment>
      <MetaData title={'UPLOAD STEP'} />
      <div className="row">
        <div className="col-12 col-md-2" style={{ marginBottom: '2px' }}>
          <div style={{ height: '100vh', overflow: 'scroll initial' }}>
            <Sidebar />
          </div>
        </div>

        <div className="np col-12 col-md-8">
          <div className="np wrapper my-5" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
            <Fragment>
              <form className="row g-3 form1" encType="multipart/form-data">
                <div className="col-12">
                  <label htmlFor="Content" className="form-label">
                    Title :
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
                  <label htmlFor="Content" className="form-label">
                    Content :
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label>Video:</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="videos"
                        className="custom-file-input"
                        id="customFile"
                        onChange={handleVideoChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <button type="button" className="btn btn-primary" onClick={submit}>
                    Submit
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
