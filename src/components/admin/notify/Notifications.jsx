import React from "react";
import "./Notifications.css"; // Import CSS để áp dụng style

const notifications = {
    today: [
      {
        id: 1,
        user: "Jessie Samson",
        message: 'Mentioned you in a comment <strong>"Well done! Proud of you ❤️"</strong>',
        time: "10:41 AM August 7, 2021",
        profilePic: "https://via.placeholder.com/40",
      },
      {
        id: 2,
        user: "Jane Foster",
        message: 'Created an event <strong>Rome holidays</strong>',
        time: "10:20 AM August 7, 2021",
        profilePic: "https://via.placeholder.com/40",
      },
      {
        id: 3,
        user: "Jessie Samson",
        message: '👍 Liked your comment <strong>"Amazing Works"</strong>',
        time: "9:30 AM August 7, 2021",
        profilePic: "https://via.placeholder.com/40",
      },
    ],
    yesterday: [
      {
        id: 4,
        user: "Michael Lee",
        message: 'Shared a document <strong>"Project Plan Q3"</strong>',
        time: "3:00 PM August 6, 2021",
        profilePic: "https://via.placeholder.com/40",
      },
      {
        id: 5,
        user: "Anna Smith",
        message: 'Completed task <strong>"Update company website"</strong>',
        time: "1:15 PM August 6, 2021",
        profilePic: "https://via.placeholder.com/40",
      },
      {
        id: 6,
        user: "John Doe",
        message: 'Updated the project status to <strong>"In Progress"</strong>',
        time: "10:41 AM January 9, 2025",
        profilePic: "https://via.placeholder.com/40",
      },
    ],
};

const NotificationItem = ({ user, message, time, profilePic }) => (
  <div className="notification-item">
    <img src={profilePic} alt="Profile" className="profile-pic" />
    <div className="notification-content">
      <p>
        <strong>{user}</strong> <span dangerouslySetInnerHTML={{ __html: message }}></span>
      </p>
      <span className="notification-time">{time}</span>
    </div>
  </div>
);

const Notifications = () => (
  <div className="notifications-container">
    <h1 className="title">Notifications</h1>
    
    {/* Today Section */}
    <h2 className="today-title">Today</h2>
    <div>
      {notifications.today.map((notification) => (
        <NotificationItem key={notification.id} {...notification} />
      ))}
    </div>

    {/* Yesterday Section */}
    <h2 className="yesterday-title">Yesterday</h2>
    <div>
      {notifications.yesterday.map((notification) => (
        <NotificationItem key={notification.id} {...notification} />
      ))}
    </div>
  </div>
);

export default Notifications;
