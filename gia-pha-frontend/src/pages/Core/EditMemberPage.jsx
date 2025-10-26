import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditMemberPage.css';

// ----- Dữ liệu giả lập -----
const mockDatabase = {
  p1: { hoTen: 'Adolf Hitler', gioiTinh: 'Nam', ngaySinh: '1889-04-20', ngayMat: '1945-04-30', nguyenQuan: 'Braunau am Inn, Áo-Hung', tieuSu: '...', avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Adolf_Hitler_portrait_in_civilian_clothes.jpg' },
  p2: { hoTen: 'Bill Gates', gioiTinh: 'Nam', ngaySinh: '1955-10-28', ngayMat: '', nguyenQuan: 'Seattle, Washington, Hoa Kỳ', tieuSu: 'Đồng sáng lập Microsoft.', avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg' },
  p3: { hoTen: 'Elon Musk', gioiTinh: 'Nam', ngaySinh: '1971-06-28', ngayMat: '', nguyenQuan: 'Pretoria, Nam Phi', tieuSu: 'CEO của SpaceX, Tesla, và X.', avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg' },
  p4: { hoTen: 'Warren Buffett', gioiTinh: 'Nam', ngaySinh: '1930-08-30', ngayMat: '', nguyenQuan: 'Omaha, Nebraska, Hoa Kỳ', tieuSu: 'Nhà đầu tư huyền thoại.', avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg' },
};

// Hàm giả lập fetch data
const fetchMemberData = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDatabase[id]);
    }, 500); // Giả lập 0.5s loading
  });
};
// ------------------------------


function EditMemberPage() {
  const { memberId } = useParams(); // Lấy ID từ URL (VD: "new" hoặc "p2")
  const navigate = useNavigate();

  const isEditMode = memberId !== 'new';

  // State cho tất cả các trường trong form
  const [hoTen, setHoTen] = useState('');
  const [gioiTinh, setGioiTinh] = useState('Nam');
  const [ngaySinh, setNgaySinh] = useState('');
  const [ngayMat, setNgayMat] = useState('');
  const [nguyenQuan, setNguyenQuan] = useState('');
  const [tieuSu, setTieuSu] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('https://via.placeholder.com/200'); // Ảnh mặc định
  const [avatarFile, setAvatarFile] = useState(null); // File ảnh thật để upload

  // Tải dữ liệu khi trang được mở
  useEffect(() => {
    if (isEditMode) {
      // Chế độ "Sửa" -> Tải dữ liệu
      const loadData = async () => {
        const data = await fetchMemberData(memberId);
        if (data) {
          setHoTen(data.hoTen);
          setGioiTinh(data.gioiTinh);
          setNgaySinh(data.ngaySinh || '');
          setNgayMat(data.ngayMat || '');
          setNguyenQuan(data.nguyenQuan);
          setTieuSu(data.tieuSu);
          setAvatarPreview(data.avatarUrl);
        } else {
          console.error("Không tìm thấy thành viên!");
          navigate('/create-tree'); // Không tìm thấy thì quay về trang cây
        }
      };
      loadData();
    } else {
      // Chế độ "Tạo mới" -> Xóa trống form
      setHoTen('');
      setGioiTinh('Nam');
      setNgaySinh('');
      setNgayMat('');
      setNguyenQuan('');
      setTieuSu('');
      setAvatarPreview('https://via.placeholder.com/200');
      setAvatarFile(null);
    }
  }, [memberId, isEditMode, navigate]);

  // Xử lý khi chọn ảnh
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); // Lưu file
      setAvatarPreview(URL.createObjectURL(file)); // Hiển thị preview
    }
  };

  // Xử lý khi bấm nút "Lưu"
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      hoTen, gioiTinh, ngaySinh, ngayMat, nguyenQuan, tieuSu, avatarFile
    };

    if (isEditMode) {
      console.log('Đang cập nhật thành viên:', memberId, formData);
      // TODO: Gọi API PUT/PATCH để cập nhật
    } else {
      console.log('Đang tạo thành viên mới:', formData);
      // TODO: Gọi API POST để tạo mới
    }

    // Sau khi lưu, quay về trang cây
    navigate('/create-tree');
  };

  return (
    <div className="edit-member-page">
      {/* CỘT TRÁI: AVATAR */}
      <div className="edit-member-avatar">
        <img src={avatarPreview} alt="Avatar preview" className="avatar-preview" />
        <label htmlFor="avatar-upload" className="avatar-change-btn">
          Thay ảnh
        </label>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>

      {/* CỘT PHẢI: FORM */}
      <div className="edit-member-form">
        <h1>{isEditMode ? 'Chỉnh sửa thông tin' : 'Tạo thành viên mới'}</h1>

        <form onSubmit={handleSubmit}>
          {/* Hàng 1: Họ tên + Giới tính */}
          <div className="form-row">
            <div className="form-group" style={{ flexBasis: '70%' }}>
              <label htmlFor="hoTen">Họ & Tên</label>
              <input type="text" id="hoTen" value={hoTen} onChange={(e) => setHoTen(e.target.value)} required />
            </div>
            <div className="form-group" style={{ flexBasis: '30%' }}>
              <label htmlFor="gioiTinh">Giới Tính</label>
              <select id="gioiTinh" value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {/* Hàng 2: Ngày sinh + Ngày mất */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ngaySinh">Ngày Sinh</label>
              <input type="date" id="ngaySinh" value={ngaySinh} onChange={(e) => setNgaySinh(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="ngayMat">Ngày mất / Ngày giỗ</label>
              <input type="date" id="ngayMat" value={ngayMat} onChange={(e) => setNgayMat(e.target.value)} />
            </div>
          </div>

          {/* Hàng 3: Nguyên quán */}
          <div className="form-group full-width">
            <label htmlFor="nguyenQuan">Nguyên Quán</label>
            <input type="text" id="nguyenQuan" value={nguyenQuan} onChange={(e) => setNguyenQuan(e.target.value)} />
          </div>

          {/* Hàng 4: Tiểu sử */}
          <div className="form-group full-width">
            <label htmlFor="tieuSu">Tiểu Sử</label>
            <textarea id="tieuSu" value={tieuSu} onChange={(e) => setTieuSu(e.target.value)} />
          </div>

          {/* Hàng 5: Nút bấm */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/create-tree')}>
              Hủy
            </button>
            <button type="submit" className="btn-save">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMemberPage;