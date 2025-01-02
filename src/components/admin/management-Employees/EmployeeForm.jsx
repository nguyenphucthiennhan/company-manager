import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    EmployeeID: '',
    FirstName: '',
    LastName: '',
    DepartmentID: '',
    Position: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
  });

  // Đảm bảo rằng EmployeeForm nhận và cập nhật formData đúng
  useEffect(() => {
    if (employee) {
      setFormData({
        EmployeeID: employee.EmployeeID,
        FirstName: employee.FirstName,
        LastName: employee.LastName,
        DepartmentID: employee.DepartmentID,
        Position: employee.Position,
        Email: employee.Email,
        PhoneNumber: employee.PhoneNumber,
        Address: employee.Address,
      });
    }
  }, [employee]);  // Cập nhật form khi employee thay đổi

  // Hàm xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra nếu dữ liệu hợp lệ trước khi gọi onSubmit
    if (formData.FirstName && formData.LastName && formData.Email) {
      onSubmit(formData);  // Gửi dữ liệu lên để cập nhật
      alert('Dữ liệu đã được lưu thành công!');
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form-container">
      <h2 className="employee-form__title">Chỉnh sửa nhân viên</h2>

      <div className="employee-form__field">
        <label className="employee-form__label">Mã nhân viên</label>
        <input
          type="text"
          name="EmployeeID"
          value={formData.EmployeeID}
          onChange={handleChange}
          className="employee-form__input"
          disabled
        />
      </div>
      <div className="employee-form__field">
        <label className="employee-form__label">Họ</label>
        <input
          type="text"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
          className="employee-form__input"
        />
      </div>
      <div className="employee-form__field">
        <label className="employee-form__label">Tên</label>
        <input
          type="text"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
          className="employee-form__input"
        />
      </div>
      <div className="employee-form__field">
        <label className="employee-form__label">Phòng ban</label>
        <input
          type="text"
          name="DepartmentID"
          value={formData.DepartmentID}
          onChange={handleChange}
          className="employee-form__input"
        />
      </div>
      <div className="employee-form__field">
        <label className="employee-form__label">Chức vụ</label>
        <input
          type="text"
          name="Position"
          value={formData.Position}
          onChange={handleChange}
          className="employee-form__input"
        />
      </div>
      <div className="employee-form__field">
        <label className="employee-form__label">Email</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className="employee-form__input"
        />
      </div>
      <div className="employee-form__field">
        <label className="employee-form__label">Số điện thoại</label>
        <input
          type="text"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          className="employee-form__input"
        />
      </div>
      <div className="employee-form__field">
        <label className="employee-form__label">Địa chỉ</label>
        <input
          type="text"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          className="employee-form__input"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit" className="employee-form__button employee-form__button--submit">
          Lưu
        </button>
        <button type="button" onClick={onCancel} className="employee-form__button employee-form__button--cancel">
          Hủy
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
