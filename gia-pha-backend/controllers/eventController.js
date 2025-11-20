const Event = require('../models/Event');

// 1. Tạo sự kiện mới
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, treeId, relatedMembers } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      treeId,
      relatedMembers // Mảng ID các thành viên liên quan (nếu có)
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo sự kiện', error: error.message });
  }
};

// 2. Lấy sự kiện theo Cây gia phả
exports.getEventsByTree = async (req, res) => {
  try {
    const { treeId } = req.params;
    // Lấy sự kiện và sắp xếp theo ngày (gần nhất lên đầu hoặc ngược lại)
    const events = await Event.find({ treeId }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy sự kiện', error: error.message });
  }
};

// 3. Xóa sự kiện
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Đã xóa sự kiện' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa sự kiện', error: error.message });
  }
};

// 4. (ADMIN) Lấy tất cả sự kiện trong hệ thống
exports.getAllEvents = async (req, res) => {
  try {
    // .populate('treeId', 'name') để lấy thêm tên Cây gia phả cho dễ biết
    const events = await Event.find({})
      .populate('treeId', 'name')
      .sort({ date: -1 }); // Mới nhất lên đầu
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách sự kiện', error: error.message });
  }
};