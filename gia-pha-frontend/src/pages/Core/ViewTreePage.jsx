// src/pages/Core/ViewTreePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewTreePage.css';

// Import 2 component mới
import ShareModal from '../../components/ShareModal/ShareModal';
import RelationshipPanel from '../../components/RelationshipPanel/RelationshipPanel';

// ----- Dữ liệu giả lập (Giống CreateTreePage) -----
const mockTreeData = [
  { id: 'p1', name: 'Adolf Hitler', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Adolf_Hitler_portrait_in_civilian_clothes.jpg', tier: 1 },
  { id: 'p2', name: 'Bill Gates', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg', tier: 1 },
  { id: 'p3', name: 'Elon Musk', img: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg', tier: 2 },
  { id: 'p4', name: 'Warren Buffett', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg', tier: 2 },
  { id: 'p5', name: 'Amber Heard', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Amber_Heard_by_Gage_Skidmore_2.jpg/1024px-Amber_Heard_by_Gage_Skidmore_2.jpg', tier: 2 },
  { id: 'p6', name: 'Albert Einstein', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg', tier: 2 },
];
// ------------------------------

function ViewTreePage() {
  const { treeId } = useParams(); // Lấy ID cây từ URL (nếu cần)
  const [nodes, setNodes] = useState([]);

  // State quản lý việc ẩn/hiện
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isRelationshipPanelOpen, setRelationshipPanelOpen] = useState(false);

  // Giả lập tải cây gia phả
  useEffect(() => {
    // TODO: Dùng treeId để fetch cây
    console.log("Đang tải cây (fake):", treeId);
    setNodes(mockTreeData);
  }, [treeId]);

  // Hàm render cây (giống hệt CreateTreePage)
  const renderTree = () => {
    const tiers = {};
    nodes.forEach(node => {
      if (!tiers[node.tier]) tiers[node.tier] = [];
      tiers[node.tier].push(node);
    });

    return (
      <div className="tree-container">
        {Object.keys(tiers).sort().map(tier => (
          <div key={tier} className="tree-tier">
            {tiers[tier].map(node => (
              <div key={node.id} className="tree-node">
                <img src={node.img} alt={node.name} />
                <span>{node.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Hàm xử lý nút "Xuất ảnh" (tạm thời)
  const handleExportImage = () => {
    alert("Chức năng 'Xuất ảnh' đang được phát triển!");
  };

  return (
    <div className="view-tree-page">
      {/* Toolbar chứa các nút chức năng */}
      <div className="view-tree-toolbar">
        <button onClick={() => setRelationshipPanelOpen(true)}>
          Xem mối quan hệ
        </button>
        <button onClick={handleExportImage}>
          Xuất ảnh
        </button>
        <button onClick={() => setShareModalOpen(true)}>
          Share
        </button>
      </div>

      {/* Render Cây */}
      {nodes.length > 0 ? renderTree() : <p>Đang tải cây gia phả...</p>}

      {/* Các component ẩn (Modal/Panel) */}
      {isShareModalOpen && (
        <ShareModal onClose={() => setShareModalOpen(false)} />
      )}

      {isRelationshipPanelOpen && (
        <RelationshipPanel onClose={() => setRelationshipPanelOpen(false)} />
      )}
    </div>
  );
}

export default ViewTreePage;