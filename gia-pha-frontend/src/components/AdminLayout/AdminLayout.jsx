// src/components/AdminLayout/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css';

function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* HEADER CỦA ADMIN (Giống Navbar nhưng đơn giản hơn) */}
      <header className="admin-header">
        <NavLink to="/" className="admin-logo">
          (Logo) Cây Gia Phả
        </NavLink>
        <div className="admin-account">
          Admin (Tài khoản)
        </div>
      </header>

      {/* BỐ CỤC CHÍNH */}
      <div className="admin-container">
        {/* THANH SIDEBAR BÊN TRÁI */}
        <aside className="admin-sidebar">
          <nav>
            {/* Dùng NavLink để tự động có class 'active' khi link được chọn */}
            <NavLink to="/">Trang web</NavLink>
            <NavLink to="/admin/users">Người dùng</NavLink>
            <NavLink to="/admin/roles">Vai trò</NavLink>
            <NavLink to="/admin/events">Quản lý sự kiện</NavLink>
          </nav>
        </aside>

        {/* KHU VỰC NỘI DUNG CHÍNH */}
        <main className="admin-content">
          {/* Các trang con (UserManagement...) sẽ render ở đây */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;