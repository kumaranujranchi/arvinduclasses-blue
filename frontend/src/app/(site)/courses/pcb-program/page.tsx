"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// Mock data for related courses
const relatedCourses = [
  {
    title: "Applied Mathematics (9-12)",
    fee: "₹20,000",
    image: "/assets/images/course-banner.png",
    slug: "/courses/applied-mathematics",
    color: "#27B8A7"
  },
  {
    title: "Foundation Program (6–8)",
    fee: "₹25,000",
    image: "/assets/images/homepage1.png",
    slug: "/courses/foundation-program",
    color: "#EAB830"
  },
  {
    title: "Science Program (9–10)",
    fee: "₹35,000",
    image: "/assets/images/homepage2.png",
    slug: "/courses/science-program",
    color: "#2F7AD5"
  }
];

export default function PCBProgramPage() {
  const [activeTab, setActiveTab] = useState('benefit');

  return (
    <>
      <Header />
      
      {/* Page Banner - Concept and Understanding Focused */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover page-banner-bg-image">
          <div className="container">
            <div className="banner-content text-center wow fadeInDown" className="banner-padding-y">
              <h2 className="title" className="title-white-shadow">Physics, Chemistry & Biology</h2>
              <div className="banner-divider"></div>
              <p className="text-white-16-500">Mastering Science through conceptual clarity and regular practice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Details Start */}
      <section className="courses-details" className="section-padding-y-fdfd">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="courses-details-content">
                <div className="image wow zoomIn" data-wow-duration="1s">
                   <img src="/assets/images/courses-details.webp" className="img-radius-shadow-w100" alt="PCB Program Details" />
                </div>

                <div className="content-box mt-50 wow fadeInUp">
                  <h3 className="title" className="title-dark-blue-30">Science Program – Physics, Chemistry & Biology (Class 9–10)</h3>
                  <p className="text-gray-17-mt20">
                    This program is designed for students who want a deeper understanding of core Science subjects — Physics, Chemistry, and Biology.
                  </p>
                  <p className="text-gray-17-mt15">
                    Science requires conceptual clarity along with the ability to apply concepts in numerical and theoretical questions. Our teaching approach ensures students understand each topic clearly and can confidently solve exam-level questions.
                  </p>
                </div>

                <div className="overview-section mt-50 wow fadeInUp">
                  <h4 className="title-dark-blue-24">Course Overview</h4>
                  <p className="text-gray-16-lh16">
                    The Science Combo Program focuses on strengthening concepts in Physics, Chemistry, and Biology with structured teaching and regular assessments.
                  </p>
                  <p className="text-gray-16-mt15">We ensure that students:</p>
                  <ul className="courses-details-list" className="mt-10">
                    <li className="list-item-mt10-pl30"><i className="fas fa-check" className="list-icon-blue-t4"></i> <p className="fs-15">Understand concepts instead of memorizing</p></li>
                    <li className="list-item-mt10-pl30"><i className="fas fa-check" className="list-icon-blue-t4"></i> <p className="fs-15">Practice numerical and theory-based questions regularly</p></li>
                    <li className="list-item-mt10-pl30"><i className="fas fa-check" className="list-icon-blue-t4"></i> <p className="fs-15">Improve their performance through continuous evaluation</p></li>
                    <li className="list-item-mt10-pl30"><i className="fas fa-check" className="list-icon-blue-t4"></i> <p className="fs-15">Develop confidence in handling complex topics</p></li>
                  </ul>
                  <p className="text-gray-16-mt20-bold">
                    This program is ideal for students who want extra support in Science subjects alongside school preparation.
                  </p>
                </div>

                {/* Science Mastery Highlights Grid */}
                <div className="row mt-40">
                  <div className="col-md-6 wow fadeInLeft" data-wow-delay="0.1s">
                    <div className="highlight-card" className="card-highlight-blue">
                       <h5 className="fs-18-mb10-bold">Theory & Diagram Focus</h5>
                       <p className="fs-14-gray">Specialized guidance for Biology diagrams and theoretical concepts in Chemistry.</p>
                    </div>
                  </div>
                  <div className="col-md-6 wow fadeInRight" data-wow-delay="0.1s">
                    <div className="highlight-card" className="card-highlight-dark">
                       <h5 className="fs-18-mb10-bold">Lab & Numerical Support</h5>
                       <p className="fs-14-gray">Practical lab concept support and intensive numerical practice for Physics.</p>
                    </div>
                  </div>
                </div>

                <div className="courses-details-tab wow fadeInUp" className="mt-40">
                  <ul className="nav nav-justified" className="tab-nav-bg">
                    <li className="nav-item">
                      <a className={activeTab === 'benefit' ? 'active' : ''} onClick={() => setActiveTab('benefit')} className="tab-link-custom">Benefits</a>
                    </li>
                    <li className="nav-item">
                      <a className={activeTab === 'curriculum' ? 'active' : ''} onClick={() => setActiveTab('curriculum')} className="tab-link-custom">Curriculum</a>
                    </li>
                    <li className="nav-item">
                      <a className={activeTab === 'teachers' ? 'active' : ''} onClick={() => setActiveTab('teachers')} className="tab-link-custom">Faculty</a>
                    </li>
                    <li className="nav-item">
                      <a className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')} className="tab-link-custom">Reviews</a>
                    </li>
                  </ul>
                  <div className="tab-content" className="tab-content-box">
                    {activeTab === 'benefit' && (
                      <div className="tab-pane fade show active">
                        <ul className="courses-details-list" className="m-0 p-0">
                          <li className="list-item-mt12-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Strong understanding of core Science subjects.</p></li>
                          <li className="list-item-mt12-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Improved performance in school and board exams.</p></li>
                          <li className="list-item-mt12-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Better numerical solving skills for Physics & Chemistry.</p></li>
                          <li className="list-item-mt12-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Clear concepts in Biology and theory-intensive subjects.</p></li>
                          <li className="list-item-mt12-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Strong foundation for higher studies in Science streams.</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'curriculum' && (
                      <div className="tab-pane fade show active">
                         <div className="row">
                           <div className="col-md-6">
                              <div className="curriculum-card">
                                <h6 className="fs-bold-mb15-dark">Physics</h6>
                                <ul className="fs-13-gray-pl15">
                                  <li className="mb-8">• Motion and Laws of Motion</li>
                                  <li className="mb-8">• Work, Energy, and Power</li>
                                  <li className="mb-8">• Light and Sound</li>
                                  <li className="mb-8">• Electricity (Class 10)</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="curriculum-card">
                                <h6 className="fs-bold-mb15-dark">Chemistry</h6>
                                <ul className="fs-13-gray-pl15">
                                  <li className="mb-8">• Matter and its Properties</li>
                                  <li className="mb-8">• Chemical Reactions</li>
                                  <li className="mb-8">• Acids, Bases, and Salts</li>
                                  <li className="mb-8">• Metals and Non-Metals</li>
                                </ul>
                              </div>
                           </div>
                           <div className="col-md-12">
                              <div className="curriculum-card">
                                <h6 className="fs-bold-mb15-dark">Biology</h6>
                                <ul className="fs-13-gray-pl15">
                                  <li className="mb-8">• Cell Structure & Human Body Systems</li>
                                  <li className="mb-8">• Plants and Environment</li>
                                  <li className="mb-8">• Reproduction and Ecosystem</li>
                                </ul>
                              </div>
                           </div>
                         </div>
                      </div>
                    )}
                    {activeTab === 'teachers' && (
                      <div className="tab-pane fade show active">
                        <p className="fs-16-gray444">Our Science faculty focuses on making complex topics simple and easy to understand through structured teaching.</p>
                        <p className="mt-15-fw600">Students benefit from:</p>
                        <ul className="courses-details-list mt-10px p-0">
                           <li className="list-item-mt10-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Concept-based explanation</p></li>
                           <li className="list-item-mt10-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Numerical problem-solving guidance</p></li>
                           <li className="list-item-mt10-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Diagram and theory clarity</p></li>
                           <li className="list-item-mt10-pl30"><i className="fas fa-check" className="list-icon-green-t6"></i> <p className="fs-15">Regular doubt-clearing support</p></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="tab-pane fade show active">
                        <div className="course-review-card-blue">
                           <p className="course-review-text">“The way concepts are explained in Physics and Chemistry made everything much easier to understand. My performance improved a lot after joining.”</p>
                           <p className="course-review-author">— Class 9 Student</p>
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
                  <div className="sidebar-title" className="course-sidebar-header">
                    <h4 className="title" className="course-sidebar-title-text">Course Features</h4>
                  </div>
                  <ul className="courses-features-items" className="m-0 p-0">
                    <li className="course-sidebar-item-border">Fee <strong>₹30,000</strong></li>
                    <li className="course-sidebar-item-border">Duration <strong>1 Year</strong></li>
                    <li className="course-sidebar-item-border">Classes <strong>5 Days/Week</strong></li>
                    <li className="course-sidebar-item-border">Focus <strong>Physics, Chem, Bio</strong></li>
                    <li className="course-sidebar-item-border">Boards <strong>CBSE & ICSE</strong></li>
                    <li className="course-sidebar-item-border">Labs <strong>Concept Support</strong></li>
                    <li className="p-12-0-border-none">Rating <strong className="text-star-yellow">★★★★★ (5.0)</strong></li>
                  </ul>
                  <div className="sidebar-btn mt-30">
                    <a className="main-btn w-100 text-center" href="#" className="course-sidebar-btn-blue">Book Demo Class</a>
                  </div>
                </div>

                {/* Related Courses Interlinking Widget */}
                <div className="related-courses-widget mt-50 wow fadeInRight" data-wow-delay="0.2s">
                   <h4 className="title" className="course-sidebar-title-md">Recommended Programs</h4>
                   <div className="related-list">
                     {relatedCourses.map((course, idx) => (
                       <Link key={idx} href={course.slug} className="sidebar-course-link course-sidebar-link-box">
                          <div className="sidebar-card course-sidebar-card-sm">
                             <div className="img" className="course-sidebar-img-box">
                                <img src={course.image} alt={course.title} className="w-100 h-100 object-cover" />
                             </div>
                             <div className="info" className="course-sidebar-info-v2">
                                <h5 className="course-sidebar-course-title">{course.title}</h5>
                                <div className="d-flex justify-content-between align-items-center mt-5">
                                   <span style={{ fontSize: "12px", color: course.color, fontWeight: "700" }}>{course.fee}</span>
                                   <i className="fas fa-chevron-right" className="fs-10px text-light-gray"></i>
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

      {/* Concept Focused CTA Section */}
      <section className="cta-area wow fadeInUp" className="pb-100">
        <div className="container">
          <div className="cta-box bg_cover course-cta-box">
            <div className="overlay" className="course-cta-overlay"></div>
            <div className="row align-items-center" className="relative-z2">
              <div className="col-lg-8 text-center text-lg-left">
                <div className="cta-text-wrapper">
                  <h2 className="title" className="course-cta-title">Master Science with Clear Concepts</h2>
                  <p className="course-cta-desc">Join our Science program and build a strong understanding of Physics, Chemistry, and Biology.</p>
                </div>
              </div>
              <div className="col-lg-4 text-center text-lg-right mt-40 mt-lg-0">
                 <button className="main-btn" className="course-cta-btn">Book Free Demo</button>
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

