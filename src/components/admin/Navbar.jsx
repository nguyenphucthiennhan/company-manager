import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const handleLogoClick = () => {
    window.location.href = "/admin"; // Điều hướng đến trang /admin
  };

  return (
    <nav className="navbar">
      <div className="logo mb-1 flex items-center" onClick={handleLogoClick}>
        <span className="logo-icon text-2xl">🔥</span>
        <span className="logo-text text-lg ml-2">phoenix</span>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-icons">
        <button className="icon-btn sun-icon">☀️</button>
        <button className="icon-btn bell-icon">🔔</button>
        <div className="avatar">
          <img src={require('../../assets/img/team/40x40/57.webp')} alt="user avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
