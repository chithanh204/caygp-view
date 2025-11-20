import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; // Sẽ tạo file css này

function ProfilePage() {
  // Lấy thông tin user từ localStorage (đã lưu lúc đăng nhập)
  // Nếu muốn xịn hơn thì gọi API /auth/me (cần viết thêm ở backend)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <div style={{ textAlign: 'center', color: 'white', marginTop: '2rem' }}>Đang tải...</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {/* Avatar mặc định theo tên */}
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2>{user.username}</h2>
          <p className="role-badge">{user.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}</p>
        </div>

        <div className="profile-body">
          <div className="info-group">
            <label>Email</label>
            <input type="text" value={user.email} readOnly />
          </div>

          <div className="info-group">
            <label>ID Người dùng</label>
            <input type="text" value={user.id} readOnly style={{ color: '#999' }} />
          </div>

          {/* Chỗ này có thể thêm form đổi mật khẩu sau này */}
          <button className="btn-edit-profile" onClick={() => alert('Chức năng đổi mật khẩu đang phát triển')}>
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;