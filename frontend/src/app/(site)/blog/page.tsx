"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

export default function BlogPage() {
  const posts = useQuery(api.posts.getPublishedPosts, {});

  return (
    <>
      <Header />

      {/* Page Banner */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover page-banner-bg-image">
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title">Our Blog</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-area pb-120">
        <div className="container">
          <div className="row">
            {posts === undefined ? (
              // Loading State
              [...Array(6)].map((_, i) => (
                <div key={i} className="col-lg-4 col-sm-6">
                  <div className="single-blog mt-30 animate-pulse">
                    <div className="blog-image bg-gray-200 h-[250px] rounded-lg"></div>
                    <div className="blog-content space-y-3 pt-4">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="col-lg-4 col-sm-6">
                  <div className="single-blog mt-30">
                    <div className="blog-image">
                      <Link href={`/blog/${post.slug}`}>
                        <img 
                          src={post.imageUrl || "/assets/images/blog-1.webp"} 
                          width={370} 
                          height={250} 
                          alt={post.title} 
                          style={{ height: '250px', objectFit: 'cover' }}
                        />
                      </Link>
                    </div>
                    <div className="blog-content">
                      <ul className="meta">
                        <li>
                          <a href="#">
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </a>
                        </li>
                        <li><a href="#">By: {post.author}</a></li>
                      </ul>
                      <h4 className="blog-title">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <Link href={`/blog/${post.slug}`} className="more">
                        Read more <i className="fas fa-chevron-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-50">
                <h3 className="text-slate-400">No blog posts found.</h3>
                <p className="text-slate-500 mt-2">Check back later for new updates!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
      <Footer />
    </>
  );
}
