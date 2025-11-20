// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Lấy chuỗi kết nối từ file .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ Đã kết nối MongoDB thành công: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
    process.exit(1); // Dừng chương trình nếu lỗi
  }
};

module.exports = connectDB;