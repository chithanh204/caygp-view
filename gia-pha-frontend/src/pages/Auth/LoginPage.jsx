import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css'; // Import file CSS
// import apiClient from '../../services/api'; // (Để sau này dùng)

function LoginPage() {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [luuMatKhau, setLuuMatKhau] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form tải lại trang
    console.log('Đang gửi thông tin đăng nhập:', { tenDangNhap, matKhau, luuMatKhau });

    // TODO: Gọi API đăng nhập
    try {
      // const response = await apiClient.post('/auth/login', { tenDangNhap, matKhau });
      // console.log('Đăng nhập thành công:', response.data);
      // localStorage.setItem('token', response.data.token);
      // navigate('/'); // Chuyển về trang chủ sau khi đăng nhập thành công
    } catch (error) {
      console.error('Lỗi đăng nhập!', error);
      // TODO: Hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h1>Đăng Nhập</h1>
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
            <label htmlFor="password">Mật Khẩu</label>
            <input
              type="password"
              id="password"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <input
              type="checkbox"
              id="remember"
              checked={luuMatKhau}
              onChange={(e) => setLuuMatKhau(e.target.checked)}
            />
            <label htmlFor="remember">Lưu Mật Khẩu</label>
          </div>

          <button type="submit" className="auth-button">
            Đăng Nhập
          </button>
        </form>

        <div className="auth-links">
          {/* Các link này dựa theo thiết kế  */}
          <Link to="/forgot-password">Quên Mật Khẩu</Link>
          <Link to="/">Trang Chủ</Link>
          <Link to="/register">Đăng Ký</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;