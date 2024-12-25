import React from "react";
import ProjectCard from "../../components/admin/project/ProjectCard";
import HeaderProject from "../../components/admin/project/HeaderProject";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";

const Dashboard = () => {
  const projects = [
    {
      title: "Project Doughnut",
      client: "Gusteau's Restaurant",
      budget: 8742,
      progress: 100,
      status: "COMPLETED",
      started: "17th Nov 2020",
      deadline: "21st May 2028",
      tasks: 287,
      team: [
        { avatar: "../../assets/img/team/40x40/8.webp" },
        { avatar: "../../assets/img/team/40x40/8.webp" },
      ],
    },
    {
      title: "Water resistant mosquito",
      client: "Monsters Inc.",
      budget: 10500,
      progress: 76,
      status: "INACTIVE",
      started: "8th Mar 2021",
      deadline: "15th Sept 2022",
      tasks: 125,
      team: [{ avatar: "../../assets/img/team/40x40/8.webp" }],
    },
    {
      title: "Water resistant mosquito",
      client: "Monsters Inc.",
      budget: 10500,
      progress: 76,
      status: "INACTIVE",
      started: "8th Mar 2021",
      deadline: "15th Sept 2022",
      tasks: 125,
      team: [{ avatar: "../../assets/img/team/40x40/8.webp" }],
    },
    {
      title: "Water resistant mosquito",
      client: "Monsters Inc.",
      budget: 10500,
      progress: 76,
      status: "INACTIVE",
      started: "8th Mar 2021",
      deadline: "15th Sept 2022",
      tasks: 125,
      team: [{ avatar: "../../assets/img/team/40x40/8.webp" }],
    },
    {
      title: "Water resistant mosquito",
      client: "Monsters Inc.",
      budget: 10500,
      progress: 76,
      status: "INACTIVE",
      started: "8th Mar 2021",
      deadline: "15th Sept 2022",
      tasks: 125,
      team: [{ avatar: "../../../assets/img/team/40x40/8.webp" }],
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar className="flex-shrink-0 w-64" />

        {/* Content */}
        <div className="container" style={{marginTop:"100px"}}>
          <div className="row">
            <div className="col-md-2"></div>
            <div
              className="row col-md-10"
            >
              <HeaderProject />
              {projects.map((project, index) => (
                <div key={index} className="col-md-3 mb-4">
                  <ProjectCard {...project} />
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
