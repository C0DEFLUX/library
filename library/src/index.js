import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Add, Dashboard, Home, Login, AdminLogin, Edit} from "./components";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/add" element={<Add/>} />
          <Route path="/dashboard/edit/:id" element={<Edit/>} />
      </Routes>
  </Router>
);

reportWebVitals();
