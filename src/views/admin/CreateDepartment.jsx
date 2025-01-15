import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import API_PATH from "../../components/common/API_PATH";

function AddDepartmentForm() {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [activeFrom, setActiveFrom] = useState("");
  const [activeTo, setActiveTo] = useState("");

  // Xử lý thay đổi các trường input
  const handleDepartmentNameChange = (e) => setDepartmentName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleActiveFromChange = (e) => setActiveFrom(e.target.value);
  const handleActiveToChange = (e) => setActiveTo(e.target.value);

  // Gửi form lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const departmentData = {
        departmentName,
        description,
        activeFrom,
        activeTo: activeTo || null,
      };
      await axios.post(`${API_PATH()}AddDepartment`, departmentData);
      alert("Department added successfully");
      // Reset form after success
      setDepartmentName("");
      setDescription("");
      setActiveFrom("");
      setActiveTo("");
    } catch (err) {
      alert("Failed to add department");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Main Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar className="flex-shrink-0 w-64" />
        <div className="col-md-2"></div>
        {/* Content */}
        <div
          className="container mx-auto p-8 bg-blue-50"
          style={{ marginTop: "100px" }}
        >
          <h2 className="text-4xl font-semibold text-blue-600 mb-6">
            Add New Department
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Name */}
            <div>
              <label className=" text-lg font-semibold">Department Name</label>
              <input
                type="text"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                value={departmentName}
                onChange={handleDepartmentNameChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className=" text-lg font-semibold">Description</label>
              <textarea
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </div>

            {/* Active From Date */}
            <div>
              <label className=" text-lg font-semibold">Active From</label>
              <input
                type="date"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                value={activeFrom}
                onChange={handleActiveFromChange}
                required
              />
            </div>

            {/* Active To Date */}
            <div>
              <label className=" text-lg font-semibold">Active To</label>
              <input
                type="date"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                value={activeTo}
                onChange={handleActiveToChange}
              />
            </div>

            <button
              type="submit"
              className="mt-8 bg-blue-600 text-white p-4 rounded-lg w-full"
            >
              Submit Department
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDepartmentForm;
