import React from "react";
import "./ProfileForm.css";

const ProfileForm = ({ formData, onChange, onSave }) => {
  return (
    <div className="profile-form">
      <label>Tên hiển thị</label>
      <input
        type="text"
        name="displayName"
        value={formData.displayName}
        onChange={onChange}
      />

      <label>Địa chỉ Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
      />

      <label>Ngày sinh</label>
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={onChange}
      />

      <label>Địa chỉ</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={onChange}
      ></textarea>

      <button className="save-btn" onClick={onSave}>
        Lưu thông tin
      </button>
    </div>
  );
};

export default ProfileForm;
