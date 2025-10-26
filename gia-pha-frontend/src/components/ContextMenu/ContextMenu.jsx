// src/components/ContextMenu/ContextMenu.jsx
import React from 'react';
import './ContextMenu.css';

// Các lựa chọn
const menuItems = [
  { id: 'edit', label: 'Sửa' },
  { id: 'bio', label: 'Xem tiểu sử' },
  { id: 'add_child', label: 'Thêm con' },
  { id: 'add_spouse', label: 'Thêm vợ chồng' },
  { id: 'add_parent', label: 'Thêm bố mẹ' },
  { id: 'skip', label: 'Bỏ qua' },
  { id: 'delete', label: 'Xóa' },
];

function ContextMenu({ x, y, onSelect, onClose }) {

  // Xử lý khi click bên ngoài để đóng menu
  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="context-menu"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()} // Ngăn click vào menu làm đóng menu
    >
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} onClick={() => onSelect(item.id)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;