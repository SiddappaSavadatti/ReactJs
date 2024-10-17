import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink 
            to="" 
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Doctor Registration
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="doctor" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Doctors
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="patient" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Patients
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
