"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function ScholarshipPage() {
  const scholarshipPrograms = [
    {
      title: "Merit-Cum-Means Scholarship",
      benefit: "Up to 50% Tuition Fee Waiver",
      eligibility: "Students with 90% or above in Board Exams and family income below 5LPA.",
      icon: "fa-award",
      color: "#01228D"
    },
    {
      title: "Arvindu Talent Search (ATS)",
      benefit: "100% Scholarship for Top 10 Ranks",
      eligibility: "Based on performance in our internal entrance and talent search examination.",
      icon: "fa-microscope",
      color: "#2F7AD5"
    },
    {
      title: "Siblings Discount",
      benefit: "Flat 10% Off on Tuition Fees",
      eligibility: "Applicable if more than one child from the same family is enrolled.",
      icon: "fa-users",
      color: "#0C8B51"
    },
    {
      title: "Early Bird Admission",
      benefit: "Flat ₹5,000 Discount",
      eligibility: "For students who confirm their admission before the start of the academic session.",
      icon: "fa-bolt",
      color: "#EAB830"
    }
  ];

  return (
    <>
      <Header />

      {/* ====== Page Banner Start ====== */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/aboutus-banner.png)", backgroundColor: "#01228D" }}>
          <div className="container">
            <div className="banner-content text-center pt-100 pb-100">
              <h2 className="title text-white" style={{ fontSize: '50px', fontWeight: '800' }}>Scholarship Programs</h2>
              <p className="text-white mt-20" style={{ fontSize: '18px', opacity: 0.9 }}>Rewarding excellence and supporting dreams. We ensure that talent never stops due to financial barriers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Scholarship Intro Start ====== */}
      <section className="scholarship-intro pt-100 pb-50 pb-lg-100 position-relative overflow-hidden">
        <div className="intro-pattern"></div>
        <div className="container position-relative z-index-1">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="intro-content pr-lg-50">
                <h2 className="mb-25" style={{ color: '#01228D', fontWeight: '800' }}>Empowering Your <br/><span>Academic Future</span></h2>
                <p className="text-lg mb-30 text-muted">At Arvindu Classes, we believe that every bright mind deserves a world-class education. Our scholarship programs are designed to identify, reward, and nurture talent across various domains.</p>
                <div className="stats-box d-flex gap-5 mb-40">
                  <div className="stat">
                    <h3 className="font-bold text-blue-700">₹50L+</h3>
                    <p className="text-sm">Total Scholarships Awarded</p>
                  </div>
                  <div className="stat border-l-2 pl-5">
                    <h3 className="font-bold text-blue-700">500+</h3>
                    <p className="text-sm">Students Benefited</p>
                  </div>
                </div>
                <Link href="/contact" className="main-btn">Apply for Scholarship</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="intro-image rounded-3xl overflow-hidden shadow-2xl mt-50 mt-lg-0">
                <img src="/assets/images/features-student.png" alt="Happy Student" className="w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Scholarship Cards Start ====== */}
      <section className="scholarship-programs pt-50 pb-50 pt-lg-100 pb-lg-100 bg-light">
        <div className="container">
          <div className="section-title text-center mb-50">
            <h2 className="title">Available <span>Programs</span></h2>
            <span className="line mx-auto"></span>
          </div>

          <div className="row g-4">
            {scholarshipPrograms.map((p, idx) => (
              <div key={idx} className="col-lg-6">
                <div className="scholarship-card p-5 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all border border-gray-100 h-100 d-flex gap-4 align-items-start">
                  <div className="icon-circle p-4 rounded-2xl" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                    <i className={`fas ${p.icon} fa-2x`}></i>
                  </div>
                  <div className="card-info">
                    <h4 className="mb-10 font-bold" style={{ color: '#01228D' }}>{p.title}</h4>
                    <div className="benefit-tag inline-block px-3 py-1 rounded-full text-xs font-bold mb-15" style={{ backgroundColor: `${p.color}25`, color: p.color }}>
                      {p.benefit}
                    </div>
                    <p className="text-sm text-muted">{p.eligibility}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== How to Apply ====== */}
      <section className="how-to-apply pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60">
                <h2 className="title">Simple Application <span>Process</span></h2>
                <span className="line mx-auto"></span>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="process-wrapper d-flex flex-nowrap overflow-auto pb-40 gap-4 scholarship-process-mobile">
                {[
                  { num: 1, title: "Registration", desc: "Fill out the online application form or visit our office." },
                  { num: 2, title: "Assessment", desc: "Appear for the ATS examination or submit documents." },
                  { num: 3, title: "Verification", desc: "Our committee verifies your documents and results." },
                  { num: 4, title: "Award", desc: "Get your scholarship adjusted in your tuition fees." }
                ].map((step, idx) => (
                  <div key={idx} className="process-step text-center flex-shrink-0" style={{ width: '220px' }}>
                    <div className="step-num mx-auto mb-20 w-16 h-16 rounded-full bg-blue-700 text-white flex items-center justify-content-center text-xl font-bold shadow-lg">{step.num}</div>
                    <h5 className="mb-10 font-bold">{step.title}</h5>
                    <p className="text-sm text-muted">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA Section Start ====== */}
      <section className="cta-area pt-100 pb-100 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #01228D 0%, #1a4cd2 100%)' }}>
        <div className="cta-pattern"></div>
        <div className="container position-relative z-index-1">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="cta-content text-center text-white">
                <h2 className="title text-white mb-30" style={{ fontSize: '42px', fontWeight: '800' }}>Don't Let Finance Stop You</h2>
                <p className="text-white text-xl mb-40 opacity-90">Talk to our career counselors today and find the best scholarship program for your academic needs.</p>
                <div className="cta-buttons d-flex flex-wrap justify-content-center gap-4">
                  <Link href="/contact" className="main-btn main-btn-2" style={{ backgroundColor: '#fff', color: '#01228D' }}>Get Free Counseling</Link>
                  <Link href="/register" className="main-btn" style={{ border: '2px solid #fff' }}>Register for ATS Exam</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .scholarship-process-mobile::-webkit-scrollbar {
          height: 5px;
        }
        .scholarship-process-mobile::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .scholarship-process-mobile::-webkit-scrollbar-thumb {
          background: #01228D;
          border-radius: 10px;
        }
        
        @media (min-width: 992px) {
          .scholarship-process-mobile {
            flex-wrap: wrap !important;
            justify-content: space-between !important;
            overflow: visible !important;
          }
          .process-step {
            flex: 1 !important;
            width: auto !important;
          }
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
        .main-btn-2:hover {
          background-color: #f8f9fa !important;
          color: #01228D !important;
        }
        .scholarship-card:hover {
          transform: translateY(-5px);
        }
        .intro-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(1, 34, 141, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(1, 34, 141, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: linear-gradient(to right, black, transparent);
          -webkit-mask-image: linear-gradient(to right, black, transparent);
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
