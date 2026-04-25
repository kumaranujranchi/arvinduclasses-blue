"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import LeadForm from "../../../components/LeadForm";

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
    title: "Applied Mathematics (9-12)",
    fee: "₹20,000",
    image: "/assets/images/course-banner.png",
    slug: "#",
    color: "#27B8A7"
  },
  {
    title: "B.Com Academic Support",
    fee: "₹45,000",
    image: "/assets/images/homepage2.png",
    slug: "#",
    color: "#0C8B51"
  }
];

export default function CommerceProgramPage() {
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
      
      {/* Page Banner - Professional and Career Focused */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover page-banner-bg-image">
          <div className="container">
            <div className="banner-content text-center wow fadeInDown course-detail-banner-content">
              <h2 className="title course-detail-title">Commerce Program (Class 11–12)</h2>
              <div className="banner-divider-green"></div>
              <p className="course-detail-subtitle">Building a professional future through conceptual clarity.</p>
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
                   <img src="/assets/images/courses-details.webp" className="course-detail-img" alt="Commerce Program Details" />
                </div>

                <div className="content-box mt-50 wow fadeInUp">
                  <h3 className="title course-content-title">Commerce Program for Class 11–12 (CBSE & ICSE)</h3>
                  <p className="course-content-text-1">
                    This program is designed for Commerce students of Class 11 and 12 who want strong conceptual clarity and excellent performance in board exams.
                  </p>
                  <p className="course-content-text-2">
                    Commerce subjects require both understanding and application, especially in Accountancy and Economics. Our teaching approach ensures that students build concepts step-by-step and gain confidence in solving numerical and theoretical questions.
                  </p>
                </div>

                <div className="overview-section mt-50 wow fadeInUp">
                  <h4 className="course-overview-title">Course Overview</h4>
                  <p className="course-overview-text-1">
                    The Commerce Program provides structured preparation for Accountancy, Economics, and Business Studies, along with regular practice and performance tracking.
                  </p>
                  <p className="course-overview-text-2">We focus on:</p>
                  <ul className="courses-details-list mt-10px">
                    <li className="course-list-item"><i className="fas fa-check list-icon-green-t4"></i> <p className="course-list-text">Building strong conceptual clarity in core subjects</p></li>
                    <li className="course-list-item"><i className="fas fa-check list-icon-green-t4"></i> <p className="course-list-text">Step-by-step numerical problem solving in Accountancy</p></li>
                    <li className="course-list-item"><i className="fas fa-check list-icon-green-t4"></i> <p className="course-list-text">Understanding economic concepts with real-world examples</p></li>
                    <li className="course-list-item"><i className="fas fa-check list-icon-green-t4"></i> <p className="course-list-text">Preparing students for board exams and future career paths</p></li>
                  </ul>
                  <p className="course-overview-text-3">
                    This program is ideal for students aiming for high scores and planning careers in Commerce fields such as CA, CS, or Business.
                  </p>
                </div>

                {/* Career Focus Highlights Grid */}
                <div className="row mt-40">
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <div className="highlight-card card-highlight-green">
                       <h5 className="course-highlight-title">Career Path Preparation</h5>
                       <p className="fs-14-gray">Strong foundation for competitive exams like CA Foundation, CS Executive, and University entrances.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div className="highlight-card course-highlight-card-dark">
                       <h5 className="course-highlight-title">Expert Collaboration</h5>
                       <p className="fs-14-gray">Academic support provided in professional collaboration with <strong>Sukrishna Commerce</strong> experts.</p>
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
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Strong foundation for CA, CS, and B.Com.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Improved accuracy in Accountancy problem solving.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Clear understanding of Economics concepts with real-world context.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Better exam writing and professional presentation skills.</p></li>
                          <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Confidence in handling complex board exam questions.</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active">
                         <div className="row">
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Accountancy</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Journal, Ledger, Trial Balance</li>
                                  <li className="course-curriculum-item">• Financial Statements</li>
                                  <li className="course-curriculum-item">• Partnership Accounts</li>
                                  <li className="course-curriculum-item">• Company Accounts (Class 12)</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Economics</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Microeconomics (Demand, Supply)</li>
                                  <li className="course-curriculum-item">• Macroeconomics (National Income)</li>
                                  <li className="course-curriculum-item">• Indian Economic Development</li>
                                  <li className="course-curriculum-item">• Money & Banking</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="course-curriculum-card">
                                <h6 className="course-curriculum-title">Business Studies</h6>
                                <ul className="course-curriculum-list">
                                  <li className="course-curriculum-item">• Principles of Management</li>
                                  <li className="course-curriculum-item">• Business Environment</li>
                                  <li className="course-curriculum-item">• Marketing Management</li>
                                  <li className="course-curriculum-item">• Financial Management</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="card-curriculum-center">
                                <i className="fas fa-briefcase fs-30-green-mb10"></i>
                                <h6 className="fw-700-darkblue">Career Focused</h6>
                                <p className="fs-12-gray666">Complete coverage for CBSE & ICSE Boards with a focus on future professional success.</p>
                              </div>
                           </div>
                         </div>
                      </div>
                    )}
                    {activeTab === 'teachers' && (
                      <div className="tab-pane fade show active">
                        <p className="course-teacher-text-1">Our Commerce faculty is experienced in board-level teaching and focuses on making complex topics simple and practical.</p>
                        <p className="course-teacher-text-2">Students receive:</p>
                        <ul className="courses-details-list mt-10px p-0">
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Step-by-step explanation of Accountancy problems</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Real-life examples for Economics and Business Studies</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Regular doubt-solving sessions</p></li>
                           <li className="course-list-item"><i className="fas fa-check course-list-icon-green"></i> <p className="course-list-text">Personal guidance for academic improvement</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="tab-pane fade show active">
                        <div className="review-card-green">
                           <p className="course-review-text">“The teaching at Arvindu Classes made Accountancy much easier for me. The regular tests and practice helped me score well in my board exams.”</p>
                           <p className="course-review-author">— Class 12 Student</p>
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
                    <li className="course-sidebar-item-border">Fee <strong>₹40,000</strong></li>
                    <li className="course-sidebar-item-border">Duration <strong>1 Year</strong></li>
                    <li className="course-sidebar-item-border">Classes <strong>5–6 Days/Week</strong></li>
                    <li className="course-sidebar-item-border">Focus <strong>Acc, Eco, B.St</strong></li>
                    <li className="course-sidebar-item-border">Boards <strong>CBSE & ICSE</strong></li>
                    <li className="course-sidebar-item-border">Collaboration <strong>Sukrishna Commerce</strong></li>
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
                                   <span style={{ fontSize: "12px", color: course.color, fontWeight: "700" }}>{course.fee}</span>
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

      {/* Career Focused CTA Section */}
      <section className="cta-area wow fadeInUp pb-100">
        <div className="container">
          <div className="cta-box bg_cover course-cta-box">
            <div className="overlay course-cta-overlay"></div>
            <div className="row align-items-center relative-z2">
              <div className="col-lg-8 text-center text-lg-left">
                <div className="cta-text-wrapper">
                  <h2 className="title course-cta-title">Build a Strong Career in Commerce</h2>
                  <p className="course-cta-desc">Get expert guidance and structured preparation for your board exams and future goals.</p>
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
        .nav-item a { transition: all 0.3s ease; color: #666 !important; }
        .nav-item a.active { background: #fff !important; color: #0C8B51 !important; font-weight: 700; box-shadow: 0 -5px 15px rgba(0,0,0,0.03); }
        .highlight-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important; }
        .sidebar-card:hover { transform: translateX(5px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); border-color: #0C8B51 !important; }
        .sidebar-card:hover h5 { color: #0C8B51 !important; }
        .courses-details-list li i { position: absolute; left: 0; }
        .main-btn { display: inline-block; vertical-align: middle; transition: all 0.3s; }
        .main-btn:hover { transform: scale(1.05); }
      `}</style>
    </>
  );
}

