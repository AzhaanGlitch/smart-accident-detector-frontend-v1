import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { Car, LayoutDashboard, Zap, Users, Mail, LogOut, Sun, Moon } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'DASHBOARD' },
    { path: '/features', icon: Zap, label: 'FEATURES' },
    { path: '/team', icon: Users, label: 'TEAM' },
    { path: '/contact', icon: Mail, label: 'CONTACT' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">
            <Car className="logo-icon" />
          </div>
          <div className="brand-info">
            <h1 className="brand-title">SMART<br />ACCIDENT<br />DETECTOR</h1>
            <p className="brand-subtitle">Detect.Alert.Protect.</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <button className="logout-btn">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;