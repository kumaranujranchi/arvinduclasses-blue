"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useState, useMemo } from "react";
import NewsletterForm from "../../components/NewsletterForm";

export default function BlogPage() {
  const posts = useQuery(api.posts.getPublishedPosts, {});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Derive categories dynamically from posts
  const dynamicCategories = useMemo(() => {
    if (!posts) return [];
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      const cat = (post as any).category || "Uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [posts]);

  // Derive unique tags dynamically
  const allTags = useMemo(() => {
    if (!posts) return [];
    return Array.from(new Set(posts.flatMap((p) => p.tags || [])));
  }, [posts]);

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!selectedCategory) return posts;
    return posts.filter(post => (post as any).category === selectedCategory);
  }, [posts, selectedCategory]);

  const recentPosts = posts?.slice(0, 4);

  return (
    <>
      <Header />

      <main className="blog-footer-fix">
        {/* Page Banner */}
        <section className="page-banner">
          <div 
            className="page-banner-bg bg_cover banner-bg-about" 
          >
            <div className="container">
              <div className="banner-content text-center">
                <h2 className="title">Our Blog</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Main Section */}
        <section className="blog-page-area pb-120 pt-80 bg-[#fdfdfd]">
          <div className="container blog-container">
            <div className="row">
              {/* Posts Column */}
              <div className="col-lg-8 order-2 order-lg-1">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black text-slate-800">
                     {selectedCategory ? `Browsing: ${selectedCategory}` : "Explore All Blogs"}
                   </h3>
                   <div className="h-px bg-gray-100 flex-1 mx-6 hidden sm:block"></div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredPosts.length} Results</span>
                </div>

                <div className="row">
                  {posts === undefined ? (
                    // Loading State
                    [...Array(4)].map((_, i) => (
                      <div key={i} className="col-md-6 mb-8">
                        <div className="animate-pulse bg-white rounded-3xl p-4 border border-gray-100">
                          <div className="bg-gray-100 h-48 rounded-2xl mb-4"></div>
                          <div className="space-y-3 px-2">
                            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                            <div className="h-6 bg-gray-100 rounded w-full"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div key={post._id} className="col-md-6 mb-8">
                        <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden">
                          <div className="relative overflow-hidden aspect-video">
                            <Link href={`/blog/${post.slug}`}>
                              <img 
                                src={post.imageUrl || "/assets/images/blog-1.webp"} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </Link>
                            <div className="absolute top-4 left-4">
                              <span className="bg-white/90 backdrop-blur-md text-[#01228D] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                {(post as any).category || "General"}
                              </span>
                            </div>
                          </div>
                          <div className="blog-card-content p-6 md:p-8">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[10px] text-blue-600">
                                  <i className="far fa-calendar-alt"></i>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center text-[10px] text-orange-600">
                                  <i className="far fa-user"></i>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">By {post.author}</span>
                              </div>
                            </div>
                            <h4 className="text-lg font-black text-slate-800 leading-tight mb-4 group-hover:text-[#01228D] transition-colors">
                              <Link href={`/blog/${post.slug}`}>
                                {post.title.length > 55 ? post.title.substring(0, 55) + "..." : post.title}
                              </Link>
                            </h4>
                            <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#01228D] group-hover:gap-4 transition-all">
                              Read Article <i className="fas fa-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-80 bg-white rounded-3xl border border-dashed border-gray-200 blog-container">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-search text-slate-300 text-2xl"></i>
                      </div>
                      <h3 className="text-slate-500 font-bold">No posts in this category</h3>
                      <p className="text-slate-400 text-sm mt-2">Try selecting another category or view all posts.</p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredPosts.length > 0 && (
                  <div className="pagination-area mt-50">
                    <ul className="pagination justify-content-center flex gap-3">
                      <li><button className="active w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center font-black text-xs bg-[#01228D] text-white shadow-lg shadow-blue-900/20">01</button></li>
                      <li><button className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center font-black text-xs bg-white text-slate-400 hover:bg-blue-50 hover:text-[#01228D] transition-all">02</button></li>
                      <li><button className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center font-black text-xs bg-white text-slate-400 hover:bg-blue-50 hover:text-[#01228D] transition-all"><i className="fas fa-chevron-right"></i></button></li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar Column */}
              <div className="col-lg-4 order-1 order-lg-2">
                <aside className="blog-sidebar pl-30">
                  
                  {/* Categories Widget */}
                  <div className="sidebar-widget mt-0">
                    <h4 className="blog-widget-title">Categories</h4>
                    <div className="widget-category">
                      <ul>
                        <li>
                          <button 
                            onClick={() => setSelectedCategory(null)}
                            className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-xl border transition-all font-bold text-sm mb-2 ${!selectedCategory ? 'bg-blue-50 text-[#01228D] border-[#01228D] ring-1 ring-[#01228D]' : 'bg-white text-slate-600 border-gray-100 hover:bg-blue-50 hover:text-[#01228D]'}`}
                          >
                            All Posts <span>({posts?.length || 0})</span>
                          </button>
                        </li>
                        {dynamicCategories.map((cat, i) => (
                          <li key={i}>
                            <button 
                              onClick={() => setSelectedCategory(cat.name)}
                              className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-xl border transition-all font-bold text-sm mb-2 ${selectedCategory === cat.name ? 'bg-blue-50 text-[#01228D] border-[#01228D] ring-1 ring-[#01228D]' : 'bg-white text-slate-600 border-gray-100 hover:bg-blue-50 hover:text-[#01228D]'}`}
                            >
                              {cat.name} <span>({cat.count})</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recent Posts Widget */}
                  <div className="sidebar-widget mt-40">
                    <h4 className="blog-widget-title">Recent Posts</h4>
                    <div className="widget-recent-post">
                      {recentPosts?.map((post) => (
                        <div key={post._id} className="single-recent-post flex items-center mb-4 bg-white p-4 rounded-xl border border-gray-50 hover:border-blue-100 transition-colors shadow-sm">
                          <div className="recent-post-image flex-shrink-0">
                            <Link href={`/blog/${post.slug}`}>
                              <img 
                                src={post.imageUrl || "/assets/images/blog-1.webp"} 
                                alt={post.title} 
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            </Link>
                          </div>
                          <div className="recent-post-content flex-1 pl-4 pr-2">
                            <h6 className="title text-xs font-bold text-slate-800 leading-snug hover:text-[#01228D] transition-colors mb-1">
                              <Link href={`/blog/${post.slug}`}>
                                {post.title.length > 35 ? post.title.substring(0, 35) + "..." : post.title}
                              </Link>
                            </h6>
                            <Link href={`/blog/${post.slug}`} className="text-[9px] font-black uppercase tracking-widest text-[#01228D]">Read more</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags Widget */}
                  <div className="sidebar-widget mt-40">
                    <h4 className="blog-widget-title">Popular Tags</h4>
                    <div className="widget-tags">
                      <ul className="flex flex-wrap gap-2">
                        {allTags.map((tag, i) => (
                          <li key={i}>
                            <Link 
                              href="#" 
                              className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs font-bold text-slate-500 hover:bg-blue-50 hover:text-[#01228D] hover:border-[#01228D] transition-all inline-block"
                            >
                              {tag}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section - Redesigned to Notebook/Results Style */}
        <section className="newsletter-section bg-white pb-120 pt-0">
          <div className="container blog-container">
            <div className="newsletter-wrapper bg-[#FFFDF0] p-10 md:p-14 rounded-[40px] border-2 border-[#FFE8A3] shadow-xl relative overflow-hidden max-w-5xl mx-auto">
               {/* Grid Overlay */}
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
                     <div className="w-40 h-1.5 bg-[#FFC600] rounded-full mb-6"></div> {/* Brush stroke equivalent */}
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
               
               {/* Decorative pencil-like element or accent */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FFC600]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
