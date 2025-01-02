import React, { useState } from "react";
import "./Login.css"; // Đảm bảo import đúng file CSS

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Thêm logic xử lý đăng nhập ở đây
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="tieude">Login</h2>
        <div className="form-group">
          <label className="truong">Email</label>
          <input
            className="onhapdulieu"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label className="truong">Password</label>
          <input
            className="onhapdulieu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <div className="forgot-password">
          <a href="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
