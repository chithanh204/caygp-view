import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import file CSS mới
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png';

function HomePage() {
  return (
    <div className="homepage">
      {/* Header này chỉ dành cho trang chủ.
        Chúng ta sẽ bỏ qua các link "Tạo cây", "Xem cây" như trong thiết kế 
        vì chúng không có ý nghĩa khi người dùng chưa đăng nhập.
      */}
      <header className="home-header">
        <Link to="/" className="home-logo">
          <img src={logo} alt="Logo" className="homepage-logo-img" />
          <span>Cây Gia Phả</span>
        </Link>
        <Link to="/login" className="home-account-link">
          <FaUserCircle />
          <span>Tài khoản</span>
        </Link>
      </header>

      {/* Nội dung chính  */}
      <main className="home-content">
        <h1>Gắn kết mọi thế hệ</h1>
        <p className="subtitle">Trong web tạo cây gia phả thực</p>
        <p>- Tạo phả đồ chỉ trong vài bước</p>
        <p>- Quản lý và chia sẻ cây gia phả trực tuyến</p>

        <div className="home-actions">
          <Link to="/register" className="home-btn btn-register">
            Đăng kí
          </Link>
          <Link to="/login" className="home-btn btn-login">
            Đăng nhập
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;