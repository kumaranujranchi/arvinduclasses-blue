"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ManageLeads() {
  const leads = useQuery(api.leads.getLeads);
  const updateStatus = useMutation(api.leads.updateLeadStatus);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!leads) {
    return (
      <div className="flex items-center justify-center h-screen -mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#07294d] border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Student Leads</h1>
          <p className="text-gray-500 font-medium text-sm sm:text-base mt-1">Review and manage student enquiries and demo bookings.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-50 shadow-sm w-full sm:w-auto overflow-x-auto">
          <div className="px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] sm:text-xs font-black uppercase whitespace-nowrap">Total: {leads.length}</div>
          <div className="px-3 sm:px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] sm:text-xs font-black uppercase whitespace-nowrap">Active: {leads.filter(l => l.status === 'new').length}</div>
        </div>
      </div>

      {/* Leads List - Desktop View */}
      <div className="hidden md:block bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Info</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Applied Course</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type & Locality</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-sans">
              {leads.length > 0 ? leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl border-4 border-white shadow-lg shadow-blue-100 flex-shrink-0">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-800 text-base leading-none">{lead.name}</p>
                        <p className="text-[11px] text-gray-400 font-bold mt-2">{lead.email} | {lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    {lead.course ? (
                      <span className="text-sm font-black text-blue-700 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 inline-block whitespace-nowrap">
                        {lead.course}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-gray-400 italic">No Course</span>
                    )}
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-bold text-gray-700 capitalize">{lead.type}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{lead.locality}</p>
                  </td>
                  <td className="px-10 py-8">
                    <select 
                      value={lead.status}
                      onChange={(e) => {
                        const sessionStr = localStorage.getItem("user_session");
                        const currentUser = sessionStr ? JSON.parse(sessionStr) : null;
                        updateStatus({ 
                          id: lead._id, 
                          status: e.target.value,
                          adminId: currentUser?.userId || "unknown",
                          adminName: currentUser?.name || "Unknown Admin"
                        });
                      }}
                      className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border-none outline-none shadow-sm cursor-pointer transition-all ${
                        lead.status === 'new' ? 'bg-blue-500 text-white' : 
                        lead.status === 'contacted' ? 'bg-orange-400 text-white' :
                        lead.status === 'admitted' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                      }`}
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="admitted">Admitted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-10 py-8 text-right text-gray-300">
                    <span className="text-[11px] font-bold">{new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-300">
                      <i className="fas fa-inbox text-6xl opacity-20"></i>
                      <p className="font-black text-sm uppercase tracking-widest">No Enquiries Yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leads List - Mobile View */}
      <div className="md:hidden space-y-3 px-2">
        {leads.length > 0 ? leads.map((lead) => {
          const isExpanded = expandedId === lead._id;
          return (
            <div key={lead._id} className={`bg-white rounded-3xl border border-gray-50 shadow-sm transition-all duration-300 overflow-hidden ${isExpanded ? 'ring-2 ring-blue-100 shadow-md' : ''}`}>
              {/* Header - Always Visible */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : lead._id)}
                className="p-5 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm border-2 border-white shadow-sm transition-colors ${
                    isExpanded ? 'bg-[#01228D] text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-sm leading-tight">{lead.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {lead.status}
                    </p>
                  </div>
                </div>
                <i className={`fas fa-chevron-down text-gray-300 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-500' : ''}`}></i>
              </div>

              {/* Details - Collapsable */}
              {isExpanded && (
                <div className="px-5 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50 mb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email</p>
                      <p className="text-xs font-bold text-gray-700 mt-1 break-all">{lead.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</p>
                      <p className="text-xs font-bold text-gray-700 mt-1">{lead.phone}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Course</p>
                      <p className="text-xs font-bold text-blue-700 mt-1">{lead.course || 'No Course'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Type</p>
                      <p className="text-xs font-bold text-gray-700 mt-1 capitalize">{lead.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Locality</p>
                      <p className="text-xs font-bold text-gray-600 mt-1 capitalize">{lead.locality || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Applied On</p>
                      <p className="text-xs font-bold text-gray-600 mt-1">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Status</label>
                    <select 
                      value={lead.status}
                      onChange={(e) => {
                        const sessionStr = localStorage.getItem("user_session");
                        const currentUser = sessionStr ? JSON.parse(sessionStr) : null;
                        updateStatus({ 
                          id: lead._id, 
                          status: e.target.value,
                          adminId: currentUser?.userId || "unknown",
                          adminName: currentUser?.name || "Unknown Admin"
                        });
                      }}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="admitted">Admitted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        }) : (
          <div className="py-20 bg-white rounded-3xl border border-gray-50 text-center px-4">
             <i className="fas fa-inbox text-5xl text-gray-100 mb-4"></i>
             <p className="font-black text-sm uppercase tracking-widest text-gray-300">No Enquiries Yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
