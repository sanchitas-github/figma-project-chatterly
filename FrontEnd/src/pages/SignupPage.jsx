import React from "react";
import SignupForm from "../components/signup/SignUp";

const SignupPage = () => {
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
      <h2>Sign Up</h2>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
