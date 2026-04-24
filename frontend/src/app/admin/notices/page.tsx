"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

export default function ManageNotices() {
  const notices = useQuery(api.notices.getAllAdmin);
  const createNotice = useMutation(api.notices.createNotice);
  const deleteNotice = useMutation(api.notices.deleteNotice);
  const toggleStatus = useMutation(api.notices.toggleNoticeStatus);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", isImportant: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNotice(formData);
    setFormData({ title: "", content: "", isImportant: false });
    setIsAdding(false);
  };

  if (!notices) {
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Announcements</h1>
          <p className="text-gray-500 font-medium mt-1">Manage the scrolling news ticker and important alerts.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#07294d] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 flex items-center gap-3 transition-all active:scale-95"
        >
          <i className={`fas ${isAdding ? "fa-times" : "fa-plus"}`}></i>
          {isAdding ? "Close" : "New Notice"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-50 animate-in slide-in-from-top duration-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Notice Title</label>
                <input 
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none placeholder:text-gray-300"
                  placeholder="e.g. Admission Open"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-4 pt-8">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={formData.isImportant}
                    onChange={(e) => setFormData({...formData, isImportant: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Mark as Important</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Notice Content</label>
              <textarea 
                required
                rows={3}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none placeholder:text-gray-300"
                placeholder="e.g. Admission open for JEE 2026 batches! Contact us for a free demo class."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-10 py-4 bg-[#ffc600] text-[#07294d] rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20 hover:shadow-xl transition-all active:scale-95">
                Publish Notice
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {notices.length > 0 ? notices.map((notice) => (
          <div key={notice._id} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-6 flex-1">
              <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
                notice.isImportant ? "bg-red-500 text-white" : "bg-blue-500 text-white"
              }`}>
                <i className={notice.isImportant ? "fas fa-exclamation-circle" : "fas fa-bullhorn"}></i>
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-[#07294d] text-sm uppercase tracking-tight">{notice.title}</h4>
                <p className="font-bold text-gray-800 text-base leading-snug mt-1">{notice.content}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">
                    {new Date(notice.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end md:self-center">
               <button 
                onClick={() => toggleStatus({ id: notice._id, isActive: !notice.isActive })}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${
                  notice.isActive 
                    ? "bg-green-50 text-green-600 border-green-100" 
                    : "bg-gray-50 text-gray-300 border-gray-50"
                }`}
                title={notice.isActive ? "Live on site" : "Hidden"}
              >
                <i className={`fas ${notice.isActive ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
              <button 
                onClick={() => { if(confirm("Permanently delete this announcement?")) deleteNotice({ id: notice._id }) }}
                className="w-12 h-12 bg-red-50 text-red-500 border border-red-100 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                title="Delete Notice"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        )) : (
          <div className="py-20 bg-white rounded-[32px] border border-gray-50 text-center">
             <div className="flex flex-col items-center gap-4 text-gray-300">
                <i className="fas fa-bell-slash text-6xl opacity-20"></i>
                <p className="font-black text-sm uppercase tracking-widest">No Active Notices</p>
                <p className="text-xs font-medium text-gray-400">Post announcements to inform students about exams, holidays, or new batches.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
