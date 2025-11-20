const express = require('express');
const router = express.Router();
const { createEvent, getEventsByTree, deleteEvent, getAllEvents } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

// Bảo vệ tất cả route bằng token
router.post('/', protect, createEvent);
router.get('/tree/:treeId', protect, getEventsByTree);
router.delete('/:id', protect, deleteEvent);
router.get('/admin/all', protect, admin, getAllEvents);

module.exports = router;