import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import './CreateTreePage.css';

// --- Dữ liệu giả lập (Mock Data) ---
// Sau này bạn sẽ fetch data này từ API
const mockTreeData = [
  // Thế hệ 1 (giả lập 2 người )
  { id: 'p1', name: 'Adolf Hitler', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Adolf_Hitler_portrait_in_civilian_clothes.jpg', tier: 1 },
  { id: 'p2', name: 'Bill Gates', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg', tier: 1 },
  // Thế hệ 2 (con của p2 )
  { id: 'p3', name: 'Elon Musk', img: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg', tier: 2 },
  { id: 'p4', name: 'Warren Buffett', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg', tier: 2 },
];
// ------------------------------------

function CreateTreePage() {
  const [nodes, setNodes] = useState([]); // Mặc định là mảng rỗng
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, nodeId: null });
  const navigate = useNavigate();

  // Hàm xử lý khi nhấn "Tạo nút"
  const handleCreateFirstNode = () => {
    // Chuyển qua trang chỉnh sửa với ID "new"
    navigate('/edit-member/new');
  };

  // Hàm xử lý khi nhấn vào 1 nút đã có
  const handleNodeClick = (e, nodeId) => {
    e.preventDefault(); // Ngăn menu chuột phải của trình duyệt
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài

    // Lấy vị trí click
    const { pageX, pageY } = e;
    setContextMenu({ visible: true, x: pageX, y: pageY, nodeId: nodeId });
  };

  // Hàm xử lý khi chọn 1 mục trong context menu
  const handleMenuSelect = (action) => {
    const { nodeId } = contextMenu;
    console.log(`Action: ${action} on Node: ${nodeId}`);

    if (action === 'edit') {
      // Chuyển qua trang chỉnh sửa với ID của nút đó [cite: 32]
      navigate(`/edit-member/${nodeId}`);
    }
    // TODO: Xử lý các action khác (thêm con, xóa, xem tiểu sử...)

    setContextMenu({ visible: false, x: 0, y: 0, nodeId: null }); // Đóng menu
  };

  // Hàm đóng menu (khi click ra ngoài)
  const handleCloseMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, nodeId: null });
  };

  // Hàm render cây (tạm thời chia theo "tier" - thế hệ)
  const renderTree = () => {
    const tiers = {};
    nodes.forEach(node => {
      if (!tiers[node.tier]) {
        tiers[node.tier] = [];
      }
      tiers[node.tier].push(node);
    });

    return (
      <div className="tree-container">
        {Object.keys(tiers).sort().map(tier => (
          <div key={tier} className="tree-tier">
            {tiers[tier].map(node => (
              <div
                key={node.id}
                className="tree-node"
                onClick={(e) => handleNodeClick(e, node.id)}
              // onContextMenu={(e) => handleNodeClick(e, node.id)} // Nếu muốn dùng chuột phải
              >
                <img src={node.img} alt={node.name} />
                <span>{node.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="create-tree-page" onClick={handleCloseMenu}>
      {/* Nút tạm thời để tải data mẫu (vì ta chưa có CSDL) */}
      {nodes.length === 0 && (
        <button
          onClick={() => setNodes(mockTreeData)}
          style={{ position: 'absolute', top: '1rem', left: '1rem' }}
        >
          Tải cây mẫu
        </button>
      )}

      {/* Logic chính: Nếu không có node nào -> hiển thị box "tạo nút" */}
      {nodes.length === 0 ? (
        <div className="create-node-box" onClick={handleCreateFirstNode}>
          <div className="plus-icon">+</div>
          <span>Tạo nút</span>
        </div>
      ) : (
        // Nếu có node -> hiển thị cây
        renderTree()
      )}

      {/* Hiển thị Context Menu nếu 'visible' là true */}
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onSelect={handleMenuSelect}
          onClose={handleCloseMenu}
        />
      )}
    </div>
  );
}

export default CreateTreePage;