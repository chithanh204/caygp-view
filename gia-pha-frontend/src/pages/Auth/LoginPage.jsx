// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import apiClient from '../../services/api'; // Import api

function LoginPage() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // Gọi API đăng nhập
      const response = await apiClient.post('/auth/login', {
        username: tenDangNhap,
        password: matKhau
      });

      console.log('Đăng nhập thành công:', response.data);

      // --- LƯU TOKEN VÀO TRÌNH DUYỆT ---
      localStorage.setItem('token', response.data.token);
      // Lưu thông tin user để hiển thị (ví dụ hiển thị tên trên Navbar)
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert('Chào mừng bạn quay trở lại!');

      // Điều hướng dựa trên vai trò (nếu muốn)
      // if (response.data.user.role === 'admin') navigate('/admin/users');
      // else navigate('/create-tree');

      navigate('/view-tree');

    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message); // Ví dụ: "Sai mật khẩu"
      } else {
        setErrorMsg("Lỗi kết nối server.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h1>Đăng Nhập</h1>

        {/* Hiển thị lỗi */}
        {errorMsg && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="username">Tên Đăng Nhập</label>
            <input type="text" id="username" value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu</label>
            <input type="password" id="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} required />
          </div>

          {/* (Phần checkbox lưu mật khẩu tạm bỏ qua logic xử lý phức tạp) */}

          <button type="submit" className="auth-button">Đăng Nhập</button>
        </form>

        <div className="auth-links">
          <Link to="/register">Đăng Ký</Link>
          <Link to="/">Trang Chủ</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;