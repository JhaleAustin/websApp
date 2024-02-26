import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../Layout/MetaData' 
import { getToken } from '../../../utils/helpers';
import axios from 'axios'
import Sidebar from '../Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const NewHomepage = () => {
  const [users, setUsers] = useState([]);
  const [hometypes, setHomeTypes] = useState();
  const [types, setTypes] = useState();
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  let navigate = useNavigate()

  const submit = () => {
    // Assuming you want to submit all values including dynamic inputs
    const formData = {
      topic,
      description,
    };

    console.log(formData)
    newTopic(formData)
  };

   const newTopic = async (formData) => {
       
        try {
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${getToken()}`
            //     }
            // }
            // console.log(formData);

            if (!selectedTopic || !selectedTopic._id) {
              toast.error('PLEASE SELECT A TOPIC');
              return;
            }
             const { data } = await axios.post(`http://localhost:3001/api/v1/home/topic/${selectedTopic._id}`, formData )
             console.log(data);
             setSuccess(data.success);

             navigate('/admin/homepageList');

        } catch (error) {
            setError(error.response.data.message)

        }
    }

    useEffect(() => {

      const chooseTopic = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/topics`);
          setHomeTypes(response.data.hometypes);
          setLoading(false);

          console.log(response.data)

        } catch (error) {
          console.error('ERROR GETTING TOPICS:', error);
        }
      };

      chooseTopic();
    }, []);

  const handleTopicChange = (hometypes) => {
    setSelectedTopic(hometypes);
  };

  return (
    <Fragment>
    <MetaData title={'UPLOAD TOPIC'} />
    <div className="row">
      <div className="col-12 col-md-2"style={{  marginBottom: "2px" }}>
        <div style={{  height: '100vh', overflow: 'scroll initial' }}>
          <Sidebar />
        </div>
      </div>
        
      <div className="np col-12 col-md-8">
        <div className="np wrapper my-5" style={{ width: '100%', paddingLeft: '10%', marginLeft: '10%' }}>
          <Fragment> 
            <form className="row g-3 form1" encType="multipart/form-data">
              <div className="col-12">
                {loading ? (
                  <p>Loading materials...</p>
                ) : error ? (
                  <p style={{ color: 'red' }}>{error}</p>
                ) : (
                  <div className="radio-container">  
                    {hometypes.map(hometype => (
                      <div key={hometype._id} className="radio-item">
                        <input
                          type="radio"
                          id={`matRadio${hometype._id}`}
                          name="matRadio"
                          value={hometype.types}
                          onChange={() => handleTopicChange(hometype)}
                        />
                        <label htmlFor={`matRadio${hometype._id}`}>{hometype.types}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* <div className="col-12">
                <label htmlFor="Content" className="form-label">Topic :</label>
                <input
                  type="text"
                  className="form-control"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div> */}

              <div className="col-12">
                <label htmlFor="Content" className="form-label">Topic :</label>
                <input
                  type="text"
                  className="form-control"
                  id="topic"
                  value={
                    selectedTopic.types === 'PS' ? 'Peanut Shell' :
                    selectedTopic.types === 'M' ? 'Mulching' :
                    selectedTopic.types === 'PSM' ? 'Peanut Shell Mulching' :
                    selectedTopic.types === 'B' ? 'Benefits' :
                    topic
                  }
                  onChange={(e) => setTopic(e.target.value)}
                  readOnly 
                />
              </div>

              <div className="col-12">
                <label htmlFor="Content" className="form-label">Description :</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
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


export default NewHomepage