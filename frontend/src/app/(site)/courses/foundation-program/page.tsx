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
    image: "/assets/images/Science Program (Class 9–10).png",
    slug: "#",
    color: "#2F7AD5"
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

export default function FoundationProgramPage() {
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
      
      {/* Page Banner - Compact and Sleek */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover page-banner-bg-image">
          <div className="container">
            <div className="banner-content text-center wow fadeInDown course-detail-banner-content">
              <h2 className="title course-detail-title">Foundation Program (Class 6–8)</h2>
              <div className="banner-divider-yellow"></div>
              <p className="course-detail-subtitle">Excellence in education starts with a strong foundation.</p>
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
                   <img src="/assets/images/Foundation Program (Class 6–8).png" className="course-detail-img" alt="Course Details" />
                </div>

                <div className="content-box mt-50 wow fadeInUp">
                  <h3 className="title course-content-title">Foundation Program for Class 6–8 (CBSE & ICSE)</h3>
                  <p className="course-content-text-1">
                    At Arvindu Classes, we believe that the middle school years are the most critical for academic development. This program is meticulously designed to bridge the gap between basic schooling and advanced academic challenges.
                  </p>
                  <p className="course-content-text-2">
                    Our teaching methodology focuses on <strong>Conceptual Clarity</strong>, <strong>Problem-Solving</strong>, and <strong>Disciplined Study Habits</strong>. We ensure that students not only score well in school but also develop a genuine interest in the subjects.
                  </p>
                </div>

                {/* Interactive Key Highlights Grid */}
                <div className="row mt-40">
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <div className="highlight-card card-highlight-yellow">
                       <div className="d-flex align-items-center mb-12">
                          <i className="fas fa-brain fs-20-yellow-mr12"></i>
                          <h5 className="fs-18-m0-fw700">Deep Conceptual Clarity</h5>
                       </div>
                       <p className="fs-14-gray">We move beyond rote learning to ensure students understand the 'Why' and 'How' behind every concept.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div className="highlight-card course-highlight-card-blue">
                       <div className="d-flex align-items-center mb-12">
                          <i className="fas fa-chart-line fs-20-blue-mr12"></i>
                          <h5 className="fs-18-m0-fw700">Progressive Difficulty</h5>
                       </div>
                       <p className="fs-14-gray">Curriculum that starts with basics and gradually shifts towards competitive exam level thinking.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.2s">
                    <div className="highlight-card card-highlight-green">
                       <div className="d-flex align-items-center mb-12">
                          <i className="fas fa-user-check fs-20-green-mr12"></i>
                          <h5 className="fs-18-m0-fw700">Personalized Support</h5>
                       </div>
                       <p className="fs-14-gray">Small batch sizes allow our mentors to focus on the individual learning pace of every student.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.2s">
                    <div className="highlight-card card-highlight-red">
                       <div className="d-flex align-items-center mb-12">
                          <i className="fas fa-file-invoice fs-20-red-mr12"></i>
                          <h5 className="fs-18-m0-fw700">Weekly Assessment</h5>
                       </div>
                       <p className="fs-14-gray">Regular tests with detailed analysis to identify and improve weak areas immediately.</p>
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
                        <h5 className="fs-20-mb20-fw700">Why Choose This Program?</h5>
                        <ul className="courses-details-list m-0 p-0">
                          <li className="mt-15-pl30"><i className="fas fa-check list-icon-green-t6-fs16"></i> <p className="fs-16">Eliminate the fear of complex subjects like Maths and Physics.</p></li>
                          <li className="mt-15-pl30"><i className="fas fa-check list-icon-green-t6-fs16"></i> <p className="fs-16">Develop analytical thinking and logical reasoning skills.</p></li>
                          <li className="mt-15-pl30"><i className="fas fa-check list-icon-green-t6-fs16"></i> <p className="fs-16">Prepare for future competitive exams like Olympiads, NTSE, and JEE/NEET.</p></li>
                          <li className="mt-15-pl30"><i className="fas fa-check list-icon-green-t6-fs16"></i> <p className="fs-16">Gain an edge over peers in school internal and board examinations.</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active">
                         <div className="row">
                           <div className="col-md-6">
                              <div className="bg-f9-p20-r8-h100">
                                <h6 className="course-curriculum-title">Mathematics Core</h6>
                                <ul className="fs-14-gray-pl15">
                                  <li className="mb-10">• Number System, Algebra & Ratio</li>
                                  <li className="mb-10">• Geometry, Mensuration & Symmetry</li>
                                  <li className="mb-10">• Data Handling & Probability Basics</li>
                                  <li className="mb-10">• Practical Geometry & Visualizing Shapes</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="bg-f9-p20-r8-h100">
                                <h6 className="course-curriculum-title">Science Foundations</h6>
                                <ul className="fs-14-gray-pl15">
                                  <li className="mb-10">• Physics: Motion, Force, Light & Electricity</li>
                                  <li className="mb-10">• Chemistry: Matter, Fibre & Changes</li>
                                  <li className="mb-10">• Biology: Plants, Animals & Environment</li>
                                  <li className="mb-10">• General Knowledge & Lab Safety</li>
                                </ul>
                              </div>
                           </div>
                         </div>
                      </div>
                    )}
                    {activeTab === 'teachers' && (
                      <div className="tab-pane fade show active text-center">
                        <i className="fas fa-user-tie fs-40-darkblue-mb20"></i>
                        <h5 className="fs-20-fw700">Expert Mentorship</h5>
                        <p className="mt-15-gray666">Our faculty consists of experienced educators who specialize in middle school pedagogy. They are trained to make learning fun while maintaining academic rigor.</p>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="tab-pane fade show active">
                        <div className="bg-f1-p25-r12-bl5-darkblue">
                           <p className="italic-fs16-gray333">“The way teachers explain concepts here is amazing. My son's performance in Maths improved from 70% to 95% within a year.”</p>
                           <p className="course-review-author">— Mrs. Sharma (Parent)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="courses-sidebar sticky-top-100">
                {/* Course Features - Premium Sidebar Card */}
                <div className="courses-features wow fadeInRight course-sidebar-widget-v2">
                  <div className="sidebar-title course-sidebar-header">
                    <h4 className="title course-sidebar-title-text">Course At A Glance</h4>
                  </div>
                  <ul className="courses-features-items m-0 p-0">
                    <li className="course-sidebar-item-border">Fee <strong>₹25,000</strong></li>
                    <li className="course-sidebar-item-border">Duration <strong>1 Year</strong></li>
                    <li className="course-sidebar-item-border">Schedule <strong>5 Days/Week</strong></li>
                    <li className="course-sidebar-item-border">Focus <strong>Maths, Science, SST</strong></li>
                    <li className="course-sidebar-item-border">Batch <strong>Limited Seats</strong></li>
                    <li className="p-12-0-border-none">Rating <strong className="text-star-yellow">★★★★★ (5.0)</strong></li>
                  </ul>
                  <div className="sidebar-btn mt-30">
                    <button 
                      className="main-btn w-100 text-center r10-p0-h50-lh50-fs16-bgdarkblue border-0 cursor-pointer" 
                      onClick={() => openForm('demo')}
                    >
                      Book Free Demo Class
                    </button>
                  </div>
                </div>

                {/* Related Courses Interlinking Widget */}
                <div className="related-courses-widget mt-50 wow fadeInRight" data-wow-delay="0.2s">
                   <h4 className="title course-sidebar-title-md">Other Programs</h4>
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
                                   <span className="fs-12-green-fw700">{course.fee}</span>
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

      {/* Modern CTA Section */}
      <section className="cta-area wow fadeInUp pb-100">
        <div className="container">
          <div className="cta-box bg_cover course-cta-box">
            <div className="overlay course-cta-overlay"></div>
            <div className="row align-items-center relative-z2">
              <div className="col-lg-8 text-center text-lg-left">
                <div className="cta-text-wrapper">
                  <h2 className="title course-cta-title">Start Your Journey Towards Excellence</h2>
                  <p className="course-cta-desc">Join our foundation program and transform your academic potential.</p>
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
      
      {/* Dynamic Scoped Styles */}
      <style jsx>{`
        .nav-item a {
           transition: all 0.3s ease;
           color: rgba(255, 255, 255, 0.8) !important;
        }
        .nav-item a:hover {
          color: #fff !important;
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
        /* Ensure buttons are perfectly centered */
        .main-btn {
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </>
  );
}

