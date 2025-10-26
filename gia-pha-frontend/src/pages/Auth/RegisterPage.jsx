import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import './Auth.css'; // Dùng chung file CSS
// import apiClient from '../../services/api'; // (Để sau này dùng)

function RegisterPage() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState('');
  const [email, setEmail] = useState('');
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu khớp nhau
    if (matKhau !== nhapLaiMatKhau) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    console.log('Đang gửi thông tin đăng ký:', { tenDangNhap, email, matKhau });

    // TODO: Gọi API đăng ký
    try {
      // const response = await apiClient.post('/auth/register', { tenDangNhap, email, matKhau });
      // console.log('Đăng ký thành công:', response.data);
      // navigate('/login'); // Chuyển về trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      console.error('Lỗi đăng ký!', error);
      // TODO: Hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h1>Đăng Ký</h1>
        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="username">Tên Đăng Nhập</label>
            <input
              type="text"
              id="username"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              type="password"
              id="password"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Nhập Lại Mật Khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              value={nhapLaiMatKhau}
              onChange={(e) => setNhapLaiMatKhau(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Đăng Ký
          </button>
        </form>

        <div className="auth-links">
          {/* Các link này dựa theo thiết kế  */}
          <Link to="/login">Đăng Nhập</Link>
          <Link to="/forgot-password">Quên Mật Khẩu</Link>
          <Link to="/">Trang Chủ</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;