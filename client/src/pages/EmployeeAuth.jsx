import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import '../styles/EmployeeAuth.css'; 

const EmployeeAuth = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCode(value);
      setError('');
    } else {
      setError('Please enter a 4-digit code');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 4) {
      // Navigate to the /employee/dashboard route
      navigate('/employee/dashboard');
    } else {
      setError('Code must be exactly 4 digits');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className='sora employee_login staff_heading'>Employee Login</h1>
        <input
          type="text"
          value={code}
          onChange={handleChange}
          maxLength="4"
          placeholder="Enter 4-digit code"
          className="login-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeAuth;
