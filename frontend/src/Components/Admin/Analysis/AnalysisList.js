import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';

import Sidebar from '../Sidebar';
import MetaData from '../../Layout/MetaData';
import { getToken } from '../../../utils/helpers';
import Loader from '../../Layout/Loader';

const AnalysisList = () => {
    const [analysis, setAnalysis] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(''); // State to store selected date

    const getAdminAnalysis = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            };

            const { data } = await axios.get(`http://localhost:3001/api/v1/admin/analysis`, config);

            // Modify the analysis data to extract only the date portion
            const modifiedAnalysis = data.analyze.map(item => {
                return {
                    ...item,
                    analysisDate: formatDate(new Date(item.analysisDate))
                };
            });

            setAnalysis(modifiedAnalysis);
            setLoading(false);

        } catch (error) {
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        getAdminAnalysis();
    }, []);

    const handleDateChange = e => {
        setSelectedDate(e.target.value);
    };

    let uniqueDates = [...new Set(analysis.map(item => item.analysisDate))]; // Get unique dates from analysis data
    uniqueDates.sort(); // Sort the dates in ascending order

    const analysisList = () => {
        const filteredAnalysis = selectedDate ? analysis.filter(item => item.analysisDate === selectedDate) : analysis;

        const data = {
            columns: [
                {
                    label: 'HEIGHT',
                    field: 'height',
                    sort: 'asc'
                },
                {
                    label: 'NUMBER OF LEAVES',
                    field: 'numOfLeaves',
                    sort: 'asc'
                },
                {
                    label: 'DATE',
                    field: 'analysisDate',
                    sort: 'asc'
                },
            ],
            rows: []
        };

        filteredAnalysis.forEach(analysiss => {
            data.rows.push({
                height: (
                    <div className="d-flex align-items-right">
                        {analysiss.height}
                    </div>
                ),
                numOfLeaves: (
                    <div className="d-flex align-items-right">
                        {analysiss.numOfLeaves}
                    </div>
                ),
                analysisDate: (
                    <div className="d-flex align-items-right">
                        {analysiss.analysisDate}
                    </div>
                ),
            });
        });

        return data;
    };

    // Function to format date in "MM-DD-YYYY" format
    const formatDate = date => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
    };

    return (
        <Fragment>
            <MetaData title={'ANALYSIS'} />
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
                                    <h1 className="table-title-my-5">ANALYSIS</h1>
                                    {/* Dropdown for selecting date */}
                                    <select className="ftable" value={selectedDate} onChange={handleDateChange}>
                                        <option value="">Select Date</option>
                                        {uniqueDates.map(date => (
                                            <option key={date} value={date}>{date}</option>
                                        ))}
                                    </select>
                                </div>
                                <MDBDataTableV5
                                    data={analysisList()}
                                    className="table-px-3"
                                    bordered
                                    striped
                                    hover
                                    responsive
                                    noBottomColumns
                                    searching={false}
                                    noRecordsPerPageLabel={true}
                                    fullPagination
                                    entriesOptions={[5, 10, 20, 30, 50]}
                                    entries={5}
                                    pagesAmount={4}
                                    sortable={false}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AnalysisList;
