"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useEffect } from "react";

export default function FacilitiesPage() {
  const facilities = [
    {
      title: "Fully AC Classrooms",
      desc: "Stay cool and focused! Our classrooms are fully air-conditioned to provide the most comfortable learning environment even in peak summers.",
      icon: "fa-snowflake",
      color: "#01228D"
    },
    {
      title: "Dedicated Parking",
      desc: "Safe and spacious parking area specifically for our students' vehicles, ensuring peace of mind while you study.",
      icon: "fa-parking",
      color: "#2F7AD5"
    },
    {
      title: "Hostel Facilities",
      desc: "High-quality hostel accommodations for students coming from outside the city. A home away from home with all essential amenities.",
      icon: "fa-hotel",
      color: "#0C8B51"
    },
    {
      title: "Proper Mess Facilities",
      desc: "Hygienic and nutritious food served in our dedicated mess. We prioritize student health with balanced and delicious meal plans.",
      icon: "fa-utensils",
      color: "#EAB830"
    },
    {
      title: "Smart Classes",
      desc: "Equipped with digital boards and interactive tools. We use visual learning to make complex concepts simple and engaging.",
      icon: "fa-chalkboard-teacher",
      color: "#27B8A7"
    },
    {
      title: "Modern LMS",
      desc: "Access our Learning Management System for revision, study materials, and recorded sessions of any classes you might have missed.",
      icon: "fa-laptop-code",
      color: "#7D2AE8"
    },
    {
      title: "Hi-Tech Training Module",
      desc: "Our interactive training modules use the latest technology to provide hands-on experience and better conceptual clarity.",
      icon: "fa-microchip",
      color: "#FF5E3A"
    },
    {
      title: "Placement Assistance",
      desc: "We don't just teach; we help you build a career. Our dedicated placement cell connects students with top opportunities.",
      icon: "fa-user-tie",
      color: "#34495E"
    },
    {
      title: "Interview Preparation",
      desc: "Specialized training for dedicated courses to help you crack interviews with confidence. Mock interviews and personality development included.",
      icon: "fa-handshake",
      color: "#F39C12"
    }
  ];

  return (
    <>
      <Header />

      {/* ====== Page Banner Start ====== */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/campus-5.webp)", backgroundColor: "#01228D" }}>
          <div className="container">
            <div className="banner-content text-center pt-100 pb-100">
              <h2 className="title text-white" style={{ fontSize: '50px', fontWeight: '800' }}>World-Class Facilities</h2>
              <p className="text-white mt-20" style={{ fontSize: '18px', opacity: 0.9 }}>We provide more than just education; we provide an ecosystem for success.</p>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Page Banner Ends ====== */}

      {/* ====== Facilities Grid Start ====== */}
      <section className="facilities-area pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-50">
                <h2 className="title">Why Students <span>Love Us</span></h2>
                <span className="line mx-auto"></span>
                <p className="mt-20">Experience a premium learning environment designed to help you excel in every aspect of your academic journey.</p>
              </div>
            </div>
          </div>

          <div className="row">
            {facilities.map((f, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="premium-card mt-30 wow fadeInUp" data-wow-delay={`${idx * 0.1}s`}>
                  <div className="icon-box-wrapper mb-25" style={{ color: f.color }}>
                    <div className="icon-circle shadow-sm d-flex align-items-center justify-content-center" style={{ backgroundColor: `${f.color}15`, width: '70px', height: '70px', borderRadius: '20px' }}>
                      <i className={`fas ${f.icon} fa-2x`}></i>
                    </div>
                  </div>
                  <h4 className="title mb-15" style={{ fontSize: '22px', fontWeight: '700', color: '#01228D' }}>{f.title}</h4>
                  <p className="text">{f.desc}</p>
                  <div className="hover-line" style={{ backgroundColor: f.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ====== Facilities Grid Ends ====== */}

      {/* ====== Special Feature Start ====== */}
      <section className="special-feature-area pt-100 pb-100 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="feature-image rounded-3xl overflow-hidden shadow-2xl">
                <img src="/assets/images/campus-1 copy.webp" alt="Smart Classroom" className="w-full object-cover" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-content ml-lg-50 mt-40 mt-lg-0">
                <h2 className="title mb-20" style={{ color: '#01228D', fontWeight: '800' }}>Smart Learning for <br/><span>Smart Students</span></h2>
                <p className="mb-30 text-lg">Our smart classrooms are not just about screens; they are about an interactive ecosystem where every student participates and learns at their own pace.</p>
                <ul className="feature-list list-none p-0">
                  <li className="mb-15 d-flex align-items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-10"></i>
                    <span>Real-time doubt clearing with digital tools</span>
                  </li>
                  <li className="mb-15 d-flex align-items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-10"></i>
                    <span>Visual aids for better memory retention</span>
                  </li>
                  <li className="mb-15 d-flex align-items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-10"></i>
                    <span>Missed a class? Watch it on our LMS anytime!</span>
                  </li>
                </ul>
                <Link href="/courses" className="main-btn mt-20">Start Your Journey</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Special Feature Ends ====== */}

      {/* ====== CTA Section Start ====== */}
      <section className="cta-area pt-100 pb-100 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #01228D 0%, #1a4cd2 100%)' }}>
        <div className="cta-pattern"></div>
        <div className="container position-relative z-index-1">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="cta-content text-center text-white">
                <h2 className="title text-white mb-30" style={{ fontSize: '42px', fontWeight: '800' }}>Ready to Experience the Best?</h2>
                <p className="text-white text-xl mb-40 opacity-90">Join Arvindu Classes today and give your career the infrastructure it deserves. Limited seats available for the upcoming session!</p>
                <div className="cta-buttons d-flex flex-wrap justify-content-center gap-4">
                  <Link href="/contact" className="main-btn main-btn-2" style={{ backgroundColor: '#fff', color: '#01228D' }}>Book a Campus Visit</Link>
                  <Link href="/register" className="main-btn" style={{ border: '2px solid #fff' }}>Apply for Admission</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== CTA Section Ends ====== */}

      <Footer />

      <style jsx>{`
        .premium-card {
          background: #fff;
          padding: 40px;
          border-radius: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          border: 1px solid rgba(1, 34, 141, 0.05);
        }
        .premium-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 34, 141, 0.1);
        }
        .hover-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 4px;
          transition: all 0.4s ease;
        }
        .premium-card:hover .hover-line {
          width: 100%;
        }
        .icon-circle {
          transition: all 0.3s ease;
        }
        .premium-card:hover .icon-circle {
          transform: scale(1.1) rotate(5deg);
        }
        .main-btn-2:hover {
          background-color: #f8f9fa !important;
          color: #01228D !important;
        }
        .cta-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
          pointer-events: none;
          opacity: 0.6;
        }
        .z-index-1 {
          z-index: 1;
        }
      `}</style>
    </>
  );
}
