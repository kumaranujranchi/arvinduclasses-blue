"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function UserManagement() {
  const users = useQuery(api.auth.getAllUsers);
  const createUser = useMutation(api.auth.createUser);
  const updateUser = useMutation(api.auth.updateUser);
  const toggleStatus = useMutation(api.auth.toggleUserStatus);
  const deleteUser = useMutation(api.auth.deleteUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    phone: "",
  });
  const [error, setError] = useState("");

  const roles = [
    "super_admin", "admin", "student", "teacher", 
    "counsellor", "accounts", "sales", "operations"
  ];

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password || "", // Existing password might not be returned in query if security is tight, but here it is
      role: user.role,
      phone: user.phone || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const sessionStr = localStorage.getItem("user_session");
      const creator = sessionStr ? JSON.parse(sessionStr).userId : "system";

      if (editingUser) {
        await updateUser({
          id: editingUser._id,
          name: formData.name,
          role: formData.role,
          phone: formData.phone,
          password: formData.password,
          adminId: sessionStr ? JSON.parse(sessionStr).userId : "system",
          adminName: sessionStr ? JSON.parse(sessionStr).name : "System",
        });
      } else {
        await createUser({
          ...formData,
          createdBy: creator,
          creatorName: sessionStr ? JSON.parse(sessionStr).name : "System",
        });
      }
      
      closeModal();
    } catch (err: any) {
      setError(err.message || "Operation failed");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "", role: "student", phone: "" });
    setError("");
  };

  if (!users) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#07294d] border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Create and manage access roles for the platform.</p>
        </div>
        <button 
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="bg-[#01228D] hover:bg-blue-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto text-sm"
        >
          <i className="fas fa-user-plus"></i>
          <span>Add New User</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-[10px] uppercase tracking-widest font-black">
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#01228D] font-bold shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider ${
                      user.role === 'super_admin' ? 'bg-purple-50 text-purple-700' :
                      user.role === 'admin' ? 'bg-blue-50 text-blue-700' :
                      user.role === 'teacher' ? 'bg-green-50 text-green-700' :
                      'bg-slate-50 text-slate-700'
                    }`}>
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {
                        const sessionStr = localStorage.getItem("user_session");
                        const admin = sessionStr ? JSON.parse(sessionStr) : null;
                        toggleStatus({ 
                          id: user._id, 
                          isActive: !user.isActive,
                          adminId: admin?.userId || "system",
                          adminName: admin?.name || "System"
                        });
                      }}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                        user.isActive ? 'bg-green-500' : 'bg-slate-200'
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${
                        user.isActive ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-bold">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button onClick={() => handleEdit(user)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-all">
                        <i className="fas fa-edit text-xs"></i>
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm("Are you sure?")) {
                            const sessionStr = localStorage.getItem("user_session");
                            const admin = sessionStr ? JSON.parse(sessionStr) : null;
                            deleteUser({ id: user._id, adminId: admin?.userId || "system", adminName: admin?.name || "System" });
                          }
                        }}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-all"
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-gray-100">
          {users.map((user) => {
            const isExpanded = expandedId === user._id;
            return (
              <div key={user._id} className={`transition-all duration-300 ${isExpanded ? 'bg-blue-50/30' : ''}`}>
                {/* Header - Always Visible */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : user._id)}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-sm transition-colors ${
                      isExpanded ? 'bg-[#01228D] text-white' : 'bg-blue-50 text-[#01228D]'
                    }`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{user.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                      user.role === 'super_admin' ? 'bg-purple-50 text-purple-700' :
                      user.role === 'admin' ? 'bg-blue-50 text-blue-700' :
                      user.role === 'teacher' ? 'bg-green-50 text-green-700' :
                      'bg-slate-50 text-slate-700'
                    }`}>
                      {user.role.replace("_", " ")}
                    </span>
                    <i className={`fas fa-chevron-down text-gray-300 text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-500' : ''}`}></i>
                  </div>
                </div>

                {/* Collapsable Details */}
                {isExpanded && (
                  <div className="px-4 pb-5 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-100/50">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                        <p className="text-xs font-bold text-gray-700">{user.phone || 'Not provided'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Account Status</p>
                        <div className="flex items-center gap-2 mt-1">
                           <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const sessionStr = localStorage.getItem("user_session");
                              const admin = sessionStr ? JSON.parse(sessionStr) : null;
                              toggleStatus({ 
                                id: user._id, 
                                isActive: !user.isActive,
                                adminId: admin?.userId || "system",
                                adminName: admin?.name || "System"
                              });
                            }}
                            className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                              user.isActive ? 'bg-green-500' : 'bg-slate-200'
                            }`}
                          >
                            <span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform shadow-sm ${
                              user.isActive ? 'translate-x-5' : 'translate-x-0.5'
                            }`} />
                          </button>
                          <span className={`text-[10px] font-bold ${user.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                            {user.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Joined On</p>
                        <p className="text-xs font-bold text-gray-600">{new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEdit(user); }}
                        className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:bg-blue-100 transition-colors border border-blue-100/50"
                      >
                        <i className="fas fa-edit"></i>
                        Edit User
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Permanently delete this user?")) {
                            const sessionStr = localStorage.getItem("user_session");
                            const admin = sessionStr ? JSON.parse(sessionStr) : null;
                            deleteUser({ id: user._id, adminId: admin?.userId || "system", adminName: admin?.name || "System" });
                          }
                        }}
                        className="flex-1 py-3 bg-red-50 text-red-500 rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:bg-red-100 transition-colors border border-red-100/50"
                      >
                        <i className="fas fa-trash-alt"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {users.length === 0 && (
          <div className="p-12 text-center text-slate-300 font-bold">No users found.</div>
        )}
      </div>

      {/* User Modal (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-red-500">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-50 text-red-500 rounded-lg text-sm font-bold border border-red-100">{error}</div>}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Full Name *</label>
                  <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                  <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address {editingUser && "(Read-only)"} *</label>
                <input 
                  type="email" 
                  required 
                  disabled={!!editingUser}
                  className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none ${editingUser ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-gray-50 focus:bg-white'}`}
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Assign Role *</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none font-bold text-gray-700"
                    value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role.replace("_", " ").toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Password *</label>
                  <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none" 
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-6 py-3 rounded-xl font-bold text-white bg-[#07294d] hover:bg-[#0a3666] shadow-md">
                  {editingUser ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
