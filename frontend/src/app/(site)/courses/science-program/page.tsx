"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import LeadForm from "../../../components/LeadForm";

// Mock data for related courses
const relatedCourses = [
  {
    title: "Foundation Program (6–8)",
    fee: "₹25,000",
    image: "/assets/images/Foundation Program (Class 6–8).png",
    slug: "/courses/foundation-program",
    color: "#EAB830"
  },
  {
    title: "Commerce (11–12)",
    fee: "₹40,000",
    image: "/assets/images/Commerce Program (Class 11–12).png",
    slug: "#",
    color: "#0C8B51"
  },
  {
    title: "Applied Mathematics (9-12)",
    fee: "₹20,000",
    image: "/assets/images/Applied Mathematics (Class 9–12).png",
    slug: "#",
    color: "#27B8A7"
  }
];

export default function ScienceProgramPage() {
  const [activeTab, setActiveTab] = useState('benefit');
  const [formConfig, setFormConfig] = useState<{ isOpen: boolean; type: 'demo' | 'enroll' }>({
    isOpen: false,
    type: 'demo'
  });

  const openForm = (type: 'demo' | 'enroll') => {
    setFormConfig({ isOpen: true, type });
  };

  const closeForm = () => {
    setFormConfig({ ...formConfig, isOpen: false });
  };

  return (
    <>
      <Header />
      
      {/* Page Banner - More Serious and Academic */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover page-banner-bg-image">
          <div className="container">
            <div className="banner-content text-center wow fadeInDown course-detail-banner-content">
              <h2 className="title course-detail-title">Science Program (Class 9–10)</h2>
              <div className="course-detail-divider"></div>
              <p className="course-detail-subtitle">Excellence in Boards through structured learning and expert guidance.</p>
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
                   <img src="/assets/images/Science Program (Class 9–10).png" className="course-detail-img" alt="Science Program Details" />
                </div>

                <div className="content-box mt-50 wow fadeInUp">
                  <h3 className="title course-content-title">Science Program for Class 9–10 (CBSE & ICSE Board Preparation)</h3>
                  <p className="course-content-text-1">
                    This program is designed for students of Class 9 and 10 who want strong conceptual clarity and excellent performance in board examinations.
                  </p>
                  <p className="course-content-text-2">
                    At this stage, subjects become more detailed and require a deeper understanding. Our teaching focuses on simplifying concepts, strengthening fundamentals, and preparing students with a structured approach for board exams.
                  </p>
                </div>

                <div className="overview-section mt-50 wow fadeInUp">
                  <h4 className="course-overview-title">Course Overview</h4>
                  <p className="course-overview-text-1">
                    The Science Program provides complete preparation for Class 9 and 10 with a focus on both conceptual learning and exam performance.
                  </p>
                  <p className="course-overview-text-2">We ensure that students:</p>
                  <ul className="courses-details-list mt-10px">
                    <li className="course-list-item"><i className="fas fa-check course-list-icon"></i> <p className="course-list-text">Understand concepts clearly instead of memorizing</p></li>
                    <li className="course-list-item"><i className="fas fa-check course-list-icon"></i> <p className="course-list-text">Practice regularly with structured assignments</p></li>
                    <li className="course-list-item"><i className="fas fa-check course-list-icon"></i> <p className="course-list-text">Get tested frequently to track progress</p></li>
                    <li className="course-list-item"><i className="fas fa-check course-list-icon"></i> <p className="course-list-text">Improve weak areas through targeted support</p></li>
                  </ul>
                  <p className="course-overview-text-3">
                    This program is ideal for students aiming for high scores in board exams and a strong base for Class 11.
                  </p>
                </div>

                {/* Academic Highlights Grid */}
                <div className="row mt-40">
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <div className="highlight-card course-highlight-card-blue">
                       <h5 className="course-highlight-title">Board-Specific Preparation</h5>
                       <ul className="course-highlight-list">
                          <li className="course-highlight-list-item">• Complete syllabus for CBSE & ICSE</li>
                          <li className="course-highlight-list-item">• Full syllabus mock exams</li>
                          <li className="course-highlight-list-item">• Board exam writing practice</li>
                       </ul>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div className="highlight-card course-highlight-card-dark">
                       <h5 className="course-highlight-title">Numerical Mastery</h5>
                       <ul className="course-highlight-list">
                          <li className="course-highlight-list-item">• Physics & Maths Problem Solving</li>
                          <li className="course-highlight-list-item">• Regular Doubt-Solving Sessions</li>
                          <li className="course-highlight-list-item">• Performance Analysis</li>
                       </ul>
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
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Strong preparation for Class 10 board exams.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Clear understanding of Physics, Chemistry, and Maths.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Improved problem-solving speed and accuracy.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Better exam writing and time management skills.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Solid foundation for Class 11 Science or Commerce.</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active">
                         <div className="row">
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Mathematics</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Polynomials & Linear Equations</li>
                                  <li className="course-curriculum-item">• Trigonometry (Class 10)</li>
                                  <li className="course-curriculum-item">• Coordinate Geometry</li>
                                  <li className="course-curriculum-item">• Geometry & Mensuration</li>
                                  <li className="course-curriculum-item">• Statistics & Probability</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Physics</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Motion and Laws of Motion</li>
                                  <li className="course-curriculum-item">• Work, Energy, and Power</li>
                                  <li className="course-curriculum-item">• Light (Reflection & Refraction)</li>
                                  <li className="course-curriculum-item">• Electricity and Magnetism</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Chemistry</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Chemical Reactions & Equations</li>
                                  <li className="course-curriculum-item">• Acids, Bases, and Salts</li>
                                  <li className="course-curriculum-item">• Metals and Non-Metals</li>
                                  <li className="course-curriculum-item">• Carbon and its Compounds</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Biology</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Life Processes</li>
                                  <li className="course-curriculum-item">• Control and Coordination</li>
                                  <li className="course-curriculum-item">• Reproduction</li>
                                  <li className="course-curriculum-item">• Environment and Ecosystem</li>
                                </ul>
                              </div>
                           </div>
                         </div>
                      </div>
                    )}
                    {activeTab === 'teachers' && (
                      <div className="tab-pane fade show active">
                        <p className="course-teacher-text-1">Our faculty specializes in board-level teaching and focuses on making complex topics simple and easy to understand.</p>
                        <p className="course-teacher-text-2">Students benefit from:</p>
                        <ul className="courses-details-list mt-10px p-0">
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Structured explanation of concepts</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Step-by-step problem solving</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Regular doubt-clearing sessions</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Individual attention and guidance</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="tab-pane fade show active">
                        <div className="course-review-card-blue">
                           <p className="course-review-text">“After joining Arvindu Classes, my understanding of Science improved a lot. The test series helped me score much better in Class 10 board exams.”</p>
                           <p className="course-review-author">— Class 10 Student</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="courses-sidebar sticky-top-100">
                {/* Course Features - Side Panel */}
                <div className="courses-features wow fadeInRight course-sidebar-widget-v2">
                  <div className="sidebar-title course-sidebar-header">
                    <h4 className="title course-sidebar-title-text">Course Features</h4>
                  </div>
                  <ul className="courses-features-items m-0 p-0">
                    <li className="course-sidebar-item-border">Fee <strong>₹35,000</strong></li>
                    <li className="course-sidebar-item-border">Duration <strong>1 Year</strong></li>
                    <li className="course-sidebar-item-border">Schedule <strong>5–6 Days/Week</strong></li>
                    <li className="course-sidebar-item-border">Focus <strong>Phy, Chem, Bio, Maths</strong></li>
                    <li className="course-sidebar-item-border">Boards <strong>CBSE & ICSE</strong></li>
                    <li className="course-sidebar-item-border">Tracking <strong>Progress Analysis</strong></li>
                    <li className="p-12-0-border-none">Rating <strong className="text-star-yellow">★★★★★ (5.0)</strong></li>
                  </ul>
                  <div className="sidebar-btn mt-30">
                    <button 
                      className="main-btn w-100 text-center course-sidebar-btn-blue border-0 cursor-pointer" 
                      onClick={() => openForm('demo')}
                    >
                      Book Demo Class
                    </button>
                  </div>
                </div>

                {/* Related Courses Interlinking Widget */}
                <div className="related-courses-widget mt-50 wow fadeInRight" data-wow-delay="0.2s">
                   <h4 className="title course-sidebar-title-md">Recommended Programs</h4>
                   <div className="related-list">
                     {relatedCourses.map((course, idx) => (
                       <Link key={idx} href={course.slug} className="sidebar-course-link course-sidebar-link-box">
                          <div className="sidebar-card course-sidebar-card-sm">
                             <div className="img course-sidebar-img-box">
                                <img src={course.image} alt={course.title} className="w-100 h-100 object-cover" />
                             </div>
                             <div className="info course-sidebar-info-v2">
                                <h5 className="course-sidebar-course-title">{course.title}</h5>
                                <div className="d-flex justify-content-between align-items-center mt-5">
                                   <span className="course-sidebar-price-text">{course.fee}</span>
                                   <i className="fas fa-chevron-right fs-10px text-light-gray"></i>
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
      <section className="cta-area wow fadeInUp pb-100">
        <div className="container">
          <div className="cta-box bg_cover course-cta-box">
            <div className="overlay course-cta-overlay"></div>
            <div className="row align-items-center relative-z2">
              <div className="col-lg-8 text-center text-lg-left">
                <div className="cta-text-wrapper">
                  <h2 className="title course-cta-title">Prepare Smart. Score Higher in Board Exams</h2>
                  <p className="course-cta-desc">Join our Science Program and experience structured learning with expert guidance.</p>
                </div>
              </div>
              <div className="col-lg-4 text-center text-lg-right mt-40 mt-lg-0">
                 <button 
                  className="main-btn course-cta-btn"
                  onClick={() => openForm('demo')}
                 >
                   Book Free Demo
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <LeadForm 
        isOpen={formConfig.isOpen} 
        onClose={closeForm} 
        type={formConfig.type} 
      />
      
      <style jsx>{`
        .nav-item a { transition: all 0.3s ease; color: rgba(255, 255, 255, 0.8) !important; }
        .nav-item a:hover { color: #fff !important; }
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

