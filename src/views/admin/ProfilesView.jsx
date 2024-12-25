import React, {useState} from "react";
import Sidebar from "../../components/admin/SideBar";
import Navbar from "../../components/admin/Navbar";
import AvatarUpload from "../../components/admin/Profile/AvatarUpload";
import ProfileForm from "../../components/admin/Profile/ProfileForm"; 
import "./ProfileView.css";


const ProfilesView  = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    birthDate: "",
    address: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (imageUrl) => {
    console.log("Image selected:", imageUrl);
  };

  const handleSave = () => {
    console.log("Form data:", formData);
    alert("Thông tin đã được lưu!");
  };
  return (
    <div className="home-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* Navbar */}
      <Navbar />

      <div style={{ display: "flex", flexGrow: 1 }}>  
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div className="container text-center content" style={{ flexGrow: 1, padding: "20px" }}>
         
          {/* Gắn Profile vào đây */}
          <div className="profile-view">
            <h2>Thông tin tài khoản</h2>
            <AvatarUpload onImageChange={handleImageChange} />
            <ProfileForm
              formData={formData}
              onChange={handleFormChange}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesView;
