// src/pages/Auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import apiClient from '../../services/api'; // Import api vừa sửa

function RegisterPage() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // Để hiện lỗi từ server
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Reset lỗi cũ

    // Kiểm tra mật khẩu khớp nhau
    if (matKhau !== nhapLaiMatKhau) {
      setErrorMsg("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      // Gọi API đăng ký
      // Mapping: frontend 'tenDangNhap' -> backend 'username'
      await apiClient.post('/auth/register', {
        username: tenDangNhap,
        email: email,
        password: matKhau
      });

      alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
      navigate('/login'); // Chuyển sang trang đăng nhập

    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      // Lấy tin nhắn lỗi từ Backend gửi về (nếu có)
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h1>Đăng Ký</h1>

        {/* Hiển thị lỗi nếu có */}
        {errorMsg && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* ... (Phần input giữ nguyên như cũ) ... */}
          <div className="form-group">
            <label htmlFor="username">Tên Đăng Nhập</label>
            <input type="text" id="username" value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu</label>
            <input type="password" id="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Nhập Lại Mật Khẩu</label>
            <input type="password" id="confirmPassword" value={nhapLaiMatKhau} onChange={(e) => setNhapLaiMatKhau(e.target.value)} required />
          </div>

          <button type="submit" className="auth-button">Đăng Ký</button>
        </form>

        <div className="auth-links">
          <Link to="/login">Đăng Nhập</Link>
          <Link to="/">Trang Chủ</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;