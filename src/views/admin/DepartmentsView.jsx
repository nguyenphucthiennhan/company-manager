import React, { useState, useEffect } from "react";
import axios from "axios";
import Department from "../../components/admin/department/Department";
import HeaderProject from "../../components/admin/project/HeaderProject";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import API_PATH from "../../components/common/API_PATH";
const Dashboard = () => {
  const [projects, setProjects] = useState([]); // State lưu danh sách dự án
  const [loading, setLoading] = useState(false); // State kiểm soát trạng thái loading
  const [error, setError] = useState(null); // State lưu lỗi nếu xảy ra

  // Gọi API lấy danh sách dự án
  useEffect(() => {
    setLoading(true);
    axios
      .post(API_PATH()+"DepartmentList") 
      .then((response) => {
        setProjects(response.data.$values);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy danh sách dự án:", error);
        setError("Không thể tải danh sách dự án. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false); // Tắt trạng thái loading
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar className="flex-shrink-0 w-64" />

        {/* Content */}
        <div className="container" style={{ marginTop: "100px" }}>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="row col-md-10">
              <HeaderProject nameHeader="Departments" pathName="/create-department"/>
              {/* Hiển thị trạng thái loading */}
              {loading && <p>Đang tải danh sách dự án...</p>}
              {/* Hiển thị lỗi nếu có */}
              {error && <p className="text-danger">{error}</p>}
              {/* Hiển thị danh sách dự án */}
              {!loading &&
                !error &&
                projects.map((project, index) => (
                  <div key={index} className="col-md-3 mb-4">
                    <Department {...project} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
