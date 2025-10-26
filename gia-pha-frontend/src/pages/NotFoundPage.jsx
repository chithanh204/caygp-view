import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; // Import file CSS

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Trang không tồn tại</h2>
      <p>Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.</p>

      {/* Link này sẽ đưa người dùng về trang chủ "/" 
        (Landing Page màu xanh)
      */}
      <Link to="/" className="not-found-link">
        Quay về Trang Chủ
      </Link>
    </div>
  );
}

export default NotFoundPage;