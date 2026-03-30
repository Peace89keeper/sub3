import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // We will move the CSS here next

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('schemeMatch_token');
    navigate('/'); 
  };

  return (
    <nav className="sm-dash-nav">
      <div className="sm-logo-group" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
        <div className="sm-logo-icon">S</div>
        <span className="sm-logo-text">SchemeMatch</span>
      </div>
      
      <div className="sm-nav-actions-right">
        
        {/* Notification Bell */}
        <button className="sm-nav-icon-btn" onClick={() => navigate('/notifications')} aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          <span className="sm-notification-badge">2</span>
        </button>

        <div className="sm-nav-divider"></div>

        {/* User Profile Block */}
        <div className="sm-nav-profile" onClick={() => navigate('/profile')} title="Edit Profile">
          <img 
            src="https://ui-avatars.com/api/?name=Ramesh+Kumar&background=ea580c&color=fff&bold=true" 
            alt="User Avatar" 
            className="sm-avatar-img" 
          />
          <span className="sm-user-greeting">Ramesh K.</span>
        </div>

        {/* Logout Button */}
        <button className="sm-btn-logout" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm-logout-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          <span>Logout</span>
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;