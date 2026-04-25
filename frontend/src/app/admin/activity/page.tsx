"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ActivityLogPage() {
  const logs = useQuery(api.activity.getLogs);

  if (!logs) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#01228D] border-r-transparent"></div>
      </div>
    );
  }

  const getActionColor = (action: string) => {
    switch (action.toUpperCase()) {
      case 'CREATE': return 'bg-green-50 text-green-600 border-green-100';
      case 'UPDATE': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'DELETE': return 'bg-red-50 text-red-600 border-red-100';
      case 'LOGIN': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module.toUpperCase()) {
      case 'USERS': return 'fa-user-shield';
      case 'LEADS': return 'fa-user-graduate';
      case 'COURSES': return 'fa-book';
      case 'ROLES': return 'fa-users-gear';
      case 'AUTH': return 'fa-key';
      default: return 'fa-cog';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1200px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">System Activity Log</h1>
          <p className="text-slate-400 font-medium text-sm sm:text-base mt-1">Track real-time actions performed by all administrative users.</p>
        </div>
        <div className="bg-slate-800 px-4 sm:px-6 py-3 rounded-2xl border border-slate-700 flex items-center gap-3 text-white shadow-xl shadow-slate-100 w-full sm:w-auto">
          <i className="fas fa-history text-blue-400"></i>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest">Live Audit Trail</span>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time & Date</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Module</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.length > 0 ? logs.map((log: any) => (
                <tr key={log._id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-10 py-6">
                    <p className="text-sm font-bold text-slate-800">
                      {new Date(log.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                      {new Date(log.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-black text-xs">
                        {log.userName.charAt(0)}
                      </div>
                      <p className="text-sm font-bold text-slate-800">{log.userName}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                      <i className={`fas ${getModuleIcon(log.module)} w-4`}></i>
                      {log.module}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-sm text-slate-600 font-medium">{log.description}</p>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-200">
                      <i className="fas fa-terminal text-6xl"></i>
                      <p className="font-black text-sm uppercase tracking-widest italic">No activities recorded yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-100">
          {logs.length > 0 ? logs.map((log: any) => (
            <div key={log._id} className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 font-black text-xs shadow-sm">
                    {log.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{log.userName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {new Date(log.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} • {new Date(log.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${getActionColor(log.action)}`}>
                  {log.action}
                </span>
              </div>
              
              <div className="bg-slate-50/50 rounded-2xl p-3 space-y-2">
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <i className={`fas ${getModuleIcon(log.module)} w-3`}></i>
                  <span>Module: {log.module}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{log.description}</p>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center text-slate-200 uppercase tracking-widest font-black text-xs italic">
              No activities found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
