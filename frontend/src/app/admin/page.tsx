"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminDashboard() {
  const stats = useQuery(api.courses.getDashboardStats);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen -mt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#07294d] border-r-transparent"></div>
          <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, icon: "fas fa-user-plus", color: "bg-blue-500", shadow: "shadow-blue-100" },
    { label: "New Admissions", value: stats.newLeads, icon: "fas fa-graduation-cap", color: "bg-green-500", shadow: "shadow-green-100" },
    { label: "Active Courses", value: stats.totalCourses, icon: "fas fa-book-open", color: "bg-orange-500", shadow: "shadow-orange-100" },
    { label: "Toppers Added", value: stats.totalToppers, icon: "fas fa-award", color: "bg-purple-500", shadow: "shadow-purple-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
        <div>
          <h1 className="text-2xl font-extrabold text-[#07294d] tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Welcome back! Here's what's happening with Arvindu Classes today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#f0fdf4] px-4 py-2 rounded-full shadow-sm border border-[#bbf7d0] flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-green-700 tracking-wide uppercase">System Live</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest leading-none">{card.label}</p>
                <h3 className="text-3xl font-black text-[#07294d] leading-none">{card.value}</h3>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg ${card.shadow} group-hover:scale-110 transition-transform`}>
                <i className={card.icon}></i>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-green-600 text-[10px] font-black bg-green-50 px-2 py-1 rounded-md tracking-wider">+12%</span>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10 items-start">
        {/* Recent Leads - Takes up 2 columns on extra large screens */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
            <h3 className="text-lg font-bold text-[#07294d]">Recent Course Leads</h3>
            <button className="px-4 py-2 bg-gray-50 rounded-xl text-[#07294d] font-bold text-xs hover:bg-[#07294d] hover:text-white transition-colors shadow-sm">View All Leads</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Student</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Course</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.recentLeads.length > 0 ? stats.recentLeads.map((lead: any) => (
                  <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="font-bold text-[#07294d] text-sm leading-tight">{lead.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium leading-tight">{lead.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-[#07294d] bg-gray-100 px-2.5 py-1 rounded-md whitespace-nowrap">{lead.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md whitespace-nowrap ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[11px] text-gray-400 font-bold text-right whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center text-gray-400 font-bold text-sm tracking-wide">No leads found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar - Takes 1 column */}
        <div className="flex flex-col gap-6 h-full">
          {/* Quick Actions */}
          <div className="bg-[#07294d] p-8 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg text-[#EAB830]">
                  <i className="fas fa-bolt"></i>
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">Quick Actions</h3>
              </div>
              <p className="text-white/70 text-xs font-medium leading-relaxed mb-6">Manage critical tasks and content updates instantly from your dashboard.</p>
              
              <div className="space-y-3">
                <button className="w-full py-3.5 bg-[#EAB830] text-[#07294d] rounded-xl font-bold text-sm hover:bg-white transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                  <i className="fas fa-user-plus text-xs"></i> Add New Topper
                </button>
                <button className="w-full py-3.5 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-white/10">
                  <i className="fas fa-pen-nib text-xs"></i> Write Blog Post
                </button>
              </div>
            </div>
            
            {/* Decorative Orbs */}
            <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-[#EAB830]/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          {/* Enrollment Split */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Enrollment Split</h3>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <i className="fas fa-chart-pie text-sm"></i>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { name: "Digital Marketing", count: 45, color: "bg-blue-500", icon: "fas fa-bullhorn" },
                { name: "Engineering (JEE)", count: 32, color: "bg-orange-500", icon: "fas fa-atom" },
                { name: "Commerce (B.Com)", count: 28, color: "bg-green-500", icon: "fas fa-chart-line" }
              ].map((c, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-md ${c.color}/10 flex items-center justify-center ${c.color.replace('bg-', 'text-')}`}>
                        <i className={`${c.icon} text-[10px]`}></i>
                      </div>
                      <span className="text-[#07294d] text-xs font-bold">{c.name}</span>
                    </div>
                    <span className="text-gray-400 text-[11px] font-black">{c.count}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`${c.color} h-full rounded-full`} style={{ width: `${c.count}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
