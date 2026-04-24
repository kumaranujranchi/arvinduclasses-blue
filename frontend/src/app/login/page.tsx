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
    <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Font Awesome CDN for Icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      <div className="w-full max-w-[480px]">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(7,41,77,0.1)] overflow-hidden border border-blue-50/50">
          <div className="p-8 sm:p-12 pb-6 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-sm">
               <img src="/assets/images/Arvindu-logo.png" alt="Arvindu Classes" className="w-14 h-14 object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#07294d] tracking-tight">Welcome Back</h1>
            <p className="text-gray-400 font-semibold text-[11px] uppercase tracking-[0.2em] mt-3">Arvindu Education Portal</p>
          </div>
          
          <div className="p-8 sm:p-12 pt-0">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">Official Email</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-300 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                    <i className="fa-solid fa-envelope text-sm"></i>
                  </div>
                  <input 
                    type="email" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 font-semibold text-gray-700 outline-none transition-all placeholder:text-gray-300"
                    placeholder="example@arvindu.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">Secret Password</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-300 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                    <i className="fa-solid fa-lock text-sm"></i>
                  </div>
                  <input 
                    type="password" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 font-semibold text-gray-700 outline-none transition-all placeholder:text-gray-300"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition-colors">Forgot Password?</a>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                  <i className="fa-solid fa-circle-exclamation text-base"></i>
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-[#07294d] text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-[#0a3666] hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3 mt-4"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Portal</span>
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <a href="/" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#07294d] transition-colors group">
                <i className="fa-solid fa-house-chimney group-hover:-translate-x-1 transition-transform"></i>
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 space-y-2">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            &copy; 2025 Arvindu Classes. Authorized Access Only.
          </p>
          <div className="flex justify-center gap-4 text-[10px] font-bold text-gray-300">
            <a href="#" className="hover:text-gray-500 uppercase tracking-widest">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-500 uppercase tracking-widest">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-500 uppercase tracking-widest">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
