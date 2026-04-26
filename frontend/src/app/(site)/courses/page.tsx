"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function CoursesContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const courses = [
    {
      tag: "#Foundation",
      title: "Foundation Program (Class 6–8)",
      duration: "1 Year",
      fee: "₹25,000",
      rating: 5,
      bgColor: "#EAB830",
      slug: "foundation-program",
      category: "School",
    },
    {
      tag: "#Science",
      title: "Science Program (Class 9–10)",
      duration: "1 Year",
      fee: "₹35,000",
      rating: 5,
      bgColor: "#2F7AD5",
      slug: "science-program",
      category: "School",
    },
    {
      tag: "#Commerce",
      title: "Commerce (Class 11–12)",
      duration: "1 Year",
      fee: "₹40,000",
      rating: 5,
      bgColor: "#0C8B51",
      slug: "commerce-program",
      category: "College",
    },
    {
      tag: "#Mathematics",
      title: "Applied Mathematics (9–12)",
      duration: "1 Year",
      fee: "₹20,000",
      rating: 4,
      bgColor: "#27B8A7",
      slug: "applied-mathematics",
      category: "Subject",
    },
    {
      tag: "#Science",
      title: "Physics, Chemistry & Biology",
      duration: "1 Year",
      fee: "₹30,000",
      rating: 5,
      bgColor: "#2F7AD5",
      slug: "pcb-program",
      category: "Subject",
    },
    {
      tag: "#Commerce",
      title: "B.Com Academic Support",
      duration: "3 Years",
      fee: "₹45,000",
      rating: 5,
      bgColor: "#7D2AE8",
      slug: "bcom-support",
      category: "Degree",
    },
  ];

  const categories = ["All", "School", "College", "Subject", "Degree"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Page Banner */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover banner-bg-course">
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title">Our Programs</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="course-filter-area pt-50">
        <div className="container">
          <div className="bg-white p-6 rounded-3xl shadow-xl relative z-10 border border-gray-100">
            <div className="row align-items-center">
              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="relative">
                  <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    placeholder="Search for courses..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-8">
                <div className="flex flex-wrap gap-2 justify-lg-end">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        selectedCategory === cat 
                          ? "bg-[#01228D] text-white shadow-lg shadow-blue-100" 
                          : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-slate-500 font-medium">Empowering students with quality education and practical skills.</p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="top-courses-area pt-50 pb-80">
        <div className="container">
          <div className="courses-wrapper">
            {filteredCourses.length > 0 ? (
              <div className="row courses-row g-4">
                {filteredCourses.map(({ tag, title, duration, fee, rating, bgColor, slug }, index) => (
                  <div key={index} className="col-lg-4 col-sm-6">
                    <div
                      className="single-courses wow fadeInUpBig course-card-wrapper h-full rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{ backgroundColor: bgColor }}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <a href="#" className="category">{tag}</a>
                          <h4 className="courses-title">
                            <Link href={`/courses/${slug}`}>{title}</Link>
                          </h4>
                          <div className="duration-fee">
                            <p className="duration">Duration: <span>{duration}</span></p>
                            <p className="fee">Fee: <span>{fee}</span></p>
                          </div>
                          <div className="rating">
                            <span>Rating: </span>
                            <ul className="star">
                              {[...Array(5)].map((_, i) => (
                                <li key={i}>
                                  <i className={i < rating ? "fas fa-star" : "far fa-star"}></i>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="courses-link course-link-wrapper mt-auto pt-20">
                          <a className="apply" href="#">Book Demo</a>
                          <Link className="more" href={`/courses/${slug}`}>
                            Details <i className="fas fa-chevron-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-80">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-2xl text-gray-300"></i>
                </div>
                <h4 className="text-slate-400">No courses found matching your criteria</h4>
                <button 
                  onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Arvindu Classes Section */}
      <section className="features-area pb-80 pt-80 bg-[#f8fbff]">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-50">
                <h2 className="title">Why Choose Arvindu Classes?</h2>
                <p className="mx-auto max-w-2xl">We provide an educational environment that fosters growth, innovation, and success.</p>
              </div>
            </div>
          </div>
          <div className="row">
            {[
              { title: "Expert Mentorship", icon: "fas fa-chalkboard-teacher", desc: "Learn from industry veterans and highly experienced academic professionals." },
              { title: "Skill Scholarship", icon: "fas fa-graduation-cap", desc: "Merit-based scholarships to support and encourage talented students." },
              { title: "Practical Approach", icon: "fas fa-laptop-code", desc: "Focus on conceptual clarity combined with practical application and tools." },
              { title: "Doubt Support", icon: "fas fa-question-circle", desc: "Dedicated doubt-clearing sessions to ensure no student is left behind." }
            ].map((feature, i) => (
              <div key={i} className="col-lg-3 col-sm-6">
                <div className="single-feature p-4 text-center bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-50 mt-30 h-full">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#01228D] text-2xl">
                    <i className={feature.icon}></i>
                  </div>
                  <h5 className="font-bold mb-2">{feature.title}</h5>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship CTA Section */}
      <section className="scholarship-cta-area pt-80 pb-80">
        <div className="container">
          <div className="bg-[#01228D] rounded-[3rem] p-5 p-lg-50 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <h2 className="text-white mb-20 font-black tracking-tight">Apply for Skill Scholarship 2024-25</h2>
                  <p className="text-white opacity-75 mb-30 fs-18px">We believe in talent. Get up to 50% scholarship based on your entrance test performance and academic record.</p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/contact" className="main-btn main-btn-2">Check Eligibility</Link>
                    <a href="tel:+918051696333" className="text-white font-bold flex items-center gap-2 px-4 py-3">
                      <i className="fas fa-phone-alt"></i> Talk to Counsellor
                    </a>
                  </div>
                </div>
                <div className="col-lg-5 d-none d-lg-block text-center">
                  <div className="w-64 h-64 bg-white/10 rounded-full border border-white/20 flex items-center justify-center mx-auto animate-pulse">
                    <div className="text-white text-center">
                      <span className="block text-4xl font-black">50%</span>
                      <span className="block text-xs uppercase tracking-widest font-bold">Scholarship</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-area pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-50">
                <h2 className="title">Frequently Asked Questions</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              {[
                { q: "What is the admission process?", a: "The process involves an initial enquiry, a free demo class, followed by a level assessment test for certain courses." },
                { q: "Do you offer demo classes?", a: "Yes, we offer two free demo classes for all our programs so students can experience our teaching methodology." }
              ].map((faq, i) => (
                <div key={i} className="mb-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <h6 className="font-bold text-[#01228D] mb-2">{faq.q}</h6>
                  <p className="text-sm text-gray-500">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="col-lg-6">
              {[
                { q: "Are the classes online or offline?", a: "We primarily offer offline classes at our centers in Patna, with supplementary online support and materials." },
                { q: "Can I pay fees in installments?", a: "Yes, we have flexible installment plans available to make education accessible for everyone." }
              ].map((faq, i) => (
                <div key={i} className="mb-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <h6 className="font-bold text-[#01228D] mb-2">{faq.q}</h6>
                  <p className="text-sm text-gray-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-area pb-80 pt-50 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="achievement-image pr-lg-50">
                <img src="/assets/images/campus-6.webp" alt="Achievement" className="rounded-[2.5rem] shadow-2xl w-full" />
              </div>
            </div>
            <div className="col-lg-6 mt-40 mt-lg-0">
              <div className="section-title mb-30">
                <h2 className="title">Our Students Speak for Our Excellence</h2>
              </div>
              <div className="row">
                {[
                  { count: "1000+", label: "Success Stories" },
                  { count: "95%", label: "Selection Rate" },
                  { count: "50+", label: "Expert Faculty" },
                  { count: "10+", label: "Years Experience" }
                ].map((stat, i) => (
                  <div key={i} className="col-6 mb-30">
                    <div className="p-4 bg-gray-50 rounded-2xl border-b-4 border-blue-600">
                      <h3 className="text-[#01228D] font-black text-3xl mb-1">{stat.count}</h3>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CoursesPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <CoursesContent />
      </Suspense>
      <Footer />
      <a href="#" className="back-to-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className="fa fa-chevron-up"></i>
      </a>
    </>
  );
}

