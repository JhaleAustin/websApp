import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';

import Login from "./Components/User/Login";

import Footer from './Components/Layout/Footer'
import Analysis from './content/analysis/analysis';
import Homepage from './content/homepage';
import Documentation from './content/documentation/documetation';
import Process from './content/process/process';

import ProcessList from './Components/Admin/Process/processList';
import NewPorcess from './Components/Admin/Process/NewProcess1';
import DocumentationList from './Components/Admin/Documentation/Docu';
import NewDocumentation from './Components/Admin/Documentation/NewDocu2';

function App() {
  const isNavVisible = ['/documentationList'].every(path => !window.location.pathname.startsWith(path));

  return (
    <div>
      
      <Router>
      <div className="App">
        {/* Conditionally render Nav component based on route information */}
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
          <Route path="/documentationList" element={<DocumentationList />} />
          <Route path="/admin/process" element={<NewPorcess />} />
          <Route path="/processList" element={<ProcessList />} />
       
        </Routes>
      </div>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
