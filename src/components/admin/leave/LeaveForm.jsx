import React, { useState } from "react";

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Đơn xin nghỉ đã được gửi!");
  };

  return (
    <div className="w-full px-4 mx-auto mt-10 p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center">Đơn Xin Nghỉ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên */}
        <div className="form-group">
          <label className="block text-gray-700">Tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên của bạn"
            className="form-control border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email của bạn"
            className="form-control border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        {/* Ngày bắt đầu */}
        <div className="form-group">
          <label className="block text-gray-700">Ngày bắt đầu</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="form-control border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        {/* Ngày kết thúc */}
        <div className="form-group">
          <label className="block text-gray-700">Ngày kết thúc</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="form-control border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        {/* Lý do nghỉ */}
        <div className="form-group">
          <label className="block text-gray-700">Lý do nghỉ</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Nhập lý do xin nghỉ"
            className="form-control border border-gray-300 p-2 rounded w-full"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Nút gửi */}
        <button
          type="submit"
          className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Gửi đơn
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
