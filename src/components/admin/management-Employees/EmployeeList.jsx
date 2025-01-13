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

  const fetchEmployees = () => {
    setLoading(true);
    axios
      .post(API_PATH() + 'Employeeslist')
      .then((response) => {
        setEmployees(response.data.$values); // Make sure employees are inside $values property
      })
      .catch((error) => {
        setError('Không thể tải danh sách nhân viên. Vui lòng thử lại.');
        console.error('Lỗi tải danh sách nhân viên:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCancelEdit = () => {
    setSelectedEmployee(null);
  };

  const handleDelete = (employeeID) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      setSubmitting(true);
      axios
        .delete(`http://localhost:5062/Home/EmployeesList/${employeeID}`)
        .then(() => {
          setEmployees(employees.filter((employee) => employee.employeeId !== employeeID));
        })
        .catch((error) => {
          console.error('Lỗi xóa nhân viên:', error);
          alert('Không thể xóa nhân viên. Vui lòng thử lại.');
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const handleSubmit = (employee) => {
    setSubmitting(true);
    const apiCall = employee.employeeId
      ? axios.put(`http://localhost:5062/Home/EmployeesList/${employee.employeeId}`, employee)
      : axios.post('http://localhost:5062/Home/EmployeesList', employee);

    apiCall
      .then((response) => {
        if (employee.employeeId) {
          setEmployees(
            employees.map((emp) =>
              emp.employeeId === employee.employeeId ? response.data : emp
            )
          );
        } else {
          setEmployees([...employees, response.data]);
        }
        setSelectedEmployee(null);
      })
      .catch((error) => {
        console.error('Lỗi từ server:', error.response?.data);
        alert('Không thể thêm hoặc cập nhật nhân viên. Vui lòng thử lại.');
      })
      .finally(() => {
        setSubmitting(false);
      });
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
                <td>
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleEdit(employee)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(employee.employeeId)}
                    disabled={submitting}
                  >
                    Xóa
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
      {selectedEmployee ? (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleSubmit}
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
