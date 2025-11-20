import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaBell, FaUserCircle, FaSignOutAlt, FaUser } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  // State để bật tắt menu nhỏ của tài khoản
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // 1. Xóa token và thông tin user
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentTreeId');

    // 2. Chuyển hướng về trang Landing Page (hoặc trang Login)
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/view-tree" className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="navbar-logo-img" />
          <span>Cây Gia Phả</span>
        </Link>
        <div className="navbar-links">
          <Link to="/create-tree">Tạo cây mới</Link>
          <Link to="/view-tree">Danh sách cây</Link>
          <Link to="/events">Sự kiện</Link>
        </div>
      </div>

      <div className="navbar-right">
        <button className="navbar-icon-button">
          <FaBell />
        </button>

        {/* Dropdown Tài khoản */}
        <div className="account-dropdown-container" style={{ position: 'relative' }}>
          <div
            className="navbar-account"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle />
            <span>Tài khoản</span>
          </div>

          {/* Menu con hiển thị khi bấm vào */}
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                <FaUser /> Hồ sơ
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item text-red" onClick={handleLogout}>
                <FaSignOutAlt /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;