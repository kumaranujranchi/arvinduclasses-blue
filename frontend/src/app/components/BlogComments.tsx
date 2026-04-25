"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";

interface BlogCommentsProps {
  postId: Id<"posts">;
}

export default function BlogComments({ postId }: BlogCommentsProps) {
  const comments = useQuery(api.comments.getCommentsByPost, { postId });
  const addComment = useMutation(api.comments.addComment);
  
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment({
        postId,
        userId: user.userId,
        content: content.trim(),
      });
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  if (comments === undefined) {
    return <div className="text-center py-10">Loading comments...</div>;
  }

  return (
    <>
      {/* Comments Section */}
      <div className="comments-area bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 md:p-12 mb-50">
        <h3 className="text-2xl font-black text-slate-800 mb-10">
          Comments ({comments.length < 10 && comments.length > 0 ? `0${comments.length}` : comments.length})
        </h3>
        
        {comments.length === 0 ? (
          <p className="text-slate-500 text-center py-5">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <div className="space-y-8 mt-10">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-6 pb-8 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-blue-50 shadow-sm bg-gray-100 flex items-center justify-center">
                  {comment.user.profilePicUrl ? (
                    <img src={comment.user.profilePicUrl} alt={comment.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <i className="fas fa-user text-gray-400 text-2xl"></i>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-base font-black text-slate-800">{comment.user.name}</h5>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                    {getTimeAgo(comment.createdAt)}
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div className="comment-form bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 md:p-12">
        <h3 className="text-2xl font-black text-slate-800 mb-2">Leave a message here</h3>
        
        {!user ? (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center mt-8">
            <p className="text-slate-600 mb-4">You must be logged in to post a comment.</p>
            <div className="flex justify-center gap-4">
              <Link href="/login" className="px-8 py-3 bg-[#01228D] text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                Login
              </Link>
              <Link href="/register" className="px-8 py-3 bg-white text-[#01228D] border border-[#01228D] rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">
                Register
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-10">Posting as <strong>{user.name}</strong></p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="row">
                <div className="col-12 mb-6">
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Your Message *" 
                    className="w-full h-40 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#01228D] transition-all outline-none resize-none"
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !content.trim()}
                    className="px-10 py-4 bg-[#01228D] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:transform-none disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
