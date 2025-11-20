import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EventPage.css';
import apiClient from '../../services/api';

function EventPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Danh sách tất cả sự kiện tải từ API
  const [dayEvents, setDayEvents] = useState([]); // Sự kiện của ngày đang chọn

  // Lấy ID cây hiện tại
  const currentTreeId = localStorage.getItem('currentTreeId');

  // 1. Tải sự kiện từ Server
  useEffect(() => {
    if (currentTreeId) {
      fetchEvents();
    }
  }, [currentTreeId]);

  const fetchEvents = async () => {
    try {
      const res = await apiClient.get(`/events/tree/${currentTreeId}`);
      setEvents(res.data);
    } catch (error) {
      console.error("Lỗi tải sự kiện:", error);
    }
  };

  // 2. Xử lý khi chọn ngày trên lịch
  const handleDayClick = (value) => {
    setDate(value);
    filterEventsByDay(value, events);
  };

  // Hàm lọc sự kiện theo ngày
  const filterEventsByDay = (selectedDate, allEvents) => {
    // Chuyển ngày chọn về chuỗi YYYY-MM-DD để so sánh
    const dateString = selectedDate.toLocaleDateString('en-CA'); // Format YYYY-MM-DD

    const filtered = allEvents.filter(ev => {
      // Chuyển ngày trong DB về chuỗi YYYY-MM-DD
      const evDate = new Date(ev.date).toLocaleDateString('en-CA');
      return evDate === dateString;
    });

    setDayEvents(filtered);
  };

  // Khi danh sách events thay đổi (lúc mới tải xong), tự động lọc cho ngày hôm nay
  useEffect(() => {
    if (events.length > 0) {
      filterEventsByDay(date, events);
    }
  }, [events]);

  // 3. Hàm thêm sự kiện (Dùng prompt đơn giản để test nhanh)
  const handleAddEvent = async () => {
    if (!currentTreeId) return alert("Chưa chọn cây gia phả!");

    const title = prompt("Nhập tên sự kiện (VD: Giỗ ông nội):");
    if (!title) return;

    try {
      await apiClient.post('/events', {
        title: title,
        date: date, // Lấy ngày đang chọn trên lịch
        description: 'Tạo nhanh từ lịch',
        treeId: currentTreeId
      });

      alert("Đã thêm sự kiện!");
      fetchEvents(); // Tải lại danh sách
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Lỗi thêm sự kiện");
    }
  };

  // 4. Hàm xóa sự kiện
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;
    try {
      await apiClient.delete(`/events/${id}`);
      fetchEvents(); // Tải lại
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Lỗi xóa");
    }
  }

  // Hàm render nội dung bên trong ô lịch (Tile Content)
  // Để hiển thị dấu chấm đỏ nếu ngày đó có sự kiện
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toLocaleDateString('en-CA');
      // Kiểm tra xem ngày này có sự kiện nào không
      const hasEvent = events.some(ev => new Date(ev.date).toLocaleDateString('en-CA') === dateString);

      if (hasEvent) {
        return <div style={{ height: '6px', width: '6px', background: 'red', borderRadius: '50%', margin: '0 auto' }}></div>;
      }
    }
  };

  return (
    <div className="event-page-container">
      {/* CỘT LỊCH */}
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={handleDayClick}
          tileContent={tileContent} // Hiển thị dấu chấm đỏ
          locale="vi-VN"
        />
      </div>

      {/* CỘT CHI TIẾT */}
      <div className="event-details-panel">
        <div className="event-list-box">
          <h3>Sự kiện ngày: {date.toLocaleDateString('vi-VN')}</h3>

          {dayEvents.length > 0 ? (
            dayEvents.map(event => (
              <div key={event._id} className="event-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{event.title}</span>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <p className="no-events">Không có sự kiện nào.</p>
          )}
        </div>

        <button className="add-event-btn" onClick={handleAddEvent}>
          + Thêm sự kiện cho ngày này
        </button>
      </div>
    </div>
  );
}

export default EventPage;