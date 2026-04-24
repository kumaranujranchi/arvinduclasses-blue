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
        });
      } else {
        await createUser({
          ...formData,
          createdBy: creator,
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
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Create and manage access roles for the platform.</p>
        </div>
        <button 
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="bg-[#07294d] hover:bg-[#0a3666] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
        >
          <i className="fas fa-user-plus"></i>
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">User Details</th>
                <th className="p-4 font-bold">Role</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Created At</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      user.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                      user.role === 'teacher' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleStatus({ id: user._id, isActive: !user.isActive })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        user.isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end items-center gap-4">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="text-gray-600 hover:text-blue-600 transition-all transform hover:scale-110 p-1"
                        title="Edit Profile"
                      >
                        <i className="fas fa-edit text-xl"></i>
                      </button>

                      <button 
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this user?")) {
                            deleteUser({ id: user._id });
                          }
                        }}
                        className="text-gray-600 hover:text-red-500 transition-all transform hover:scale-110 p-1"
                        title="Delete User"
                      >
                        <i className="fas fa-trash-alt text-xl"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
