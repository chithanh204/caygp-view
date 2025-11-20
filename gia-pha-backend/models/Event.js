// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Ví dụ: "Giỗ tổ", "Họp mặt"
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  treeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyTree', // Sự kiện này của dòng họ nào
    required: true,
  },
  // Sự kiện này liên quan đến ai? (Ví dụ: Ngày giỗ cụ A)
  relatedMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);