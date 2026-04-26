"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateProfile = useMutation(api.auth.updateProfile);

  useEffect(() => {
    const sessionStr = localStorage.getItem("user_session");
    if (sessionStr) {
      const parsedUser = JSON.parse(sessionStr);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        phone: parsedUser.phone || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData: any = {
        userId: user.userId,
        name: formData.name,
        phone: formData.phone,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const updatedUser = await updateProfile(updateData);
      
      if (updatedUser) {
        // Update local session
        const newSession = { ...user, ...updatedUser };
        localStorage.setItem("user_session", JSON.stringify(newSession));
        setUser(newSession);
        
        toast.success("Profile updated successfully!");
        setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
        
        // Force header update by dispatching event or just reloading (reloading is safer for session sync)
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Profile</h1>
        <p className="text-slate-500 font-medium">Manage your personal information and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50 text-center sticky top-8">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=01228D&color=fff&bold=true&size=128`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            
            <h2 className="text-xl font-black text-slate-800 mb-1">{user.name}</h2>
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
              {user.role?.replace("_", " ")}
            </p>
            
            <div className="pt-6 border-t border-slate-50 space-y-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xs">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-xs font-bold text-slate-600 truncate">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-xs font-bold text-slate-600 truncate">{user.phone || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Information */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#01228D]">
                  <i className="fas fa-id-card"></i>
                </div>
                <h3 className="text-lg font-black text-slate-800">General Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all outline-none font-bold text-slate-700"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative">
                    <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all outline-none font-bold text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <i className="fas fa-lock"></i>
                </div>
                <h3 className="text-lg font-black text-slate-800">Change Password</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">New Password</label>
                  <div className="relative">
                    <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Leave blank to keep current"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all outline-none font-bold text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Confirm New Password</label>
                  <div className="relative">
                    <i className="fas fa-check-circle absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all outline-none font-bold text-slate-700"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[11px] text-slate-400 font-bold">
                <i className="fas fa-info-circle mr-1"></i>
                Only fill these fields if you want to update your password.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 bg-[#01228D] text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    Updating...
                  </span>
                ) : (
                  "Save Profile Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
