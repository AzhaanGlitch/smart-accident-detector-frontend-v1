import React from 'react';
import { useTheme } from '../App';

const Header = ({ title, subtitle }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="page-header">
      <div className="header-content">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      
      <div className="user-info">
        <span className="user-greeting">Hi azhaan</span>
        <div className="status-indicator">
          <div className="online-dot"></div>
          <span className="status-text">Online</span>
        </div>
        <div className="user-avatar">
          <span>🔔</span>
        </div>
      </div>
    </div>
  );
};

export default Header;