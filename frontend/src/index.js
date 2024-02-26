import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Design/adminCss.css';
import './Design/Login.css';
import './Design/Header.css';
import './Design/Header.scss';
import './Design/Home.css';
import './Design/DataTable.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
