import React from "react";
import Sidebar from "../../components/admin/SideBar";

const HomeView = () => {
  return (
    <div className="home-container" style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="container text-center content" style={{ flexGrow: 1, padding: "20px" }}>
        <h1>Welcome to Home Page</h1>
        <p>This is the main content of the home view.</p>
      </div>
    </div>
  );
};

export default HomeView;
