"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "react-hot-toast";
import imageCompression from "browser-image-compression";

export default function BannersManagement() {
  const banners = useQuery(api.banners.getBanners, {});
  const addBanner = useMutation(api.banners.addBanner);
  const updateBanner = useMutation(api.banners.updateBanner);
  const deleteBanner = useMutation(api.banners.deleteBanner);
  const toggleBannerStatus = useMutation(api.banners.toggleBannerStatus);
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const getImageUrl = useMutation(api.uploads.getImageUrl);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    order: 0,
  });

  const getAdminInfo = () => {
    if (typeof window === "undefined") return { id: "system", name: "System Admin" };
    const session = localStorage.getItem("user_session");
    if (session) {
      try {
        const user = JSON.parse(session);
        return { 
          id: String(user.id || user._id || "system"), 
          name: String(user.name || "Admin") 
        };
      } catch (e) {
        console.error("Error parsing user session", e);
      }
    }
    return { id: "system", name: "System Admin" };
  };

  const handleOpenModal = (banner: any = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        order: banner.order,
      });
      setImagePreview(banner.imageUrl);
    } else {
      setEditingBanner(null);
      setFormData({
        order: (banners?.length || 0) + 1,
      });
      setImagePreview(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const admin = getAdminInfo();
    setIsUploading(true);

    try {
      let imageUrl = editingBanner?.imageUrl || "";

      if (selectedFile) {
        console.log("Starting image compression...");
        // 1. Compression
        const options = {
          maxSizeMB: 0.8,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(selectedFile, options);
        console.log("Compression complete. Size:", compressedFile.size);

        // 2. Upload to Convex
        console.log("Generating upload URL...");
        const uploadUrl = await generateUploadUrl();
        console.log("Uploading to storage...");
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": compressedFile.type },
          body: compressedFile,
        });
        
        if (!result.ok) throw new Error("Upload to storage failed");
        
        const { storageId } = await result.json();
        console.log("Upload complete. Storage ID:", storageId);

        // 3. Get Public URL
        const url = await getImageUrl({ storageId });
        if (!url) throw new Error("Failed to get public URL for image");
        imageUrl = url;
        console.log("Public URL retrieved:", imageUrl);
      }

      if (!imageUrl && !selectedFile) {
        toast.error("Please upload an image");
        return;
      }

      const defaultData = {
        title: formData.order % 2 === 0 
          ? "Best Educational Environment for Your Success" 
          : "Education is the power of Humanity",
        subtitle: "",
        buttonText: "",
        buttonLink: "/courses",
      };

      if (editingBanner) {
        await updateBanner({
          id: editingBanner._id,
          ...defaultData,
          imageUrl,
          order: formData.order,
          isActive: editingBanner.isActive,
          adminId: admin.id,
          adminName: admin.name,
        });
        toast.success("Banner updated successfully");
      } else {
        await addBanner({
          ...defaultData,
          imageUrl,
          order: formData.order,
          adminId: admin.id,
          adminName: admin.name,
        });
        toast.success("Banner added successfully");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      console.error(error);
      const errorMsg = error?.message || "Failed to save banner";
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1e293b] tracking-tight">Homepage Banners</h1>
          <p className="text-slate-500 font-medium text-xs sm:text-sm">Manage the slider images and text on your homepage.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#01228D] hover:bg-blue-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto text-sm"
        >
          <i className="fas fa-plus"></i>
          <span>Add New Banner</span>
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
              <div className="p-6 sm:p-8 pb-4 flex items-center justify-between border-b border-gray-50">
                <h2 className="text-lg sm:text-xl font-black text-[#1e293b] tracking-tight">
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

              <div className="p-6 sm:p-8 space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 ml-1">Banner Image</label>
                  
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => { setSelectedFile(null); setImagePreview(null); }}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                      >
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  )}

                  {!imagePreview && (
                    <div className="relative w-full h-48 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-all group cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-all">
                        <i className="fas fa-cloud-upload-alt text-[#01228D]"></i>
                      </div>
                      <p className="text-xs font-bold text-slate-500">Click or drag to upload banner image</p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">Recommended: 1920 x 800 px</p>
                      <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-wider">JPG, PNG or WEBP (Max 10MB)</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[1.5px] text-slate-400 ml-1">Display Order</label>
                  <input
                    required
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-5 py-3 sm:py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#01228D] transition-all font-medium text-slate-600 text-sm sm:text-base"
                    placeholder="e.g. 1"
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-slate-50 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-sm text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-[2] px-10 py-4 rounded-2xl font-bold text-sm text-white bg-[#01228D] shadow-lg shadow-blue-100 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Processing...</span>
                    </>
                  ) : (
                    editingBanner ? "Save Changes" : "Create Banner"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
