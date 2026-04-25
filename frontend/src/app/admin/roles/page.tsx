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
  { id: 'student', name: 'Student', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'teacher', name: 'Teacher', color: 'bg-rose-100 text-rose-700' },
  { id: 'counsellor', name: 'Counsellor', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'accounts', name: 'Accounts', color: 'bg-amber-100 text-amber-700' },
  { id: 'sales', name: 'Sales Executive', color: 'bg-orange-100 text-orange-700' },
  { id: 'operations', name: 'Operations', color: 'bg-cyan-100 text-cyan-700' },
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Role Management</h1>
          <p className="text-gray-500 font-medium mt-1">Define access levels and feature permissions for each user role.</p>
        </div>
        <button className="w-full md:w-auto px-6 py-3.5 bg-[#01228D] text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
          <i className="fas fa-plus"></i>
          Create New Role
        </button>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-gray-50">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <div className="flex-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Select Role to Configure</label>
            <div className="relative">
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full h-14 pl-6 pr-12 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
              >
                {ROLES.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3 pt-6">
             <span className="text-xs font-bold text-gray-400">Quick Status:</span>
             <span className={`text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-wider ${ROLES.find(r => r.id === selectedRole)?.color}`}>
                {selectedRole.replace('_', ' ')}
             </span>
          </div>

          <div className="pt-6">
            <button className="w-full md:w-auto px-8 py-3.5 bg-green-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-green-100 hover:scale-[1.02] transition-all">
              Save Permissions
            </button>
          </div>
        </div>

        {/* Permissions Grid - Desktop Table / Mobile Cards */}
        <div className="border border-gray-50 rounded-[28px] overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 bg-gray-50/50 border-b border-gray-50 px-8 py-5">
            <div className="col-span-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Feature / Module</div>
            <div className="col-span-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">View</div>
            <div className="col-span-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Edit</div>
            <div className="col-span-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Delete</div>
          </div>

          <div className="divide-y divide-gray-50">
            {FEATURES.map((feature) => (
              <div key={feature.id} className="grid grid-cols-1 md:grid-cols-12 items-center hover:bg-gray-50/30 transition-colors px-6 md:px-8 py-6 md:py-8 gap-4 md:gap-0">
                <div className="md:col-span-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-50 shadow-sm flex items-center justify-center text-blue-600 text-lg">
                      <i className={`fas ${
                        feature.id === 'leads' ? 'fa-user-graduate' :
                        feature.id === 'users' ? 'fa-user-shield' :
                        feature.id === 'courses' ? 'fa-book' :
                        feature.id === 'notices' ? 'fa-bullhorn' : 'fa-cog'
                      }`}></i>
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-base">{feature.name}</p>
                      <p className="text-[11px] text-gray-400 font-bold mt-0.5">{feature.description}</p>
                    </div>
                  </div>
                </div>

                {/* Permissions Toggles */}
                <div className="md:col-span-6 grid grid-cols-3 md:grid-cols-6 gap-2">
                  {['view', 'edit', 'delete'].map((type) => (
                    <div key={type} className="md:col-span-2 flex flex-col md:items-center justify-center gap-2">
                      <span className="md:hidden text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">{type}</span>
                      <button
                        onClick={() => handleToggle(selectedRole, feature.id, type as any)}
                        className={`w-12 h-6 md:w-14 md:h-7 rounded-full p-1 transition-all relative self-center ${
                          permissions[selectedRole]?.[feature.id]?.[type as 'view' | 'edit' | 'delete']
                            ? 'bg-blue-600 shadow-md shadow-blue-100'
                            : 'bg-gray-200'
                        }`}
                      >
                        <div className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-all shadow-sm ${
                          permissions[selectedRole]?.[feature.id]?.[type as 'view' | 'edit' | 'delete']
                            ? 'translate-x-6 md:translate-x-7'
                            : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
