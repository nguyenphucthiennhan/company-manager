import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeID: '',
    firstName: '',
    lastName: '',
    department: '',
    position: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        employeeID: employee.employeeID || '',
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        department: employee.department?.departmentName || '',
        position: employee.position || '',
        email: employee.email || '',
        phoneNumber: employee.phoneNumber || '',
        address: employee.address || '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2 className="form-title">Sửa thông tin nhân viên</h2>
      <div>
        <label>Mã nhân viên:</label>
        <input
          type="text"
          name="employeeID"
          value={formData.employeeID}
          onChange={handleChange}
          className="employee-input"
          readOnly={!!employee}
        />
      </div>
      <div>
        <label>Họ:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="employee-input"
          required
        />
      </div>
      <div>
        <label>Tên:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="employee-input"
          required
        />
      </div>
      <div>
        <label>Phòng ban:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="employee-input"
          required
        />
      </div>
      <div>
        <label>Chức vụ:</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="employee-input"
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="employee-input"
          required
        />
      </div>
      <div>
        <label>Số điện thoại:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="employee-input"
          required
        />
      </div>
      <div>
        <label>Địa chỉ:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="employee-input"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {employee ? 'Cập nhật' : 'Thêm mới'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
