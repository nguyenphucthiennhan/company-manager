import { Route, Routes as RouterRoutes } from "react-router-dom";
import HomeView from "../views/admin/HomeView";
import CalendarView from "../views/admin/CalendarView";
import ProjectCardView from '../views/admin/ProjectCardView';
import ProfilesView from "../views/admin/ProfilesView";


const adminRoutes = [
  { path: "/admin", element: <HomeView />, name: "Admin Dashboard" },
  { path: "/admin/calendar", element: <CalendarView />, name: "Calendar View" }, // Sửa đường dẫn thành /admin/calendar
  { path: "/project", element: <ProjectCardView />, name: "Project card view" },
  { path: "/profile", element: <ProfilesView />, name: "Profile View"},
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
 