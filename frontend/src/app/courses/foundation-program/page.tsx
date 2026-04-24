"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Mock data for related courses
const relatedCourses = [
  {
    title: "Science Program (9–10)",
    fee: "₹35,000",
    image: "/assets/images/homepage1.png",
    slug: "#",
    color: "#2F7AD5"
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

export default function FoundationProgramPage() {
  const [activeTab, setActiveTab] = useState('benefit');

  return (
    <>
      <Header />
      
      {/* Page Banner - Compact and Sleek */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/course-banner.png)", padding: "100px 0" }}>
          <div className="container">
            <div className="banner-content text-center wow fadeInDown">
              <h2 className="title" style={{ fontSize: "36px", fontWeight: "800", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>Foundation Program (Class 6–8)</h2>
              <div style={{ width: "60px", height: "4px", background: "#EAB830", margin: "20px auto" }}></div>
              <p style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>Excellence in education starts with a strong foundation.</p>
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
                   <img src="/assets/images/courses-details.webp" style={{ borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", width: "100%", height: "auto" }} alt="Course Details" />
                </div>

                <div className="content-box mt-50 wow fadeInUp">
                  <h3 className="title" style={{ fontSize: "30px", color: "#01228D", fontWeight: "700" }}>Foundation Program for Class 6–8 (CBSE & ICSE)</h3>
                  <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#444", marginTop: "20px" }}>
                    At Arvindu Classes, we believe that the middle school years are the most critical for academic development. This program is meticulously designed to bridge the gap between basic schooling and advanced academic challenges.
                  </p>
                  <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#444", marginTop: "15px" }}>
                    Our teaching methodology focuses on <strong>Conceptual Clarity</strong>, <strong>Problem-Solving</strong>, and <strong>Disciplined Study Habits</strong>. We ensure that students not only score well in school but also develop a genuine interest in the subjects.
                  </p>
                </div>

                {/* Interactive Key Highlights Grid */}
                <div className="row mt-40">
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <div className="highlight-card" style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #eee", borderLeft: "5px solid #EAB830", marginBottom: "20px", transition: "all 0.3s" }}>
                       <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <i className="fas fa-brain" style={{ fontSize: "20px", color: "#EAB830", marginRight: "12px" }}></i>
                          <h5 style={{ fontSize: "18px", margin: 0, fontWeight: "700" }}>Deep Conceptual Clarity</h5>
                       </div>
                       <p style={{ fontSize: "14px", color: "#666" }}>We move beyond rote learning to ensure students understand the 'Why' and 'How' behind every concept.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div className="highlight-card" style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #eee", borderLeft: "5px solid #2F7AD5", marginBottom: "20px", transition: "all 0.3s" }}>
                       <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <i className="fas fa-chart-line" style={{ fontSize: "20px", color: "#2F7AD5", marginRight: "12px" }}></i>
                          <h5 style={{ fontSize: "18px", margin: 0, fontWeight: "700" }}>Progressive Difficulty</h5>
                       </div>
                       <p style={{ fontSize: "14px", color: "#666" }}>Curriculum that starts with basics and gradually shifts towards competitive exam level thinking.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.2s">
                    <div className="highlight-card" style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #eee", borderLeft: "5px solid #0C8B51", marginBottom: "20px", transition: "all 0.3s" }}>
                       <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <i className="fas fa-user-check" style={{ fontSize: "20px", color: "#0C8B51", marginRight: "12px" }}></i>
                          <h5 style={{ fontSize: "18px", margin: 0, fontWeight: "700" }}>Personalized Support</h5>
                       </div>
                       <p style={{ fontSize: "14px", color: "#666" }}>Small batch sizes allow our mentors to focus on the individual learning pace of every student.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.2s">
                    <div className="highlight-card" style={{ background: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #eee", borderLeft: "5px solid #ff4d4d", marginBottom: "20px", transition: "all 0.3s" }}>
                       <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <i className="fas fa-file-invoice" style={{ fontSize: "20px", color: "#ff4d4d", marginRight: "12px" }}></i>
                          <h5 style={{ fontSize: "18px", margin: 0, fontWeight: "700" }}>Weekly Assessment</h5>
                       </div>
                       <p style={{ fontSize: "14px", color: "#666" }}>Regular tests with detailed analysis to identify and improve weak areas immediately.</p>
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
                        <h5 style={{ fontSize: "20px", marginBottom: "20px", fontWeight: "700" }}>Why Choose This Program?</h5>
                        <ul className="courses-details-list" style={{ margin: 0, padding: 0 }}>
                          <li style={{ marginTop: "15px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51", fontSize: "16px" }}></i> <p style={{ fontSize: "16px" }}>Eliminate the fear of complex subjects like Maths and Physics.</p></li>
                          <li style={{ marginTop: "15px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51", fontSize: "16px" }}></i> <p style={{ fontSize: "16px" }}>Develop analytical thinking and logical reasoning skills.</p></li>
                          <li style={{ marginTop: "15px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51", fontSize: "16px" }}></i> <p style={{ fontSize: "16px" }}>Prepare for future competitive exams like Olympiads, NTSE, and JEE/NEET.</p></li>
                          <li style={{ marginTop: "15px", paddingLeft: "30px" }}><i className="fas fa-check" style={{ top: "6px", color: "#0C8B51", fontSize: "16px" }}></i> <p style={{ fontSize: "16px" }}>Gain an edge over peers in school internal and board examinations.</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active">
                         <div className="row">
                           <div className="col-md-6">
                              <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "100%" }}>
                                <h6 style={{ fontWeight: "700", marginBottom: "15px", color: "#01228D" }}>Mathematics Core</h6>
                                <ul style={{ fontSize: "14px", color: "#555", paddingLeft: "15px" }}>
                                  <li style={{ marginBottom: "10px" }}>• Number System, Algebra & Ratio</li>
                                  <li style={{ marginBottom: "10px" }}>• Geometry, Mensuration & Symmetry</li>
                                  <li style={{ marginBottom: "10px" }}>• Data Handling & Probability Basics</li>
                                  <li style={{ marginBottom: "10px" }}>• Practical Geometry & Visualizing Shapes</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "100%" }}>
                                <h6 style={{ fontWeight: "700", marginBottom: "15px", color: "#01228D" }}>Science Foundations</h6>
                                <ul style={{ fontSize: "14px", color: "#555", paddingLeft: "15px" }}>
                                  <li style={{ marginBottom: "10px" }}>• Physics: Motion, Force, Light & Electricity</li>
                                  <li style={{ marginBottom: "10px" }}>• Chemistry: Matter, Fibre & Changes</li>
                                  <li style={{ marginBottom: "10px" }}>• Biology: Plants, Animals & Environment</li>
                                  <li style={{ marginBottom: "10px" }}>• General Knowledge & Lab Safety</li>
                                </ul>
                              </div>
                           </div>
                         </div>
                      </div>
                    )}
                    {activeTab === 'teachers' && (
                      <div className="tab-pane fade show active text-center">
                        <i className="fas fa-user-tie" style={{ fontSize: "40px", color: "#01228D", marginBottom: "20px" }}></i>
                        <h5 style={{ fontSize: "20px", fontWeight: "700" }}>Expert Mentorship</h5>
                        <p style={{ marginTop: "15px", color: "#666" }}>Our faculty consists of experienced educators who specialize in middle school pedagogy. They are trained to make learning fun while maintaining academic rigor.</p>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="tab-pane fade show active">
                        <div style={{ background: "#f1f1f1", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #01228D" }}>
                           <p style={{ fontStyle: "italic", fontSize: "16px", color: "#333" }}>“The way teachers explain concepts here is amazing. My son's performance in Maths improved from 70% to 95% within a year.”</p>
                           <p style={{ marginTop: "15px", fontWeight: "700", color: "#01228D" }}>— Mrs. Sharma (Parent)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="courses-sidebar" style={{ position: "sticky", top: "100px" }}>
                {/* Course Features - Premium Sidebar Card */}
                <div className="courses-features wow fadeInRight" style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.08)", padding: "30px" }}>
                  <div className="sidebar-title" style={{ borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "20px" }}>
                    <h4 className="title" style={{ fontSize: "22px", margin: 0 }}>Course At A Glance</h4>
                  </div>
                  <ul className="courses-features-items" style={{ margin: 0, padding: 0 }}>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Fee <strong>₹25,000</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Duration <strong>1 Year</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Schedule <strong>5 Days/Week</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Focus <strong>Maths, Science, SST</strong></li>
                    <li style={{ padding: "12px 0", borderBottom: "1px solid #f9f9f9" }}>Batch <strong>Limited Seats</strong></li>
                    <li style={{ padding: "12px 0", border: "none" }}>Rating <strong style={{ color: "#EAB830" }}>★★★★★ (5.0)</strong></li>
                  </ul>
                  <div className="sidebar-btn mt-30">
                    <a className="main-btn w-100 text-center" href="#" style={{ borderRadius: "10px", padding: "15px 0", height: "auto", lineHeight: "1", fontSize: "16px", background: "#01228D" }}>Book Free Demo Class</a>
                  </div>
                </div>

                {/* Related Courses Interlinking Widget */}
                <div className="related-courses-widget mt-50 wow fadeInRight" data-wow-delay="0.2s">
                   <h4 className="title" style={{ fontSize: "20px", marginBottom: "25px", fontWeight: "700", color: "#01228D" }}>Other Programs</h4>
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
                                   <span style={{ fontSize: "12px", color: "#0C8B51", fontWeight: "700" }}>{course.fee}</span>
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

      {/* Modern CTA Section */}
      <section className="cta-area wow fadeInUp" style={{ paddingBottom: "100px" }}>
        <div className="container">
          <div className="cta-box bg_cover" style={{ backgroundImage: "url(/assets/images/newsletter-bg-1.webp)", borderRadius: "20px", padding: "60px 40px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", position: "relative", overflow: "hidden" }}>
            <div className="overlay" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(1, 34, 141, 0.8)", zIndex: 1 }}></div>
            <div className="row align-items-center" style={{ position: "relative", zIndex: 2 }}>
              <div className="col-lg-8 text-center text-lg-left">
                <div className="section-title">
                  <h2 className="title" style={{ fontSize: "32px", color: "#fff", fontWeight: "800" }}>Start Your Journey Towards Excellence</h2>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", marginTop: "15px" }}>Join our foundation program and transform your academic potential.</p>
                </div>
              </div>
              <div className="col-lg-4 text-center text-lg-right mt-40 mt-lg-0">
                 <button className="main-btn main-btn-2" style={{ borderRadius: "12px", background: "#fff", color: "#01228D", border: "none", padding: "18px 35px", fontSize: "16px", fontWeight: "700" }}>Book Free Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Dynamic Scoped Styles */}
      <style jsx>{`
        .nav-item a {
           transition: all 0.3s ease;
           color: #666 !important;
        }
        .nav-item a.active {
          background: #fff !important;
          color: #01228D !important;
          font-weight: 700;
          box-shadow: 0 -5px 15px rgba(0,0,0,0.03);
        }
        .highlight-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
        }
        .sidebar-card:hover {
          transform: translateX(5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          border-color: #01228D !important;
        }
        .sidebar-card:hover h5 {
           color: #01228D !important;
        }
        .courses-details-list li i {
           position: absolute;
           left: 0;
        }
      `}</style>
    </>
  );
}
