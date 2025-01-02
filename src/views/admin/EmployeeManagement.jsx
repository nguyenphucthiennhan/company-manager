import React, { useState, useCallback } from 'react';
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import { employees as initialEmployees } from '../../components/admin/management-Employees/data'; // Dữ liệu giả từ data
import EmployeeList from '../../components/admin/management-Employees/EmployeeList';
import EmployeeForm from '../../components/admin/management-Employees/EmployeeForm'; // Form để thêm và chỉnh sửa nhân viên

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);  // Khởi tạo dữ liệu giả
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Hàm thêm nhân viên mới
  const handleAddEmployee = useCallback((employee) => {
    const newEmployeeID = Math.max(...employees.map(emp => emp.EmployeeID), 0) + 1; // Lấy ID tối đa và cộng thêm 1
    setEmployees(prevEmployees => [
      ...prevEmployees,
      { ...employee, EmployeeID: newEmployeeID }
    ]);
  }, [employees]);

  // Hàm chỉnh sửa thông tin nhân viên
  const handleEditEmployee = useCallback((employee) => {
    setEditingEmployee(employee);  // Truyền đối tượng nhân viên vào state
  }, []);

  // Hàm xóa nhân viên
  const handleDeleteEmployee = useCallback((employeeID) => {
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.EmployeeID !== employeeID));
  }, []);

  // Hàm xử lý submit form thêm hoặc chỉnh sửa nhân viên
  const handleSubmit = useCallback((employee) => {
    if (editingEmployee) {
      // Chỉnh sửa nhân viên
      setEmployees(prevEmployees =>
        prevEmployees.map(emp => (emp.EmployeeID === employee.EmployeeID ? employee : emp))
      );
    } else {
      // Thêm nhân viên mới
      handleAddEmployee(employee);
    }
    setEditingEmployee(null);  // Reset form sau khi submit
  }, [editingEmployee, handleAddEmployee]);

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div style={{ flexGrow: 1, padding: "20px", marginLeft: "220px", marginTop: "20px" }}>
          <h3>Quản lý nhân viên</h3>

          {/* Form để thêm hoặc chỉnh sửa nhân viên */}
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={handleSubmit}
          />

          {/* Container chứa EmployeeList */}
          <div style={{ marginTop: "20px", marginLeft: "10px" }}>
            <EmployeeList
              employees={employees}
              onDelete={handleDeleteEmployee}
              onEdit={handleEditEmployee}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
