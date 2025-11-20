const Member = require('../models/Member');

// 1. Thêm thành viên mới
exports.addMember = async (req, res) => {
  try {
    const {
      fullName, gender, dateOfBirth, dateOfDeath, placeOfOrigin, bio, treeId,
      relationType, relatedId
    } = req.body;

    // 1. Tạo object thành viên mới
    const memberData = {
      fullName, gender, dateOfBirth, dateOfDeath, placeOfOrigin, bio, treeId,
      children: []
    };

    // 2. Xử lý mối quan hệ trước khi lưu
    if (relationType === 'spouse' && relatedId) {
      memberData.spouseId = relatedId;
    } else if (relationType === 'child' && relatedId) {
      // Tạm định mặc định người thêm là Bố (fatherId). 
      // Logic đúng: Cần check giới tính người relatedId để gán father/mother
      // Nhưng tạm thời gán vào fatherId để chạy được đã.
      memberData.fatherId = relatedId;
    }

    const newMember = new Member(memberData);
    const savedMember = await newMember.save();

    // 3. CẬP NHẬT NGƯỢC LẠI NGƯỜI LIÊN QUAN (Quan trọng)
    if (relationType === 'spouse' && relatedId) {
      // Cập nhật người kia: spouseId = người mới
      await Member.findByIdAndUpdate(relatedId, { spouseId: savedMember._id });
    }
    else if (relationType === 'child' && relatedId) {
      // Cập nhật bố/mẹ: thêm con vào mảng children
      await Member.findByIdAndUpdate(relatedId, {
        $push: { children: savedMember._id }
      });
    }

    res.status(201).json(savedMember);

  } catch (error) {
    res.status(500).json({ message: 'Lỗi thêm thành viên', error: error.message });
  }
};

// 2. Cập nhật thông tin thành viên
exports.updateMember = async (req, res) => {
  try {
    // Tìm và cập nhật theo ID (req.params.id)
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body, // Dữ liệu mới
      { new: true } // Trả về dữ liệu sau khi đã update
    );

    if (!updatedMember) return res.status(404).json({ message: 'Không tìm thấy thành viên' });

    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật', error: error.message });
  }
};

// 3. Lấy danh sách thành viên của 1 cây
exports.getMembersByTree = async (req, res) => {
  try {
    const { treeId } = req.params;
    const members = await Member.find({ treeId });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách', error: error.message });
  }
};

// 4. Lấy chi tiết 1 thành viên (để hiển thị vào form sửa)
exports.getMemberDetail = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};