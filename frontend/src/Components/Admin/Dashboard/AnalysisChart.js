import React, { Fragment } from "react";
import Sidebar from '../Sidebar';
import MetaData from '../../Layout/MetaData';
import WeeklyAnalysisChart from './Analysis/WeeklyAnalysisChart';
import DailyAnalysisChart from './Analysis/DailyAnalysisChart';

function AnalysisChart() {
  return (
    <Fragment>
      <MetaData title={'FORUM'} />
      <div className="row dlist">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 dashChart">
              <div className="col-md-12" style={{ overflowX: 'auto', overflowY: 'hidden'}}>
                <div className="row">
                  <div className="col-md-12 dailyC" style={{ maxHeight: '50vh'}}>
                    <DailyAnalysisChart />
                  </div>
                  <div className="col-md-12" style={{ maxHeight: '50vh'}}>
                    <WeeklyAnalysisChart />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AnalysisChart;
