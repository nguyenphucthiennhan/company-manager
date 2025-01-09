import React from "react";
import { FaDollarSign, FaUserAlt } from "react-icons/fa"; // Thêm các icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const ProjectCard = ({
  projectId, // Add projectId as prop for navigation
  projectName,
  startDate,
  endDate,
  status,
  managerID,
  progress = 50 // Giả định giá trị tiến độ mặc định là 50%
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Chuyển đổi định dạng ngày tháng từ chuỗi ISO 8601 (từ API)
  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();

  // Áp dụng màu sắc cho trạng thái
  let statusClass;
  switch (status.toUpperCase()) {
    case "COMPLETED":
      statusClass = "bg-green-100 text-green-800";
      break;
    case "INACTIVE":
      statusClass = "bg-orange-100 text-orange-800";
      break;
    case "CRITICAL":
      statusClass = "bg-red-100 text-red-800";
      break;
    case "ONGOING":
      statusClass = "bg-blue-100 text-blue-800";
      break;
    default:
      statusClass = "bg-gray-100 text-gray-800";
  }

  // Viết hoa chữ cái đầu của status và giữ nguyên phần còn lại
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  const handleCardClick = () => {
    // Navigate to the project detail page
    navigate(`/project-details/${projectId}`); // Replace with your detail route
  };

  return (
    <div
      className="rounded-lg p-6 border w-full max-w-md cursor-pointer" 
      style={{ background: "#fff" }}
      onClick={handleCardClick} // Add onClick handler to navigate to the detail page
    >
      {/* Project Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-xl truncate">{projectName}</h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded ${statusClass}`}
        >
          {formattedStatus} {/* Hiển thị status với chữ cái đầu tiên viết hoa */}
        </span>
      </div>

      {/* Project Details */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-1 flex items-center">
          <FaUserAlt className="mr-2" />
          <span className="font-medium">Manager ID:</span> {managerID}
        </p>
        <p className="text-sm text-gray-700 mb-1 flex items-center">
          <FaDollarSign className="mr-2" />
          <span className="font-medium">Budget:</span> $10,000 {/* Bạn có thể thay thế bằng dữ liệu thật */}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex text-sm text-gray-700 mb-1">
          <span>Progress</span>
          <span>{progress}%</span> {/* Bạn có thể thay thế bằng dữ liệu thật */}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Dates */}
      <p className="mb-2">
        <span className="font-medium">Started:</span> {formattedStartDate}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-medium">Deadline:</span> {formattedEndDate}
      </p>

      {/* Team Members */}
      <div className="flex items-center mb-2">
        {/* Đây là phần hiển thị thành viên nhóm, có thể được điều chỉnh nếu có dữ liệu */}
        <div className="w-10 h-10 bg-gray-300 text-gray-600 flex items-center justify-center rounded-full">
          {/* +{team.length - 3} */}
        </div>
        <span className="text-sm font-medium text-gray-600">5 Tasks</span> {/* Thay thế nếu có dữ liệu về số lượng công việc */}
      </div>
    </div>
  );
};

export default ProjectCard;
