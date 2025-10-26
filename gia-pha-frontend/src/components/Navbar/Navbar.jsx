// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Bạn có thể import icon từ thư viện (ví dụ: react-icons)
// npm install react-icons
import { FaBell, FaUserCircle } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          {/* Thay "Logo" bằng file ảnh của bạn */}
          <span>(Logo)</span>
          Cây Gia Phả
        </Link>
        <div className="navbar-links">
          {/* Các link này dựa theo thiết kế  */}
          <Link to="/create-tree">Tạo cây</Link>
          <Link to="/view-tree">Xem cây</Link>
          <Link to="/events">Sự kiện</Link>
        </div>
      </div>
      <div className="navbar-right">
        <button className="navbar-icon-button">
          <FaBell /> {/* Icon thông báo */}
        </button>
        <Link to="/profile" className="navbar-account">
          <FaUserCircle /> {/* Icon tài khoản */}
          <span>Tài khoản</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;