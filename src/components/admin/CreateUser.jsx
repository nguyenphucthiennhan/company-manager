import React, { useState } from "react";
import Navbar from "./Navbar.jsx"; // Import Navbar
import Sidebar from "./SideBar.jsx"; // Import Sidebar
import "./CreateUser.css"; // Import file CSS của CreateUser

const CreateUser = () => {
  // State để lưu thông tin người dùng
  const [employeeID, setEmployeeID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [departmentID, setDepartmentID] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [typeID, setTypeID] = useState('');

  // Hàm xử lý khi form được submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      employeeID,
      firstName,
      lastName,
      departmentID,
      position,
      email,
      phoneNumber,
      typeID,
    };

    console.log('New User Data:', newUser);
    // Ở đây, bạn có thể gọi API để lưu dữ liệu vào cơ sở dữ liệu
    // Ví dụ: axios.post('/api/create-user', newUser);
  };

  return (
    <div className="create-user-page">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="create-user-container">
          <h2 className="create-user-title">Create New User</h2>
          <form onSubmit={handleSubmit} className="create-user-form">
            <div className="create-user-form-group">
              <input
                type="number"
                id="employeeID"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                required
                placeholder="Employee ID"
                className="create-user-input"
              />
            </div>
            <br />
            <div className="create-user-form-group">
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
                className="create-user-input"
              />
            </div>

            <div className="create-user-form-group">
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last Name"
                className="create-user-input"
              />
            </div>

            <div className="create-user-form-group">
              <input
                type="number"
                id="departmentID"
                value={departmentID}
                onChange={(e) => setDepartmentID(e.target.value)}
                required
                placeholder="Department ID"
                className="create-user-input"
              />
            </div>

            <div className="create-user-form-group">
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                placeholder="Position"
                className="create-user-input"
              />
            </div>

            <div className="create-user-form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="create-user-input"
              />
            </div>

            <div className="create-user-form-group">
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Phone Number"
                className="create-user-input"
              />
            </div>

            <div className="create-user-form-group">
              <input
                type="number"
                id="typeID"
                value={typeID}
                onChange={(e) => setTypeID(e.target.value)}
                required
                placeholder="User Type ID"
                className="create-user-input"
              />
            </div>

            <button type="submit" className="create-user-submit-btn">Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
