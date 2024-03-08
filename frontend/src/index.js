import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Design/Login.css';
import './Design/Header.css';
import './Design/Sidebar.css';
import './Design/Forum.css';
import './Design/Header.scss';
import './Design/Home.css';
import './Design/DataTable.css';
import './Design/Topic.css';
import './Design/Documentation.css';
import './Design/Process.css';
import './Design/Homepage.css';
import './Design/Analysis.css';
import { ToastContainer } from 'react-toastify';
import './css/style.css'; // Import your custom styles
import './css/responsive.css';
import './css/bootstrap.css'; 

import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);

// reportWebVitals();
