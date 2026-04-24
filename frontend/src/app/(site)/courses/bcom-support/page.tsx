"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// Mock data for related courses
const relatedCourses = [
  {
    title: "Commerce Program (11–12)",
    fee: "₹40,000",
    image: "/assets/images/homepage2.png",
    slug: "/courses/commerce-program",
    color: "#0C8B51"
  },
  {
    title: "Applied Mathematics (9-12)",
    fee: "₹20,000",
    image: "/assets/images/course-banner.png",
    slug: "/courses/applied-mathematics",
    color: "#27B8A7"
  },
  {
    title: "Science Program (9–10)",
    fee: "₹35,000",
    image: "/assets/images/homepage1.png",
    slug: "/courses/science-program",
    color: "#2F7AD5"
  }
];

export default function BComSupportPage() {
  const [activeTab, setActiveTab] = useState('benefit');

  return (
    <>
      <Header />
      
      {/* Page Banner - Graduation Excellence Focused */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/course-banner.png)" }}>
          <div className="container">
            <div className="banner-content text-center wow fadeInDown course-detail-banner-content">
              <h2 className="title course-detail-title">B.Com Academic Support</h2>
              <div style={{ width: "60px", height: "4px", background: "#7D2AE8", margin: "20px auto" }}></div>
              <p className="course-detail-subtitle">Strengthening your graduation journey with expert academic guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Details Start */}
      <section className="courses-details course-details-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="courses-details-content">
                <div className="image wow zoomIn" data-wow-duration="1s">
                   <img src="/assets/images/courses-details.webp" className="course-detail-img" alt="B.Com Support Details" />
                </div>

                <div className="content-box mt-50 wow fadeInUp">
                  <h3 className="title course-content-title">B.Com Academic Support Program</h3>
                  <p className="course-content-text-1">
                    This program is designed for B.Com students who want strong conceptual clarity and better performance in university exams.
                  </p>
                  <p className="course-content-text-2">
                    Graduation-level subjects require deeper understanding and consistent practice. Our approach focuses on simplifying concepts, improving answer-writing skills, and preparing students for semester exams in a structured way.
                  </p>
                </div>

                <div className="overview-section mt-50 wow fadeInUp">
                  <h4 className="course-overview-title">Course Overview</h4>
                  <p className="course-overview-text-1">
                    The B.Com Academic Support Program provides complete guidance for core commerce subjects with a focus on both theory and practical application.
                  </p>
                  <p className="course-overview-text-2">We help students:</p>
                  <ul className="courses-details-list mt-10px">
                    <li className="course-list-item"><i className="fas fa-check" style={{ top: "4px", color: "#7D2AE8" }}></i> <p className="course-list-text">Understand concepts clearly</p></li>
                    <li className="course-list-item"><i className="fas fa-check" style={{ top: "4px", color: "#7D2AE8" }}></i> <p className="course-list-text">Prepare effectively for semester exams</p></li>
                    <li className="course-list-item"><i className="fas fa-check" style={{ top: "4px", color: "#7D2AE8" }}></i> <p className="course-list-text">Improve answer presentation and writing skills</p></li>
                    <li className="course-list-item"><i className="fas fa-check" style={{ top: "4px", color: "#7D2AE8" }}></i> <p className="course-list-text">Strengthen their academic foundation for future careers</p></li>
                  </ul>
                  <p className="course-overview-text-3">
                    This program is ideal for students who want consistent support throughout their graduation.
                  </p>
                </div>

                {/* Academic Excellence Highlights Grid */}
                <div className="row mt-40">
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <div className="highlight-card" style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #eee", borderLeft: "5px solid #7D2AE8", marginBottom: "20px", transition: "all 0.3s" }}>
                       <h5 className="course-highlight-title">Semester Ready</h5>
                       <p style={{ fontSize: "14px", color: "#666" }}>Structured preparation for semester exams with a focus on university-specific paper patterns.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div className="highlight-card course-highlight-card-dark">
                       <h5 className="course-highlight-title">Answer Writing</h5>
                       <p style={{ fontSize: "14px", color: "#666" }}>Special focus on improving answer presentation and writing techniques for higher scores.</p>
                    </div>
                  </div>
                </div>

                <div className="courses-details-tab wow fadeInUp course-tab-container">
                  <ul className="nav nav-justified course-tab-nav">
                    <li className="nav-item">
                      <a className={`course-tab-link ${activeTab === 'benefit' ? 'active' : ''}`} onClick={() => setActiveTab('benefit')}>Benefits</a>
                    </li>
                    <li className="nav-item">
                      <a className={`course-tab-link ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => setActiveTab('curriculum')}>Curriculum</a>
                    </li>
                    <li className="nav-item">
                      <a className={`course-tab-link ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>Faculty</a>
                    </li>
                    <li className="nav-item">
                      <a className={`course-tab-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</a>
                    </li>
                  </ul>
                  <div className="tab-content course-tab-content-wrapper">
                    {activeTab === 'benefit' && (
                      <div className="tab-pane fade show active">
                        <ul className="courses-details-list m-0 p-0">
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Better performance in university exams.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Strong understanding of core commerce concepts.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Improved answer-writing and presentation skills.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Support for future career paths (CA, MBA, etc.).</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Consistent academic guidance throughout graduation.</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active">
                         <div className="row">
                           <div className="col-md-4">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Accounting</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Financial Accounting</li>
                                  <li className="course-curriculum-item">• Cost Accounting</li>
                                  <li className="course-curriculum-item">• Corporate Accounting</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Economics</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Microeconomics</li>
                                  <li className="course-curriculum-item">• Macroeconomics</li>
                                  <li className="course-curriculum-item">• Business Economics</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Business & Law</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Business Law</li>
                                  <li className="course-curriculum-item">• Company Law</li>
                                  <li className="course-curriculum-item">• Principles of Mgmt.</li>
                                </ul>
                              </div>
                           </div>
                         </div>
                      </div>
                    )}
                    {activeTab === 'teachers' && (
                      <div className="tab-pane fade show active">
                        <p className="course-teacher-text-1">Our faculty has experience in handling graduation-level commerce subjects and focuses on making concepts simple and practical.</p>
                        <p className="course-teacher-text-2">Students receive:</p>
                        <ul className="courses-details-list" style={{ marginTop: "10px", padding: 0 }}>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Detailed explanation of topics</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Practical examples for better understanding</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Regular doubt-solving sessions</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Personal academic guidance</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="tab-pane fade show active">
                        <div style={{ background: "#f8f9fa", padding: "30px", borderRadius: "12px", borderLeft: "5px solid #7D2AE8" }}>
                           <p style={{ fontStyle: "italic", fontSize: "17px", color: "#333", lineHeight: "1.6" }}>“This program helped me understand my B.Com subjects much better. The guidance and regular support made exams much easier.”</p>
                           <p style={{ marginTop: "15px", fontWeight: "700", color: "#01228D" }}>— B.Com Student</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="courses-sidebar" style={{ position: "sticky", top: "100px" }}>
                {/* Course Features - Side Panel */}
                <div className="courses-features wow fadeInRight" style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.08)", padding: "30px" }}>
                  <div className="sidebar-title" style={{ borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "20px" }}>
                    <h4 className="title" style={{ fontSize: "22px", margin: 0 }}>Course Features</h4>
                  </div>
                  <ul className="courses-features-items m-0 p-0">
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Fee <strong>₹45,000</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Duration <strong>3 Years</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Classes <strong>4–5 Days/Week</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Mode <strong>University Support</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Exams <strong>Semester-wise</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Revision <strong>Session Support</strong></li>
                    <li style={{ padding: "12px 0", border: "none" }}>Rating <strong style={{ color: "#EAB830" }}>★★★★★ (5.0)</strong></li>
                  </ul>
                  <div className="sidebar-btn mt-30">
                    <a className="main-btn w-100 text-center" href="#" style={{ borderRadius: "10px", height: "50px", lineHeight: "50px", padding: "0", fontSize: "16px", background: "#01228D" }}>Book Demo Class</a>
                  </div>
                </div>

                {/* Related Courses Interlinking Widget */}
                <div className="related-courses-widget mt-50 wow fadeInRight" data-wow-delay="0.2s">
                   <h4 className="title" style={{ fontSize: "20px", marginBottom: "25px", fontWeight: "700", color: "#01228D" }}>Recommended Programs</h4>
                   <div className="related-list">
                     {relatedCourses.map((course, idx) => (
                       <Link key={idx} href={course.slug} className="sidebar-course-link" style={{ display: "block", textDecoration: "none", color: "inherit", marginBottom: "20px" }}>
                          <div className="sidebar-card" style={{ background: "#fff", border: "1px solid #eee", borderRadius: "12px", overflow: "hidden", display: "flex", alignItems: "center", transition: "all 0.3s", padding: "10px" }}>
                             <div className="img" style={{ width: "70px", height: "70px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                                <img src={course.image} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                             </div>
                             <div className="info" style={{ padding: "0 15px", flexGrow: 1 }}>
                                <h5 style={{ fontSize: "14px", margin: 0, fontWeight: "600", color: "#333", lineHeight: "1.4" }}>{course.title}</h5>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                                   <span style={{ fontSize: "12px", color: course.color, fontWeight: "700" }}>{course.fee}</span>
                                   <i className="fas fa-chevron-right" style={{ fontSize: "10px", color: "#ccc" }}></i>
                                </div>
                             </div>
                          </div>
                       </Link>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graduation Focused CTA Section */}
      <section className="cta-area wow fadeInUp" style={{ paddingBottom: "100px" }}>
        <div className="container">
          <div className="cta-box bg_cover" style={{ backgroundImage: "url(/assets/images/newsletter-bg-1.webp)", borderRadius: "20px", padding: "60px 40px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}>
            <div className="overlay" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(1, 34, 141, 0.96)", zIndex: 1 }}></div>
            <div className="row align-items-center" style={{ position: "relative", zIndex: 2 }}>
              <div className="col-lg-8 text-center text-lg-left">
                <div className="cta-text-wrapper">
                  <h2 className="title" style={{ fontSize: "32px", color: "#fff", fontWeight: "800" }}>Get the Right Guidance for Your Graduation</h2>
                  <p style={{ color: "rgba(255,255,255,0.95)", fontSize: "18px", marginTop: "10px" }}>Strengthen your concepts and perform better in your B.Com exams with expert support.</p>
                </div>
              </div>
              <div className="col-lg-4 text-center text-lg-right mt-40 mt-lg-0">
                 <button className="main-btn" style={{ borderRadius: "12px", background: "#fff", color: "#01228D", border: "none", height: "55px", lineHeight: "55px", padding: "0 35px", fontSize: "16px", fontWeight: "700" }}>Book Free Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx>{`
        .nav-item a { transition: all 0.3s ease; color: #666 !important; }
        .nav-item a.active { background: #fff !important; color: #7D2AE8 !important; font-weight: 700; box-shadow: 0 -5px 15px rgba(0,0,0,0.03); }
        .highlight-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important; }
        .sidebar-card:hover { transform: translateX(5px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); border-color: #7D2AE8 !important; }
        .sidebar-card:hover h5 { color: #7D2AE8 !important; }
        .courses-details-list li i { position: absolute; left: 0; }
        .main-btn { display: inline-block; vertical-align: middle; transition: all 0.3s; }
        .main-btn:hover { transform: scale(1.05); }
      `}</style>
    </>
  );
}

