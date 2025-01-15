// src/router/Routes.jsx
import { Route, Routes as RouterRoutes } from "react-router-dom";
import HomeView from "../views/admin/HomeView";
import CalendarView from "../views/admin/CalendarView";
import ProjectCardView from '../views/admin/ProjectCardView';
import LoginView from "../components/Login";
import CreateUser from "../components/admin/CreateUser";
import EmployeeManagement from "../views/admin/EmployeeManagement";
import ProfilesView from "../views/admin/ProfilesView";
import ProjectDetailsView from "../views/admin/ProjectDetailsView";
import Notification from "../views/admin/Notification"; 
import FAQAccordion from "../views/admin/FAQAccordions"; 
import LeaveFormView from "../views/admin/LeaveFormView";
import LeaveRequestsListView from "../views/admin/LeaveRequestsListView";
import DepartmentsView from "../views/admin/DepartmentsView";
import DepartmentDetails from "../views/admin/DepartmentDetailsView";
import CreateDepartment from "../views/admin/CreateDepartment";

const adminRoutes = [
  { path: "/admin", element: <HomeView />, name: "Admin Dashboard" },
  { path: "/admin/calendar", element: <CalendarView />, name: "Calendar View" },
  { path: "/project", element: <ProjectCardView />, name: "Project card view" },
  { path: "/login", element: <LoginView />, name: "Login View" },
  { path: "/admin/createuser", element: <CreateUser />, name: "Create User" },
  { path: "/management-Employees", element: <EmployeeManagement />, name: "Employee Management" },
  { path: "/profile", element: <ProfilesView />, name: "Profile View"},
  { path: "/login", element: <LoginView />, name: "Login View" },
  { path: "/admin/createuser", element: <CreateUser />, name: "Create User" },
  { path: "/project-details/1", element: <ProjectDetailsView />, name: "project details" },
  { path: "/admin/notification", element: <Notification />, name: "Notifications" },
  { path: "/admin/faq", element: <FAQAccordion />, name: "FAQ Accordion" }, 
  { path: "/leave-form", element: <LeaveFormView />, name: "Leave Form" }, 
  { path: "/list-leave-request", element: <LeaveRequestsListView />, name: "Leave listlist" }, 
  { path: "/departments", element: <DepartmentsView />, name: "Derpartment" }, 
  { path: "/department", element: <DepartmentDetails />, name: "Derpartment details" }, 
  { path: "/create-department", element: <CreateDepartment />, name: "create new department" }, 
];

const Routes = () => {
  return (
    <RouterRoutes>
      {adminRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </RouterRoutes>
  );
};

export default Routes;
