
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from "./Components/Route/ProtectedRoute";

import Login from "./Components/User/Login";
import Analysis from './content/analysis/analysis';
import Header from './Components/Layout/Header';  // Add this line
import Homepage from './content/homepage';
import Documentation from './content/documentation/documetation';
import Process from './content/process/process';

import NewHomepage from './Components/Admin/Homepage/NewHomepage';

import PeanutShellList from './Components/Admin/Homepage/PeanutShellList'
import UpdatePeanutShell from './Components/Admin/Homepage/UpdatePeanutShell';

import MulchingList from './Components/Admin/Homepage/MulchingList'
import UpdateMulching from './Components/Admin/Homepage/UpdateMulching';

import BenefitList from './Components/Admin/Homepage/BenefitList'
import UpdateBenefit from './Components/Admin/Homepage/UpdateBenefit';

import PeanutShellMulchingList from './Components/Admin/Homepage/PeanutShellMulchingList'
import UpdatePeanutShellMulching from './Components/Admin/Homepage/UpdatePeanutShellMulching';

import ProcessList from './Components/Admin/Process/ProcessList';
import NewProcess from './Components/Admin/Process/NewProcess1';
import UpdateProcess from './Components/Admin/Process/UpdateProcess';

import WithoutMulchingList from './Components/Admin/Documentation/WithoutMulchingList';
import WithMulchingList from './Components/Admin/Documentation/WithMulchingList';
import NewWithoutMulch from './Components/Admin/Documentation/NewWithoutMulch';
import UpdateWithoutMulch from './Components/Admin/Documentation/UpdateWithoutMulch';
import NewWithMulch from './Components/Admin/Documentation/NewWithMulch';
import UpdateWithMulch from './Components/Admin/Documentation/UpdateWithMulch';

import Inquiry from './content/inquiries/Forum';

// import AnswerList from './Components/Admin/Forum/AnswerList';
import InquiryList from './Components/Admin/Forum/InquiryList';

import AnalysisList from './Components/Admin/Analysis/AnalysisList';

import Dashboard from './Components/Admin/Dashboard/AnalysisChart';


function App() {

  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} exact="true" />
            <Route path="/" element={<Homepage />} />
            <Route path="/process" element={<Process />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/forum" element={<Inquiry />} />
          </Routes>
 
          {/* AdminPage route */}
          <Routes>
            <Route path="/admin/withoutmulch"
              element={
                <ProtectedRoute isAdmin={true}>
                  <WithoutMulchingList />
                </ProtectedRoute>
              }/>
            <Route path="/admin/update/withoutmulch/:id"
              element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateWithoutMulch /> 
                  </ProtectedRoute> 
              }/>
            <Route path="/admin/new/withoutmulch/:id" 
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewWithoutMulch /> 
                </ProtectedRoute> 
              }/>
            <Route path="/admin/withmulch"
              element={
                <ProtectedRoute isAdmin={true}>
                  <WithMulchingList />
                </ProtectedRoute>
              }/>
            <Route path="/admin/update/withmulch/:id"
              element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateWithMulch /> 
                  </ProtectedRoute> 
              }/>
            <Route path="/admin/new/withmulch/:id" 
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewWithMulch /> 
                </ProtectedRoute> 
              }/>


            <Route path="/admin/new/process"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <NewProcess /> 
                  </ProtectedRoute> 
              }/>
            <Route path="/admin/process"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <ProcessList /> 
                  </ProtectedRoute> 
              }/>
            <Route path="/admin/updateprocess/:id"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateProcess /> 
                  </ProtectedRoute> 
              }/>

            <Route path="/admin/homepage"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <NewHomepage /> 
                  </ProtectedRoute> 
              }/>

            <Route path="/admin/peanutshell"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <PeanutShellList /> 
                  </ProtectedRoute> 
              }/>
            <Route path="/admin/updatepeanutshell/:id"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdatePeanutShell /> 
                  </ProtectedRoute> 
              }/>

            <Route path="/admin/mulching"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <MulchingList /> 
                  </ProtectedRoute> 
              }/>
            <Route path="/admin/updatemulching/:id"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateMulching /> 
                  </ProtectedRoute> 
              }/>

            <Route path="/admin/peanutshellmulching"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <PeanutShellMulchingList /> 
                  </ProtectedRoute> 
              }/>
            <Route path="/admin/updatepeanutshellmulching/:id" 
            element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdatePeanutShellMulching /> 
                  </ProtectedRoute> 
              }/>

            <Route path="/admin/benefit"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <BenefitList /> 
                  </ProtectedRoute> 
              }/>
            <Route path="/admin/updatebenefit/:id"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateBenefit /> 
                  </ProtectedRoute> 
              }/>

            {/* <Route path="/admin/answers/:id"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <AnswerList /> 
                  </ProtectedRoute> 
              }/> */}

            <Route path="/admin/forum"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <InquiryList /> 
                  </ProtectedRoute> 
              }/>

            <Route path="/admin/analysis"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <AnalysisList /> 
                  </ProtectedRoute> 
              }/>

          <Route path="/dashboard"
            element={
                  <ProtectedRoute isAdmin={true}>
                    <Dashboard /> 
                  </ProtectedRoute> 
              }/>
          </Routes>
        </div>
      </Router>
  
    </div>
  );
}

export default App;
