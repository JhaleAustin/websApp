import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import { getToken } from '../../../utils/helpers';
import Loader from '../../Layout/Loader';

const FollowupList = ({ answerRowId, onFollowupRowClick }) => {
  const [followup, setFollowup] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [followupFilter, setFollowupFilter] = useState('');
  const [selectedFollowupRowId, setSelectedFollowupRowId] = useState(null);

  useEffect(() => {
    const getAdminFollowup = async () => {
      if (!answerRowId) return; // Exit if answerRowId is null
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
          },
        };

        const { data } = await axios.get(`http://localhost:3001/api/v1/admin/followup/${answerRowId}`, config);

        setFollowup(data.followups);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    getAdminFollowup();
  }, [answerRowId]);

  const handleRowClick = (followupRowId) => {
    setSelectedFollowupRowId(followupRowId);
    onFollowupRowClick(followupRowId);
  };

  const handleFollowupFilterChange = (value) => {
    setFollowupFilter(value);
  };

  const followupList = () => {
    const filteredForum = followup.filter((followups) => {
        const followupCondition =
          followupFilter === '' || followups.followup.toLowerCase().includes(followupFilter.toLowerCase());
  
        return followupCondition;
      });
    const data = {
      columns: [
        {
          label: 'FOLLOW UP',
          field: 'followup',
          sort: 'asc',
        },
        {
          label: 'IMAGES',
          field: 'images',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    filteredForum.forEach((followupItem) => {
      data.rows.push({
        followup: (
          <div
            className="d-flex align-items-right"
            onClick={() => handleRowClick(followupItem._id)}
            style={{
              backgroundColor: selectedFollowupRowId === followupItem._id ? '#abc32f' : 'transparent',
            }}
          >
            {followupItem.followup}
          </div>
        ),
        images: followupItem.images.map((image, index) => (
          <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '50px', height: '50px' }} />
        )),
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
            <h1 className="table-title-my-5">FOLLOW UP</h1>
            <input
                    type="text"
                    className="stable"
                    placeholder="SEARCH FOLLOW UP"
                    value={followupFilter}
                    onChange={(e) => handleFollowupFilterChange(e.target.value)}
                  />
          </div>
          <MDBDataTableV5
            data={followupList()}
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

export default FollowupList;
