"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminDashboard() {
  const stats = useQuery(api.leads.getDashboardStats);

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
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2 font-medium">Welcome back, Anuj! Here's what's happening with Arvindu Classes today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-50 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-gray-600">System Live</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{card.label}</p>
                <h3 className="text-4xl font-black text-gray-900 mt-2">{card.value}</h3>
              </div>
              <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ${card.shadow} group-hover:scale-110 transition-transform`}>
                <i className={card.icon}></i>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">+12%</span>
              <span className="text-gray-300 text-[10px] font-bold uppercase tracking-wider">Growth vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-xl font-bold text-gray-900">Recent Course Leads</h3>
            <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm">View All Leads</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-gray-50">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.recentLeads.length > 0 ? stats.recentLeads.map((lead: any) => (
                  <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm border-2 border-white shadow-sm">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm leading-none">{lead.name}</p>
                          <p className="text-[11px] text-gray-400 mt-1 font-medium">{lead.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 tracking-tight">{lead.course}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm ${
                        lead.status === 'new' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[11px] text-gray-400 font-bold">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold italic tracking-wide">No leads found yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Toppers Preview */}
        <div className="space-y-8">
          <div className="bg-[#07294d] p-10 rounded-3xl shadow-xl shadow-blue-100 text-white relative overflow-hidden group">
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl mb-6">
                <i className="fas fa-bolt text-[#ffc600]"></i>
              </div>
              <h3 className="text-2xl font-bold">Quick Actions</h3>
              <p className="text-white/50 text-sm mt-3 font-medium">Instantly manage your website content without leaving the dashboard.</p>
              <div className="mt-10 space-y-4">
                <button className="w-full py-4 bg-[#ffc600] text-[#07294d] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-yellow-500/20 active:scale-95 flex items-center justify-center gap-3">
                  <i className="fas fa-plus"></i> Add New Topper
                </button>
                <button className="w-full py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                  Write Blog Post
                </button>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute top-10 right-10 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest text-[10px]">Enrollment Split</h3>
              <i className="fas fa-chart-pie text-gray-300"></i>
            </div>
            <div className="space-y-8">
              {[
                { name: "Digital Marketing", count: 45, color: "bg-blue-500", icon: "fas fa-bullhorn" },
                { name: "Engineering (JEE)", count: 32, color: "bg-orange-500", icon: "fas fa-atom" },
                { name: "Commerce (B.Com)", count: 28, color: "bg-green-500", icon: "fas fa-chart-line" }
              ].map((c, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${c.color}/10 flex items-center justify-center text-xs ${c.color.replace('bg-', 'text-')}`}>
                        <i className={c.icon}></i>
                      </div>
                      <span className="text-gray-700 text-xs">{c.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs font-black">{c.count}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden shadow-inner">
                    <div className={`${c.color} h-full rounded-full transition-all duration-1000 delay-300 shadow-sm`} style={{ width: `${c.count}%` }}></div>
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
