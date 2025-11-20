import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';
import './UserManagement.css'; // Tận dụng CSS của trang User cho đồng bộ

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await apiClient.get('/events/admin/all');
      setEvents(res.data);
    } catch (error) {
      console.error("Lỗi tải sự kiện:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Admin: Bạn chắc chắn muốn xóa sự kiện này?")) {
      try {
        await apiClient.delete(`/events/${id}`);
        alert("Đã xóa!");
        fetchEvents();
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("Lỗi xóa sự kiện");
      }
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Đang tải danh sách...</div>;

  return (
    <div className="user-management-page">
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Quản lý Sự kiện ({events.length})</h2>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sự kiện</th>
            <th>Ngày diễn ra</th>
            <th>Thuộc Gia phả</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, index) => (
            <tr key={ev._id}>
              <td>{index + 1}</td>
              <td style={{ fontWeight: '600' }}>{ev.title}</td>
              <td>{new Date(ev.date).toLocaleDateString('vi-VN')}</td>
              <td>
                <span style={{ color: '#007bff' }}>
                  {ev.treeId ? ev.treeId.name : 'Không xác định'}
                </span>
              </td>
              <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ev.description}
              </td>
              <td>
                <button onClick={() => handleDelete(ev._id)} className="btn-delete-icon" style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventManagement;