"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "react-hot-toast";

export default function BannersManagement() {
  const banners = useQuery(api.banners.getBanners, {});
  const addBanner = useMutation(api.banners.addBanner);
  const updateBanner = useMutation(api.banners.updateBanner);
  const deleteBanner = useMutation(api.banners.deleteBanner);
  const toggleBannerStatus = useMutation(api.banners.toggleBannerStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    buttonText: "",
    buttonLink: "",
    order: 0,
  });

  const getAdminInfo = () => {
    const session = localStorage.getItem("user_session");
    if (session) {
      const user = JSON.parse(session);
      return { id: user.id || user._id, name: user.name };
    }
    return { id: "system", name: "System Admin" };
  };

  const handleOpenModal = (banner: any = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        subtitle: banner.subtitle || "",
        imageUrl: banner.imageUrl,
        buttonText: banner.buttonText || "",
        buttonLink: banner.buttonLink || "",
        order: banner.order,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: "",
        subtitle: "",
        imageUrl: "",
        buttonText: "",
        buttonLink: "",
        order: (banners?.length || 0) + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const admin = getAdminInfo();

    try {
      if (editingBanner) {
        await updateBanner({
          id: editingBanner._id,
          ...formData,
          isActive: editingBanner.isActive,
          adminId: admin.id,
          adminName: admin.name,
        });
        toast.success("Banner updated successfully");
      } else {
        await addBanner({
          ...formData,
          adminId: admin.id,
          adminName: admin.name,
        });
        toast.success("Banner added successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save banner");
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    const admin = getAdminInfo();
    try {
      await deleteBanner({ id, adminId: admin.id, adminName: admin.name });
      toast.success("Banner deleted");
    } catch (error) {
      toast.error("Failed to delete banner");
    }
  };

  const handleToggle = async (id: any, currentStatus: boolean) => {
    const admin = getAdminInfo();
    try {
      await toggleBannerStatus({
        id,
        isActive: !currentStatus,
        adminId: admin.id,
        adminName: admin.name,
      });
      toast.success(`Banner ${!currentStatus ? "enabled" : "disabled"}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1e293b] tracking-tight">Homepage Banners</h1>
          <p className="text-slate-500 font-medium text-sm">Manage the slider images and text on your homepage.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#01228D] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:scale-105 transition-all flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners?.map((banner) => (
          <div key={banner._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-48 bg-gray-200">
              <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleToggle(banner._id, banner.isActive)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    banner.isActive ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                  }`}
                >
                  <i className={`fas ${banner.isActive ? "fa-check" : "fa-times"}`}></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
                  Order: {banner.order}
                </span>
              </div>
              <h3 className="font-bold text-[#1e293b] line-clamp-1">{banner.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{banner.subtitle || "No subtitle"}</p>
              
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(banner)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  banner.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {banner.isActive ? "Visible" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        ))}

        {banners?.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-images text-2xl text-gray-300"></i>
            </div>
            <p className="text-slate-400 font-bold">No banners added yet</p>
            <p className="text-slate-300 text-xs">Site is currently using default static banners</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <form onSubmit={handleSubmit}>
              <div className="p-8 pb-4 flex items-center justify-between border-b border-gray-50">
                <h2 className="text-xl font-black text-[#1e293b] tracking-tight">
                  {editingBanner ? "Edit Banner" : "Add New Banner"}
                </h2>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-gray-50 transition-all"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 ml-1">Banner Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#01228D] transition-all font-medium text-slate-600"
                    placeholder="e.g. Education is the power of Humanity"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 ml-1">Subtitle (Optional)</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#01228D] transition-all font-medium text-slate-600"
                    placeholder="Brief description below title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 ml-1">Image URL</label>
                  <input
                    required
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#01228D] transition-all font-medium text-slate-600"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 ml-1">Button Text</label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#01228D] transition-all font-medium text-slate-600"
                      placeholder="e.g. View Courses"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 ml-1">Button Link</label>
                    <input
                      type="text"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#01228D] transition-all font-medium text-slate-600"
                      placeholder="/courses"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 ml-1">Display Order</label>
                  <input
                    required
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#01228D] transition-all font-medium text-slate-600"
                  />
                </div>
              </div>

              <div className="p-8 bg-slate-50 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-sm text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 px-10 py-4 rounded-2xl font-bold text-sm text-white bg-[#01228D] shadow-lg shadow-blue-100 hover:scale-105 transition-all"
                >
                  {editingBanner ? "Save Changes" : "Create Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
