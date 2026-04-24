"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function DigitalMarketingPage() {
  return (
    <>
      <Header />

      {/* ====== Page Banner Start ====== */}
      <section className="page-banner">
        <div
          className="page-banner-bg bg_cover"
          style={{ backgroundColor: "#07294d" }}
        >
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title" style={{ fontSize: "56px" }}>AI-Powered Digital Marketing Program</h2>
              <p className="text-white mt-3" style={{ fontSize: "20px", opacity: 0.9 }}>(Job + Freelance Ready)</p>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Page Banner Ends ====== */}

      {/* ====== Main Content Start ====== */}
      <section className="dm-program-details pt-80 pb-80" style={{ 
        backgroundColor: "#f8fbff",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle Architectural Grid Pattern */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `linear-gradient(to right, rgba(7, 41, 77, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(7, 41, 77, 0.12) 1px, transparent 1px)`,
          backgroundSize: "35px 35px",
          maskImage: "radial-gradient(circle at center, black 30%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 95%)",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            {/* Left Column: Course Information */}
            <div className="col-lg-8">
              <div className="intro-section mb-60">
                <h3 className="mb-30" style={{ color: "#07294d", fontWeight: "700" }}>Transform Your Career with <span style={{ color: "#ffc600" }}>AI-Powered</span> Marketing</h3>
                <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#444" }}>
                  This program is designed to make you a complete digital marketer with real-world skills, hands-on experience, and AI-powered tools. 
                </p>
                <p className="mt-20" style={{ fontSize: "18px", lineHeight: "1.8", color: "#444" }}>
                  We don’t just teach tools — we build strong marketing understanding first, then train you to execute strategies using modern platforms and AI automation.
                </p>
                
                <div className="outcomes-box mt-40 p-4 rounded-lg bg-white shadow-sm border-left border-primary border-4">
                  <h5 className="mb-3">By the end of the course, you will be ready to:</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Get a high-paying job</li>
                    <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Start your own freelancing business</li>
                    <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Handle real client projects independently</li>
                  </ul>
                </div>
              </div>

              {/* Course Overview */}
              <div className="overview-section mb-60">
                <h4 className="mb-30" style={{ color: "#07294d" }}>Course Overview</h4>
                <div className="row">
                  {[
                    "Marketing Fundamentals (Pre-Boost)",
                    "Digital Marketing Core",
                    "Performance Marketing",
                    "Search Engine Optimization",
                    "Social Media Marketing",
                    "AI Tools & Automation",
                    "Website Building & Funnels",
                    "Analytics & Tracking"
                  ].map((phase, i) => (
                    <div key={i} className="col-md-6 mb-3">
                      <div className="phase-card p-3 bg-white rounded border d-flex align-items-center">
                        <span className="me-3 font-weight-bold text-primary" style={{ fontSize: "20px" }}>0{i+1}</span>
                        <span className="font-weight-bold">{phase}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Differentiators */}
              <div className="diff-section mb-60 p-40 rounded-lg text-white" style={{ background: "linear-gradient(135deg, #07294d 0%, #004d99 100%)" }}>
                <h4 className="text-white mb-30">What Makes This Course Different</h4>
                <div className="row">
                  {[
                    { title: "AI-Driven Training", icon: "fas fa-robot" },
                    { title: "Marketing Concepts First", icon: "fas fa-brain" },
                    { title: "Project-Based Learning", icon: "fas fa-project-diagram" },
                    { title: "No-Code AI Websites", icon: "fas fa-laptop-code" },
                    { title: "Freelancing Training", icon: "fas fa-hand-holding-usd" },
                    { title: "Portfolio Support", icon: "fas fa-briefcase" }
                  ].map((item, i) => (
                    <div key={i} className="col-md-4 mb-30">
                      <div className="diff-item text-center">
                        <i className={`${item.icon} mb-3`} style={{ fontSize: "30px", color: "#ffc600" }}></i>
                        <h6 className="text-white">{item.title}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Curriculum */}
              <div className="curriculum-section mb-60">
                <h4 className="mb-40" style={{ color: "#07294d" }}>Detailed Curriculum & Tools</h4>
                
                <div className="accordion" id="curriculumAccordion">
                  {[
                    { 
                      title: "PHASE 1: MARKETING FUNDAMENTALS", 
                      content: ["Introduction to Marketing", "Consumer Behavior", "Branding & Positioning", "Sales Funnels", "Target Audience Research"],
                      tools: ["Google Trends", "ChatGPT (for market research)", "Notion (planning & strategy)"]
                    },
                    { 
                      title: "PHASE 2: DIGITAL MARKETING CORE", 
                      content: ["Digital Ecosystem", "Channels Overview", "Content Strategy", "Funnel Building"],
                      tools: ["Canva", "ChatGPT", "Google Docs", "Trello"]
                    },
                    { 
                      title: "PHASE 3: PERFORMANCE MARKETING (ADS)", 
                      content: ["Facebook Ads (Meta Ads)", "Instagram Ads", "Google Ads (Search, YouTube)", "Campaign Optimization", "Lead Generation"],
                      tools: ["Meta Ads Manager", "Google Ads", "Google Keyword Planner", "Facebook Pixel", "Google Tag Manager"]
                    },
                    { 
                      title: "PHASE 4: SEARCH ENGINE OPTIMIZATION (SEO)", 
                      content: ["Keyword Research", "On-Page SEO", "Off-Page SEO", "Technical SEO", "Blog Optimization"],
                      tools: ["Google Search Console", "Ahrefs", "SEMrush", "Ubersuggest", "RankMath"]
                    },
                    { 
                      title: "PHASE 5: SOCIAL MEDIA MARKETING", 
                      content: ["Instagram Growth Strategy", "Content Planning", "LinkedIn Marketing", "YouTube Basics"],
                      tools: ["Canva", "Buffer", "Meta Business Suite", "CapCut"]
                    },
                    { 
                      title: "PHASE 6: WEBSITE BUILDING (AI-POWERED)", 
                      content: ["Website Creation", "Landing Pages", "Funnels"],
                      tools: ["WordPress", "Elementor", "Wix", "Shopify", "Durable AI", "10Web"]
                    },
                    { 
                      title: "PHASE 7: AI TOOLS & AUTOMATION", 
                      content: ["AI Content Creation", "AI Ad Copy", "Automation Workflows"],
                      tools: ["ChatGPT", "Jasper AI", "Copy.ai", "Midjourney", "Zapier", "Make.com"]
                    },
                    { 
                      title: "PHASE 8: ANALYTICS & TRACKING", 
                      content: ["Data Tracking", "Campaign Analysis", "Conversion Tracking"],
                      tools: ["Google Analytics (GA4)", "Google Tag Manager", "Meta Insights", "Hotjar"]
                    }
                  ].map((phase, i) => (
                    <div key={i} className="accordion-item mb-3 border rounded overflow-hidden shadow-sm">
                      <h2 className="accordion-header">
                        <button className={`accordion-button ${i !== 0 ? 'collapsed' : ''} p-4 font-weight-bold`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} style={{ backgroundColor: "#fff", color: "#07294d" }}>
                          {phase.title}
                        </button>
                      </h2>
                      <div id={`collapse${i}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`} data-bs-parent="#curriculumAccordion">
                        <div className="accordion-body p-4 bg-light">
                          <div className="row">
                            <div className="col-md-7">
                              <h6 className="mb-3 text-primary">What You'll Learn:</h6>
                              <ul className="list-unstyled">
                                {phase.content.map((item, j) => (
                                  <li key={j} className="mb-2"><i className="fas fa-dot-circle me-2 text-muted small"></i> {item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-md-5">
                              <h6 className="mb-3 text-warning">Tools Covered:</h6>
                              <div className="d-flex flex-wrap gap-2">
                                {phase.tools.map((tool, j) => (
                                  <span key={j} className="badge bg-white text-dark border p-2">{tool}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="projects-section mb-60">
                <h4 className="mb-30" style={{ color: "#07294d" }}>Hands-on Projects</h4>
                <div className="row">
                  {[
                    "Running real ad campaigns",
                    "SEO optimization for a website",
                    "Social media page growth",
                    "Landing page creation",
                    "Full Sales Funnel setup"
                  ].map((project, i) => (
                    <div key={i} className="col-md-6 mb-3">
                      <div className="p-3 bg-white rounded border-left border-warning border-4 shadow-sm">
                        <i className="fas fa-rocket me-2 text-warning"></i> {project}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trainer & Review */}
              <div className="row mb-60">
                <div className="col-md-6 mb-4 mb-md-0">
                  <div className="trainer-box p-4 rounded-lg bg-white shadow-sm border h-100">
                    <h5 className="mb-3">Expert Trainers</h5>
                    <p className="small text-muted mb-3">Our trainers are experienced digital marketers with practical industry knowledge.</p>
                    <ul className="list-unstyled small">
                      <li className="mb-2"><i className="fas fa-broadcast-tower me-2 text-primary"></i> Live sessions</li>
                      <li className="mb-2"><i className="fas fa-tools me-2 text-primary"></i> Hands-on training</li>
                      <li className="mb-2"><i className="fas fa-history me-2 text-primary"></i> Real case studies</li>
                      <li className="mb-2"><i className="fas fa-user-friends me-2 text-primary"></i> Personal mentorship</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="review-box p-4 rounded-lg bg-white shadow-sm border h-100 italic">
                    <div className="stars mb-3 text-warning">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                    </div>
                    <p className="mb-3" style={{ fontStyle: "italic", lineHeight: "1.6" }}>
                      "This course completely changed my understanding of marketing. The AI tools and real projects helped me start freelancing confidently."
                    </p>
                    <h6 className="mb-0">— Student Graduate</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="col-lg-4">
              <div className="course-sidebar sticky-top" style={{ top: "100px", zIndex: 10 }}>
                <div className="sidebar-card p-4 rounded-lg bg-white shadow-lg border-top border-warning border-5">
                  <div className="price-tag mb-4 text-center">
                    <h3 style={{ color: "#07294d", fontWeight: "800" }}>₹35,000</h3>
                    <span className="text-muted small">All-inclusive program fee</span>
                  </div>
                  
                  <div className="feature-list mb-4">
                    {[
                      { label: "Duration", val: "4–6 Months", icon: "far fa-clock" },
                      { label: "Mode", val: "Live + Practical", icon: "fas fa-video" },
                      { label: "Level", val: "Beginner to Advanced", icon: "fas fa-layer-group" },
                      { label: "Projects", val: "5+ Real Projects", icon: "fas fa-tasks" },
                      { label: "Tools", val: "30+ Industry Tools", icon: "fas fa-wrench" },
                      { label: "Support", val: "Placement Assistance", icon: "fas fa-user-tie" }
                    ].map((feat, i) => (
                      <div key={i} className="d-flex justify-content-between py-2 border-bottom border-light">
                        <span className="text-muted small"><i className={`${feat.icon} me-2 text-primary`}></i> {feat.label}</span>
                        <span className="font-weight-bold small">{feat.val}</span>
                      </div>
                    ))}
                  </div>

                  <button className="main-btn w-100 mb-3 py-3" style={{ borderRadius: "10px", fontSize: "18px" }}>
                    Book Free Demo
                  </button>
                  
                  <div className="text-center">
                    <span className="text-warning small"><i className="fas fa-star me-1"></i> 4.9/5 Student Rating</span>
                  </div>
                </div>

                <div className="cta-sidebar-card mt-30 p-4 rounded-lg text-white" style={{ background: "linear-gradient(45deg, #07294d, #01228D)" }}>
                  <h6>Need Help Choosing?</h6>
                  <p className="small opacity-75 mt-2 mb-3">Speak with our career counselor to understand if this is right for you.</p>
                  <a href="tel:+918051696333" className="text-white font-weight-bold">Call: +91 80516 96333</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Final CTA Section ====== */}
      <section className="final-cta pt-80 pb-80" style={{ backgroundColor: "#07294d", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.3
        }}></div>
        
        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          <h2 className="text-white mb-3">Start Your Career in Digital Marketing with AI</h2>
          <p className="text-white opacity-75 mb-40" style={{ fontSize: "18px" }}>Learn practical skills, work on real projects, and become job-ready.</p>
          <button className="main-btn py-3 px-5" style={{ borderRadius: "30px", background: "#ffc600", color: "#07294d", fontSize: "20px", fontWeight: "700" }}>
            Book Free Demo Now
          </button>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .page-banner {
          padding-top: 155px;
          background: #01228D;
        }
        .banner-content {
          padding-top: 120px;
          padding-bottom: 110px;
        }
        .banner-content .title {
          color: #fff;
          font-weight: 700;
        }
        .phase-card {
          transition: all 0.3s ease;
        }
        .phase-card:hover {
          transform: translateX(10px);
          border-color: #ffc600 !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .accordion-button:not(.collapsed) {
          background-color: #f8fbff;
          box-shadow: none;
        }
        .accordion-button:focus {
          box-shadow: none;
        }
        .main-btn {
          background-color: #ffc600;
          color: #07294d;
          font-weight: 700;
          border: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .main-btn:hover {
          background-color: #07294d;
          color: #fff;
          transform: translateY(-3px);
        }
        @media (max-width: 991px) {
          .course-sidebar {
            margin-top: 50px;
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
