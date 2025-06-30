import React, { useState, useEffect } from "react";
import "./LoginPage.css"; // Import file CSS riêng
import images from "../../../assets/images";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  password: string;
}

interface LoginCredentials {
  username: string;
  password: string;
  token: string;
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
    token: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  // Fetch danh sách tài khoản và mật khẩu khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://6268ffffaa65b5d23e7df656.mockapi.io/Login",
        true
      );
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response: User[] = JSON.parse(xhr.responseText);
          setUsers(response);
        } else {
          setError("Không thể tải danh sách tài khoản");
        }
        setIsLoading(false);
      };
      xhr.onerror = () => {
        setError("Đã xảy ra lỗi khi tải danh sách tài khoản");
        setIsLoading(false);
      };
      xhr.send();
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Thêm hiệu ứng loading 0.5s
    setTimeout(() => {
      // So sánh với danh sách tài khoản đã fetch
      const user = users.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (user) {
        // Tạo token giả lập (thay bằng token từ API nếu có)
        const token = `token_${Date.now()}_${credentials.username}`;
        setCredentials((prev) => ({ ...prev, token }));
        localStorage.setItem("authToken", token); // Lưu token vào localStorage
        navigate("/admin"); // Chuyển hướng đến trang chính (private route)
        setError(""); // Reset error khi thành công
      } else {
        setError("Tài khoản hoặc mật khẩu không đúng");
      }
      setIsLoading(false);
    }, 500); // Delay 0.5 giây
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="website-link">
          <LanguageIcon />
          Xem website
        </div>
        <div className="logo-container">
          <img src={images.loginIcon} alt="Log In Logo" className="logo" />
        </div>
        <h1 className="title">HỆ THỐNG QUẢN TRỊ</h1>
        <p className="subtitle">Vui lòng đăng nhập vào tài khoản của bạn !</p>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Tài khoản</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Tài khoản"
                required
              />
              <EmailOutlinedIcon className="input-icon" />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="••••••••••••"
                required
              />
              {showPassword ? (
                <VisibilityOutlinedIcon
                  className="input-icon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="input-icon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>

          <div className="options">
            <input
              type="checkbox"
              id="rememberMe"
              name="remember"
              style={{ cursor: "pointer" }}
            />
            <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {error && (
            <div className="message" style={{ color: "red" }}>
              {error}
            </div>
          )}

          <div className="hotline">
            <img src={images.loginNina} alt="Nina Logo" className="nina-logo" />
            <span>
              Hotline: <strong>028.3715.4879</strong>
            </span>
          </div>
        </form>
      </div>
      <footer className="footer">
        CÔNG TY TNHH TM & DV NINA. ALL rights reserved
      </footer>
    </div>
  );
};

export default Login;
