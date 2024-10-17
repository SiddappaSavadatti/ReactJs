import React, { useState } from 'react';
import './DoctorRegistration.css';  

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone_number: '',
    email: '',
    specialization: '',
  });

  const [message, setMessage] = useState('');
  const [errorField, setErrorField] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for empty fields
    const emptyField = Object.keys(formData).find(key => !formData[key]);
    if (emptyField) {
      setErrorField(emptyField); // Set the error field to highlight
      document.getElementsByName(emptyField)[0].focus(); // Set focus on the empty field
      return;
    }

    try {
      const response = await fetch('http://192.168.0.181:8000/dreg/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 5a9e24c351c3e0c8ec1028e88e6ea27e90f60b75',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage('Registration Successful');
        setFormData({ username: '', password: '', phone_number: '', email: '', specialization: '' });  
      
      } 
      else {
        setMessage(data.data);
      }
    }
    catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while registering. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Doctor Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errorField === 'username' ? 'error' : ''}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errorField === 'password' ? 'error' : ''}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className={errorField === 'phone_number' ? 'error' : ''}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errorField === 'email' ? 'error' : ''}
          />
        </div>
        <div className="form-group">
          <label>Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className={errorField === 'specialization' ? 'error' : ''}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DoctorRegistration;
