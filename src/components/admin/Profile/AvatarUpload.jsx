import React, { useState } from "react";
import "./AvatarUpload.css";

const AvatarUpload = ({ onImageChange }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      onImageChange(imageUrl); // Truyền ảnh về parent component
    }
  };

  return (
    <div className="p-5 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="avatars-wrapper">
            <h1 className="info-client">Thông tin tài khoản</h1>
            {profileImage ? (
              <img src={profileImage} alt="Avatars" className="avatars" />
            ) : (
              <div className="avatars-placeholder">L</div>
            )}
            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
             <button
              className="upload-btn"
              onClick={() => document.getElementById("upload").click()}
            >
              Tải ảnh đại diện
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
