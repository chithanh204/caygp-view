// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Định nghĩa route: POST /api/auth/register
router.post('/register', register);

// Định nghĩa route: POST /api/auth/login
router.post('/login', login);

module.exports = router;