import React, { Fragment, useEffect, useState, useRef } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import { getToken } from '../../../utils/helpers';
import Loader from '../../Layout/Loader';

const AnswerList = ({ inquiryRowId, onAnswerRowClick }) => {
  const [answer, setAnswer] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('All');
  const [answerFilter, setAnswerFilter] = useState('');
  const [selectedAnswerRowId, setSelectedAnswerRowId] = useState(null);
  const inquiryRowIdRef = useRef(null);

  useEffect(() => {
    inquiryRowIdRef.current = inquiryRowId; // Update the ref when inquiryRowId changes
  }, [inquiryRowId]);

  useEffect(() => {
    const getAdminAnswer = async () => {
      const currentInquiryRowId = inquiryRowIdRef.current;
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
          },
        };

        const { data } = await axios.get(`http://localhost:3001/api/v1/admin/answers/${currentInquiryRowId}`, config);

        setAnswer(data.answers);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    getAdminAnswer();
  }, [inquiryRowId]);

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handleAnswerFilterChange = (value) => {
    setAnswerFilter(value);
  };

  const handleRowClick = (answerRowId) => {
    setSelectedAnswerRowId((prevAnswerRowId) => (prevAnswerRowId === answerRowId ? null : answerRowId));
    onAnswerRowClick(answerRowId);
  };

  const answerList = () => {
    const filteredAnswers = answer.filter((answerItem) => {
      const adminCondition = filterOption === 'All' || answerItem.admin.name === filterOption;
      const answerCondition =
      answerFilter === '' || answerItem.answer.toLowerCase().includes(answerFilter.toLowerCase());

      return adminCondition && answerCondition;
    });

    const data = {
      columns: [
        {
          label: 'ANSWER',
          field: 'answer',
          sort: 'asc',
        },
        {
          label: 'IMAGES',
          field: 'images',
          sort: 'asc',
        },
        {
          label: 'ADMIN',
          field: 'admin',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    filteredAnswers.forEach((answerItem) => {
      data.rows.push({
        answer: (
          <div
            className="d-flex align-items-right"
            onClick={() => handleRowClick(answerItem._id)}
            style={{
              backgroundColor: selectedAnswerRowId === answerItem._id ? '#abc32f' : 'transparent',
            }}
          >
            {answerItem.answer}
          </div>
        ),
        images: answerItem.images.map((image, index) => (
          <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
        )),
        admin: (
          <div className="d-flex align-items-right">
            {answerItem.admin.name}
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="dataTabP">
          <div className="dataHead">
            <h1 className="table-title-my-5">ANSWERS</h1>
            
            <input
                    type="text"
                    className="stable"
                    placeholder="SEARCH ANSWER"
                    value={answerFilter}
                    onChange={(e) => handleAnswerFilterChange(e.target.value)}
                  />
            <select className="ftable" onChange={(e) => handleFilterChange(e.target.value)} value={filterOption}>
              <option value="All">ALL</option>
              <option value="Remdel">REMDEL</option>
              <option value="Athea">ATHEA</option>
              <option value="NhelCabatino">NHEL</option>
            </select>
          </div>
          
          <MDBDataTableV5
            data={answerList()}
            className="table-px-3"
            bordered
            striped
            hover
            responsive
            noBottomColumns
            searching={false}
            noRecordsPerPageLabel={true}
            fullPagination
            entriesOptions={[5, 10]}
            entries={5}
            pagesAmount={4}
            sortable={false}
          />
        </div>
      )}
    </Fragment>
  );
};

export default AnswerList;
