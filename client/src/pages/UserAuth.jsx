import React from 'react';
import '../styles/UserAuth.css'; 

const UserAuth = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-heading sora">User Login</h2>
        <form>
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
