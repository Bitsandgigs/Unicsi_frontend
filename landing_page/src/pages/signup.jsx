import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import InputField from "../components/InputField";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "SUPPLIER" || "RESELLER" || "ADMIN",
    otp: "",
  });

  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // STEP 1: Send OTP
  const handleSendOtp = async () => {
    if (!isValidEmail(form.email)) {
      return setMessage("Please enter a valid email address");
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/send-otp", { email: form.email });
      setMessage(res.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!form.otp) {
      return setMessage("Please enter OTP");
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", {
        email: form.email,
        otp: form.otp,
      });
      setMessage(res.data.message);
      setOtpVerified(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Complete signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      return setMessage("Please verify your email before signing up");
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/signup", {
        ...form,
        otpVerified: true,
      });
      setMessage(res.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .login-bg {
          width: 100vw;
          min-height: 100vh;
          background: linear-gradient(135deg, #7ed957 0%, #0097b2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Segoe UI', sans-serif;
        }

        .login-card {
          background: #fff;
          border-radius: 20px;
          padding: 48px 44px 40px;
          width: 100%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: #aaa;
          font-size: 22px;
          line-height: 1;
          padding: 4px;
          transition: color 0.2s;
        }
        .close-btn:hover { color: #555; }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 6px;
        }

        .signup-row {
          display: flex;
          align-items: center;
          margin-bottom: 28px;
        }

        .signup-text {
          font-size: 14px;
          color: #555;
          margin: 0;
        }

        .signup-link {
          color: #7ed957;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }
        .signup-link:hover { text-decoration: underline; }

        .field-group {
          margin-bottom: 18px;
        }

        .field-wrapper {
          position: relative;
        }

        .field-input {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid #d0d0d0;
          padding: 10px 0;
          font-size: 15px;
          color: #1a1a1a;
          background: transparent;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: #bbb; }
        .field-input:focus { border-bottom-color: #7ed957; }

        .field-select {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid #d0d0d0;
          padding: 10px 0;
          font-size: 15px;
          color: #1a1a1a;
          background: transparent;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          appearance: none;
          cursor: pointer;
        }
        .field-select:focus { border-bottom-color: #7ed957; }

        .toggle-pw {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #aaa;
          padding: 0;
          display: flex;
          align-items: center;
        }

        /* Email + OTP row */
        .email-row {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          margin-bottom: 18px;
        }
        .email-row .field-group {
          flex: 1;
          margin-bottom: 0;
        }

        .otp-btn {
          padding: 9px 16px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .otp-btn:hover:not(:disabled) {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .otp-btn:disabled { cursor: not-allowed; opacity: 0.75; }

        .otp-btn.send {
          background: linear-gradient(135deg, #7ed957 0%, #0097b2 100%);
          color: #fff;
        }
        .otp-btn.sent {
          background: #22c55e;
          color: #fff;
        }
        .otp-btn.verify {
          background: #0097b2;
          color: #fff;
        }
        .otp-btn.verified {
          background: #22c55e;
          color: #fff;
        }

        .signin-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #7ed957 0%, #0097b2 100%);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 10px;
          margin-bottom: 20px;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.3px;
        }
        .signin-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .signin-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #ccc;
        }

        .bottom-row {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-text {
          font-size: 14px;
          color: #555;
          margin: 0;
        }

        .error-msg {
          text-align: center;
          font-size: 13px;
          color: #e53e3e;
          margin-top: -10px;
          margin-bottom: 12px;
        }

        .success-msg {
          text-align: center;
          font-size: 13px;
          color: #22c55e;
          margin-top: -10px;
          margin-bottom: 12px;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #22c55e;
          font-weight: 600;
          margin-top: 4px;
        }
      `}</style>

      <div className="login-bg">
        <div className="login-card">
          {/* Close button */}
          <button
            className="close-btn"
            type="button"
            aria-label="Close"
            onClick={() => navigate("/")}
          >
            ✕
          </button>

          {/* Title */}
          <h1 className="login-title">Sign up</h1>

          {/* Subtitle row */}
          <div className="signup-row">
            <p className="signup-text">
              Already have an account?{" "}
              <span className="signup-link" onClick={() => navigate("/login")}>
                Sign in here
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup}>
            {/* Full Name */}
            <div className="field-group">
              <div className="field-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="field-input"
                  required
                />
              </div>
            </div>

            {/* Email + Send OTP */}
            <div className="email-row">
              <div className="field-group">
                <div className="field-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="field-input"
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading || otpSent}
                className={`otp-btn ${otpSent ? "sent" : "send"}`}
              >
                {otpSent ? "✓ Sent" : loading ? "Sending..." : "Send OTP"}
              </button>
            </div>

            {/* OTP Field */}
            {otpSent && (
              <div className="email-row">
                <div className="field-group">
                  <div className="field-wrapper">
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={form.otp}
                      onChange={handleChange}
                      className="field-input"
                    />
                  </div>
                  {otpVerified && (
                    <span className="verified-badge">✓ Email verified</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading || otpVerified}
                  className={`otp-btn ${otpVerified ? "verified" : "verify"}`}
                >
                  {otpVerified
                    ? "✓ Verified"
                    : loading
                      ? "Verifying..."
                      : "Verify"}
                </button>
              </div>
            )}

            {/* Password */}
            <div className="field-group">
              <div className="field-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="field-input"
                  style={{ paddingRight: "32px" }}
                  required
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="field-group">
              <div className="field-wrapper">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="field-select"
                >
                  <option value="SUPPLIER">Supplier</option>
                  <option value="RESELLER">Reseller</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>

            {/* Message */}
            {message && (
              <p className={otpVerified ? "success-msg" : "error-msg"}>
                {message}
              </p>
            )}

            {/* Sign up button */}
            <button
              type="submit"
              disabled={!otpVerified || loading}
              className="signin-btn"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>

            {/* Bottom row */}
            <div className="bottom-row">
              <p className="login-text">
                Already have an account?{" "}
                <span
                  className="signup-link"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
