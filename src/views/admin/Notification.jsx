import React from "react";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import Notifications from "../../components/admin/notify/Notifications";

function App() {
  const appContainerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const contentWrapperStyle = {
    display: "flex",
    flexGrow: 1,
  };

  const contentStyle = {
    flexGrow: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    marginLeft: "250px", // Đảm bảo nội dung nằm sát Sidebar
    marginTop: "60px", // Đảm bảo nội dung nằm dưới Navbar
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={appContainerStyle}>
      <Navbar />
      <div style={contentWrapperStyle}>
        <Sidebar />
        <div style={contentStyle}>
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default App;
