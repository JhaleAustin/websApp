import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import Sidebar from '../Sidebar';
import MetaData from '../../Layout/MetaData';
import Loader from '../../Layout/Loader';
import AnswerList from './AnswerList';
import FollowupList from './FollowupList';
import ReplyList from './ReplyList';

const InquiryList = () => {
  const [inquiry, setInquiry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inquiryFilter, setInquiryFilter] = useState('');
  const [selectedInquiryRowId, setSelectedInquiryRowId] = useState(null);
  const [selectedAnswerRowId, setSelectedAnswerRowId] = useState(null);
  const [selectedFollowupRowId, setSelectedFollowupRowId] = useState(null);

  useEffect(() => {
    const getAdminInquiry = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const { data } = await axios.get('http://localhost:3001/api/v1/inquiries', config);
        setInquiry(data.inquiries);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getAdminInquiry();
  }, [selectedInquiryRowId]);

  const handleInquiryFilterChange = (value) => {
    setInquiryFilter(value);
  };

  const handleInquiryRowClick = (inquiryRowId) => {
    setSelectedInquiryRowId((previnquiryRowId) => (previnquiryRowId=== inquiryRowId ? null : inquiryRowId));

    setSelectedAnswerRowId(null); // Reset selected answer row ID when a new inquiry is selected
    setSelectedFollowupRowId(null); // Reset selected follow-up row ID when a new inquiry is selected
  };

  const inquiryList = () => {
    const filteredForum = inquiry.filter((inquiry) => {
      const inquiryCondition =
        inquiryFilter === '' || inquiry.inquiry.toLowerCase().includes(inquiryFilter.toLowerCase());

      return inquiryCondition;
    });

    const data = {
      columns: [
        {
          label: 'INQUIRY',
          field: 'inquiry',
          sort: 'asc',
        },
        {
          label: 'IMAGES',
          field: 'inquiryimages',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    filteredForum.forEach((inquiry) => {
      data.rows.push({
        inquiry: (
          <div
            className="d-flex align-items-right"
            onClick={() => handleInquiryRowClick(inquiry._id)}
            style={{
              backgroundColor: selectedInquiryRowId === inquiry._id ? '#abc32f' : 'transparent',
            }}
          >
            {inquiry.inquiry}
          </div>
        ),
        inquiryimages: inquiry.images.map((image, imageIndex) => (
          <img key={imageIndex} src={image.url} alt={`Image ${imageIndex}`} style={{ width: '50px', height: '50px' }} />
        )),
      });
    });

    return data;
  };
  
  useEffect(() => {
    setSelectedFollowupRowId(null); // Reset selected follow-up row ID when selectedAnswerRowId changes
  }, [selectedAnswerRowId]);
  return (
    <Fragment>
      <MetaData title={'ANSWERS'} />
      <div className="row dlist">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="table-container">
            {loading ? (
              <Loader />
            ) : (
              <div className="dataTabP">
                <div className="dataHead">
                  <h1 className="table-title-my-5">INQUIRIES</h1>
                  <input
                    type="text"
                    className="stable"
                    placeholder="SEARCH INQUIRY"
                    value={inquiryFilter}
                    onChange={(e) => handleInquiryFilterChange(e.target.value)}
                  />
                </div>
                <MDBDataTableV5
                  data={inquiryList()}
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
            {selectedInquiryRowId && (
              <AnswerList
                inquiryRowId={selectedInquiryRowId}
                onAnswerRowClick={(answerRowId) => setSelectedAnswerRowId(answerRowId)}
              />
            )}
            {selectedAnswerRowId && (
              <FollowupList
                answerRowId={selectedAnswerRowId}
                onFollowupRowClick={(followupRowId) => setSelectedFollowupRowId(followupRowId)}
              />
            )}
            {selectedFollowupRowId && <ReplyList followupRowId={selectedFollowupRowId} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InquiryList;
