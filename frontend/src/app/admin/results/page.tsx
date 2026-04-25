"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

export default function ManageResults() {
  const toppers = useQuery(api.toppers.getToppers);
  const createTopper = useMutation(api.toppers.createTopper);
  const deleteTopper = useMutation(api.toppers.deleteTopper);
  const toggleStatus = useMutation(api.toppers.toggleTopperStatus);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    score: "",
    stream: "Science",
    testMonth: "April 2025"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTopper(formData);
    setFormData({ name: "", rank: "", score: "", stream: "Science", testMonth: "April 2025" });
    setIsAdding(false);
  };

  if (!toppers) {
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
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Manage Toppers</h1>
          <p className="text-gray-500 font-medium text-sm sm:text-base mt-1">Showcase your best students on the website results page.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto text-sm ${
            isAdding 
              ? "bg-white text-gray-500 border border-gray-200" 
              : "bg-[#01228D] text-white shadow-blue-100/30"
          }`}
        >
          <i className={`fas ${isAdding ? "fa-times" : "fa-plus"}`}></i>
          <span>{isAdding ? "Close Form" : "Add New Topper"}</span>
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-blue-50 animate-in slide-in-from-top duration-500 mx-2 sm:mx-0">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Student Full Name</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none placeholder:text-gray-300"
                placeholder="e.g. Aryan Kumar"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rank Achieved</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none"
                placeholder="e.g. 1"
                value={formData.rank}
                onChange={(e) => setFormData({...formData, rank: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Total Score</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none"
                placeholder="e.g. 295/300"
                value={formData.score}
                onChange={(e) => setFormData({...formData, score: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Academic Stream</label>
              <select 
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none appearance-none cursor-pointer"
                value={formData.stream}
                onChange={(e) => setFormData({...formData, stream: e.target.value})}
              >
                <option>Science</option>
                <option>Commerce</option>
                <option>Arts</option>
                <option>Foundation (Class 9-10)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Test Session</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none"
                placeholder="e.g. April 2025"
                value={formData.testMonth}
                onChange={(e) => setFormData({...formData, testMonth: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full py-4 bg-[#ffc600] text-[#07294d] rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20 hover:shadow-xl transition-all active:scale-95">
                Publish Results
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toppers List */}
      {/* Toppers List - Desktop View */}
      <div className="hidden md:block bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Details</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Rank</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stream & Session</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Score</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-sans">
              {toppers.length > 0 ? toppers.map((topper) => (
                <tr key={topper._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-[#07294d] flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-lg shadow-blue-100 overflow-hidden flex-shrink-0">
                        <img src={`https://ui-avatars.com/api/?name=${topper.name}&background=07294d&color=fff&bold=true`} alt={topper.name} />
                      </div>
                      <div>
                        <p className="font-black text-gray-800 text-base leading-none">{topper.name}</p>
                        <p className="text-[10px] text-blue-500 font-black mt-2 uppercase tracking-widest">Verified Student</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-[#07294d] font-black text-sm shadow-md shadow-yellow-100">
                      #{topper.rank}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-bold text-gray-700">{topper.stream}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{topper.testMonth}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-black text-[#07294d] bg-gray-100 px-4 py-2 rounded-xl border border-gray-100 whitespace-nowrap">{topper.score}</span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => toggleStatus({ id: topper._id, isActive: !topper.isActive })}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm border ${
                          topper.isActive 
                            ? "bg-green-50 text-green-600 border-green-100" 
                            : "bg-gray-100 text-gray-400 border-gray-100"
                        }`}
                        title={topper.isActive ? "Visible on site" : "Hidden from site"}
                      >
                        <i className={`fas ${topper.isActive ? "fa-eye" : "fa-eye-slash"}`}></i>
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm("Permanently delete this result?")) deleteTopper({ id: topper._id });
                        }}
                        className="w-12 h-12 bg-red-50 text-red-600 border border-red-100 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Delete Result"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-300">
                      <i className="fas fa-trophy text-6xl opacity-20"></i>
                      <p className="font-black text-sm uppercase tracking-widest">No Toppers Found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toppers List - Mobile View */}
      <div className="md:hidden space-y-4 px-2">
        {toppers.length > 0 ? toppers.map((topper) => (
          <div key={topper._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 relative overflow-hidden">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#07294d] flex items-center justify-center text-white font-black text-lg border-2 border-white shadow-md flex-shrink-0">
                <img src={`https://ui-avatars.com/api/?name=${topper.name}&background=07294d&color=fff&bold=true`} alt={topper.name} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-gray-800 text-base">{topper.name}</h4>
                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-[#07294d] font-black text-xs flex items-center justify-center shadow-sm">
                    #{topper.rank}
                  </div>
                </div>
                <p className="text-[10px] text-blue-500 font-black mt-0.5 uppercase tracking-widest">Verified Student</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Stream</p>
                <p className="text-xs font-bold text-gray-700 mt-1">{topper.stream}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Score</p>
                <p className="text-xs font-black text-[#01228D] mt-1">{topper.score}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Session</p>
                <p className="text-xs font-bold text-gray-600 mt-1">{topper.testMonth}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${topper.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {topper.isActive ? "Visible" : "Hidden"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => toggleStatus({ id: topper._id, isActive: !topper.isActive })}
                className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  topper.isActive 
                    ? "bg-green-50 text-green-600 border border-green-100" 
                    : "bg-gray-100 text-gray-400 border border-gray-200"
                }`}
              >
                <i className={`fas ${topper.isActive ? "fa-eye" : "fa-eye-slash"}`}></i>
                {topper.isActive ? "Hide" : "Show"}
              </button>
              <button 
                onClick={() => { if (confirm("Delete this result?")) deleteTopper({ id: topper._id }); }}
                className="flex-1 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <i className="fas fa-trash-alt"></i>
                Delete
              </button>
            </div>
          </div>
        )) : (
          <div className="py-20 bg-white rounded-3xl border border-gray-50 text-center px-4">
             <i className="fas fa-trophy text-5xl text-gray-100 mb-4"></i>
             <p className="font-black text-sm uppercase tracking-widest text-gray-300">No Toppers Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
