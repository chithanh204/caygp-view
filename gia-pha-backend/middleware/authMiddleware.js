const jwt = require('jsonwebtoken');

// Middleware kiểm tra đăng nhập 
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // decoded chứa { id, role }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token không hợp lệ' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Thiếu token, không có quyền truy cập' });
  }
};

// --- Middleware kiểm tra quyền Admin ---
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Truy cập bị từ chối: Chỉ dành cho Admin' });
  }
};

module.exports = { protect, admin };