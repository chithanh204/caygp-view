// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // Lưu ý: Sau này chúng ta sẽ mã hóa mật khẩu này trước khi lưu
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // Chỉ chấp nhận 2 giá trị này
    default: 'user',
  },
}, { timestamps: true }); // Tự động tạo trường createdAt và updatedAt

module.exports = mongoose.model('User', userSchema);