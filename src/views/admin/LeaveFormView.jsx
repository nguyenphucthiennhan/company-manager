import React from "react";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import LeaveForm from "../../components/admin/leave/LeaveForm";
import { Link } from "react-router-dom";

const HomeView = () => {
  return (
    <div
      className="home-container"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      {/* Navbar */}
      <Navbar />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div
          className="container content"
          style={{ flexGrow: 1, padding: "40px" }}
        >
          \
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-7">
              <LeaveForm />
            </div>
            <div className="col-md-3">
              <div className="leave-info mt-5">
                {/* Số ngày nghỉ còn lại */}
                <div className="remaining-leaves">
                  <h5>Số ngày nghỉ còn lại:</h5>
                  <p>12 ngày</p> {/* Thay số này bằng dữ liệu thực */}
                </div>

                {/* Lịch sử nghỉ */}
                <div className="leave-history mt-4">
                  <h5>Lịch sử nghỉ:</h5>
                  <ul>
                    <li>01/01/2025 - Nghỉ phép</li>
                    <li>10/01/2025 - Nghỉ ốm</li>
                    <li>15/01/2025 - Nghỉ không lương</li>
                    {/* Thay danh sách này bằng dữ liệu thực */}
                  </ul>
                </div>

                {/* Lịch */}
                <div className="calendar mt-4">
                  <h5>Lịch:</h5>
                  <Link to="/admin/Calendar">
                    <button className="btn btn-primary">Xem Lịch</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
