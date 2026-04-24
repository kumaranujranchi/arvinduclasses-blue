"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Mock data for related courses
const relatedCourses = [
  {
    title: "Foundation Program (6–8)",
    fee: "₹25,000",
    image: "/assets/images/homepage1.png",
    slug: "/courses/foundation-program",
    color: "#EAB830"
  },
  {
    title: "Commerce (11–12)",
    fee: "₹40,000",
    image: "/assets/images/homepage2.png",
    slug: "#",
    color: "#0C8B51"
  },
  {
    title: "Applied Mathematics (9-12)",
    fee: "₹20,000",
    image: "/assets/images/course-banner.png",
    slug: "#",
    color: "#27B8A7"
  }
];

export default function ScienceProgramPage() {
  const [activeTab, setActiveTab] = useState('benefit');

  return (
    <>
      <Header />
      
      {/* Page Banner - More Serious and Academic */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/course-banner.png)" }}>
          <div className="container">
            <div className="banner-content text-center wow fadeInDown" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
              <h2 className="title" style={{ fontSize: "32px", fontWeight: "800", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>Science Program (Class 9–10)</h2>
              <div style={{ width: "60px", height: "4px", background: "#2F7AD5", margin: "20px auto" }}></div>
              <p style={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}>Excellence in Boards through structured learning and expert guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Details Start */}
      <section className="courses-details" style={{ paddingTop: "80px", paddingBottom: "80px", backgroundColor: "#fdfdfd" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="courses-details-content">
                <div className="image wow zoomIn" data-wow-duration="1s">
                   <img src="/assets/images/courses-details.webp" style={{ borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", width: "100%", height: "auto" }} alt="Science Program Details" />
                </div>

                <div className="content-box mt-50 wow fadeInUp">
                  <h3 className="title" style={{ fontSize: "30px", color: "#01228D", fontWeight: "700" }}>Science Program for Class 9–10 (CBSE & ICSE Board Preparation)</h3>
                  <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#444", marginTop: "20px" }}>
                    This program is designed for students of Class 9 and 10 who want strong conceptual clarity and excellent performance in board examinations.
                  </p>
                  <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#444", marginTop: "15px" }}>
                    At this stage, subjects become more detailed and require a deeper understanding. Our teaching focuses on simplifying concepts, strengthening fundamentals, and preparing students with a structured approach for board exams.
                  </p>
                </div>

                <div className="overview-section mt-50 wow fadeInUp">
                  <h4 style={{ fontSize: "24px", color: "#01228D", fontWeight: "700", marginBottom: "20px" }}>Course Overview</h4>
                  <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
                    The Science Program provides complete preparation for Class 9 and 10 with a focus on both conceptual learning and exam performance.
                  </p>
                  <p style={{ fontSize: "16px", color: "#555", marginTop: "15px" }}>We ensure that students:</p>
                  <ul className="courses-details-list" style={{ marginTop: "10px" }}>
                    <li style={{ marginTop: "10px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "4px", color: "#2F7AD5" }}></i> <p style={{ fontSize: "15px" }}>Understand concepts clearly instead of memorizing</p></li>
                    <li style={{ marginTop: "10px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "4px", color: "#2F7AD5" }}></i> <p style={{ fontSize: "15px" }}>Practice regularly with structured assignments</p></li>
                    <li style={{ marginTop: "10px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "4px", color: "#2F7AD5" }}></i> <p style={{ fontSize: "15px" }}>Get tested frequently to track progress</p></li>
                    <li style={{ marginTop: "10px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "4px", color: "#2F7AD5" }}></i> <p style={{ fontSize: "15px" }}>Improve weak areas through targeted support</p></li>
                  </ul>
                  <p style={{ fontSize: "16px", color: "#555", marginTop: "20px", fontWeight: "600" }}>
                    This program is ideal for students aiming for high scores in board exams and a strong base for Class 11.
                  </p>
                </div>

                {/* Academic Highlights Grid */}
                <div className="row mt-40">
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <div className="highlight-card" style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #eee", borderLeft: "5px solid #2F7AD5", marginBottom: "20px", transition: "all 0.3s" }}>
                       <h5 style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "700" }}>Board-Specific Preparation</h5>
                       <ul style={{ fontSize: "14px", color: "#666", padding: 0 }}>
                          <li style={{ marginBottom: "5px" }}>• Complete syllabus for CBSE & ICSE</li>
                          <li style={{ marginBottom: "5px" }}>• Full syllabus mock exams</li>
                          <li style={{ marginBottom: "5px" }}>• Board exam writing practice</li>
                       </ul>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div className="highlight-card" style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #eee", borderLeft: "5px solid #01228D", marginBottom: "20px", transition: "all 0.3s" }}>
                       <h5 style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "700" }}>Numerical Mastery</h5>
                       <ul style={{ fontSize: "14px", color: "#666", padding: 0 }}>
                          <li style={{ marginBottom: "5px" }}>• Physics & Maths Problem Solving</li>
                          <li style={{ marginBottom: "5px" }}>• Regular Doubt-Solving Sessions</li>
                          <li style={{ marginBottom: "5px" }}>• Performance Analysis</li>
                       </ul>
                    </div>
                  </div>
                </div>

                <div className="courses-details-tab wow fadeInUp" style={{ marginTop: "40px" }}>
                  <ul className="nav nav-justified" style={{ background: "#f8f9fa", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
                    <li className="nav-item">
                      <a className={activeTab === 'benefit' ? 'active' : ''} onClick={() => setActiveTab('benefit')} style={{ cursor: 'pointer', padding: "20px 10px", height: "auto", border: "none", fontSize: "16px" }}>Benefits</a>
                    </li>
                    <li className="nav-item">
                      <a className={activeTab === 'curriculum' ? 'active' : ''} onClick={() => setActiveTab('curriculum')} style={{ cursor: 'pointer', padding: "20px 10px", height: "auto", border: "none", fontSize: "16px" }}>Curriculum</a>
                    </li>
                    <li className="nav-item">
                      <a className={activeTab === 'teachers' ? 'active' : ''} onClick={() => setActiveTab('teachers')} style={{ cursor: 'pointer', padding: "20px 10px", height: "auto", border: "none", fontSize: "16px" }}>Faculty</a>
                    </li>
                    <li className="nav-item">
                      <a className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')} style={{ cursor: 'pointer', padding: "20px 10px", height: "auto", border: "none", fontSize: "16px" }}>Reviews</a>
                    </li>
                  </ul>
                  <div className="tab-content" style={{ border: "1px solid #eee", padding: "40px", borderRadius: "0 0 10px 10px", background: "#fff" }}>
                    {activeTab === 'benefit' && (
                      <div className="tab-pane fade show active">
                        <ul className="courses-details-list" style={{ margin: 0, padding: 0 }}>
                          <li style={{ marginTop: "12px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Strong preparation for Class 10 board exams.</p></li>
                          <li style={{ marginTop: "12px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Clear understanding of Physics, Chemistry, and Maths.</p></li>
                          <li style={{ marginTop: "12px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Improved problem-solving speed and accuracy.</p></li>
                          <li style={{ marginTop: "12px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Better exam writing and time management skills.</p></li>
                          <li style={{ marginTop: "12px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Solid foundation for Class 11 Science or Commerce.</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active">
                         <div className="row">
                           <div className="col-md-6">
                              <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "100%", marginBottom: "20px" }}>
                                <h6 style={{ fontWeight: "700", marginBottom: "15px", color: "#01228D" }}>Mathematics</h6>
                                <ul style={{ fontSize: "13px", color: "#555", paddingLeft: "15px" }}>
                                  <li style={{ marginBottom: "8px" }}>• Polynomials & Linear Equations</li>
                                  <li style={{ marginBottom: "8px" }}>• Trigonometry (Class 10)</li>
                                  <li style={{ marginBottom: "8px" }}>• Coordinate Geometry</li>
                                  <li style={{ marginBottom: "8px" }}>• Geometry & Mensuration</li>
                                  <li style={{ marginBottom: "8px" }}>• Statistics & Probability</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "100%", marginBottom: "20px" }}>
                                <h6 style={{ fontWeight: "700", marginBottom: "15px", color: "#01228D" }}>Physics</h6>
                                <ul style={{ fontSize: "13px", color: "#555", paddingLeft: "15px" }}>
                                  <li style={{ marginBottom: "8px" }}>• Motion and Laws of Motion</li>
                                  <li style={{ marginBottom: "8px" }}>• Work, Energy, and Power</li>
                                  <li style={{ marginBottom: "8px" }}>• Light (Reflection & Refraction)</li>
                                  <li style={{ marginBottom: "8px" }}>• Electricity and Magnetism</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "100%", marginBottom: "20px" }}>
                                <h6 style={{ fontWeight: "700", marginBottom: "15px", color: "#01228D" }}>Chemistry</h6>
                                <ul style={{ fontSize: "13px", color: "#555", paddingLeft: "15px" }}>
                                  <li style={{ marginBottom: "8px" }}>• Chemical Reactions & Equations</li>
                                  <li style={{ marginBottom: "8px" }}>• Acids, Bases, and Salts</li>
                                  <li style={{ marginBottom: "8px" }}>• Metals and Non-Metals</li>
                                  <li style={{ marginBottom: "8px" }}>• Carbon and its Compounds</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "100%", marginBottom: "20px" }}>
                                <h6 style={{ fontWeight: "700", marginBottom: "15px", color: "#01228D" }}>Biology</h6>
                                <ul style={{ fontSize: "13px", color: "#555", paddingLeft: "15px" }}>
                                  <li style={{ marginBottom: "8px" }}>• Life Processes</li>
                                  <li style={{ marginBottom: "8px" }}>• Control and Coordination</li>
                                  <li style={{ marginBottom: "8px" }}>• Reproduction</li>
                                  <li style={{ marginBottom: "8px" }}>• Environment and Ecosystem</li>
                                </ul>
                              </div>
                           </div>
                         </div>
                      </div>
                    )}
                    {activeTab === 'teachers' && (
                      <div className="tab-pane fade show active">
                        <p style={{ fontSize: "16px", color: "#444" }}>Our faculty specializes in board-level teaching and focuses on making complex topics simple and easy to understand.</p>
                        <p style={{ marginTop: "15px", fontWeight: "600" }}>Students benefit from:</p>
                        <ul className="courses-details-list" style={{ marginTop: "10px", padding: 0 }}>
                           <li style={{ marginTop: "10px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Structured explanation of concepts</p></li>
                           <li style={{ marginTop: "10px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Step-by-step problem solving</p></li>
                           <li style={{ marginTop: "10px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Regular doubt-clearing sessions</p></li>
                           <li style={{ marginTop: "10px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51" }}></i> <p style={{ fontSize: "15px" }}>Individual attention and guidance</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="tab-pane fade show active">
                        <div style={{ background: "#f8f9fa", padding: "30px", borderRadius: "12px", borderLeft: "5px solid #2F7AD5" }}>
                           <p style={{ fontStyle: "italic", fontSize: "17px", color: "#333", lineHeight: "1.6" }}>“After joining Arvindu Classes, my understanding of Science improved a lot. The test series helped me score much better in Class 10 board exams.”</p>
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
                  <ul className="courses-features-items" style={{ margin: 0, padding: 0 }}>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Fee <strong>₹35,000</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Duration <strong>1 Year</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Schedule <strong>5–6 Days/Week</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Focus <strong>Phy, Chem, Bio, Maths</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Boards <strong>CBSE & ICSE</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Tracking <strong>Progress Analysis</strong></li>
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
                                   <span style={{ fontSize: "12px", color: "#2F7AD5", fontWeight: "700" }}>{course.fee}</span>
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
                  <h2 className="title" style={{ fontSize: "32px", color: "#fff", fontWeight: "800" }}>Prepare Smart. Score Higher in Board Exams</h2>
                  <p style={{ color: "rgba(255,255,255,0.95)", fontSize: "18px", marginTop: "10px" }}>Join our Science Program and experience structured learning with expert guidance.</p>
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
        .nav-item a.active { background: #fff !important; color: #2F7AD5 !important; font-weight: 700; box-shadow: 0 -5px 15px rgba(0,0,0,0.03); }
        .highlight-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important; }
        .sidebar-card:hover { transform: translateX(5px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); border-color: #2F7AD5 !important; }
        .sidebar-card:hover h5 { color: #2F7AD5 !important; }
        .courses-details-list li i { position: absolute; left: 0; }
        .main-btn { display: inline-block; vertical-align: middle; transition: all 0.3s; }
        .main-btn:hover { transform: scale(1.05); }
      `}</style>
    </>
  );
}
