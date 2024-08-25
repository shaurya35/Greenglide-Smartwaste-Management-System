import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserAuth.css'; 

const UserAuth = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/user/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-heading sora">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label sora">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="form-input outfit" 
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="form-button outfit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
