import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeID: '',
    firstName: '',
    lastName: '',
    departmentID: '', // Chỉnh sửa thành departmentID
    position: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5238/api/departments');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (employee) {
      setFormData({
        employeeID: employee.employeeID || '',
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        departmentID: employee.department?.departmentID || '', // Đảm bảo sử dụng departmentID
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
    const updatedData = {
      ...formData,
      departmentID: formData.departmentID, // Sửa lại thành departmentID
    };
    onSubmit(updatedData);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2 className="form-title">{employee ? 'Sửa thông tin nhân viên' : 'Thêm mới nhân viên'}</h2>
      
      {loading ? (
        <div>Đang tải danh sách phòng ban...</div>
      ) : (
        <>
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
            <select
              name="departmentID"
              value={formData.departmentID}
              onChange={handleChange}
              className="employee-input"
              required
            >
              <option value="">Chọn phòng ban</option>
              {departments.map((dept) => (
                <option key={dept.departmentID} value={dept.departmentID}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
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
        </>
      )}
    </form>
  );
};

export default EmployeeForm;
