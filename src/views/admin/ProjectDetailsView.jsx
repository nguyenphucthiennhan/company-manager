import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectDetail from "../../components/admin/project/ProjectDetail";
import HeaderProject from "../../components/admin/project/HeaderProject";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";

const Dashboard = () => {
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
              <ProjectDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
