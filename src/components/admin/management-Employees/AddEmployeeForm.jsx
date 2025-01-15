import React, { useState, useEffect } from 'react';
import API_PATH from '../../common/API_PATH';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployeeForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeName: '', // Thêm trường Tên nhân viên
    email: '', // Thêm trường Email
    phone: '', // Thêm trường Số điện thoại
    departmentID: '',
    typeID: '',
    gender: '', // Thêm trường Giới tính
    dateOfBirth: '', // Thêm trường Ngày sinh
    address: '', // Thêm trường Địa chỉ
  });

  const [departments, setDepartments] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments and employee types
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_PATH()}DepartmentList`);
        const data = await response.json();
        if (data && Array.isArray(data.$values)) {
          setDepartments(data.$values);
        } else {
          console.error('Invalid department data:', data);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    const fetchEmployeeTypes = async () => {
      try {
        const response = await fetch(`${API_PATH()}EmployeeTypesList`);
        const data = await response.json();
        if (data && Array.isArray(data.$values)) {
          setEmployeeTypes(data.$values);
        } else {
          console.error('Invalid employee type data:', data);
        }
      } catch (error) {
        console.error('Error fetching employee types:', error);
      }
    };

    fetchDepartments();
    fetchEmployeeTypes();
    setLoading(false); // Set loading to false after data is fetched
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      departmentID: formData.departmentID,
      typeID: formData.typeID,
    };

    // Gọi hàm onSubmit từ props để thêm nhân viên
    onSubmit(updatedData);
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit} className="employee-form">
        <h2 className="text-center mb-4">Thêm mới nhân viên</h2>

        {loading ? (
          <div className="loading-message text-center">Đang tải dữ liệu...</div>
        ) : (
          <>
            <div className="form-group">
              <label>Tên nhân viên:</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="form-control"
                placeholder="Nhập tên nhân viên"
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Nhập email"
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="form-group">
              <label>Giới tính:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ngày sinh:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Nhập địa chỉ"
                required
              />
            </div>

            <div className="form-group">
              <label>Phòng ban:</label>
              <select
                name="departmentID"
                value={formData.departmentID}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Chọn phòng ban</option>
                {departments.map((dept) => (
                  <option key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Loại nhân viên:</label>
              <select
                name="typeID"
                value={formData.typeID}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Chọn loại nhân viên</option>
                {employeeTypes.length > 0 ? (
                  employeeTypes.map((type) => (
                    <option key={type.typeId} value={type.typeId}>
                      {type.typeName}
                    </option>
                  ))
                ) : (
                  <option value="">Không có loại nhân viên</option>
                )}
              </select>
            </div>

            <div className="form-actions text-center">
              <button type="submit" className="btn btn-primary mr-2">
                Thêm mới
              </button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Hủy
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddEmployeeForm;
