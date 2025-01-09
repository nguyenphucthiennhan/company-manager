import React, { useState } from 'react';
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import LeaveRequestItem from "../../components/admin/leave/LeaveRequest";

const leaveRequests = [
  { id: 1, name: "Nguyễn Văn A", date: "2025-01-15", reason: "Sức khỏe", status: "Pending" },
  { id: 2, name: "Trần Thị B", date: "2025-01-20", reason: "Lý do cá nhân", status: "Pending" },
  { id: 3, name: "Lê Minh C", date: "2025-01-25", reason: "Du lịch", status: "Pending" },
];

const LeaveRequestsPage = () => {
  const [requests, setRequests] = useState(leaveRequests);

  const approveRequest = (id) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: "Approved" } : request
      )
    );
  };

  const rejectRequest = (id) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
  };

  return (
    <div className="home-container flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div className="container flex-grow p-6 fade-in">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-9">
              <div className="container mx-auto p-6 mt-5">
                <h1 className="text-2xl font-bold mb-6">Danh sách yêu cầu nghỉ</h1>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-left">Tên người xin nghỉ</th>
                      <th className="border px-4 py-2 text-left">Ngày nghỉ</th>
                      <th className="border px-4 py-2 text-left">Lý do</th>
                      <th className="border px-4 py-2 text-left">Trạng thái</th>
                      <th className="border px-4 py-2 text-left">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <LeaveRequestItem
                        key={request.id}
                        request={request}
                        onApprove={approveRequest}
                        onReject={rejectRequest}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsPage;
