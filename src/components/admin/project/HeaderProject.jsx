import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProjectHeader = ({ nameHeader = "Default Title",pathName="" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathName); // Điều hướng đến trang mục tiêu
  };
  return (
    <div className="p-6 rounded-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4">{nameHeader}</h1> {/* Sử dụng nameHeader */}
          <span className="text-sm text-gray-600">(32)</span>
          <button onClick={handleClick}  className="bg-blue-500 text-white mx-5 py-2 px-4 rounded-lg hover:bg-blue-600">
            + Add new {nameHeader}
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-4">
        <button className="text-blue-500">All (32)</button>
        <button className="text-blue-500">Ongoing (14)</button>
        <button className="text-blue-500">Cancelled (2)</button>
        <button className="text-blue-500">Finished (14)</button>
        <button className="text-blue-500">Postponed (2)</button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search projects"
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
