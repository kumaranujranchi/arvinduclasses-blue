"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

export default function ManageCourses() {
  const courses = useQuery(api.courses.getAllAdmin);
  const createCourse = useMutation(api.courses.createCourse);
  const deleteCourse = useMutation(api.courses.deleteCourse);
  const toggleStatus = useMutation(api.courses.toggleCourseStatus);

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "#Engineering",
    description: "",
    duration: "1 Year",
    fee: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCourse(formData);
    setFormData({ title: "", slug: "", category: "#Engineering", description: "", duration: "1 Year", fee: 0 });
    setIsAdding(false);
  };

  if (!courses) {
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Academic Courses</h1>
          <p className="text-gray-500 font-medium mt-1">Manage the list of courses offered by the institute.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#07294d] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 flex items-center gap-3 transition-all active:scale-95"
        >
          <i className={`fas ${isAdding ? "fa-times" : "fa-plus"}`}></i>
          {isAdding ? "Cancel" : "Add New Course"}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-50 animate-in slide-in-from-top duration-500">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Course Title</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none"
                placeholder="e.g. JEE Main & Advanced"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none"
                placeholder="e.g. #Engineering"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fee (INR)</label>
              <input 
                required
                type="number"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none"
                value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: Number(e.target.value)})}
              />
            </div>
            <div className="col-lg-3 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Duration</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none"
                placeholder="e.g. 1 Year"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
            <div className="lg:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 font-bold text-gray-700 outline-none"
                placeholder="Briefly describe the course goals..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full py-4 bg-[#ffc600] text-[#07294d] rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20 hover:shadow-xl transition-all active:scale-95">
                Save Course
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
        {courses.length > 0 ? courses.map((course) => (
          <div key={course._id} className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">{course.category}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleStatus({ id: course._id, isActive: !course.isActive })}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      course.isActive ? "bg-green-50 text-green-500" : "bg-gray-100 text-gray-400"
                    }`}
                    title={course.isActive ? "Visible" : "Hidden"}
                  >
                    <i className="fas fa-eye text-xs"></i>
                  </button>
                  <button 
                    onClick={() => { if(confirm("Delete course?")) deleteCourse({ id: course._id }) }}
                    className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <i className="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-black text-gray-800 leading-snug">{course.title}</h3>
              <p className="text-gray-400 text-sm mt-3 line-clamp-3 font-medium leading-relaxed flex-1">{course.description}</p>
              
              <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Duration</p>
                  <p className="text-sm font-bold text-gray-600 mt-1">{course.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Total Fee</p>
                  <p className="text-lg font-black text-[#07294d] mt-1">₹{course.fee.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 bg-white rounded-3xl border border-gray-50 text-center">
             <div className="flex flex-col items-center gap-4 text-gray-300">
                <i className="fas fa-book text-6xl opacity-20"></i>
                <p className="font-black text-sm uppercase tracking-widest">No Courses Found</p>
                <button onClick={() => setIsAdding(true)} className="text-blue-500 font-bold text-xs hover:underline mt-2">Create your first course</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
