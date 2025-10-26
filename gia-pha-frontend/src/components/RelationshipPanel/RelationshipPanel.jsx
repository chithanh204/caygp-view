// src/components/RelationshipPanel/RelationshipPanel.jsx
import React, { useState } from 'react';
import './RelationshipPanel.css';

function RelationshipPanel({ onClose }) {
  // State để lưu tên người được chọn (hiện tại chỉ là text)
  const [node1, setNode1] = useState(null);
  const [node2, setNode2] = useState(null);

  const handleSelectNode = (slot) => {
    // TODO: Thêm logic phức tạp để lắng nghe cú click trên cây
    alert(`Hãy click vào một nút trên cây để chọn cho ${slot}`);
    // Giả lập chọn
    if (slot === 'slot1') setNode1("Bill Gates (Giả lập)");
    if (slot === 'slot2') setNode2("Elon Musk (Giả lập)");
  };

  return (
    <div className="relationship-panel">
      <div className="panel-header">
        <h4>Xem mối quan hệ</h4>
        <button className="panel-close-btn" onClick={onClose}>&times;</button>
      </div>

      <p>Chọn 2 thành viên để xem quan hệ:</p>

      <div className="slot-container">
        {/* Ô chọn 1 */}
        <div className="slot-box" onClick={() => handleSelectNode('slot1')}>
          {node1 ? <span>{node1}</span> : '+'}
        </div>
        {/* Ô chọn 2 */}
        <div className="slot-box" onClick={() => handleSelectNode('slot2')}>
          {node2 ? <span>{node2}</span> : '+'}
        </div>
      </div>

      <div className="relationship-result">
        <h4>Kết quả:</h4>
        {node1 && node2 ? (
          <p>Mối quan hệ giữa <strong>{node1}</strong> và <strong>{node2}</strong> là: Cha - Con (Giao diện)</p>
        ) : (
          <p>(Chưa chọn đủ 2 người)</p>
        )}
      </div>
    </div>
  );
}

export default RelationshipPanel;