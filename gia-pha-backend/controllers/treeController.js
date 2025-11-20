const FamilyTree = require('../models/FamilyTree');
const Member = require('../models/Member');
const Event = require('../models/Event');

// 1. Tạo cây gia phả mới
exports.createTree = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Tạo cây mới, ownerId lấy từ req.user.id (do middleware cấp)
    const newTree = new FamilyTree({
      name: name || 'Gia phả mới',
      description: description || '',
      ownerId: req.user.id
    });

    const savedTree = await newTree.save();

    res.status(201).json(savedTree);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// 2. Lấy danh sách cây của người đang đăng nhập
exports.getMyTrees = async (req, res) => {
  try {
    // Tìm tất cả cây mà ownerId trùng với ID người dùng đang đăng nhập
    const trees = await FamilyTree.find({ ownerId: req.user.id }).sort({ createdAt: -1 });

    res.json(trees);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// 3. Lấy chi tiết 1 cây (để vẽ)
exports.getTreeById = async (req, res) => {
  try {
    const tree = await FamilyTree.findById(req.params.id);
    if (!tree) return res.status(404).json({ message: 'Không tìm thấy cây' });

    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.deleteTree = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra xem cây có tồn tại và có phải của user này không
    const tree = await FamilyTree.findOne({ _id: id, ownerId: req.user.id });

    if (!tree) {
      return res.status(404).json({ message: 'Không tìm thấy cây hoặc bạn không có quyền xóa' });
    }

    // --- QUAN TRỌNG: Xóa sạch dữ liệu liên quan ---
    // 1. Xóa tất cả thành viên thuộc cây này
    await Member.deleteMany({ treeId: id });

    // 2. Xóa tất cả sự kiện thuộc cây này
    await Event.deleteMany({ treeId: id });

    // 3. Cuối cùng xóa cây
    await tree.deleteOne();

    res.json({ message: 'Đã xóa cây gia phả và toàn bộ dữ liệu liên quan' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa cây', error: error.message });
  }
};