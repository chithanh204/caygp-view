import React from 'react';
import './RoleManagement.css';
// Import icons (đã cài ở các bước trước)
import { FaCalendarAlt, FaTrash } from 'react-icons/fa';

// ----- Dữ liệu giả lập -----
// Dựa theo hình ảnh
const mockRoles = [
  { id: 'admin', ten: 'admin', vaiTro: 'Quản trị viên' },
  { id: 'customer', ten: 'customer', vaiTro: 'khách hàng' },
];
// ------------------------------

function RoleManagement() {

  const handleEdit = (id) => {
    alert(`(Giao diện) Mở trang sửa quyền cho role: ${id}`);
  };

  const handleDelete = (id) => {
    // Thêm xác nhận trước khi xóa
    if (window.confirm(`Bạn có chắc muốn xóa vai trò "${id}" không?`)) {
      alert(`(Giao diện) Đã xóa role: ${id}`);
      // TODO: Gọi API xóa
    }
  };

  return (
    <div className="role-management-page">
      <table className="role-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Vai trò</th>
            <th>Thực thi</th>
          </tr>
        </thead>
        <tbody>
          {mockRoles.map(role => (
            <tr key={role.id}>
              <td>{role.ten}</td>
              <td>{role.vaiTro}</td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(role.id)} title="Sửa quyền">
                    <FaCalendarAlt />
                  </button>
                  <button onClick={() => handleDelete(role.id)} title="Xóa vai trò" className="btn-delete">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoleManagement;