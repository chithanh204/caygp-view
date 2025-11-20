const User = require('../models/User');
const FamilyTree = require('../models/FamilyTree');

// 1. Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    // Tìm tất cả user, nhưng KHÔNG lấy trường password (.select('-password'))
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// 2. Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne(); // Xóa user

      // (Nâng cao) Nên xóa luôn các Cây gia phả của user đó để sạch database
      await FamilyTree.deleteMany({ ownerId: req.params.id });

      res.json({ message: 'Đã xóa người dùng và dữ liệu liên quan' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa người dùng', error: error.message });
  }
};