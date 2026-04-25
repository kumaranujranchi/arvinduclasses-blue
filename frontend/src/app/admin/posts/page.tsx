"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function BlogAdminPage() {
  const posts = useQuery(api.posts.getAllAdmin);
  const deletePost = useMutation(api.posts.deletePost);
  
  const [user, setUser] = useState<any>(null);

  React.useEffect(() => {
    const sessionStr = localStorage.getItem("user_session");
    if (sessionStr) setUser(JSON.parse(sessionStr));
  }, []);

  const handleDelete = async (id: any, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deletePost({
        id,
        adminId: user.userId || user.id || user._id,
        adminName: user.name,
      });
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Management</h1>
          <p className="text-slate-500 text-sm">Create, edit and manage your blog posts</p>
        </div>
        <Link 
          href="/admin/posts/new" 
          className="bg-[#01228D] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-sm flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Title</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Author</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts === undefined ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <div className="animate-pulse flex flex-col items-center gap-2">
                      <div className="h-4 w-48 bg-gray-100 rounded"></div>
                      <div className="h-3 w-32 bg-gray-50 rounded"></div>
                    </div>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <i className="fas fa-blog fa-2x mb-3 opacity-20"></i>
                    <p className="text-sm font-medium">No blog posts found</p>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.imageUrl ? (
                          <img src={post.imageUrl} className="w-10 h-10 rounded-lg object-cover border border-gray-100" alt="" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            <i className="fas fa-image"></i>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-slate-700 leading-tight">{post.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600 bg-gray-100 px-2 py-1 rounded-md">{post.author}</span>
                    </td>
                    <td className="px-6 py-4">
                      {post.isPublished ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2.5 py-1 rounded-full w-fit">
                          <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-gray-100 px-2.5 py-1 rounded-full w-fit">
                          <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[11px] font-bold text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/posts/edit/${post._id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all"
                          title="Edit"
                        >
                          <i className="fas fa-edit text-xs"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(post._id, post.title)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                          title="Delete"
                        >
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
