import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';  // Import component EmployeeForm

const EmployeeManagement = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Dữ liệu nhân viên giả định
  const employeeData = {
    EmployeeID: 'E001',
    FirstName: 'Nguyễn',
    LastName: 'Văn A',
    DepartmentID: 'HR',
    Position: 'Manager',
    Email: 'nguyen@example.com',
    PhoneNumber: '0901234567',
    Address: '123 Đường ABC, TP.HCM',
  };

  const handleEditEmployee = () => {
    setSelectedEmployee(employeeData);  // Giả sử bạn chọn nhân viên để chỉnh sửa
  };

  const handleSubmit = (updatedData) => {
    console.log('Dữ liệu đã chỉnh sửa:', updatedData);
    // Gửi dữ liệu đã chỉnh sửa đi đâu đó (API, database, etc.)
  };

  const handleCancel = () => {
    setSelectedEmployee(null);  // Hủy việc chỉnh sửa
  };

  return (
    <div>
      <h1>Quản lý nhân viên</h1>
      <button onClick={handleEditEmployee}>Chỉnh sửa nhân viên</button>

      {selectedEmployee && (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
