const express = require('express');
const router = express.Router();
const { addMember, updateMember, getMembersByTree, getMemberDetail } = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');

// Bảo vệ tất cả bằng middleware đăng nhập
router.post('/', protect, addMember);           // Tạo mới
router.put('/:id', protect, updateMember);      // Cập nhật (Sửa)
router.get('/tree/:treeId', protect, getMembersByTree); // Lấy list theo cây
router.get('/:id', protect, getMemberDetail);   // Lấy chi tiết 1 người

module.exports = router;