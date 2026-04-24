"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// Mock data for related courses
const relatedCourses = [
  {
    title: "Science Program (9–10)",
    fee: "₹35,000",
    image: "/assets/images/homepage1.png",
    slug: "/courses/science-program",
    color: "#2F7AD5"
  },
  {
    title: "Commerce Program (11–12)",
    fee: "₹40,000",
    image: "/assets/images/homepage2.png",
    slug: "/courses/commerce-program",
    color: "#0C8B51"
  },
  {
    title: "Physics, Chemistry & Bio",
    fee: "₹30,000",
    image: "/assets/images/course-banner.png",
    slug: "#",
    color: "#2F7AD5"
  }
];

export default function AppliedMathematicsPage() {
  const [activeTab, setActiveTab] = useState('benefit');

  return (
    <>
      <Header />
      
      {/* Page Banner - Practice and Concept Focused */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/course-banner.png)" }}>
          <div className="container">
            <div className="banner-content text-center wow fadeInDown course-detail-banner-content">
              <h2 className="title course-detail-title">Applied Mathematics (Class 9–12)</h2>
              <div style={{ width: "60px", height: "4px", background: "#27B8A7", margin: "20px auto" }}></div>
              <p className="course-detail-subtitle">Strengthening fundamentals. Improving problem-solving skills.</p>
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
                   <img src="/assets/images/courses-details.webp" className="course-detail-img" alt="Applied Mathematics Details" />
                </div>

                <div className="content-box mt-50 wow fadeInUp">
                  <h3 className="title course-content-title">Applied Mathematics Program (Class 9–12)</h3>
                  <p className="course-content-text-1">
                    This program is designed for students who want to strengthen their Mathematics skills and improve their performance in school exams.
                  </p>
                  <p className="course-content-text-2">
                    Mathematics is a subject that requires regular practice and clear understanding. Our approach focuses on simplifying concepts, improving problem-solving ability, and building confidence step-by-step.
                  </p>
                </div>

                <div className="overview-section mt-50 wow fadeInUp">
                  <h4 className="course-overview-title">Course Overview</h4>
                  <p className="course-overview-text-1">
                    The Applied Mathematics Program helps students develop strong numerical and analytical skills required for academic success.
                  </p>
                  <p className="course-overview-text-2">We focus on:</p>
                  <ul className="courses-details-list mt-10px">
                    <li className="course-list-item"><i className="fas fa-check" style={{ top: "4px", color: "#27B8A7" }}></i> <p className="course-list-text">Concept clarity in core mathematical topics</p></li>
                    <li className="course-list-item"><i className="fas fa-check" style={{ top: "4px", color: "#27B8A7" }}></i> <p className="course-list-text">Step-by-step problem-solving techniques</p></li>
                    <li className="course-list-item"><i className="fas fa-check" style={{ top: "4px", color: "#27B8A7" }}></i> <p className="course-list-text">Regular practice with structured worksheets</p></li>
                    <li className="course-list-item"><i className="fas fa-check" style={{ top: "4px", color: "#27B8A7" }}></i> <p className="course-list-text">Improving speed and accuracy</p></li>
                  </ul>
                  <p className="course-overview-text-3">
                    This course is ideal for students who want to improve their Maths performance or need extra support alongside school learning.
                  </p>
                </div>

                {/* Practice Focus Highlights Grid */}
                <div className="row mt-40">
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <div className="highlight-card" style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #eee", borderLeft: "5px solid #27B8A7", marginBottom: "20px", transition: "all 0.3s" }}>
                       <h5 className="course-highlight-title">Concept Mastery</h5>
                       <p style={{ fontSize: "14px", color: "#666" }}>Strong focus on fundamentals and concepts with daily doubt-clearing sessions.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div className="highlight-card course-highlight-card-dark">
                       <h5 className="course-highlight-title">Practice Oriented</h5>
                       <p style={{ fontSize: "14px", color: "#666" }}>Daily practice worksheets and step-by-step problem solving methods for better results.</p>
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
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Improved confidence in Mathematics.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Better problem-solving and analytical skills.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Increased calculation speed and accuracy.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Strong support for board exam preparation.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Reduced fear of Maths through simple explanations.</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active">
                         <div className="row">
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Class 9–10 Core</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Number System & Algebra</li>
                                  <li className="course-curriculum-item">• Linear Equations</li>
                                  <li className="course-curriculum-item">• Geometry & Mensuration</li>
                                  <li className="course-curriculum-item">• Trigonometry Basics</li>
                                  <li className="course-curriculum-item">• Statistics & Probability</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Class 11–12 Core</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Functions & Relations</li>
                                  <li className="course-curriculum-item">• Calculus Basics</li>
                                  <li className="course-curriculum-item">• Algebra & Matrices</li>
                                  <li className="course-curriculum-item">• Probability</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-12">
                              <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "8px", marginTop: "10px", border: "1px dashed #27B8A7" }}>
                                <h6 style={{ fontWeight: "700", marginBottom: "5px", color: "#01228D" }}>Applied Mathematics (Special)</h6>
                                <p style={{ fontSize: "13px", color: "#555" }}>Customized topics for Commerce students and practical applications in real-world scenarios.</p>
                              </div>
                           </div>
                         </div>
                      </div>
                    )}
                    {activeTab === 'teachers' && (
                      <div className="tab-pane fade show active">
                        <p className="course-teacher-text-1">Our Mathematics faculty focuses on making the subject simple and easy to understand for every student.</p>
                        <p className="course-teacher-text-2">Students benefit from:</p>
                        <ul className="courses-details-list" style={{ marginTop: "10px", padding: 0 }}>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Step-by-step explanation of problems</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Practice-oriented teaching style</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Individual doubt-solving support</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Personal attention in small batches</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="tab-pane fade show active">
                        <div style={{ background: "#f8f9fa", padding: "30px", borderRadius: "12px", borderLeft: "5px solid #27B8A7" }}>
                           <p style={{ fontStyle: "italic", fontSize: "17px", color: "#333", lineHeight: "1.6" }}>“Maths was always difficult for me, but after joining this course, I started understanding concepts clearly and improved my scores.”</p>
                           <p style={{ marginTop: "15px", fontWeight: "700", color: "#01228D" }}>— Class 10 Student</p>
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
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Fee <strong>₹20,000</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Duration <strong>1 Year</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Classes <strong>3–4 Days/Week</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Mode <strong>Concept + Practice</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Boards <strong>CBSE & ICSE</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Sheets <strong>Worksheets Provided</strong></li>
                    <li style={{ padding: "12px 0", border: "none" }}>Rating <strong style={{ color: "#EAB830" }}>★★★★☆ (4.5)</strong></li>
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

      {/* Result Focused CTA Section */}
      <section className="cta-area wow fadeInUp" style={{ paddingBottom: "100px" }}>
        <div className="container">
          <div className="cta-box bg_cover" style={{ backgroundImage: "url(/assets/images/newsletter-bg-1.webp)", borderRadius: "20px", padding: "60px 40px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}>
            <div className="overlay" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(1, 34, 141, 0.96)", zIndex: 1 }}></div>
            <div className="row align-items-center" style={{ position: "relative", zIndex: 2 }}>
              <div className="col-lg-8 text-center text-lg-left">
                <div className="cta-text-wrapper">
                  <h2 className="title" style={{ fontSize: "32px", color: "#fff", fontWeight: "800" }}>Improve Your Maths. Improve Your Results.</h2>
                  <p style={{ color: "rgba(255,255,255,0.95)", fontSize: "18px", marginTop: "10px" }}>Join our Applied Mathematics program and build confidence with expert guidance.</p>
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
        .nav-item a.active { background: #fff !important; color: #27B8A7 !important; font-weight: 700; box-shadow: 0 -5px 15px rgba(0,0,0,0.03); }
        .highlight-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important; }
        .sidebar-card:hover { transform: translateX(5px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); border-color: #27B8A7 !important; }
        .sidebar-card:hover h5 { color: #27B8A7 !important; }
        .courses-details-list li i { position: absolute; left: 0; }
        .main-btn { display: inline-block; vertical-align: middle; transition: all 0.3s; }
        .main-btn:hover { transform: scale(1.05); }
      `}</style>
    </>
  );
}

