import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import './EditMemberPage.css';
import apiClient from '../../services/api'; // Import API

function EditMemberPage() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lấy treeId từ URL (ví dụ: /edit-member/new?treeId=12345...)
  const treeId = searchParams.get('treeId');
  const isEditMode = memberId !== 'new';
  const relationType = searchParams.get('type'); // 'spouse' hoặc 'child'
  const relatedId = searchParams.get('relatedId');

  // State Form
  const [hoTen, setHoTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState('Nam');
  const [ngaySinh, setNgaySinh] = useState('');
  const [ngayMat, setNgayMat] = useState('');
  const [nguyenQuan, setNguyenQuan] = useState('');
  const [tieuSu, setTieuSu] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('https://via.placeholder.com/200');

  // Tải dữ liệu (nếu là chế độ Sửa)
  useEffect(() => {
    if (isEditMode) {
      const fetchMember = async () => {
        try {
          const res = await apiClient.get(`/members/${memberId}`);
          const data = res.data;

          setHoTen(data.fullName);
          setGioiTinh(data.gender);
          // Cần format ngày tháng cho input date (YYYY-MM-DD)
          setNgaySinh(data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '');
          setNgayMat(data.dateOfDeath ? data.dateOfDeath.split('T')[0] : '');
          setNguyenQuan(data.placeOfOrigin);
          setTieuSu(data.bio);
          if (data.avatarUrl) {
            setAvatarPreview(data.avatarUrl);
          }
        } catch (error) {
          console.error("Lỗi tải dữ liệu:", error);
          alert("Không tìm thấy thành viên");
        }
      };
      fetchMember();
    }
  }, [memberId, isEditMode]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo một đường dẫn giả (URL tạm thời) để hiển thị ảnh ngay lập tức
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl); // <--- Dùng hàm setAvatarPreview ở đây là hết lỗi!

      // TODO: Sau này bạn sẽ cần lưu file này vào một state khác để gửi lên server
      // setAvatarFile(file); 
    }
  };
  // Xử lý Lưu
  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberData = {
      fullName: hoTen,
      gender: gioiTinh,
      dateOfBirth: ngaySinh,
      dateOfDeath: ngayMat || null, // Nếu rỗng thì gửi null
      placeOfOrigin: nguyenQuan,
      bio: tieuSu,
      treeId: treeId, // Gắn người này vào cây nào
      relationType: isEditMode ? undefined : relationType,
      relatedId: isEditMode ? undefined : relatedId
    };

    try {
      if (isEditMode) {
        // --- GỌI API SỬA ---
        await apiClient.put(`/members/${memberId}`, memberData);
        alert("Cập nhật thành công!");
      } else {
        // --- GỌI API THÊM MỚI ---
        if (!treeId) {
          alert("Lỗi: Không xác định được Cây gia phả!");
          return;
        }
        await apiClient.post('/members', memberData);
        alert("Thêm thành công!");
      }

      // Lưu xong thì quay về trang xem cây
      // (Lúc này ta chưa có trang ViewTree hoàn chỉnh, nhưng cứ điều hướng về đó hoặc trang CreateTree)
      navigate('/create-tree');

    } catch (error) {
      console.error("Lỗi lưu dữ liệu:", error);
      alert("Có lỗi xảy ra khi lưu.");
    }
  };

  return (
    <div className="edit-member-page">
      {/* CỘT TRÁI: AVATAR */}
      <div className="edit-member-avatar">
        <img src={avatarPreview} alt="Avatar preview" className="avatar-preview" />

        <label htmlFor="avatar-upload" className="avatar-change-btn">Thay ảnh</label>

        {/* Thêm sự kiện onChange và id khớp với htmlFor của label */}
        <input
          type="file"
          id="avatar-upload"
          style={{ display: 'none' }} // Ẩn input 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* CỘT PHẢI: FORM */}
      <div className="edit-member-form">
        <h1>{isEditMode ? 'Chỉnh sửa thông tin' : 'Tạo thành viên mới'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group" style={{ flexBasis: '70%' }}>
              <label>Họ & Tên</label>
              <input type="text" value={hoTen} onChange={(e) => setHoTen(e.target.value)} required />
            </div>
            <div className="form-group" style={{ flexBasis: '30%' }}>
              <label>Giới Tính</label>
              <select value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày Sinh</label>
              <input type="date" value={ngaySinh} onChange={(e) => setNgaySinh(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Ngày mất / Ngày giỗ</label>
              <input type="date" value={ngayMat} onChange={(e) => setNgayMat(e.target.value)} />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Nguyên Quán</label>
            <input type="text" value={nguyenQuan} onChange={(e) => setNguyenQuan(e.target.value)} />
          </div>

          <div className="form-group full-width">
            <label>Tiểu Sử</label>
            <textarea value={tieuSu} onChange={(e) => setTieuSu(e.target.value)} />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/create-tree')}>Hủy</button>
            <button type="submit" className="btn-save">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMemberPage;