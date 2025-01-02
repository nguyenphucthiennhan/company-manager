// src/router/Routes.jsx
import { Route, Routes as RouterRoutes } from "react-router-dom";
import HomeView from "../views/admin/HomeView";
import CalendarView from "../views/admin/CalendarView";
import ProjectCardView from '../views/admin/ProjectCardView';
import LoginView from "../components/Login";
import CreateUser from "../components/admin/CreateUser";
import EmployeeManagement from "../views/admin/EmployeeManagement"; // Đảm bảo đường dẫn đúng

const adminRoutes = [
  { path: "/admin", element: <HomeView />, name: "Admin Dashboard" },
  { path: "/admin/calendar", element: <CalendarView />, name: "Calendar View" },
  { path: "/project", element: <ProjectCardView />, name: "Project card view" },
  { path: "/login", element: <LoginView />, name: "Login View" },
  { path: "/admin/createuser", element: <CreateUser />, name: "Create User" },
  { path: "/management-Employees", element: <EmployeeManagement />, name: "Employee Management" },
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
