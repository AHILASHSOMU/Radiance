import React from "react";
import { Route, Routes } from "react-router-dom";
import UserHome from "../pages/UserPages/UserHome";
import UserSignup from "../pages/UserPages/UserSignup";
import UserSignin from "../pages/UserPages/UserSignin";
import VerificationDone from "../pages/UserPages/VerificationDone";
import EmailOTP from "../pages/UserPages/EmailOTP";
import ResendOtp from "../pages/UserPages/ResendOTP";
import ForgotPass from "../pages/UserPages/ForgotPass";
import NewPass from "../pages/UserPages/NewPass";

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/signin" element={<UserSignin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/emailVerification/:id" element={<EmailOTP/>} />
        <Route path="/verificationSuccess" element={<VerificationDone/>}/>
        <Route path="/resendOTP" element={<ResendOtp/>} />
        <Route path="/forgotPassword" element={<ForgotPass/>} /> 
        <Route path="/enterPassword/:id/:token" element={<NewPass/>}/>  
      </Routes>
    </div>
  );
}

export default UserRoutes;
