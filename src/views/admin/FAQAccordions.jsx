import React from "react";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import FAQAccordion from "../../components/admin/FAQ/FAQAccordion";

const FAQAccordionView = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#f5f5f5", // Màu nền dịu mắt
    },
    content: {
      display: "flex",
      flexGrow: 1,
      marginTop: "50px", // Tạo khoảng cách dưới Navbar
    },
    main: {
      flexGrow: 1,
      marginLeft: "250px", // Để tránh Sidebar
      marginTop: "20px", // Để tránh sát quá với Sidebar
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar />

      <div style={styles.content}>
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div style={styles.main}>
          <FAQAccordion />
        </div>
      </div>
    </div>
  );
};

export default FAQAccordionView;
