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
      
      // Store session info (Role-based)
      localStorage.setItem("user_session", JSON.stringify(user));
      
      // Redirect based on role
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
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-100 overflow-hidden border border-gray-50">
          <div className="p-10 pb-6 text-center">
            <img src="/assets/images/arvindu-favicon.png" alt="Arvindu Classes" className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-3xl font-black text-[#07294d] tracking-tight">Portal Login</h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-3">Arvindu Classes Student & Staff Portal</p>
          </div>
          
          <div className="p-10 pt-0">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <div className="relative group">
                  <input 
                    type="email" 
                    required
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none transition-all"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors"></i>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    required
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors"></i>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-[11px] font-bold border border-red-100 text-center animate-shake">
                  <i className="fas fa-exclamation-circle mr-2"></i> {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-[#07294d] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-[#0a3666] hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0"
              >
                {isLoading ? "Signing in..." : "Access Portal"}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-50 text-center">
              <a href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-blue-500 transition-colors">
                <i className="fas fa-arrow-left mr-2"></i> Return to Website
              </a>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em]">
          &copy; 2025 Arvindu Classes. Authorized Personnel Only.
        </p>
      </div>
    </div>
  );
}
