import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import axios from 'axios';  // Đảm bảo đã cài axios
import EmployeeList from '../../components/admin/management-Employees/EmployeeList';
import EmployeeForm from '../../components/admin/management-Employees/EmployeeForm'; // Form để thêm và chỉnh sửa nhân viên

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);  // Lưu dữ liệu nhân viên từ API
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Lấy danh sách nhân viên từ API
  useEffect(() => {
    axios.get('http://localhost:5238/api/employees')  // URL của API
      .then(response => {
        setEmployees(response.data);  // Lưu dữ liệu nhân viên vào state
      })
      .catch(error => {
        console.error('Có lỗi khi lấy danh sách nhân viên:', error);
      });
  }, []);

  // Hàm thêm nhân viên mới
  const handleAddEmployee = useCallback((employee) => {
    axios.post('http://localhost:5238/api/employees', employee)
      .then(response => {
        setEmployees(prevEmployees => [...prevEmployees, response.data]);
      })
      .catch(error => {
        console.error('Có lỗi khi thêm nhân viên:', error);
      });
  }, []);

  // Hàm chỉnh sửa thông tin nhân viên
  const handleEditEmployee = useCallback((employee) => {
    setEditingEmployee(employee);  // Truyền đối tượng nhân viên vào state
  }, []);

  // Hàm xóa nhân viên
  const handleDeleteEmployee = useCallback((employeeID) => {
    axios.delete(`http://localhost:5238/api/employees/${employeeID}`)
      .then(() => {
        setEmployees(prevEmployees => prevEmployees.filter(emp => emp.EmployeeID !== employeeID));
      })
      .catch(error => {
        console.error('Có lỗi khi xóa nhân viên:', error);
      });
  }, []);

  // Hàm xử lý submit form thêm hoặc chỉnh sửa nhân viên
  const handleSubmit = useCallback((employee) => {
    if (editingEmployee) {
      // Chỉnh sửa nhân viên
      axios.put(`http://localhost:5238/api/employees/${employee.EmployeeID}`, employee)
        .then(() => {
          setEmployees(prevEmployees =>
            prevEmployees.map(emp => (emp.EmployeeID === employee.EmployeeID ? employee : emp))
          );
        })
        .catch(error => {
          console.error('Có lỗi khi chỉnh sửa nhân viên:', error);
        });
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
  employee={editingEmployee} // Truyền thông tin nhân viên nếu đang chỉnh sửa
  onSubmit={handleSubmit}    // Hàm xử lý submit form
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
