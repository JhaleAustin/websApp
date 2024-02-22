import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';

import Login from "./Components/User/Login";

import Analysis from './content/analysis';
import Homepage from './content/homepage';
import Documentation from './content/documetation';
import Process from './content/process';
import DocumentationList from './Admin/Docu';
import NewDocumentation from './Components/Admin/NewDocu2';

function App() {
  const isNavVisible = ['/documentationList'].every(path => !window.location.pathname.startsWith(path));

  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
