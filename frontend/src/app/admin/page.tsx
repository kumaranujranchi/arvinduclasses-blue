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
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-10">
      
      {/* Top Section: Welcome Card & Main Stat */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Welcome Card */}
        <div className="xl:col-span-2 bg-[#01228D] rounded-[32px] p-10 flex items-center justify-between overflow-hidden relative shadow-2xl shadow-blue-900/20">
          <div className="relative z-10 text-white">
            <h1 className="text-3xl font-bold">Welcome Back, {userName}!</h1>
            <p className="text-blue-100 mt-4 max-w-[400px] text-lg leading-relaxed">
              You have {stats.newLeads} new admissions this month. Keep up the great work!
            </p>
            <div className="mt-10 flex gap-10">
              <div className="flex flex-col">
                <span className="text-3xl font-black">{stats.totalLeads}</span>
                <span className="text-xs font-medium text-blue-200 uppercase tracking-widest mt-2">Total Inquiries</span>
              </div>
              <div className="flex flex-col border-l border-blue-400/30 pl-10">
                <span className="text-3xl font-black">{stats.newLeads}</span>
                <span className="text-xs font-medium text-blue-200 uppercase tracking-widest mt-2">New Admits</span>
              </div>
            </div>
            <button className="mt-10 px-8 py-3 bg-white text-[#01228D] text-sm font-bold rounded-2xl shadow-xl hover:bg-blue-50 transition-all active:scale-95">
              Download Reports
            </button>
          </div>
          
          {/* Illustration */}
          <div className="hidden md:block relative w-64 h-64 mr-4">
            <img 
              src="https://img.freepik.com/free-vector/analytics-concept-illustration_114360-4416.jpg" 
              alt="Dashboard" 
              className="relative z-10 w-full h-full object-contain brightness-110 contrast-125"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        </div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                <i className={card.icon}></i>
              </div>
              <div className="mt-6">
                <h4 className="text-2xl font-black text-slate-800 leading-none">{card.value}</h4>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-3">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Recent Leads Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Recent Inquiries</h3>
            <p className="text-sm text-slate-400 font-medium mt-1">Latest students who reached out via the website.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-50 p-1.5 rounded-xl flex border border-slate-100">
              <button className="px-5 py-2 bg-white shadow-sm text-xs font-bold rounded-lg text-[#01228D]">New</button>
              <button className="px-5 py-2 text-xs font-bold text-slate-400">Processed</button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Student</th>
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Interested In</th>
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stats.recentLeads.length > 0 ? stats.recentLeads.map((lead: any) => (
                <tr key={lead._id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-[#01228D] font-bold text-base shadow-sm">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{lead.name}</p>
                        <p className="text-xs text-slate-400 font-medium mt-1">{lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">{lead.course}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold ${
                      lead.status === 'new' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-green-50 text-green-600'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${lead.status === 'new' ? 'bg-blue-600' : 'bg-green-600 animate-pulse'}`}></span>
                      {lead.status === 'new' ? 'Pending' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-400 font-bold">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-10 py-6 text-center">
                    <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-[#01228D] transition-all flex items-center justify-center mx-auto">
                      <i className="fas fa-ellipsis-v text-sm"></i>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center text-slate-300 font-bold text-lg">No leads found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="px-10 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing last 5 leads</p>
          <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#01228D] hover:bg-slate-50 transition-all shadow-sm">View All Leads</button>
        </div>
      </div>
    </div>
  );
}
