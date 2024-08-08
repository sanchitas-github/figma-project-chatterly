import React from "react";
import LoginForm from "../components/login/Login";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
