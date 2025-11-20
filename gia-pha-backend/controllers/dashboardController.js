const User = require('../models/User');
const FamilyTree = require('../models/FamilyTree');
const Event = require('../models/Event');
const Member = require('../models/Member');

exports.getDashboardStats = async (req, res) => {
  try {
    // Đếm song song cho nhanh
    const [userCount, treeCount, memberCount, eventCount] = await Promise.all([
      User.countDocuments(),
      FamilyTree.countDocuments(),
      Member.countDocuments(),
      Event.countDocuments()
    ]);

    res.json({
      users: userCount,
      trees: treeCount,
      members: memberCount,
      events: eventCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi thống kê', error: error.message });
  }
};