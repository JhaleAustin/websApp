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
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div class="row">
          <div class="col-md-12">
            <DailyAnalysisChart />
          </div>
          <div class="col-md-12">
            <WeeklyAnalysisChart />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AnalysisChart;
