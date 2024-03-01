
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import DocumentationList from './Components/Admin/Documentation/Docu';
import NewDocumentation from './Components/Admin/Documentation/NewDocu2';
import UpdateDocumention from './Components/Admin/Documentation/UpdateDocu';

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
          </Routes>
 
          {/* AdminPage route */}
          <Routes>
            <Route path="/admin/documentation" element={<NewDocumentation />} />
            <Route path="/admin/documentationList" element={<DocumentationList />} />

            <Route path="/admin/new/process" element={<NewProcess />} />
            <Route path="/admin/process" element={<ProcessList />} />
            <Route path="/admin/updateprocess/:id" element={<UpdateProcess />} />

            <Route path="/admin/homepage" element={<NewHomepage />} />

            <Route path="/admin/peanutshell" element={<PeanutShellList />} />
            <Route path="/admin/updatepeanutshell/:id" element={<UpdatePeanutShell />} />

            <Route path="/admin/mulching" element={<MulchingList />} />
            <Route path="/admin/updatemulching/:id" element={<UpdateMulching />} />

            <Route path="/admin/peanutshellmulching" element={<PeanutShellMulchingList />} />
            <Route path="/admin/updatepeanutshellmulching/:id" element={<UpdatePeanutShellMulching />} />

            <Route path="/admin/benefit" element={<BenefitList />} />
            <Route path="/admin/updatebenefit/:id" element={<UpdateBenefit/>} />


            <Route path="/admin/updatedocumentation" element={<UpdateDocumention />} />
          </Routes>
        </div>
      </Router>
  
    </div>
  );
}

export default App;
