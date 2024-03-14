import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { getToken } from '../../../utils/helpers';

import WeeklyAnalysisChart from './Analysis/WeeklyAnalysisChart';
import DailyAnalysisChart from './Analysis/DailyAnalysisChart';

function AnalysisChart() {
  
  return (
    <div>
      <DailyAnalysisChart />
      <WeeklyAnalysisChart />
    </div>
  );
}

export default AnalysisChart;
