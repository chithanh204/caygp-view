const express = require('express');
const router = express.Router();
const { createTree, getMyTrees, getTreeById } = require('../controllers/treeController');
const { protect } = require('../middleware/authMiddleware');

// Tất cả các route dưới đây đều yêu cầu đăng nhập
router.post('/', protect, createTree);      // Tạo cây
router.get('/my-trees', protect, getMyTrees); // Lấy danh sách cây của tôi
router.get('/:id', protect, getTreeById);     // Lấy chi tiết 1 cây

module.exports = router;