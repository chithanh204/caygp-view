import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import './CreateTreePage.css';

function CreateTreePage() {
  const [treeData, setTreeData] = useState(null); // Dữ liệu dạng cây phân cấp
  // eslint-disable-next-line no-unused-vars
  const [rawMembers, setRawMembers] = useState([]); // Dữ liệu gốc từ DB
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, nodeId: null });
  const navigate = useNavigate();
  const currentTreeId = localStorage.getItem('currentTreeId');

  useEffect(() => {
    if (currentTreeId) fetchMembers();
  }, [currentTreeId]);

  const fetchMembers = async () => {
    try {
      const res = await apiClient.get(`/members/tree/${currentTreeId}`);
      setRawMembers(res.data);
      const hierarchy = buildHierarchy(res.data);
      setTreeData(hierarchy);
    } catch (error) {
      console.error("Lỗi tải cây:", error);
    }
  };

  // --- HÀM QUAN TRỌNG: Biến đổi danh sách phẳng thành cây ---
  const buildHierarchy = (members) => {
    if (!members || members.length === 0) return null;

    const memberMap = {};
    // 1. Tạo map và chuẩn bị mảng children cho mỗi người
    members.forEach(m => {
      memberMap[m._id] = { ...m, childrenNodes: [], spouseNode: null };
    });

    const rootNodes = [];

    // 2. Ráp nối cha-con và vợ-chồng
    members.forEach(m => {
      const node = memberMap[m._id];

      // Nếu có vợ/chồng -> Gắn vào
      if (m.spouseId && memberMap[m.spouseId]) {
        // Để tránh lặp (A là vợ B, B là chồng A), ta chỉ gán nếu ID mình < ID vợ/chồng
        // Hoặc logic đơn giản: chỉ hiển thị vợ cạnh chồng
        node.spouseNode = memberMap[m.spouseId];
      }

      // Nếu có cha -> Đẩy mình vào mảng childrenNodes của cha
      if (m.fatherId && memberMap[m.fatherId]) {
        memberMap[m.fatherId].childrenNodes.push(node);
      }
      // Nếu có mẹ mà KHÔNG có cha (trường hợp đặc biệt) -> Đẩy vào mẹ
      else if (m.motherId && memberMap[m.motherId] && !m.fatherId) {
        memberMap[m.motherId].childrenNodes.push(node);
      }
      // Nếu không có cha mẹ -> Là Root (Ông tổ)
      else if (!m.fatherId && !m.motherId) {
        // Chỉ push vào root nếu mình không phải là "vợ/chồng đi kèm" (logic đơn giản hóa)
        // Tạm thời cứ push hết những ai ko có cha mẹ
        rootNodes.push(node);
      }
    });

    // Lọc bớt các node là vợ/chồng đã được hiển thị cạnh partner rồi để tránh trùng
    // (Đây là logic phức tạp, tạm thời lấy node đầu tiên làm gốc)
    return rootNodes.length > 0 ? rootNodes[0] : null;
  };

  // --- Xử lý Menu ---
  const handleNodeClick = (e, nodeId) => {
    e.preventDefault(); e.stopPropagation();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, nodeId });
  };

  const handleMenuSelect = (action) => {
    const { nodeId } = contextMenu;
    if (action === 'edit') {
      navigate(`/edit-member/${nodeId}?treeId=${currentTreeId}`);
    }
    // Thêm Vợ/Chồng
    else if (action === 'add_spouse') {
      navigate(`/edit-member/new?treeId=${currentTreeId}&type=spouse&relatedId=${nodeId}`);
    }
    // Thêm Con
    else if (action === 'add_child') {
      navigate(`/edit-member/new?treeId=${currentTreeId}&type=child&relatedId=${nodeId}`);
    }
    setContextMenu({ visible: false, x: 0, y: 0, nodeId: null });
  };

  // --- COMPONENT ĐỆ QUY VẼ CÂY ---
  const TreeNode = ({ node }) => {
    if (!node) return null;

    // Kiểm tra xem node này có phải là "phụ" (đã được vẽ cạnh chồng/vợ) không để tránh vẽ lặp
    // Logic đơn giản: Vẽ node, nếu có spouse thì vẽ spouse bên cạnh

    return (
      <li>
        <div className="spouse-container">
          {/* Bản thân Node */}
          <div className="member-card" onClick={(e) => handleNodeClick(e, node._id)}>
            <img src={node.avatarUrl || `https://ui-avatars.com/api/?name=${node.fullName}`} alt="" />
            <div>{node.fullName}</div>
          </div>

          {/* Nếu có Vợ/Chồng -> Vẽ bên cạnh */}
          {node.spouseNode && (
            <>
              <div className="spouse-connector"></div>
              <div className="member-card" onClick={(e) => handleNodeClick(e, node.spouseNode._id)}>
                <img src={node.spouseNode.avatarUrl || `https://ui-avatars.com/api/?name=${node.spouseNode.fullName}`} alt="" />
                <div>{node.spouseNode.fullName}</div>
              </div>
            </>
          )}
        </div>

        {/* Vẽ danh sách Con (nếu có) */}
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

  return (
    <div className="create-tree-page" onClick={() => setContextMenu({ ...contextMenu, visible: false })}>
      {treeData ? (
        <div className="tree">
          <ul>
            <TreeNode node={treeData} />
          </ul>
        </div>
      ) : (
        <div className="create-node-box" onClick={() => navigate(`/edit-member/new?treeId=${currentTreeId}`)}>
          <span>+ Tạo Ông Tổ</span>
        </div>
      )}

      {contextMenu.visible && (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onSelect={handleMenuSelect} onClose={() => setContextMenu({ ...contextMenu, visible: false })} />
      )}
    </div>
  );
}

export default CreateTreePage;