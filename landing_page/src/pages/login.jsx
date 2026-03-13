import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import InputField from "../components/InputField";
import { login, isAuthenticated } from "../utils/auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { token, data } = res.data;

      // Save login data
      login(token, data.role);

      // Redirect based on role
      if (data.role === "SUPPLIER") {
        window.location.href = "/profile";
      } else {
        window.location.href = "/order";
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profile");
    }
  }, []);

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
          max-width: 460px;
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
          justify-content: space-between;
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
          opacity: 0.7;
          cursor: not-allowed;
        }

        .bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #555;
          cursor: pointer;
          user-select: none;
        }

        .remember-checkbox {
          width: 18px;
          height: 18px;
          border: 1.5px solid #ccc;
          border-radius: 50%;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          flex-shrink: 0;
        }
        .remember-checkbox:checked {
          background: #7ed957;
          border-color: #7ed957;
        }
        .remember-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 5px;
          height: 9px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }

        .forgot-link {
          font-size: 14px;
          color: #7ed957;
          font-weight: 600;
          text-decoration: none;
        }
        .forgot-link:hover { text-decoration: underline; }

        .error-msg {
          text-align: center;
          font-size: 13px;
          color: #e53e3e;
          margin-top: -10px;
          margin-bottom: 12px;
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
          <h1 className="login-title">Sign in</h1>

          {/* Signup row */}
          <div className="signup-row">
            <p className="signup-text">
              Don't have an account?{" "}
              <span className="signup-link" onClick={() => navigate("/signup")}>
                Sign up here
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="field-group">
              <div className="field-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Username/Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="field-input"
                  required
                />
              </div>
            </div>

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

            {/* Error message */}
            {message && <p className="error-msg">{message}</p>}

            {/* Sign in button */}
            <button type="submit" disabled={loading} className="signin-btn">
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Bottom row */}
            <div className="bottom-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  className="remember-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="/forgot-password" className="forgot-link">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
