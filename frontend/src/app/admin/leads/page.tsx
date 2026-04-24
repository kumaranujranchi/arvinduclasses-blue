"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ManageLeads() {
  const leads = useQuery(api.leads.getLeads);
  const updateStatus = useMutation(api.leads.updateLeadStatus);

  if (!leads) {
    return (
      <div className="flex items-center justify-center h-screen -mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#07294d] border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Student Leads</h1>
          <p className="text-gray-500 font-medium mt-1">Review and manage student enquiries and demo bookings.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-50 shadow-sm">
          <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase">Total: {leads.length}</div>
          <div className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-black uppercase">Active: {leads.filter(l => l.status === 'new').length}</div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden">
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
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl border-4 border-white shadow-lg shadow-blue-100">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-800 text-base leading-none">{lead.name}</p>
                        <p className="text-[11px] text-gray-400 font-bold mt-2">{lead.email} | {lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-black text-[#07294d] bg-gray-100 px-4 py-2 rounded-xl border border-gray-100">{lead.course}</span>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-bold text-gray-700 capitalize">{lead.type}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{lead.locality}</p>
                  </td>
                  <td className="px-10 py-8">
                    <select 
                      value={lead.status}
                      onChange={(e) => updateStatus({ id: lead._id, status: e.target.value })}
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
                      <p className="text-xs font-medium text-gray-400 max-w-xs">Leads will appear here automatically when students fill out the demo booking form.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
