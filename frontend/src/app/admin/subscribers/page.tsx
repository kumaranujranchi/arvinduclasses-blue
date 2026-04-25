"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function SubscribersPage() {
  const subscribers = useQuery(api.leads.getSubscribers);

  if (!subscribers) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#01228D] border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1200px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">Newsletter Subscribers</h1>
          <p className="text-slate-400 font-medium text-sm sm:text-base mt-1">Manage your email marketing audience.</p>
        </div>
        <div className="bg-blue-50 px-4 sm:px-6 py-3 rounded-2xl border border-blue-100 flex items-center gap-3 w-full sm:w-auto">
          <i className="fas fa-envelope-open-text text-blue-600"></i>
          <span className="text-xs sm:text-sm font-black text-blue-900">{subscribers.length} Total Subscribers</span>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</th>
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Subscribed On</th>
                <th className="px-10 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscribers.length > 0 ? subscribers.map((sub: any) => (
                <tr key={sub._id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#01228D] font-bold text-sm">
                        <i className="far fa-envelope"></i>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{sub.email}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-400 font-bold">
                    {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-10 py-6 text-center">
                    <button className="w-9 h-9 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center mx-auto group">
                      <i className="far fa-trash-alt text-sm group-hover:scale-110 transition-transform"></i>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-10 py-20 text-center text-slate-300 font-bold text-lg italic">No subscribers found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {subscribers.length > 0 ? subscribers.map((sub: any) => (
          <div key={sub._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#01228D]">
                  <i className="far fa-envelope"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 break-all">{sub.email}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                    {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                <i className="far fa-trash-alt text-xs"></i>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Active
              </span>
            </div>
          </div>
        )) : (
          <div className="py-20 bg-white rounded-3xl border border-gray-100 text-center px-4">
            <p className="text-slate-300 font-bold">No subscribers found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
