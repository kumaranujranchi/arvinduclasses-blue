"use client";

import React, { useState } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function FoundationProgramPage() {
  const [activeTab, setActiveTab] = useState('benefit');

  return (
    <>
      <Header />
      
      {/* Page Banner */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/course-banner.png)" }}>
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title">Foundation Program (Class 6–8)</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Details Start */}
      <section className="courses-details">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              <div className="courses-details-content mt-50">
                <img src="/assets/images/courses-details.webp" width="845" height="533" alt="Course Details" />

                <h2 className="title">Foundation Program for Class 6–8 (CBSE & ICSE)</h2>

                <p>
                  This program is designed to build strong academic foundations for students in Classes 6 to 8. At this stage, developing clear concepts in core subjects is essential for future success in higher classes.
                  <br /><br />
                  Our teaching approach focuses on concept clarity, regular practice, and gradual improvement so that students gain confidence in subjects like Maths and Science from an early stage.
                </p>

                <h5 className="sub-title">Course Overview</h5>

                <p>
                  The Foundation Program helps students strengthen their basics across all major subjects while preparing them for the academic challenges of Classes 9 and 10.
                </p>

                <p>We focus on:</p>

                <ul className="courses-details-list">
                  <li>
                    <i className="far fa-check-circle"></i>
                    <p>Building strong conceptual understanding</p>
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <p>Improving problem-solving skills</p>
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <p>Developing disciplined study habits</p>
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <p>Preparing students for future competitive learning</p>
                  </li>
                </ul>
                
                <p className="mt-20">This program is ideal for students who want to avoid weak fundamentals and build a strong academic base early.</p>

                <ul className="courses-details-list mt-20">
                  <li><i className="far fa-check-circle"></i> <p>Strong focus on Maths and Science fundamentals</p></li>
                  <li><i className="far fa-check-circle"></i> <p>Interactive teaching with real-life examples</p></li>
                  <li><i className="far fa-check-circle"></i> <p>Regular homework and practice sessions</p></li>
                  <li><i className="far fa-check-circle"></i> <p>Weekly tests with performance analysis</p></li>
                  <li><i className="far fa-check-circle"></i> <p>Continuous doubt-solving support</p></li>
                  <li><i className="far fa-check-circle"></i> <p>Personal attention through small batch sizes</p></li>
                </ul>
              </div>

              <div className="courses-details-tab">
                <ul className="nav nav-justified">
                  <li className="nav-item">
                    <a className={activeTab === 'benefit' ? 'active' : ''} onClick={() => setActiveTab('benefit')} style={{ cursor: 'pointer' }}>Benefit</a>
                  </li>
                  <li className="nav-item">
                    <a className={activeTab === 'curriculum' ? 'active' : ''} onClick={() => setActiveTab('curriculum')} style={{ cursor: 'pointer' }}>Course Curriculum</a>
                  </li>
                  <li className="nav-item">
                    <a className={activeTab === 'teachers' ? 'active' : ''} onClick={() => setActiveTab('teachers')} style={{ cursor: 'pointer' }}>Teachers</a>
                  </li>
                  <li className="nav-item">
                    <a className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')} style={{ cursor: 'pointer' }}>Reviews</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  {activeTab === 'benefit' && (
                    <div className="tab-pane fade show active">
                      <div className="benefit-content">
                        <ul className="courses-details-list">
                          <li><i className="far fa-check-circle"></i> <p>Builds strong conceptual foundation for higher classes</p></li>
                          <li><i className="far fa-check-circle"></i> <p>Improves confidence in core subjects</p></li>
                          <li><i className="far fa-check-circle"></i> <p>Reduces fear of Maths and Science</p></li>
                          <li><i className="far fa-check-circle"></i> <p>Helps students develop consistent study habits</p></li>
                          <li><i className="far fa-check-circle"></i> <p>Prepares students for Class 9–10 board level difficulty</p></li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {activeTab === 'curriculum' && (
                    <div className="tab-pane fade show active">
                      <div className="curriculum-content">
                        <div className="row">
                          <div className="col-md-4 col-sm-6">
                            <div className="single-curriculum">
                              <h4 className="title">Mathematics</h4>
                              <ul className="curriculum-list">
                                <li><i className="fa fa-book"></i> Number System</li>
                                <li><i className="fa fa-book"></i> Algebra Basics</li>
                                <li><i className="fa fa-book"></i> Ratio & Proportion</li>
                                <li><i className="fa fa-book"></i> Geometry & Mensuration</li>
                                <li><i className="fa fa-book"></i> Data Handling</li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="single-curriculum">
                              <h4 className="title">Science</h4>
                              <ul className="curriculum-list">
                                <li><i className="fa fa-book"></i> Physics: Motion, Force, Energy</li>
                                <li><i className="fa fa-book"></i> Chemistry: Matter and its Changes</li>
                                <li><i className="fa fa-book"></i> Biology: Plants, Human Body, Environment</li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="single-curriculum">
                              <h4 className="title">English & SST</h4>
                              <ul className="curriculum-list">
                                <li><i className="fa fa-book"></i> Grammar & Writing Skills</li>
                                <li><i className="fa fa-book"></i> Reading Comprehension</li>
                                <li><i className="fa fa-book"></i> History & Geography</li>
                                <li><i className="fa fa-book"></i> Civics (Governance)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'teachers' && (
                    <div className="tab-pane fade show active">
                      <div className="courses-teachers">
                        <p>Our faculty members are experienced in handling middle school students and focus on making learning simple, engaging, and concept-driven.</p>
                        <p className="mt-10">Each teacher ensures:</p>
                        <ul className="courses-details-list mt-10">
                          <li><i className="far fa-check-circle"></i> <p>Clear explanation of concepts</p></li>
                          <li><i className="far fa-check-circle"></i> <p>Student-friendly teaching approach</p></li>
                          <li><i className="far fa-check-circle"></i> <p>Regular doubt-solving sessions</p></li>
                          <li><i className="far fa-check-circle"></i> <p>Individual attention to every student</p></li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="tab-pane fade show active">
                      <div className="courses-reviews">
                        <div className="review-wrapper">
                          <blockquote className="mt-20">
                            <p>“Arvindu Classes helped my child build strong basics in Maths and Science. The regular tests and attention from teachers made a big difference.”</p>
                            <footer className="mt-10"><strong>— Parent of Class 7 Student</strong></footer>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-lg-3">
              <div className="courses-sidebar pt-20">
                <div className="courses-features mt-30">
                  <div className="sidebar-title">
                    <h4 className="title">Course Features</h4>
                  </div>
                  <ul className="courses-features-items">
                    <li>Fee <strong>₹25,000</strong></li>
                    <li>Duration <strong>1 Year</strong></li>
                    <li>Classes per Week <strong>5 Days</strong></li>
                    <li>Subjects Covered <strong>Maths, Science, English, SST</strong></li>
                    <li>Tests <strong>Weekly</strong></li>
                    <li>Performance Tracking <strong>Yes</strong></li>
                    <li>Batch Size <strong>Limited</strong></li>
                    <li>Rating <strong>★★★★★</strong></li>
                  </ul>
                  <div className="sidebar-btn">
                    <a className="main-btn" href="#">Book Demo Class</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="newsletter-area-2 mt-50">
        <div className="container">
          <div className="newsletter-wrapper bg_cover" style={{ backgroundImage: "url(/assets/images/newsletter-bg-1.webp)" }}>
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="section-title-2 mt-25">
                  <h2 className="title">Start Building Strong Foundations Today</h2>
                  <span className="line"></span>
                  <p>Book a free demo class and experience our teaching approach.</p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form mt-30">
                  <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <button className="main-btn main-btn-2">Book Free Demo</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
