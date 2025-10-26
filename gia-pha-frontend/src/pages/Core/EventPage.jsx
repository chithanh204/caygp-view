import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EventPage.css';

// ----- Dữ liệu giả lập -----
// Dùng YYYY-MM-DD làm key để dễ tra cứu
const mockEvents = {
  '2025-10-17': [
    { id: 1, title: 'Ngày giỗ Albert Einstein' },
  ],
  '2025-10-09': [
    { id: 2, title: 'Sự kiện test 1' },
    { id: 3, title: 'Sự kiện test 2' },
  ],
  '2025-10-24': [
    { id: 4, title: 'Sự kiện test 3' },
  ],
};
// ------------------------------

// Hàm helper để format Date object -> 'YYYY-MM-DD'
// (Dùng 'en-CA' cho ra định dạng chuẩn này)
const formatDateKey = (date) => {
  return date.toLocaleDateString('en-CA');
};

function EventPage() {
  // State để lưu ngày đang được chọn, mặc định là hôm nay
  const [date, setDate] = useState(new Date());

  // State để lưu các sự kiện của ngày được chọn
  const [dayEvents, setDayEvents] = useState(null);

  // Hàm được gọi khi người dùng click vào 1 ngày trên lịch
  const handleDayClick = (value) => {
    // value là 1 Date object
    setDate(value); // Cập nhật ngày được chọn

    // Format ngày thành key 'YYYY-MM-DD'
    const dateKey = formatDateKey(value);

    // Tìm sự kiện trong mock data
    const events = mockEvents[dateKey];

    if (events) {
      setDayEvents(events);
    } else {
      setDayEvents(null); // Không có sự kiện
    }
  };

  // Hàm xử lý khi nhấn nút "Thêm sự kiện"
  const handleAddEvent = () => {
    const selectedDay = date.toLocaleDateString('vi-VN');
    alert(`Mở form thêm sự kiện cho ngày ${selectedDay}`);
    // TODO: Mở Modal/Form để thêm sự kiện mới
  };

  return (
    <div className="event-page-container">

      {/* CỘT LỊCH */}
      <div className="calendar-container">
        <Calendar
          onChange={setDate} // Dùng khi chọn ngày ở tháng khác
          value={date} // Ngày đang được highlight
          onClickDay={handleDayClick} // Hàm chính khi click 1 ngày
          locale="vi-VN" // Tùy chọn: hiển thị tiếng Việt
        />
      </div>

      {/* CỘT CHI TIẾT SỰ KIỆN */}
      <div className="event-details-panel">
        <div className="event-list-box">
          <h3>
            Sự kiện ngày: {date.toLocaleDateString('vi-VN')}
          </h3>

          {/* Hiển thị danh sách sự kiện nếu có */}
          {dayEvents ? (
            dayEvents.map(event => (
              <div key={event.id} className="event-item">
                {event.title}
              </div>
            ))
          ) : (
            // Thông báo nếu không có sự kiện
            <p className="no-events">Không có sự kiện nào trong ngày này.</p>
          )}
        </div>

        <button className="add-event-btn" onClick={handleAddEvent}>
          Thêm sự kiện
        </button>
      </div>

    </div>
  );
}

export default EventPage;