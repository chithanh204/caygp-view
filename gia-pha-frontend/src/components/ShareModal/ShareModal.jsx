// src/components/ShareModal/ShareModal.jsx
import React, { useState } from 'react';
import './ShareModal.css';

function ShareModal({ onClose }) {
  const [permission, setPermission] = useState('view');
  const shareableLink = "https://abc.com/share/xyz123"; // Link giả

  return (
    // Lớp phủ mờ
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Chia sẻ cây gia phả</h2>

        <div className="share-section">
          <h4>Mời qua email</h4>
          <div className="share-invite-form">
            <input type="email" placeholder="Nhập email người nhận..." />
            <select value={permission} onChange={(e) => setPermission(e.target.value)}>
              <option value="view">Chỉ xem</option>
              <option value="edit">Chỉnh sửa</option>
            </select>
            <button className="btn-primary">Gửi lời mời</button>
          </div>
        </div>

        <div className="share-section">
          <h4>Hoặc chia sẻ liên kết</h4>
          <div className="share-link-form">
            <input type="text" value={shareableLink} readOnly />
            <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(shareableLink)}>
              Sao chép
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;