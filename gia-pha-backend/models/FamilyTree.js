// models/FamilyTree.js
const mongoose = require('mongoose');

const familyTreeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coverImage: {
    type: String,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('FamilyTree', familyTreeSchema);