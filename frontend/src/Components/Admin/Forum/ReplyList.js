import React, { Fragment, useEffect, useState, useRef } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import { getToken } from '../../../utils/helpers';
import Loader from '../../Layout/Loader';

const ReplyList = ({ followupRowId }) => {
  const [reply, setReply] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('All');
  const [replyFilter, setReplyFilter] = useState('');

  const followupRowIdRef = useRef(null);

  useEffect(() => {
    followupRowIdRef.current = followupRowId; // Update the ref when followupRowId changes
  }, [followupRowId]);

  useEffect(() => {
    const getAdminReply = async () => {
      const currentFollowupRowId = followupRowIdRef.current;
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
          },
        };

        const { data } = await axios.get(`http://localhost:3001/api/v1/admin/reply/${currentFollowupRowId}`, config);

        setReply(data.replies);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    if (followupRowIdRef.current) {
      getAdminReply();
    } else {
      setReply([]); // Clear reply data when followupRowId is null
    }
  }, [followupRowId]);

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handleReplyFilterChange = (value) => {
    setReplyFilter(value);
  };

  const replyList = () => {
    const filteredForum = reply.filter((replyItem) => {
      const adminCondition = filterOption === 'All' || replyItem.admin.name === filterOption;
      const replyCondition =
        replyFilter === '' || replyItem.reply.toLowerCase().includes(replyFilter.toLowerCase());
      return adminCondition && replyCondition;
    });

    const data = {
      columns: [
        {
          label: 'REPLIES',
          field: 'reply',
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

    filteredForum.forEach((replyItem) => {
      data.rows.push({
        reply: (
          <div className="d-flex align-items-right">
            {replyItem.reply}
          </div>
        ),
        images: replyItem.images.map((image, index) => (
          <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
        )),
        admin: (
          <div className="d-flex align-items-right">
            {replyItem.admin.name}
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
            <h1 className="table-title-my-5">REPLIES</h1>
            
            <input
                    type="text"
                    className="stable"
                    placeholder="SEARCH INQUIRY"
                    value={replyFilter}
                    onChange={(e) => handleReplyFilterChange(e.target.value)}
                  />
            <select className="ftable" onChange={(e) => handleFilterChange(e.target.value)} value={filterOption}>
              <option value="All">ALL</option>
              <option value="Remdel">REMDEL</option>
              <option value="Athea">ATHEA</option>
              <option value="NhelCabatino">NHEL</option>
            </select>
          </div>
          <MDBDataTableV5
            data={replyList()}
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

export default ReplyList;
