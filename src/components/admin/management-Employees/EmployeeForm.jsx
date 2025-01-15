import React, { useState, useEffect } from 'react';
import API_PATH from '../../common/API_PATH';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments and employee types
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        axios
      .post(API_PATH()+"DepartmentList") 
      .then((response) => {
        setDepartments(response.data.$values);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy danh sách dự án:", error);
      })
      .finally(() => {
        setLoading(false); // Tắt trạng thái loading
      });
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(`${API_PATH()}EmployeeTypeList`);
        console.log(response.data);
        
        if (response.data && Array.isArray(response.data.$values)) {
          setEmployeeTypes(response.data.$values);
        } else {
          console.error('Invalid employee type data:',response.data.$values);
        }
      } catch (error) {
        console.error('Error fetching employee types:', error);
      }
    };

    fetchDepartments();
    fetchEmployeeTypes();
    setLoading(false); // Set loading to false after data is fetched
  }, []);

  // Update formData when employee prop changes
  useEffect(() => {
    if (employee) {
      setFormData({
        employeeID: employee.employeeID || '',
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        departmentID: employee.department?.departmentId || '',
        position: employee.position || '',
        email: employee.email || '',
        phoneNumber: employee.phoneNumber || '',
        address: employee.address || '',
        dayOfBirth: employee.dayOfBirth || '',
        gender: employee.gender || '',
        typeID: employee.typeID || '', // Đặt đúng giá trị loại nhân viên
        joiningDate: employee.joiningDate || '',
        nationality: employee.nationality || '',
      });
    }
  }, [employee]);

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
                {departments.map((dept) => (
                  <option key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentName}
                  </option>
                ))}
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
    value={formData.typeID} // Hiển thị giá trị typeID từ formData
    onChange={handleChange}
    className="form-control"
    required
  >
    <option value="">Chọn loại nhân viên</option>
    {employeeTypes.map((type) => (
      <option key={type.typeId} value={type.typeId}>
        {type.typeName}
      </option>
    ))}
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
