"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function GlobalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      
      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "student") {
        router.push("/student-dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f4f9] flex items-center justify-center p-6 font-sans">
      {/* Font Awesome CDN for exact icon matching */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      <div className="w-full max-w-[440px]">
        <div className="bg-white rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100/50 p-8 sm:p-10">
          
          {/* Logo Section */}
          <div className="text-center mb-8">
            <img 
              src="/assets/images/Arvindu-logo.png" 
              alt="Arvindu Classes" 
              className="h-16 mx-auto mb-4 object-contain" 
            />
            <h1 className="text-[2.6rem] font-black text-[#01228d] leading-tight mb-2">Welcome Back</h1>
            <p className="text-gray-600 font-bold text-[11px] uppercase tracking-[0.15em]">Arvindu Education Portal</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 ml-1">Official Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                  <i className="fa-regular fa-envelope text-xl"></i>
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-12 pr-6 py-4 bg-[#f8f9fb] border border-gray-100 rounded-2xl focus:bg-white focus:ring-1 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-300 text-gray-700 font-medium"
                  placeholder="example@arvindu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 ml-1">Secret Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                  <i className="fa-solid fa-lock-open text-xl"></i>
                </div>
                <input 
                  type="password" 
                  required
                  className="w-full pl-12 pr-6 py-4 bg-[#f8f9fb] border border-gray-100 rounded-2xl focus:bg-white focus:ring-1 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-300 text-gray-700 font-medium text-2xl"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-[13px] font-black text-[#111] hover:text-[#01228d] transition-colors">Forgot Password?</a>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-[#0a2342] text-white rounded-xl font-black text-lg shadow-lg hover:bg-[#0d2d54] transition-all flex items-center justify-center gap-2 group mt-2"
            >
              {isLoading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Enter Portal</span>
                  <i className="fa-solid fa-arrow-right-long text-xl transition-transform group-hover:translate-x-1"></i>
                </>
              )}
            </button>
          </form>

          {/* Bottom Navigation */}
          <div className="mt-6 text-center space-y-6">
            <a href="/" className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-wider text-[#111] hover:text-[#01228d] transition-colors">
              <i className="fa-solid fa-house"></i>
              <span>Back to Home</span>
            </a>
            
            <div className="space-y-2">
              <p className="text-gray-900 text-[11px] font-black uppercase tracking-[0.1em] leading-relaxed">
                &copy; 2026 Arvindu Classes. Authorized<br/>Access Only.
              </p>
              <div className="flex justify-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <a href="#" className="hover:text-black">Privacy</a>
                <span>•</span>
                <a href="#" className="hover:text-black">Terms</a>
                <span>•</span>
                <a href="#" className="hover:text-black">Support</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
