import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false); // Trạng thái gửi dữ liệu

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    axios
      .get('http://localhost:5238/api/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        setError('Không thể tải danh sách nhân viên. Vui lòng thử lại.');
        console.error('Lỗi tải danh sách nhân viên:', error);  // Log chi tiết lỗi
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
        .delete(`http://localhost:5238/api/employees/${employeeID}`)
        .then(() => {
          setEmployees(employees.filter((employee) => employee.employeeID !== employeeID));
        })
        .catch((error) => {
          console.error('Lỗi xóa nhân viên:', error);  // Log chi tiết lỗi
          alert('Không thể xóa nhân viên. Vui lòng thử lại.');
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const handleSubmit = (employee) => {
    console.log('Dữ liệu gửi đi:', employee);  // Kiểm tra dữ liệu

    setSubmitting(true);
    const apiCall = employee.employeeID
      ? axios.put(`http://localhost:5238/api/employees/${employee.employeeID}`, employee)
      : axios.post('http://localhost:5238/api/employees', employee);

    apiCall
      .then((response) => {
        if (employee.employeeID) {
          setEmployees(
            employees.map((emp) =>
              emp.employeeID === employee.employeeID ? response.data : emp
            )
          );
        } else {
          setEmployees([...employees, response.data]);
        }
        setSelectedEmployee(null);
      })
      .catch((error) => {
        if (error.response) {
          // Lỗi trả về từ API (ví dụ: 400, 500)
          console.error('Lỗi từ server:', error.response.data);
          alert(`Lỗi từ server: ${error.response.data.message || 'Không thể thêm hoặc cập nhật nhân viên. Vui lòng thử lại.'}`);
        } else if (error.request) {
          // Lỗi không nhận được phản hồi từ API
          console.error('Không nhận được phản hồi từ server:', error.request);
          alert('Không nhận được phản hồi từ server. Vui lòng thử lại.');
        } else {
          // Lỗi khác
          console.error('Lỗi không xác định:', error.message);
          alert('Không thể thêm hoặc cập nhật nhân viên. Vui lòng thử lại.');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const renderTable = () => {
    if (loading) return <p>Đang tải danh sách nhân viên...</p>;
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
