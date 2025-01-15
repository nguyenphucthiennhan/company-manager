import React from "react";
import { FaUserAlt, FaTrash } from "react-icons/fa"; // Thêm icon xóa
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import axios from "axios";
import API_PATH from "../../common/API_PATH";

const Department = ({
  departmentId,
  departmentName,
  description,
  activeFrom,
  activeTo,
  employees = [],
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Chuyển đổi định dạng ngày tháng từ chuỗi ISO 8601 (từ API)
  const formattedActiveFrom = new Date(activeFrom).toLocaleDateString();
  const formattedActiveTo = activeTo
    ? new Date(activeTo).toLocaleDateString()
    : "Ongoing";

  const handleCardClick = () => {
    // Navigate to the department detail page
    navigate('/department', { state: { departmentId } });
  };

  // Hàm gọi API xóa phòng ban
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`${API_PATH()}DeleteDepartment/${departmentId}`);
        alert("Department deleted successfully");
        // Sau khi xóa thành công, có thể điều hướng hoặc làm mới danh sách phòng ban
        navigate('/departments'); // Chuyển đến danh sách phòng ban
      } catch (err) {
        alert("Failed to delete department");
        console.error(err);
      }
    }
  };

  return (
    <div
      className="rounded-lg p-6 border w-full max-w-md cursor-pointer transition-transform duration-300 hover:scale-105"
      style={{
        backgroundColor: "#f3f4f6", // Nhẹ nhàng hơn
        borderColor: "#d1d5db",
      }}
      onClick={handleCardClick} // Add onClick handler to navigate to the detail page
    >
      {/* Department Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-xl truncate text-blue-800">
          {departmentName}
        </h3>
        {/* Nút xóa */}
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash />
        </button>
      </div>

      {/* Department Description */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-1 flex items-center">
          <FaUserAlt className="mr-2 text-purple-600" />
          <span className="font-medium">Description:</span>{" "}
          <span className="text-purple-800">{description}</span>
        </p>
      </div>

      {/* Active Period */}
      <p className="mb-2 text-gray-800">
        <span className="font-medium">Active From:</span>{" "}
        <span className="text-green-700">{formattedActiveFrom}</span>
      </p>
      <p className="text-sm text-gray-800 mb-4">
        <span className="font-medium">Active To:</span>{" "}
        <span className="text-red-700">{formattedActiveTo}</span>
      </p>

      {/* Employees */}
      <div className="mb-2">
        <span className="font-medium text-gray-800">Employees:</span>{" "}
        {employees.length > 0 ? (
          <span className="text-blue-700">{employees.length}</span>
        ) : (
          <span className="text-red-500">No employees</span>
        )}
      </div>
    </div>
  );
};

export default Department;
