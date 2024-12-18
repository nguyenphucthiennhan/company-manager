import React from "react";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";



const HomeView = () => {
  return (
    <div className="home-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* Navbar */}
      <Navbar />

      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div className="container text-center content" style={{ flexGrow: 1, padding: "20px" }}>
          <h1>Welcome to Home Page</h1>
          <p>This is the main content of the home view.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
