"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useState } from "react";
import NewsletterForm from "../../components/NewsletterForm";

export default function BlogPage() {
  const posts = useQuery(api.posts.getPublishedPosts, {});
  const [searchQuery, setSearchQuery] = useState("");

  // Derived data for sidebar
  const recentPosts = posts?.slice(0, 4);
  const allTags = Array.from(new Set(posts?.flatMap((p) => p.tags) || []));
  const categories = [
    { name: "Education", count: 15 },
    { name: "Learning", count: 8 },
    { name: "Online Courses", count: 12 },
    { name: "Scholarships", count: 5 },
    { name: "Skill Development", count: 9 },
  ];

  return (
    <>
      <Header />

      {/* Page Banner */}
      <section className="page-banner">
        <div 
          className="page-banner-bg bg_cover" 
          style={{ backgroundImage: "url(/assets/images/page-banner.webp)" }}
        >
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title">Blog Left Sidebar</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Main Section */}
      <section className="blog-page-area pb-120 pt-80">
        <div className="container">
          <div className="row">
            {/* Sidebar Column */}
            <div className="col-lg-4 order-2 order-lg-1">
              <aside className="blog-sidebar pr-30">
                
                {/* Categories Widget */}
                <div className="sidebar-widget mt-30">
                  <h4 className="widget-title">Categories</h4>
                  <div className="widget-category">
                    <ul>
                      {categories.map((cat, i) => (
                        <li key={i}>
                          <Link href="#">
                            {cat.name} <span>({cat.count})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recent Posts Widget */}
                <div className="sidebar-widget mt-30">
                  <h4 className="widget-title">Recent Post</h4>
                  <div className="widget-recent-post">
                    {recentPosts?.map((post) => (
                      <div key={post._id} className="single-recent-post d-flex align-items-center">
                        <div className="recent-post-image">
                          <Link href={`/blog/${post.slug}`}>
                            <img 
                              src={post.imageUrl || "/assets/images/blog-1.webp"} 
                              alt={post.title} 
                              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                          </Link>
                        </div>
                        <div className="recent-post-content flex-1">
                          <h6 className="title">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title.length > 40 ? post.title.substring(0, 40) + "..." : post.title}
                            </Link>
                          </h6>
                          <Link href={`/blog/${post.slug}`} className="more">Read more</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Widget */}
                <div className="sidebar-widget mt-30">
                  <div className="sidebar-promo-banner relative overflow-hidden rounded-2xl group">
                    <img 
                      src="https://img.freepik.com/free-vector/special-offer-modern-sale-banner-template_1017-20667.jpg" 
                      alt="Promo" 
                      className="w-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                      <span className="text-white/80 text-xs font-bold tracking-widest uppercase">Special Offer</span>
                      <h4 className="text-white font-bold text-xl mt-1">Mega Discount for Students</h4>
                      <button className="mt-4 bg-white text-[#01228D] py-2 px-6 rounded-lg font-bold text-sm self-start hover:bg-blue-50 transition-colors">Shop Now</button>
                    </div>
                  </div>
                </div>

                {/* Tags Widget */}
                <div className="sidebar-widget mt-30">
                  <h4 className="widget-title">Tags</h4>
                  <div className="widget-tags">
                    <ul>
                      {allTags.length > 0 ? allTags.map((tag, i) => (
                        <li key={i}><Link href="#">{tag}</Link></li>
                      )) : (
                        <>
                          <li><Link href="#">Books</Link></li>
                          <li><Link href="#">Event</Link></li>
                          <li><Link href="#">Pen</Link></li>
                          <li><Link href="#">Science</Link></li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>

            {/* Posts Column */}
            <div className="col-lg-8 order-1 order-lg-2">
              <div className="row">
                {posts === undefined ? (
                  // Loading State
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="col-md-6">
                      <div className="single-blog mt-30 animate-pulse">
                        <div className="blog-image bg-gray-200 h-[220px] rounded-xl"></div>
                        <div className="blog-content pt-4 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-6 bg-gray-200 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post._id} className="col-md-6">
                      <div className="single-blog mt-30 shadow-sm border border-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition-all">
                        <div className="blog-image">
                          <Link href={`/blog/${post.slug}`}>
                            <img 
                              src={post.imageUrl || "/assets/images/blog-1.webp"} 
                              alt={post.title} 
                              style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                            />
                          </Link>
                        </div>
                        <div className="blog-content p-20">
                          <ul className="meta flex gap-4 text-xs font-bold text-slate-400 mb-3">
                            <li className="flex items-center gap-1">
                              <i className="far fa-calendar-alt text-blue-500"></i>
                              {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </li>
                            <li className="flex items-center gap-1">
                              <i className="far fa-user text-blue-500"></i>
                              By: {post.author}
                            </li>
                          </ul>
                          <h4 className="blog-title text-lg font-bold text-slate-800 leading-snug hover:text-[#01228D] transition-colors mb-4">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title.length > 60 ? post.title.substring(0, 60) + "..." : post.title}
                            </Link>
                          </h4>
                          <Link href={`/blog/${post.slug}`} className="more text-xs font-black uppercase tracking-widest text-[#01228D] hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                            Read more <i className="fas fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-80">
                    <h3 className="text-slate-400">No blog posts found.</h3>
                    <p className="text-slate-500 mt-2">Check back later for new updates!</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {posts && posts.length > 0 && (
                <div className="pagination-area mt-50">
                  <ul className="pagination justify-content-center flex gap-3">
                    <li><button className="active w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center font-bold text-xs bg-[#01228D] text-white">01</button></li>
                    <li><button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center font-bold text-xs hover:bg-gray-50 transition-colors">02</button></li>
                    <li><button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center font-bold text-xs hover:bg-gray-50 transition-colors">03</button></li>
                    <li><button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center font-bold text-xs hover:bg-gray-50 transition-colors"><i className="fas fa-chevron-right"></i></button></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-area bg-[#F4F7FA] py-80">
        <div className="container">
          <div className="newsletter-wrapper bg-white p-10 rounded-[40px] shadow-xl shadow-blue-900/5 relative overflow-hidden border border-blue-50">
             <div className="row align-items-center relative z-10">
               <div className="col-lg-6">
                 <div className="section-title-2 mb-0">
                   <h2 className="title text-3xl font-black">Subscribe our Newsletter</h2>
                   <span className="line !w-20 mt-4"></span>
                   <p className="mt-6 text-slate-500 font-medium">Join our community to get the latest updates, educational tips and exclusive scholarships directly in your inbox.</p>
                 </div>
               </div>
               <div className="col-lg-6">
                 <div className="mt-8 lg:mt-0">
                    <NewsletterForm />
                 </div>
               </div>
             </div>
             {/* Decorative */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-50 rounded-full opacity-50 blur-3xl"></div>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx>{`
        .widget-title {
          font-size: 20px;
          font-weight: 800;
          color: #01228D;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f4f7fa;
          position: relative;
        }
        .widget-title::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 50px;
          height: 2px;
          background: #01228D;
        }
        .widget-category ul li {
          margin-bottom: 12px;
        }
        .widget-category ul li a {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 600;
          color: #555;
          padding: 10px 15px;
          background: #fdfdfd;
          border: 1px solid #f4f7fa;
          border-radius: 10px;
          transition: all 0.3s;
        }
        .widget-category ul li a:hover {
          background: #01228D;
          color: #fff;
          border-color: #01228D;
        }
        .widget-category ul li a span {
          opacity: 0.6;
        }
        .single-recent-post {
          margin-bottom: 20px;
          gap: 15px;
        }
        .recent-post-content .title {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 5px;
        }
        .recent-post-content .more {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          color: #01228D;
          letter-spacing: 1px;
        }
        .widget-tags ul {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .widget-tags ul li a {
          font-size: 12px;
          font-weight: 700;
          padding: 8px 16px;
          background: #f4f7fa;
          border-radius: 8px;
          color: #666;
          transition: all 0.3s;
        }
        .widget-tags ul li a:hover {
          background: #01228D;
          color: #fff;
        }
        .pagination-area ul li button.active {
          background: #01228D;
          color: #fff;
          border-color: #01228D;
        }
      `}</style>
    </>
  );
}
