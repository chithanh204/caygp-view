// models/Member.js
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Nam', 'Nữ', 'Khác'],
    default: 'Nam',
  },
  dateOfBirth: {
    type: Date,
  },
  dateOfDeath: {
    type: Date, // Nếu còn sống thì để null
    default: null,
  },
  placeOfOrigin: {
    type: String, // Nguyên quán
  },
  bio: {
    type: String, // Tiểu sử
  },
  avatarUrl: {
    type: String, // Đường dẫn ảnh đại diện
    default: '',
  },

  // --- QUAN TRỌNG: CÁC MỐI QUAN HỆ ---
  treeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyTree', // Thuộc về cây gia phả nào
    required: true,
  },
  fatherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member', // Trỏ đến ID của bố (cũng là 1 Member)
    default: null,
  },
  motherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member', // Trỏ đến ID của mẹ
    default: null,
  },
  spouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member', // Trỏ đến vợ/chồng hiện tại (đơn giản hóa)
    default: null,
  },
  // Mảng chứa ID các con (để tiện truy vấn vẽ cây)
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  }]

}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);