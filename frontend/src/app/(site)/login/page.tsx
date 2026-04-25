"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function GlobalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginMutation = useMutation(api.auth.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const user = await loginMutation({ email, password });
      localStorage.setItem("user_session", JSON.stringify(user));
      const staffRoles = ["super_admin", "admin", "teacher", "counsellor", "accounts", "sales", "operations"];
      if (staffRoles.includes(user.role)) {
        router.push("/admin");
      } else if (user.role === "student") {
        router.push("/student-dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      // ConvexError puts the payload in err.data
      const message = err.data || err.message || "Invalid credentials. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .login-page {
          min-height: 100vh;
          background: #eef2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Inter', sans-serif;
        }

        .login-card {
          background: #ffffff;
          border-radius: 28px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.04);
          width: 100%;
          max-width: 420px;
          padding: 48px 44px 40px;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .logo-area {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-img {
          height: 52px;
          width: auto;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }

        .heading-area {
          text-align: center;
          margin-bottom: 36px;
        }

        .main-title {
          font-size: 30px;
          font-weight: 800;
          color: #0d2246;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .sub-title {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .divider {
          height: 1px;
          background: #f0f0f0;
          margin-bottom: 32px;
        }

        .field-group {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          color: #c4c9d4;
          pointer-events: none;
          z-index: 1;
          width: 18px;
          text-align: center;
        }

        .input-field {
          width: 100%;
          height: 52px;
          padding: 0 44px 0 46px;
          background: #f7f8fa;
          border: 1.5px solid #e8eaed;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
        }

        .input-field::placeholder {
          color: #c4c9d4;
          font-weight: 400;
        }

        .input-field:focus {
          background: #ffffff;
          border-color: #0d2246;
          box-shadow: 0 0 0 4px rgba(13, 34, 70, 0.07);
        }

        .toggle-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #c4c9d4;
          font-size: 14px;
          padding: 4px;
          line-height: 1;
          transition: color 0.2s;
        }

        .toggle-btn:hover { color: #0d2246; }

        .forgot-row {
          text-align: right;
          margin-top: 6px;
          margin-bottom: 28px;
        }

        .forgot-link {
          font-size: 12.5px;
          font-weight: 700;
          color: #0d2246;
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.2s;
        }

        .forgot-link:hover { opacity: 1; text-decoration: underline; }

        .error-box {
          background: #fff5f5;
          border: 1.5px solid #fca5a5;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #dc2626;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .submit-btn {
          width: 100%;
          height: 54px;
          background: #0d2246;
          color: #ffffff;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(13, 34, 70, 0.3);
        }

        .submit-btn:hover {
          background: #162f5c;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(13, 34, 70, 0.35);
        }

        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

        .back-link-row {
          text-align: center;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid #f0f0f0;
        }

        .back-link {
          font-size: 12px;
          font-weight: 700;
          color: #6b7280;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: color 0.2s;
        }

        .back-link:hover { color: #0d2246; }

        .footer-text {
          text-align: center;
          margin-top: 24px;
          font-size: 10.5px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1.8;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
        }

        .footer-link {
          font-size: 10px;
          font-weight: 700;
          color: #c4c9d4;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.2s;
        }

        .footer-link:hover { color: #6b7280; }
        .footer-dot { color: #e0e0e0; font-size: 10px; }

        @media (max-width: 480px) {
          .login-page {
            padding: 12px;
          }
          .login-card {
            padding: 24px 20px 20px;
            border-radius: 20px;
          }
          .logo-area {
            margin-bottom: 16px;
          }
          .logo-img {
            height: 38px;
          }
          .heading-area {
            margin-bottom: 20px;
          }
          .main-title {
            font-size: 22px;
            margin-bottom: 4px;
          }
          .sub-title {
            font-size: 9px;
          }
          .divider {
            margin-bottom: 20px;
          }
          .field-group {
            margin-bottom: 14px;
          }
          .field-label {
            font-size: 10px;
            margin-bottom: 6px;
          }
          .input-field {
            height: 44px;
            font-size: 13px;
            padding: 0 40px 0 42px;
            border-radius: 12px;
          }
          .input-icon {
            left: 14px;
            font-size: 13px;
          }
          .forgot-row {
            margin-bottom: 20px;
            margin-top: 4px;
          }
          .forgot-link {
            font-size: 11.5px;
          }
          .submit-btn {
            height: 48px;
            font-size: 14px;
            border-radius: 12px;
          }
          .back-link-row {
            margin-top: 20px;
            padding-top: 16px;
          }
          .back-link {
            font-size: 11px;
          }
          .footer-text {
            margin-top: 16px;
            font-size: 9px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          
          {/* Logo */}
          <div className="logo-area">
            <img
              src="/assets/images/Arvindu-logo.png"
              alt="Arvindu Classes"
              className="logo-img"
            />
          </div>

          {/* Heading */}
          <div className="heading-area">
            <h1 className="main-title">Welcome Back</h1>
            <p className="sub-title">Arvindu Education Portal</p>
          </div>

          <div className="divider" />

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="field-group">
              <label className="field-label">Official Email</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <i className="fa-regular fa-envelope"></i>
                </span>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="example@arvinduclasses.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label">Secret Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="input-field"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="forgot-row">
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            {/* Error */}
            {error && (
              <div className="error-box">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Verifying…</span>
                </>
              ) : (
                <>
                  <span>Enter Portal</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </>
              )}
            </button>
          </form>

          {/* Back to home */}
          <div className="back-link-row">
            <a href="/" className="back-link">
              <i className="fa-solid fa-house"></i>
              <span>Back to Home</span>
            </a>
          </div>

          {/* Footer */}
          <div className="footer-text">
            © 2026 Arvindu Classes. Authorized Access Only.
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy</a>
              <span className="footer-dot">•</span>
              <a href="#" className="footer-link">Terms</a>
              <span className="footer-dot">•</span>
              <a href="#" className="footer-link">Support</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
