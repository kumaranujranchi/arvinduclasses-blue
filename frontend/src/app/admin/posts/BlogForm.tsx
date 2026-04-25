"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter();
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);
  const updatePost = useMutation(api.posts.updatePost);
  const getImageUrl = useMutation(api.uploads.getImageUrl);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    category: "Education",
    imageUrl: "",
    tags: [] as string[],
    isPublished: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const sessionStr = localStorage.getItem("user_session");
    if (sessionStr) {
      const parsed = JSON.parse(sessionStr);
      setUser(parsed);
      if (!isEdit) {
        setFormData(prev => ({ ...prev, author: parsed.name }));
      }
    }

    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        excerpt: initialData.excerpt || "",
        content: initialData.content || "",
        author: initialData.author || "",
        category: initialData.category || "Education",
        imageUrl: initialData.imageUrl || "",
        tags: initialData.tags || [],
        isPublished: initialData.isPublished || false,
      });
    }
  }, [initialData, isEdit]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        fileType: "image/webp" as string,
      };
      
      const compressedFile = await imageCompression(file, options);
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "image/webp" },
        body: compressedFile,
      });

      const { storageId } = await result.json();
      const imageUrl = await getImageUrl({ storageId });
      
      if (!imageUrl) throw new Error("Could not get image URL");
      
      setFormData(prev => ({ ...prev, imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        ...formData,
        adminId: user.userId || user.id || user._id,
        adminName: user.name,
      };

      if (isEdit) {
        await updatePost({
          id: initialData._id,
          ...data,
        });
        toast.success("Post updated successfully!");
      } else {
        await createPost(data);
        toast.success("Post created successfully!");
      }
      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      toast.error(isEdit ? "Failed to update post" : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "table"],
      ["clean"],
    ],
    table: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Editor Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Post Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter a catchy title..."
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Slug</label>
              <div className="flex items-center gap-2 text-slate-400 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                <span className="text-xs">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="bg-transparent border-none focus:outline-none text-xs font-bold text-slate-600 flex-1"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Content & Editor</label>
              <div className="prose-editor-wrapper">
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    modules={modules}
                    className="editor-internal-scroll"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Excerpt (Short Description)</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the post..."
              className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm h-24 resize-none"
            />
          </div>
        </div>

        {/* Vertical Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6 sticky top-0 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pr-2">
          {/* Actions */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-gray-50 pb-2">Actions</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Is Published?</span>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }))}
                className={`w-12 h-6 rounded-full transition-all relative ${formData.isPublished ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isPublished ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#01228D] text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <i className="fas fa-save"></i>
              )}
              {isEdit ? "Update Changes" : "Create Blog Post"}
            </button>
          </div>

          {/* Category Selection */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-gray-50 pb-2">Category</h3>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-bold bg-gray-50 text-slate-700 cursor-pointer"
            >
              <option value="Education">Education</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
              <option value="Career">Career Guidance</option>
              <option value="News">Latest News</option>
              <option value="Events">School Events</option>
            </select>
          </div>

          {/* Cover Image */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-gray-50 pb-2">Cover Image</h3>
            <div className="relative group aspect-video bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-all">
              {formData.imageUrl ? (
                <>
                  <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, imageUrl: "" }))} className="bg-white text-red-500 p-2 rounded-lg hover:bg-red-50"><i className="fas fa-trash"></i></button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                    {isUploading ? <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div> : <i className="fas fa-cloud-upload-alt"></i>}
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">Upload WebP (Max 500KB)</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          {/* Post Details */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 border-b border-gray-50 pb-2">Post Details</h3>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Author</label>
              <input type="text" value={formData.author} onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs font-bold text-slate-600" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Tags</label>
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} placeholder="Type & Enter" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs font-bold text-slate-600 mb-2" />
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold">
                    {tag} <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-800"><i className="fas fa-times"></i></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
