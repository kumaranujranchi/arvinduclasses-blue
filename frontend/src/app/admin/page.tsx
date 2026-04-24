"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const stats = useQuery(api.courses.getDashboardStats);
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const sessionStr = localStorage.getItem("user_session");
    if (sessionStr) {
      try {
        const user = JSON.parse(sessionStr);
        setUserName(user.name.split(" ")[0]);
      } catch (e) {}
    }
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#01228D] border-r-transparent"></div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, icon: "fas fa-users", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "New Admissions", value: stats.newLeads, icon: "fas fa-graduation-cap", color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Courses", value: stats.totalCourses, icon: "fas fa-book", color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Total Toppers", value: stats.totalToppers, icon: "fas fa-award", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      
      {/* Top Section: Welcome Card & Main Stat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Card - Matches "Congratulations Jonathan" */}
        <div className="lg:col-span-2 bg-white rounded-[24px] p-8 border border-gray-100 flex items-center justify-between overflow-hidden relative group">
          <div className="relative z-10">
            <h1 className="text-xl font-bold text-gray-800">Welcome Back, {userName}!</h1>
            <p className="text-sm text-gray-500 mt-2 max-w-[300px] leading-relaxed">
              You have {stats.newLeads} new admissions this month. Keep up the great work in managing Arvindu Classes!
            </p>
            <div className="mt-8 flex gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#01228D] leading-none">{stats.totalLeads}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">Total Inquiries</span>
              </div>
              <div className="flex flex-col border-l border-gray-100 pl-6">
                <span className="text-2xl font-black text-green-600 leading-none">{stats.newLeads}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">Successful Admits</span>
              </div>
            </div>
            <button className="mt-8 px-6 py-2.5 bg-[#01228D] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-[#001970] transition-all active:scale-95">
              Download Reports
            </button>
          </div>
          
          {/* Illustration Mockup */}
          <div className="hidden md:block relative w-48 h-48">
            <div className="absolute inset-0 bg-blue-50 rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
            <img 
              src="https://img.freepik.com/free-vector/analytics-concept-illustration_114360-4416.jpg" 
              alt="Dashboard" 
              className="relative z-10 w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Background Decorative Blob */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl"></div>
        </div>

        {/* Mini Stats Grid - Matches the right side boxes in reference */}
        <div className="grid grid-cols-2 gap-4">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white p-5 rounded-[20px] border border-gray-50 hover:shadow-sm transition-all flex flex-col justify-between">
              <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center text-sm`}>
                <i className={card.icon}></i>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-black text-gray-800 leading-none">{card.value}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Recent Leads Table */}
      <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Recent Inquiries</h3>
            <p className="text-xs text-gray-400 font-medium mt-1">Showing the latest students who reached out via the website.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-50 p-1.5 rounded-lg flex border border-gray-100">
              <button className="px-3 py-1 bg-white shadow-sm text-[10px] font-bold rounded-md text-[#01228D]">New</button>
              <button className="px-3 py-1 text-[10px] font-bold text-gray-400">Processed</button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Details</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Interested In</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recentLeads.length > 0 ? stats.recentLeads.map((lead: any) => (
                <tr key={lead._id} className="group hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 leading-none">{lead.name}</p>
                        <p className="text-[11px] text-gray-400 font-medium mt-1">{lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-[11px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">{lead.course}</span>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      lead.status === 'new' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-green-50 text-green-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${lead.status === 'new' ? 'bg-blue-600' : 'bg-green-600'}`}></span>
                      {lead.status === 'new' ? 'Pending' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-[11px] text-gray-400 font-bold">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-8 py-4 text-center">
                    <button className="text-gray-400 hover:text-[#01228D] transition-colors">
                      <i className="fas fa-ellipsis-h text-sm"></i>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold text-sm">No leads found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer - Like in reference */}
        <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing last 5 leads</p>
          <button className="text-[11px] font-bold text-[#01228D] hover:underline">View All Leads</button>
        </div>
      </div>
    </div>
  );
}
