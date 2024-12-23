import React from "react";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import Calendar from "../../components/admin/Calendar"; // Import Calendar component

const CalendarPage = () => {
  return (
    <div className="home-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* Navbar */}
      <Navbar />

      <div style={{ display: "flex", flexGrow: 1 }}>  
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div className="container text-center content" style={{ flexGrow: 1, padding: "20px" }}>
         

          {/* Gắn Calendar vào đây */}
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
