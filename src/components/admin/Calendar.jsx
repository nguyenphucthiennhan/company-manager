import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";  // Plugin TimeGrid để hiển thị giờ trong tuần
import interactionPlugin from "@fullcalendar/interaction";  // Để xử lý các sự kiện như click vào ngày
import scrollGridPlugin from "@fullcalendar/scrollgrid"; // Thêm plugin cuộn nếu cần

const Calendar = () => {
  const initialEvents = [
    {
      title: "Boot Camp",
      start: "2024-12-01",
      color: "green",
      description: "Intensive training session",
    },
    {
      title: "Meeting",
      start: "2024-12-07T10:00:00",
      end: "2024-12-07T12:00:00",
      color: "#3b82f6",
      description: "Discuss upcoming projects",
    },
  ];

  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    label: "Business",
    startAt: "",
    endAt: "",
    allDay: false,
    description: "",
    repetition: "No Repeat",
    reminder: "30 minutes earlier",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (info) => {
    const event = events.find((e) => e.start === info.dateStr);
    if (event) {
      setSelectedEvent(event);
      setShowForm(false);
    } else {
      setSelectedDate(info.dateStr);
      setShowForm(true);
      setSelectedEvent(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      title: "",
      label: "Business",
      startAt: "",
      endAt: "",
      allDay: false,
      description: "",
      repetition: "No Repeat",
      reminder: "30 minutes earlier",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: formData.title,
      start: formData.startAt || selectedDate,
      end: formData.endAt,
      color: "#3b82f6",
      description: formData.description,
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
    alert("Event saved successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event !== selectedEvent));
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-wrapper">
      <div className="header">
        <h2 className="title-calendar">Chấm công</h2> 
        <div className="date-display">
          <span>
            <strong className="title-date">Friday | 20 Dec, 2024</strong>
          </span>
          <button className="sync-button">
            🔄 Sync Now
          </button>
          <button className="add-task-button add-btn" onClick={() => setShowForm(true)}>
            + Add new task
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, scrollGridPlugin]}
        initialView="timeGridWeek"  // Dùng timeGridWeek để hiển thị giờ trong tuần
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek", // Hiển thị cả chế độ "Month" và "Week"
        }}
        contentHeight="auto"
        aspectRatio={2}
      />

      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-container animate-modal">
            <div className="modal-header">
              <h3 className="tilte-form">Tiêu đề: {selectedEvent.title}</h3>
              <button className="close-button" onClick={closeEventModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Description:</strong> {selectedEvent.description || "No description provided."}
              </p>
              <p>
                <strong>Date and Time:</strong>{" "}
                {new Date(selectedEvent.start).toLocaleString()}
              </p>
            </div>
            <div className="modal-actions">
              <button className="action-button edit-button">✏️ Edit</button>
              <button
                className="action-button delete-button"
                onClick={handleDeleteEvent}
              >
                🗑️ Delete
              </button>
              <button className="action-button details-button">
                See more details
              </button>
            </div>
          </div>
        </div>
      )}

{showForm && (
  <div className="form-overlay">
    <div className="form-container">
      <h2 className="add-cc">Đơn phiếu chấm công</h2>
      <form onSubmit={handleSubmit}>
        {/* Entry ID */}
        <label>
          Entry ID:
          <input
            type="number"
            name="entryID"
            value={formData.entryID}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Employee ID */}
        <label>
          Employee ID:
          <input
            type="number"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleInputChange}
          />
        </label>

        {/* Date */}
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>

        {/* Hours Worked */}
        <label>
          Hours Worked:
          <input
            type="number"
            step="0.01"
            name="hoursWorked"
            value={formData.hoursWorked}
            onChange={handleInputChange}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCloseForm}>
            Discard
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Calendar;
