import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';
import './AdminDashboard.css';
import { FaUsers, FaTree, FaCalendarCheck, FaSitemap } from 'react-icons/fa';

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    trees: 0,
    members: 0,
    events: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get('/dashboard/stats');
        setStats(res.data);
      } catch (error) {
        console.error("Lỗi tải thống kê:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Tổng quan hệ thống</h2>

      <div className="stats-grid">
        {/* Thẻ Người dùng */}
        <div className="stat-card card-blue">
          <div className="stat-icon"><FaUsers /></div>
          <div className="stat-info">
            <h3>{stats.users}</h3>
            <p>Người dùng</p>
          </div>
        </div>

        {/* Thẻ Cây gia phả */}
        <div className="stat-card card-green">
          <div className="stat-icon"><FaTree /></div>
          <div className="stat-info">
            <h3>{stats.trees}</h3>
            <p>Cây gia phả</p>
          </div>
        </div>

        {/* Thẻ Thành viên (Nút) */}
        <div className="stat-card card-purple">
          <div className="stat-icon"><FaSitemap /></div>
          <div className="stat-info">
            <h3>{stats.members}</h3>
            <p>Thành viên được tạo</p>
          </div>
        </div>

        {/* Thẻ Sự kiện */}
        <div className="stat-card card-orange">
          <div className="stat-icon"><FaCalendarCheck /></div>
          <div className="stat-info">
            <h3>{stats.events}</h3>
            <p>Sự kiện</p>
          </div>
        </div>
      </div>

      {/* (Tùy chọn) Có thể thêm biểu đồ ở dưới nếu muốn */}
      <div style={{ marginTop: '3rem' }}>
        <p style={{ fontStyle: 'italic', color: '#666' }}>
          Chào mừng quay trở lại trang quản trị. Hệ thống đang hoạt động ổn định.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;