"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const registerMutation = useMutation(api.auth.register);
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const getImageUrl = useMutation(api.uploads.getImageUrl);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let profilePicUrl = undefined;

      // Handle file upload if provided
      if (profilePic) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": profilePic.type },
          body: profilePic,
        });
        const { storageId } = await result.json();
        profilePicUrl = await getImageUrl({ storageId });
      }

      // Register user
      const user = await registerMutation({
        name,
        email,
        phone: mobile,
        password,
        profilePicUrl: profilePicUrl || undefined,
      });

      // Save session
      localStorage.setItem("user_session", JSON.stringify(user));
      
      // Redirect to home or back to blog
      router.push("/");
    } catch (err: any) {
      const message = err.data || err.message || "Registration failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

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
          max-width: 480px;
          padding: 48px 44px 40px;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .main-title {
          font-size: 30px;
          font-weight: 800;
          color: #0d2246;
          margin-bottom: 8px;
          text-align: center;
        }
        .subtitle {
          color: #64748b;
          font-size: 15px;
          text-align: center;
          margin-bottom: 30px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }
        .form-control {
          width: 100%;
          height: 52px;
          padding: 0 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          font-size: 15px;
          color: #0f172a;
          transition: all 0.2s;
        }
        .form-control:focus {
          border-color: #0d2246;
          outline: none;
          box-shadow: 0 0 0 4px rgba(13, 34, 70, 0.1);
        }
        .btn-submit {
          width: 100%;
          height: 54px;
          background: #0d2246;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
        }
        .btn-submit:hover {
          background: #0a1b38;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(13, 34, 70, 0.2);
        }
        .error-message {
          background: #fef2f2;
          color: #ef4444;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          text-align: center;
        }
        .auth-link {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: #64748b;
        }
        .auth-link a {
          color: #0d2246;
          font-weight: 600;
          text-decoration: none;
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <h1 className="main-title">Create an Account</h1>
          <p className="subtitle">Register to join the conversation!</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile No.</label>
              <input 
                type="tel" 
                className="form-control" 
                placeholder="Enter your mobile number" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Create a password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Profile Picture (Optional)</label>
              <input 
                type="file" 
                className="form-control" 
                accept="image/*"
                style={{ paddingTop: '12px' }}
                onChange={(e) => setProfilePic(e.target.files?.[0] || null)} 
              />
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register"}
            </button>

            <div className="auth-link">
              Already have an account? <a href="/login">Log in</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
