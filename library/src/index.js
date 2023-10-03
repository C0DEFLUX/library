import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Admin, Dashboard, Home, Login} from "./components";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<Dashboard/>}/>
          <Route path="/dashboard" element={<Admin/>}/>
      </Routes>
  </Router>
);

reportWebVitals();
