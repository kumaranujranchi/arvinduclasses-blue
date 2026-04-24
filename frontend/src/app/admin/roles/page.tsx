"use client";

import React, { useState } from 'react';

const FEATURES = [
  { id: 'leads', name: 'Leads Management', description: 'Access to student enquiries and admissions' },
  { id: 'users', name: 'User Management', description: 'Ability to create and manage admin users' },
  { id: 'courses', name: 'Course Catalog', description: 'Manage course listings and details' },
  { id: 'notices', name: 'Notice Board', description: 'Post and manage announcements' },
  { id: 'roles', name: 'Role Management', description: 'Define system access levels' },
];

const ROLES = [
  { id: 'super_admin', name: 'Super Admin', color: 'bg-purple-100 text-purple-700' },
  { id: 'admin', name: 'Administrator', color: 'bg-blue-100 text-blue-700' },
  { id: 'counsellor', name: 'Counsellor', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'sales', name: 'Sales Executive', color: 'bg-orange-100 text-orange-700' },
];

export default function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState(ROLES[0].id);
  const [permissions, setPermissions] = useState<Record<string, Record<string, { view: boolean; edit: boolean; delete: boolean }>>>({
    super_admin: {
      leads: { view: true, edit: true, delete: true },
      users: { view: true, edit: true, delete: true },
      courses: { view: true, edit: true, delete: true },
      notices: { view: true, edit: true, delete: true },
      roles: { view: true, edit: true, delete: true },
    },
    admin: {
      leads: { view: true, edit: true, delete: false },
      users: { view: true, edit: false, delete: false },
      courses: { view: true, edit: true, delete: true },
      notices: { view: true, edit: true, delete: true },
      roles: { view: false, edit: false, delete: false },
    }
  });

  const handleToggle = (roleId: string, featureId: string, type: 'view' | 'edit' | 'delete') => {
    setPermissions(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [featureId]: {
          ...(prev[roleId]?.[featureId] || { view: false, edit: false, delete: false }),
          [type]: !prev[roleId]?.[featureId]?.[type]
        }
      }
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Role Management</h1>
          <p className="text-gray-500 font-medium mt-1">Define access levels and feature permissions for each user role.</p>
        </div>
        <button className="px-6 py-3 bg-[#01228D] text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all flex items-center gap-2">
          <i className="fas fa-plus"></i>
          Create New Role
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Roles List */}
        <div className="w-full lg:w-80 space-y-3">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full p-5 rounded-[24px] border transition-all text-left group ${
                selectedRole === role.id
                  ? 'bg-[#01228D] border-[#01228D] shadow-xl shadow-blue-100'
                  : 'bg-white border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-black text-base ${selectedRole === role.id ? 'text-white' : 'text-gray-800'}`}>
                  {role.name}
                </span>
                <i className={`fas fa-chevron-right text-xs transition-transform ${selectedRole === role.id ? 'text-blue-200 translate-x-1' : 'text-gray-300'}`}></i>
              </div>
              <div className="mt-3 flex gap-2">
                <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase tracking-wider ${
                  selectedRole === role.id ? 'bg-blue-800/50 text-blue-100' : role.color
                }`}>
                  {role.id.replace('_', ' ')}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Permissions Table */}
        <div className="flex-1 bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden">
          <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
            <div>
              <h3 className="font-black text-xl text-gray-900">Permissions for {ROLES.find(r => r.id === selectedRole)?.name}</h3>
              <p className="text-gray-400 text-sm font-medium mt-1">Toggle switches to enable or disable features.</p>
            </div>
            <button className="px-5 py-2.5 bg-green-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-100 hover:scale-105 transition-all">
              Save Changes
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Feature / Module</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">View</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Edit</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {FEATURES.map((feature) => (
                  <tr key={feature.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                          <i className={`fas ${
                            feature.id === 'leads' ? 'fa-user-graduate' :
                            feature.id === 'users' ? 'fa-user-shield' :
                            feature.id === 'courses' ? 'fa-book' :
                            feature.id === 'notices' ? 'fa-bullhorn' : 'fa-cog'
                          }`}></i>
                        </div>
                        <div>
                          <p className="font-black text-gray-800 text-sm">{feature.name}</p>
                          <p className="text-[11px] text-gray-400 font-bold mt-0.5">{feature.description}</p>
                        </div>
                      </div>
                    </td>
                    {['view', 'edit', 'delete'].map((type) => (
                      <td key={type} className="px-8 py-6 text-center">
                        <button
                          onClick={() => handleToggle(selectedRole, feature.id, type as any)}
                          className={`w-12 h-6 rounded-full p-1 transition-all relative ${
                            permissions[selectedRole]?.[feature.id]?.[type as 'view' | 'edit' | 'delete']
                              ? 'bg-blue-600'
                              : 'bg-gray-200'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-all shadow-sm ${
                            permissions[selectedRole]?.[feature.id]?.[type as 'view' | 'edit' | 'delete']
                              ? 'translate-x-6'
                              : 'translate-x-0'
                          }`} />
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
