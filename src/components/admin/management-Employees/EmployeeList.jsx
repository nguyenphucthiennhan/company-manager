import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm'; // Import form chỉnh sửa nhân viên

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Trạng thái lưu nhân viên đang được chỉnh sửa
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  // Lấy danh sách nhân viên từ API khi component load
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5238/api/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Có lỗi khi lấy danh sách nhân viên:', error);
        setError('Không thể tải danh sách nhân viên. Vui lòng thử lại.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Hàm chỉnh sửa nhân viên
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  // Hàm hủy chỉnh sửa
  const handleCancelEdit = () => {
    setSelectedEmployee(null);
  };

  // Hàm xóa nhân viên
  const handleDelete = (employeeID) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      axios
        .delete(`http://localhost:5238/api/employees/${employeeID}`)
        .then(() => {
          setEmployees(employees.filter((employee) => employee.employeeID !== employeeID));
        })
        .catch((error) => {
          console.error('Có lỗi khi xóa nhân viên:', error);
          alert('Không thể xóa nhân viên. Vui lòng thử lại.');
        });
    }
  };

  // Hàm gửi thông tin nhân viên lên API để thêm hoặc cập nhật
  const handleSubmit = (employee) => {
    if (employee.employeeID) {
      // Cập nhật nhân viên
      axios
        .put(`http://localhost:5238/api/employees/${employee.employeeID}`, employee)
        .then((response) => {
          setEmployees(
            employees.map((emp) =>
              emp.employeeID === employee.employeeID ? response.data : emp
            )
          );
          setSelectedEmployee(null);
        })
        .catch((error) => {
          console.error('Có lỗi khi cập nhật nhân viên:', error.response || error);
          // In ra chi tiết lỗi để debug
          if (error.response) {
            console.error('Response Error:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
          alert('Không thể cập nhật nhân viên. Vui lòng thử lại.');
        });
    } else {
      // Thêm mới nhân viên
      axios
        .post('http://localhost:5238/api/employees', employee)
        .then((response) => {
          setEmployees([...employees, response.data]);
          setSelectedEmployee(null);
        })
        .catch((error) => {
          console.error('Có lỗi khi thêm nhân viên:', error);
          alert('Không thể thêm nhân viên. Vui lòng thử lại.');
        });
    }
  };
  

  return (
    <div className="employee-list-container">
      {selectedEmployee ? (
        <div className="employee-form-container">
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <>
          <h3 className="title">Quản lý Nhân Viên</h3>
          {loading ? (
            <p>Đang tải danh sách nhân viên...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : employees.length === 0 ? (
            <p>Không có nhân viên nào trong danh sách.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Mã nhân viên</th>
                    <th>Họ</th>
                    <th>Tên</th>
                    <th>Phòng ban</th>
                    <th>Chức vụ</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employeeID}>
                      <td>{employee.employeeID}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.department?.departmentName || 'Không có'}</td>
                      <td>{employee.position}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>{employee.address}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm mr-2"
                          onClick={() => handleEdit(employee)}
                        >
                          Chỉnh sửa
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(employee.employeeID)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeList;
