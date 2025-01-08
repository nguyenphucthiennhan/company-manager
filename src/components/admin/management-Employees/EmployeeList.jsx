import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm'; // Import form chỉnh sửa nhân viên

const EmployeeList = ({ employees, onDelete, onEdit }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);  // Trạng thái lưu nhân viên đang được chỉnh sửa

  // Hàm xử lý khi nhấn "Chỉnh sửa"
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);  // Cập nhật nhân viên đang chỉnh sửa
  };

  // Hàm xử lý khi hủy chỉnh sửa
  const handleCancelEdit = () => {
    setSelectedEmployee(null);  // Đặt lại trạng thái để ẩn form chỉnh sửa
  };

  return (
    <div className="employee-list-container">
      {/* Hiển thị form chỉnh sửa nếu có nhân viên được chọn */}
      {selectedEmployee ? (
        <div className="employee-form-container">
          <EmployeeForm 
            employee={selectedEmployee} 
            onSubmit={onEdit} 
            onCancel={handleCancelEdit} 
          />
        </div>
      ) : (
        <>
          <h3 className="title">Quản lý Nhân Viên</h3>

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
                  <tr key={employee.EmployeeID}>
                    <td>{employee.EmployeeID}</td>
                    <td>{employee.FirstName}</td>
                    <td>{employee.LastName}</td>
                    <td>{employee.DepartmentID}</td>
                    <td>{employee.Position}</td>
                    <td>{employee.Email}</td>
                    <td>{employee.PhoneNumber}</td>
                    <td>{employee.Address}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        onClick={() => handleEdit(employee)}  // Gọi hàm chỉnh sửa
                      >
                        Chỉnh sửa
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(employee.EmployeeID)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
