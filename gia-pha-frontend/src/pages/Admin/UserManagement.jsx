import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import apiClient from '../../services/api'; // Import API
import { FaTrash } from 'react-icons/fa'; // Import icon thùng rác

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Tải danh sách người dùng
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get('/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi tải danh sách user:", error);
      // Nếu lỗi 403/401 nghĩa là không phải admin
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        alert("Bạn không có quyền Admin!");
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Xóa người dùng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này? Dữ liệu cây gia phả của họ cũng sẽ bị xóa.")) {
      try {
        await apiClient.delete(`/users/${id}`);
        alert("Đã xóa thành công!");
        fetchUsers(); // Tải lại danh sách
      } catch (error) {
        console.error("Lỗi xóa user:", error);
        alert("Không thể xóa người dùng này.");
      }
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Đang tải danh sách...</div>;

  return (
    <div className="user-management-page">
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Danh sách người dùng ({users.length})</h2>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: user.role === 'admin' ? '#e6f7ff' : '#f6ffed',
                  color: user.role === 'admin' ? '#007bff' : '#52c41a',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}>
                  {user.role}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
              <td>
                {/* Không cho phép xóa chính mình hoặc admin khác (logic đơn giản) */}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn-delete-icon"
                  title="Xóa người dùng"
                  style={{
                    border: 'none', background: 'transparent',
                    color: '#ff4d4f', cursor: 'pointer', fontSize: '1.1rem'
                  }}
                >
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

export default UserManagement;