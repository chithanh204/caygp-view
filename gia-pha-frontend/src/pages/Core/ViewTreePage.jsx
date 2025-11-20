import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewTreePage.css';
import apiClient from '../../services/api';
import ShareModal from '../../components/ShareModal/ShareModal';
import RelationshipPanel from '../../components/RelationshipPanel/RelationshipPanel';
import { FaTrash } from 'react-icons/fa';

function ViewTreePage() {
  const { treeId } = useParams();
  const navigate = useNavigate();

  // State cho chế độ Xem cây (Dữ liệu phân cấp)
  const [treeData, setTreeData] = useState(null);

  // State cho chế độ Danh sách cây
  const [myTrees, setMyTrees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isRelationshipPanelOpen, setRelationshipPanelOpen] = useState(false);

  useEffect(() => {
    if (treeId) {
      fetchTreeData(treeId);
    } else {
      fetchMyTrees();
    }
  }, [treeId]);

  // --- API lấy danh sách cây ---
  const fetchMyTrees = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/trees/my-trees');
      setMyTrees(res.data);
    } catch (error) {
      console.error("Lỗi tải danh sách cây:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- API lấy chi tiết 1 cây ---
  const fetchTreeData = async (id) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/members/tree/${id}`);
      // Dùng hàm buildHierarchy thay cho processTreeData cũ
      const hierarchy = buildHierarchy(response.data);
      setTreeData(hierarchy);
      localStorage.setItem('currentTreeId', id);
    } catch (error) {
      console.error("Lỗi tải cây:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HÀM XỬ LÝ DỮ LIỆU (Giống hệt CreateTreePage) ---
  const buildHierarchy = (members) => {
    if (!members || members.length === 0) return null;

    const memberMap = {};
    members.forEach(m => {
      memberMap[m._id] = { ...m, childrenNodes: [], spouseNode: null };
    });

    const rootNodes = [];

    members.forEach(m => {
      const node = memberMap[m._id];
      if (m.spouseId && memberMap[m.spouseId]) {
        node.spouseNode = memberMap[m.spouseId];
      }
      if (m.fatherId && memberMap[m.fatherId]) {
        memberMap[m.fatherId].childrenNodes.push(node);
      }
      else if (m.motherId && memberMap[m.motherId] && !m.fatherId) {
        memberMap[m.motherId].childrenNodes.push(node);
      }
      else if (!m.fatherId && !m.motherId) {
        rootNodes.push(node);
      }
    });

    return rootNodes.length > 0 ? rootNodes[0] : null;
  };

  // --- Component Vẽ Node Đệ Quy (Read-only) ---
  const TreeNode = ({ node }) => {
    if (!node) return null;
    return (
      <li>
        <div className="spouse-container">
          {/* Node chính */}
          <div className="member-card view-only">
            <img src={node.avatarUrl || `https://ui-avatars.com/api/?name=${node.fullName}`} alt="" />
            <div>{node.fullName}</div>
          </div>

          {/* Vợ/Chồng */}
          {node.spouseNode && (
            <>
              <div className="spouse-connector"></div>
              <div className="member-card view-only">
                <img src={node.spouseNode.avatarUrl || `https://ui-avatars.com/api/?name=${node.spouseNode.fullName}`} alt="" />
                <div>{node.spouseNode.fullName}</div>
              </div>
            </>
          )}
        </div>

        {/* Con cái */}
        {node.childrenNodes && node.childrenNodes.length > 0 && (
          <ul>
            {node.childrenNodes.map(child => (
              <TreeNode key={child._id} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteTree = async (e, treeId) => {
    // QUAN TRỌNG: Ngăn chặn sự kiện nổi bọt (Bubbling)
    // Nếu không có dòng này, khi bấm xóa nó sẽ kích hoạt cả onClick của thẻ cha -> Chuyển trang
    e.stopPropagation();

    if (window.confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa cây gia phả này?\nTất cả thành viên và sự kiện liên quan sẽ bị xóa vĩnh viễn!")) {
      try {
        await apiClient.delete(`/trees/${treeId}`);
        alert("Đã xóa thành công!");
        // Tải lại danh sách để cập nhật giao diện
        fetchMyTrees();
      } catch (error) {
        console.error("Lỗi xóa cây:", error);
        alert("Có lỗi xảy ra khi xóa cây.");
      }
    }
  };

  // --- GIAO DIỆN CHÍNH ---
  if (loading) return <div className="loading-text">Đang tải dữ liệu...</div>;

  // 1. Giao diện Dashboard (Chọn cây)
  if (!treeId) {
    return (
      <div className="view-tree-page dashboard-mode">
        <div className="tree-selection-box">
          <h2>Danh sách Gia Phả của bạn</h2>
          <p>Chọn một cây để xem chi tiết</p>

          <div className="tree-list-grid">
            <div className="tree-card create-new" onClick={() => navigate('/create-tree')}>
              <div className="plus-icon">+</div>
              <span>Tạo cây mới</span>
            </div>

            {myTrees.map(tree => (
              <div key={tree._id} className="tree-card" onClick={() => navigate(`/view-tree/${tree._id}`)}>
                <button
                  className="delete-tree-btn"
                  onClick={(e) => handleDeleteTree(e, tree._id)}
                  title="Xóa cây này"
                >
                  <FaTrash />
                </button>
                <div className="tree-icon">🌳</div>
                <div className="tree-info">
                  <h3>{tree.name}</h3>
                  <p>{tree.description || 'Không có mô tả'}</p>
                  <span className="date">Tạo: {new Date(tree.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. Giao diện Xem cây chi tiết (Recursive Tree)
  return (
    <div className="view-tree-page">
      <div className="view-tree-toolbar">
        <button onClick={() => navigate('/view-tree')}>Quay lại danh sách</button>
        <button onClick={() => setRelationshipPanelOpen(true)}>Xem mối quan hệ</button>
        <button onClick={() => alert("Tính năng đang phát triển")}>Xuất ảnh</button>
        <button onClick={() => setShareModalOpen(true)}>Share</button>
        <button onClick={() => navigate(`/create-tree`)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none' }}>
          Chỉnh sửa cây này
        </button>
      </div>

      <div className="tree-wrapper">
        {treeData ? (
          <div className="tree">
            <ul>
              <TreeNode node={treeData} />
            </ul>
          </div>
        ) : (
          <div className="empty-state">
            <h3>Cây chưa có thành viên nào.</h3>
            <button onClick={() => navigate(`/create-tree`)}>Đi tới trang chỉnh sửa</button>
          </div>
        )}
      </div>

      {isShareModalOpen && <ShareModal onClose={() => setShareModalOpen(false)} />}
      {isRelationshipPanelOpen && <RelationshipPanel onClose={() => setRelationshipPanelOpen(false)} />}
    </div>
  );
}

export default ViewTreePage;