const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');

// Chỉ Admin mới xem được thống kê
router.get('/stats', protect, admin, getDashboardStats);

module.exports = router;