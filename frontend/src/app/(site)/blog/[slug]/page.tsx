"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import NewsletterForm from "../../../components/NewsletterForm";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = useQuery(api.posts.getPublishedPostBySlug, { slug });
  const allPosts = useQuery(api.posts.getPublishedPosts, {});

  // Sidebar Data (same as blog list page)
  const dynamicCategories = useMemo(() => {
    if (!allPosts) return [];
    const counts: Record<string, number> = {};
    allPosts.forEach(p => {
      const cat = (p as any).category || "Uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [allPosts]);

  const allTags = useMemo(() => {
    if (!allPosts) return [];
    return Array.from(new Set(allPosts.flatMap((p) => p.tags || [])));
  }, [allPosts]);

  const recentPosts = allPosts?.slice(0, 4);

  if (post === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#01228D] border-r-transparent"></div>
      </div>
    );
  }

  if (post === null) {
    return (
      <>
        <Header />
        <div className="py-120 text-center">
          <h2 className="title text-3xl font-black text-slate-800">Post Not Found</h2>
          <p className="text-slate-500 mt-4">The article you are looking for does not exist.</p>
          <Link href="/blog" className="inline-block mt-8 px-8 py-4 bg-[#01228D] text-white rounded-xl font-bold hover:shadow-lg transition-all">Back to Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="blog-footer-fix bg-[#fdfdfd]">
        {/* Page Banner */}
        <section className="page-banner">
          <div className="page-banner-bg bg_cover banner-bg-about">
            <div className="container">
              <div className="banner-content text-center">
                <h2 className="title">Blog Details</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Details Section */}
        <section className="blog-details-area pb-120 pt-80">
          <div className="container blog-container">
            <div className="row">
              {/* Main Content Column */}
              <div className="col-lg-8">
                <div className="blog-details-wrapper bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden mb-50">
                  {/* Featured Image */}
                  <div className="details-image relative">
                    <img 
                      src={post.imageUrl || "/assets/images/blog-1.webp"} 
                      alt={post.title} 
                      className="w-full aspect-[16/9] object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-[#01228D] text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                        {(post as any).category || "General"}
                      </span>
                    </div>
                  </div>

                  <div className="details-content p-8 md:p-12">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs text-blue-600">
                          <i className="far fa-calendar-alt"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-xs text-orange-600">
                          <i className="far fa-user"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">By {post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-xs text-green-600">
                          <i className="far fa-comments"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">3 Comments</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-8">
                      {post.title}
                    </h1>

                    {/* Body Content */}
                    <div 
                      className="content ql-editor !p-0" 
                      dangerouslySetInnerHTML={{ __html: post.content }} 
                    />

                    {/* Tags & Share */}
                    <div className="mt-12 pt-10 border-t border-gray-50 flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-800">Tags:</span>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-50 text-[#01228D] text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-100">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-slate-800">Share:</span>
                        <div className="flex gap-2">
                          {['facebook-f', 'twitter', 'linkedin-in'].map(icon => (
                            <a key={icon} href="#" className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-slate-400 hover:bg-[#01228D] hover:text-white transition-all">
                              <i className={`fab fa-${icon} text-xs`}></i>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="comments-area bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 md:p-12 mb-50">
                  <h3 className="text-2xl font-black text-slate-800 mb-10">Comments (03)</h3>
                  <div className="space-y-8 mt-10">
                    {/* Single Comment */}
                    <div className="flex gap-6 pb-8 border-b border-gray-50">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-blue-50 shadow-sm">
                        <img src="/assets/images/user-1.webp" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-base font-black text-slate-800">Alemiti Griffith</h5>
                          <button className="text-[10px] font-black uppercase tracking-widest text-[#01228D] hover:underline">Reply</button>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">2 hours ago</span>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          This is a fantastic article! The insights shared here are extremely valuable for anyone starting their research journey.
                        </p>
                      </div>
                    </div>
                    {/* Reply Comment */}
                    <div className="flex gap-6 pl-12 pb-8 border-b border-gray-50">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-orange-50 shadow-sm">
                        <img src="/assets/images/user-2.webp" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-base font-black text-slate-800">John Smith</h5>
                          <button className="text-[10px] font-black uppercase tracking-widest text-[#01228D] hover:underline">Reply</button>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">1 hour ago</span>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Agreed! I particularly liked the section on data collection methodologies. Very well explained.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Form */}
                <div className="comment-form bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 md:p-12">
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Leave a message here</h3>
                  <p className="text-slate-500 text-sm mb-10">Your email address will not be published. Required fields are marked *</p>
                  
                  <form className="mt-8 space-y-6">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <input type="text" placeholder="Name *" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm focus:ring-2 focus:ring-[#01228D] transition-all outline-none" />
                      </div>
                      <div className="col-md-6 mb-4">
                        <input type="email" placeholder="Email *" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm focus:ring-2 focus:ring-[#01228D] transition-all outline-none" />
                      </div>
                      <div className="col-12 mb-4">
                        <input type="text" placeholder="Website" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm focus:ring-2 focus:ring-[#01228D] transition-all outline-none" />
                      </div>
                      <div className="col-12 mb-6">
                        <textarea placeholder="Your Message *" className="w-full h-40 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#01228D] transition-all outline-none resize-none"></textarea>
                      </div>
                      <div className="col-12">
                        <button type="button" className="px-10 py-4 bg-[#01228D] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:shadow-xl hover:-translate-y-1 transition-all">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sidebar Column */}
              <div className="col-lg-4 mt-50 lg:mt-0">
                <aside className="blog-sidebar pl-0 lg:pl-10">
                  {/* Search Widget */}
                  <div className="sidebar-widget bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
                    <h4 className="blog-widget-title">Search</h4>
                    <div className="widget-search relative">
                      <input 
                        type="text" 
                        placeholder="Search posts..." 
                        className="w-full h-14 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-[#01228D] transition-all"
                      />
                      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#01228D] transition-colors">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>

                  {/* Categories Widget */}
                  <div className="sidebar-widget bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
                    <h4 className="blog-widget-title">Categories</h4>
                    <div className="widget-category">
                      <ul className="space-y-2">
                        {dynamicCategories.map((cat, i) => (
                          <li key={i}>
                            <Link 
                              href={`/blog?category=${cat.name}`}
                              className="w-full flex justify-between items-center px-4 py-3 rounded-xl border border-gray-100 bg-white text-slate-600 hover:bg-blue-50 hover:border-blue-100 hover:text-[#01228D] transition-all font-bold text-sm"
                            >
                              {cat.name} <span>({cat.count})</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recent Posts Widget */}
                  <div className="sidebar-widget bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
                    <h4 className="blog-widget-title">Recent Posts</h4>
                    <div className="widget-recent-post space-y-4">
                      {recentPosts?.map((p) => (
                        <div key={p._id} className="single-recent-post flex align-items-center p-4 rounded-xl border border-gray-50 hover:border-blue-100 transition-colors shadow-sm">
                          <div className="recent-post-image w-16 h-16 flex-shrink-0">
                            <Link href={`/blog/${p.slug}`}>
                              <img 
                                src={p.imageUrl || "/assets/images/blog-1.webp"} 
                                alt={p.title} 
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </Link>
                          </div>
                          <div className="recent-post-content flex-1 pl-4 pr-2">
                            <h6 className="title text-xs font-bold text-slate-800 leading-snug hover:text-[#01228D] transition-colors mb-1">
                              <Link href={`/blog/${p.slug}`}>
                                {p.title.length > 35 ? p.title.substring(0, 35) + "..." : p.title}
                              </Link>
                            </h6>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              <i className="far fa-calendar-alt mr-1"></i>
                              {new Date(p.publishedAt || p.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advertisement Placeholder */}
                  <div className="sidebar-widget bg-gradient-to-br from-[#01228D] to-[#0A45B5] p-8 rounded-[40px] shadow-lg mb-8 relative overflow-hidden text-center">
                    <div className="relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2 block">Special Offer</span>
                      <h4 className="text-xl font-black text-white mb-4">Enroll in Advanced Courses Today!</h4>
                      <p className="text-white/80 text-xs mb-6">Get up to 45% discount on all microbiological research workshops.</p>
                      <button className="px-6 py-3 bg-white text-[#01228D] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FFC600] transition-colors">Learn More</button>
                    </div>
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  </div>

                  {/* Tags Widget */}
                  <div className="sidebar-widget bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="blog-widget-title">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag, i) => (
                        <Link 
                          key={i}
                          href="#" 
                          className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-[#01228D] hover:border-[#01228D] transition-all inline-block"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-area bg-white pb-120 pt-0">
          <div className="container blog-container">
            <div className="newsletter-wrapper bg-[#FFFDF0] p-10 md:p-14 rounded-[40px] border-2 border-[#FFE8A3] shadow-xl relative overflow-hidden max-w-5xl mx-auto">
               <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
                    style={{ 
                      backgroundImage: `linear-gradient(#01228D 1px, transparent 1px), linear-gradient(90deg, #01228D 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }}>
               </div>

               <div className="row align-items-center relative z-10">
                 <div className="col-lg-6">
                   <div className="section-title-2 mb-0">
                     <h2 className="title text-3xl md:text-4xl font-black text-[#01228D] leading-tight mb-2">
                       Join our newsletter
                     </h2>
                     <div className="w-40 h-1.5 bg-[#FFC600] rounded-full mb-6"></div>
                     <h3 className="text-xl md:text-2xl font-bold text-[#01228D]/80 mb-4">Stay Ahead with Latest Updates</h3>
                     <p className="text-slate-600 text-sm md:text-base font-medium max-w-md">
                       We only send quality content that helps students and parents stay informed about their educational journey.
                     </p>
                   </div>
                 </div>
                 <div className="col-lg-6">
                   <div className="mt-10 lg:mt-0 p-1 bg-[#01228D]/5 rounded-2xl border border-[#01228D]/10">
                      <div className="bg-white p-4 rounded-xl shadow-inner">
                         <NewsletterForm />
                      </div>
                   </div>
                 </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FFC600]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <style jsx global>{`
        .ql-editor {
          font-family: inherit;
          font-size: 17px;
          line-height: 1.8;
          color: #475569;
          word-break: break-word;
          overflow-wrap: break-word;
        }
        /* Strip inline background colors pasted from rich text editors */
        .ql-editor p, 
        .ql-editor span, 
        .ql-editor h1, 
        .ql-editor h2, 
        .ql-editor h3, 
        .ql-editor h4, 
        .ql-editor h5, 
        .ql-editor h6,
        .ql-editor li {
          background-color: transparent !important;
        }
        /* Responsive Tables to prevent layout breaking */
        .ql-editor table {
          display: block;
          width: 100% !important;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-collapse: collapse;
          margin: 2rem 0;
        }
        .ql-editor table td, .ql-editor table th {
          border: 1px solid #f1f5f9;
          padding: 1rem;
          min-width: 120px;
        }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          color: #0f172a;
          font-weight: 900;
        }
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 24px;
          margin: 30px 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .ql-editor blockquote {
          border-left: 6px solid #FFC600;
          padding-left: 30px;
          font-style: italic;
          background: #FFFDF0;
          padding: 30px;
          border-radius: 0 24px 24px 0;
          margin: 40px 0;
          font-weight: 500;
          color: #01228D;
        }
      `}</style>
    </>
  );
}
