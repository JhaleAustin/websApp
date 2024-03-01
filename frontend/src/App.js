
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/User/Login";
import Analysis from './content/analysis/analysis';
import Header from './Components/Layout/Header';  // Add this line
import Homepage from './content/homepage';
import Documentation from './content/documentation/documetation';
import Process from './content/process/process';

import HomepageList from './Components/Admin/Homepage/homepageList';
import NewHomepage from './Components/Admin/Homepage/NewHomepage';

import PeanutShellList from './Components/Admin/Homepage/PeanutShellList'
import UpdatePeanutShell from './Components/Admin/Homepage/UpdatePeanutShell';

import MulchingList from './Components/Admin/Homepage/MulchingList'
// import UpdatePeanutShell from './Components/Admin/Homepage/UpdatePeanutShell';

import ProcessList from './Components/Admin/Process/processList';
import NewProcess from './Components/Admin/Process/NewProcess1';
import UpdatePorcess from './Components/Admin/Process/UpdateProcess';
import DocumentationList from './Components/Admin/Documentation/DocuList';
import NewDocumentation from './Components/Admin/Documentation/NewDocu2';
import UpdateDocumention from './Components/Admin/Documentation/UpdateDocu';

function App() {
  const currentPath = window.location.pathname;
  const isNavVisible = !currentPath.startsWith('/admin');

  return (
    <div>
      <Router>
        <div className="App">
          {/* Conditionally render Header based on route information */}
          {isNavVisible && <Header />}
          {/* Main content routes */}
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
            <Route path="/admin/process" element={<NewProcess />} />
            <Route path="/admin/processList" element={<ProcessList />} />

            <Route path="/admin/homepage" element={<NewHomepage />} />
            <Route path="/admin/homepageList" element={<HomepageList />} />
            
            <Route path="/admin/peanutshell" element={<PeanutShellList />} />
            <Route path="/admin/updatepeanutshell/:id" element={<UpdatePeanutShell />} />

            <Route path="/admin/mulching" element={<MulchingList />} />
            {/* <Route path="/admin/updatepeanutshell/:id" element={<UpdatePeanutShell />} /> */}

            <Route path="/admin/updateprocess" element={<UpdatePorcess />} />
            <Route path="/admin/updatedocumentation/:id" element={<UpdateDocumention />} />
          </Routes>
        </div>
      </Router>
  
    </div>
  );
}

export default App;
