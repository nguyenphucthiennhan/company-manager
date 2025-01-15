import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import API_PATH from '../../common/API_PATH';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_PATH() + 'EmployeesList');
      setEmployees(response.data.$values || []);
    } catch (error) {
      setError('Không thể tải danh sách nhân viên. Vui lòng thử lại.');
      console.error('Lỗi tải danh sách nhân viên:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    setSubmitting(true);
    try {
      const response = await axios.post(API_PATH() + 'CreateEmployees', newEmployee);
      setEmployees((prev) => [...prev, response.data]); // Thêm nhân viên vào danh sách
      setSelectedEmployee(null); // Đóng form sau khi thêm
    } catch (error) {
      console.error('Lỗi thêm nhân viên:', error);
      alert('Không thể thêm nhân viên. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setSelectedEmployee(null);
  };

  const renderTable = () => {
    if (loading) return <div className="loading-spinner">Đang tải danh sách nhân viên...</div>;
    if (error) return <p className="text-danger">{error}</p>;
    if (employees.length === 0) return <p>Không có nhân viên nào trong danh sách.</p>;

    return (
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
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Ngày gia nhập</th>
              <th>Quốc tịch</th>
              <th>Địa chỉ</th>
              <th>Loại nhân viên</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.department?.departmentName || 'Không có'}</td>
                <td>{employee.position}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.dayOfBirth}</td>
                <td>{employee.gender}</td>
                <td>{employee.joiningDate}</td>
                <td>{employee.nationality}</td>
                <td>{employee.address}</td>
                <td>{employee.type?.typeName || 'Không rõ'}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => setSelectedEmployee(employee)}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="employee-list-container">
      <button className="btn btn-success mb-3" onClick={() => setSelectedEmployee({})}>
        Thêm nhân viên
      </button>
      {selectedEmployee ? (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleAddEmployee}
          onCancel={handleCancelEdit}
          submitting={submitting}
        />
      ) : (
        <>
          <h3 className="title">Quản Lý Nhân Viên</h3>
          {renderTable()}
        </>
      )}
    </div>
  );
};

export default EmployeeList;
