import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiChevronDown,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import {
  FaShoppingCart,
  FaFolder,
  FaQuestionCircle,
  FaTag,
  FaEnvelope,
} from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon
import { FaUser } from "react-icons/fa"; // Corrected from FaPerson

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar mặc định đóng trên mobile

  // Kiểm tra kích thước màn hình và cập nhật trạng thái sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Mở sidebar trên desktop
      } else {
        setIsSidebarOpen(false); // Đóng sidebar trên mobile
      }
    };

    // Kiểm tra kích thước màn hình khi load
    handleResize();

    // Thêm event listener để theo dõi thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Xóa event listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Mở/đóng sidebar trên di động
  };

  return (
    <div>
      {/* Hamburger menu (dành cho di động) */}
      <div
        className={`hamburger md:hidden ${isSidebarOpen ? "hidden" : ""}`} // Ẩn hamburger khi sidebar mở
        onClick={toggleSidebar}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        {/* Menu */}
        <ul className="nav-list space-y-4">
          <li className="nav-item">
            <div
              onClick={() => toggleMenu("home")}
              className="nav-link flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <FiHome /> <span className="ml-2">Home</span>
              </div>
              {openMenus["home"] ? <FiChevronDown /> : <FiChevronRight />}
            </div>
            {openMenus["home"] && (
              <ul className="sub-menu pl-6 space-y-2">
                <li>
                  <Link to="/">E commerce</Link>
                </li>
                <li>
                  <Link to="/project">Project management</Link>
                </li>
                <li>
                  <Link to="/">CRM</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Apps */}
          <li className="nav-header text-gray-400">APPS</li>
          <li className="nav-item">
            <Link to="/" className="nav-link flex items-center">
              <FaShoppingCart /> <span className="ml-2">E commerce</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link flex items-center">
              <FaEnvelope /> <span className="ml-2">Email</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link flex items-center">
              <IoIosChatbubbles /> <span className="ml-2">Chat</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/list-leave-request" className="nav-link flex items-center">
              <FaFolder /> <span className="ml-2">Leave Requests</span>
              <span className="badge bg-red-600 text-white ml-2">NEW</span>
            </Link>
          </li>

          {/* Pages */}
          <li className="nav-header text-gray-400">PAGES</li>
          <li className="nav-item">
            <Link to="/admin/faq" className="nav-link flex items-center">
              <FaQuestionCircle /> <span className="ml-2">Faq</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leave-form" className="nav-link flex items-center">
              <FaTag /> <span className="ml-2">Leave</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/notification" className="nav-link flex items-center">
              🔔 <span className="ml-2"> Notifications</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/management-Employees" className="nav-link flex items-center">
              <FaTag /> <span className="ml-2">Employees Management</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/CreateUser" className="nav-link flex items-center">
              <FaTag /> <span className="ml-2">Create User</span>
            </Link>
          </li>
          {/* Calendar Link */}
          <li className="nav-item">
            <Link to="/admin/Calendar" className="nav-link flex items-center">
              <FaCalendarAlt /> <span className="ml-2">Calendar</span>
            </Link>
          </li>

          {/* Profile Link */}
          <li className="nav-item">
            <Link to="/Profile" className="nav-link flex items-center">
              <FaUser /> <span className="ml-2">Profile</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Nút đóng sidebar trên di động */}
      {isSidebarOpen && (
        <div className="close-sidebar md:hidden" onClick={toggleSidebar}>
          <FiChevronLeft size={30} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
