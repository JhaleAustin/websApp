// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './content/nav';
import Analysis from './content/analysis';
import Homepage from './content/homepage';

import Documentation from './content/documetation';
import Process from './content/process';
import AdminPage from './Admin/adminPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
         *<Route path="/process" element={<Process />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/adminPage" element={<AdminPage />} />
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;
