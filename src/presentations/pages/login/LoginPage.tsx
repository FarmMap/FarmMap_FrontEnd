// External files
import React from "react";
// Internal files
import DefaultAuthLayout from "../../components/defaultAuthLayout/DefaultAuthLayOut";
import LoginForm from "./loginForm/LoginForm";
// Styles

const LoginPage: React.FC = () => {
  return (
    <div style={{ height: "100vh" }}>
      <DefaultAuthLayout title="ĐĂNG NHẬP">
        <LoginForm />
      </DefaultAuthLayout>
    </div>
  );
};

export default LoginPage;
