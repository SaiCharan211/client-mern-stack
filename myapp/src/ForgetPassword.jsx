import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "./Url";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    Axios.post(`${baseUrl}forgot-password`, {
      email,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          alert("Check your email for the OTP.");
        } else {
          alert(response.data.message || "Failed to send OTP. Please try again later.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to send OTP. Please try again later.");
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) {
      alert("Please enter your email, OTP, and new password.");
      return;
    }

    Axios.post("http://localhost:3210/verify-otp", {
      email,
      otp,
      newPassword
    })
      .then((response) => {
        if (response.data.status) {
          alert("OTP verified and password reset successfully. Please login with your new password.");
          navigate("/login"); // Navigate to login page
        } else {
          alert(response.data.message || "Failed to verify OTP. Please try again later.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to verify OTP. Please try again later.");
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h1>Forgot Password</h1>
          <form>
            <div className="m-3">
              <label htmlFor="email">
                <strong>E-mail</strong>
              </label>
              <input
                type="email"
                autoComplete="off"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success w-100" onClick={handleSendOtp}>
              Send OTP
            </button>

            <div className="m-3">
              <label htmlFor="otp">
                <strong>OTP</strong>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="m-3">
              <label htmlFor="newPassword">
                <strong>New Password</strong>
              </label>
              <input
                type="password"
                autoComplete="off"
                className="form-control"
                name="newPassword"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success w-100" onClick={handleVerifyOtp}>
              Verify OTP and Reset Password
            </button>

            <p>Have an Account? <Link to='/login'>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
