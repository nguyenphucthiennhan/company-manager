import React, { useState, useEffect } from 'react';
import API_PATH from '../../common/API_PATH';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeID: '',
    firstName: '',
    lastName: '',
    departmentID: '',
    position: '',
    email: '',
    phoneNumber: '',
    address: '',
    dayOfBirth: '',
    gender: '',
    typeID: '',
    joiningDate: '',
    nationality: '',
  });

  const [departments, setDepartments] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]); // State for employee types
  const [loading, setLoading] = useState(true);

  // Lấy danh sách phòng ban từ API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_PATH()}DepartmentList`);
        const data = await response.json();
        if (data && Array.isArray(data.$values)) {
          setDepartments(data.$values); // Cập nhật state với danh sách phòng ban
        } else {
          console.error('Dữ liệu phòng ban không hợp lệ:', data);
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
          setEmployeeTypes(data.$values); // Cập nhật state với danh sách loại nhân viên
        } else {
          console.error('Dữ liệu loại nhân viên không hợp lệ:', data);
        }
      } catch (error) {
        console.error('Error fetching employee types:', error);
      }
    };

    fetchDepartments();
    fetchEmployeeTypes();
    setLoading(false); // Thay đổi trạng thái loading sau khi dữ liệu đã được tải xong
  }, []);

  // Khi có dữ liệu employee, cập nhật form
  useEffect(() => {
    if (employee) {
      setFormData({
        employeeID: employee.employeeID || '',
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        departmentID: employee.department?.departmentID || '',
        position: employee.position || '',
        email: employee.email || '',
        phoneNumber: employee.phoneNumber || '',
        address: employee.address || '',
        dayOfBirth: employee.dayOfBirth || '',
        gender: employee.gender || '',
        typeID: employee.typeID || '',
        joiningDate: employee.joiningDate || '',
        nationality: employee.nationality || '',
      });
    }
  }, [employee]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      departmentID: formData.departmentID,
      typeID: formData.typeID,
    };
    onSubmit(updatedData);
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit} className="employee-form">
        <h2 className="text-center mb-4">{employee ? 'Sửa thông tin nhân viên' : 'Thêm mới nhân viên'}</h2>

        {loading ? (
          <div className="loading-message text-center">Đang tải dữ liệu...</div>
        ) : (
          <>
            <div className="form-group">
              <label>Mã nhân viên:</label>
              <input
                type="text"
                name="employeeID"
                value={formData.employeeID}
                onChange={handleChange}
                className="form-control"
                readOnly={!!employee}
              />
            </div>

            <div className="form-group">
              <label>Họ:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Tên:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control"
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
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <option key={dept.departmentId} value={dept.departmentId}>
                      {dept.departmentName}
                    </option>
                  ))
                ) : (
                  <option value="">Không có phòng ban</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label>Chức vụ:</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="form-control"
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
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
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
                required
              />
            </div>

            <div className="form-group">
              <label>Ngày sinh:</label>
              <input
                type="date"
                name="dayOfBirth"
                value={formData.dayOfBirth}
                onChange={handleChange}
                className="form-control"
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
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
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
                    <option key={type.typeID} value={type.typeID}>
                      {type.typeName}
                    </option>
                  ))
                ) : (
                  <option value="">Không có loại nhân viên</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label>Ngày vào làm:</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Quốc tịch:</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-actions text-center">
              <button type="submit" className="btn btn-primary mr-2">
                {employee ? 'Cập nhật' : 'Thêm mới'}
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

export default EmployeeForm;
