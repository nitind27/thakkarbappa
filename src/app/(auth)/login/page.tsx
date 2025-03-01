import React from "react";
import SignInImg from "../Signinimg/Signinimg";
import SignIn from "@/components/auth/SignIn/signIn";

const Login = () => {
  return (
    <div className="row d-flex vh-100 w-100 ">
      <div
        style={{ backgroundColor: "#F5F8FA" }}
        className="col-lg-8 col-md-7 p-0 col-12  "
      >
        <SignInImg />
      </div>
      <div className="col-lg-4 col-md-5 col-12 p-0 bg-white">
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
