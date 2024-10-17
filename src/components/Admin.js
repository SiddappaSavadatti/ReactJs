import React from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import DoctorRegistration from './DoctorRegistration';
import Doctor from './Doctor';
import Patient from './Patient';
import './Admin.css';

const Admin = () => {
  return (
    <div>
      <Navbar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<DoctorRegistration />} />   
          <Route path="doctor" element={<Doctor />} />
          <Route path="patient" element={<Patient />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
