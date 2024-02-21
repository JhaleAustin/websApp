import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './content/nav';
import Analysis from './content/analysis';
import Homepage from './content/homepage';
import Documentation from './content/documetation';
import Process from './content/process';
import AdminPage from './Admin/adminPage';

function App() {
  const isNavVisible = ['/adminPage'].every(path => !window.location.pathname.startsWith(path));

  return (
    <Router>
      <div className="App">
        {/* Conditionally render Nav component based on route information */}
        {isNavVisible && <Nav />}

        {/* Main content routes */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/process" element={<Process />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>

        {/* AdminPage route */}
        <Routes>
          <Route path="/adminPage" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
