"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import BlogForm from "../../BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const id = params.id as any;
  const post = useQuery(api.posts.getById, { id });

  if (post === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#01228D] border-r-transparent"></div>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-slate-900">Post Not Found</h2>
        <p className="text-slate-500">The blog post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Blog Post</h1>
        <p className="text-slate-500 text-sm">Update your existing blog article</p>
      </div>
      <BlogForm initialData={post} isEdit={true} />
    </div>
  );
}
