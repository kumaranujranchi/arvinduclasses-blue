"use client";

import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create New Post</h1>
        <p className="text-slate-500 text-sm">Write a new article for your blog</p>
      </div>
      <BlogForm />
    </div>
  );
}
