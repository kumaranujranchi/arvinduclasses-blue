"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = useQuery(api.posts.getPublishedPostBySlug, { slug });

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
          <h2 className="title">Post Not Found</h2>
          <Link href="/blog" className="main-btn mt-4">Back to Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Blog Details */}
      <section className="blog-details-area py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="blog-details-content">
                <div className="details-image mb-40">
                  <img 
                    src={post.imageUrl || "/assets/images/blog-1.webp"} 
                    alt={post.title} 
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
                <ul className="meta d-flex align-items-center mb-20">
                  <li className="mr-20">
                    <i className="far fa-calendar-alt mr-2 text-primary"></i>
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </li>
                  <li>
                    <i className="far fa-user mr-2 text-primary"></i>
                    By: {post.author}
                  </li>
                </ul>
                <h2 className="title mb-30">{post.title}</h2>
                <div 
                  className="content ql-editor" 
                  style={{ padding: 0 }}
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
                
                <div className="blog-footer d-flex align-items-center justify-content-between mt-50 py-30 border-top border-bottom">
                  <div className="blog-tags">
                    <ul className="tags d-flex align-items-center">
                      <li>Tags:</li>
                      {post.tags.map(tag => (
                        <li key={tag} className="ml-10">
                          <span className="badge bg-light text-primary p-2">#{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx global>{`
        .ql-editor {
          font-family: inherit;
          font-size: 17px;
          line-height: 1.8;
          color: #334155;
        }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          color: #0f172a;
        }
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 20px 0;
        }
        .ql-editor blockquote {
          border-left: 4px solid #01228D;
          padding-left: 20px;
          font-style: italic;
          background: #f8fafc;
          padding: 20px;
          border-radius: 0 12px 12px 0;
        }
      `}</style>
    </>
  );
}
