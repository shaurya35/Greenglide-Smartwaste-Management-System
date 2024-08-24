import React, { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReload = () => {
    window.location.href = "/";
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar_inner">
          <div className="navbar_logo sora" onClick={handleReload}>
            GreenGlide
          </div>
          <div className="btn sora">
            <button className="navbar_button" onClick={togglePopup}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {isPopupOpen && (
        <div className="popup_overlay">
          <div className="popup_content">
            <button className="popup_button" onClick={() => window.location.href = '/auth/user/login'}>
              User
            </button>
            <button className="popup_button" onClick={() => window.location.href = '/auth/employee/login'}>
              Employee
            </button>
            <button className="popup_button" onClick={() => window.location.href = '/auth/staff/login'}>
              Staff
            </button>
            <button className="popup_close" onClick={togglePopup}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
