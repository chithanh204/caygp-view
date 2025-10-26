// src/pages/Admin/UserManagement.jsx
import React from 'react';
import './UserManagement.css';

// ----- Dữ liệu giả lập -----
// Dựa theo hình ảnh của bạn
const mockUsers = [
  { id: 1, ten: 'admin', email: 'admin@gmail.com', vaiTro: 'admin', soCay: 1 },
  { id: 2, ten: 'abc', email: 'abc@gmail.com', vaiTro: 'customer', soCay: 2 },
  { id: 3, ten: 'xyz', email: 'xyz@gmail.com', vaiTro: 'customer', soCay: 1 },
];
// ------------------------------

function UserManagement() {
  return (
    <div className="user-management-page">
      {/* Trong tương lai, bạn có thể thêm các nút bấm
        như "Thêm người dùng" ở đây
      */}
      {/* <h1 style={{ padding: '0 1.25rem' }}>Quản lý người dùng</h1> */}

      <table className="user-table">
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Cây gia phả</th>
            {/* <th>Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {mockUsers.map(user => (
            <tr key={user.id}>
              <td>{user.ten}</td>
              <td>{user.email}</td>
              <td>{user.vaiTro}</td>
              <td>{user.soCay}</td>
              {/* <td>
                  <button>Sửa</button>
                  <button>Xóa</button>
                </td>
              */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;