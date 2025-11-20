const FamilyTree = require('../models/FamilyTree');

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