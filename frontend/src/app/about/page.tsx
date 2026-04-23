"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    // Initialize slick carousels for the About page after Next.js client-side navigation
    const initSlick = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.$ && window.$.fn && window.$.fn.slick) {
        // @ts-ignore
        const $ = window.$;

        // Initialize Campus Image Slider
        if ($(".campus-image").length && !$(".campus-image").hasClass("slick-initialized")) {
          $(".campus-image").slick({
            dots: false,
            infinite: false,
            arrows: true,
            prevArrow: '<span class="prev"><i class="fas fa-chevron-left"></i>Prev</span>',
            nextArrow: '<span class="next">Next <i class="fas fa-chevron-right"></i></span>',
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
          });
        }

        // Initialize Testimonials Image Slider
        if ($(".testimonials-image").length && !$(".testimonials-image").hasClass("slick-initialized")) {
          $(".testimonials-image").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            fade: true,
            asNavFor: '.testimonials-content',
            speed: 800,
            arrows: true,
            prevArrow: false,
            nextArrow: '<span class="next">Next <i class="far fa-long-arrow-right"></i></span>',
          });
        }

        // Initialize Testimonials Content Slider
        if ($(".testimonials-content").length && !$(".testimonials-content").hasClass("slick-initialized")) {
          $(".testimonials-content").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.testimonials-image',
            dots: false,
            arrows: false,
            focusOnSelect: true,
            speed: 800,
          });
        }
      } else {
        setTimeout(initSlick, 50);
      }
    };
    initSlick();
  }, []);

  return (
    <>
      <Header />

      {/* ====== Page Banner Start ====== */}
      <section className="page-banner">
        <div
          className="page-banner-bg bg_cover"
          style={{ backgroundImage: "url(/assets/images/aboutus-banner.png)" }}
        >
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title">About Us</h2>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Page Banner Ends ====== */}

      {/* ====== About Section Start ====== */}
      <section className="about-area pt-80 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="about-content mt-40">
                <h2 className="about-title">
                  Our <span>Story</span>
                </h2>
                <span className="line"></span>
                <p className="mt-20" style={{ textAlign: "justify" }}>
                  Arvindu Classes was started with a clear purpose — to change
                  the way students learn and understand academics.
                </p>
                <p className="mt-15" style={{ textAlign: "justify" }}>
                  We observed that many students struggle not because they lack
                  ability, but because their fundamentals are weak and they do
                  not receive the right guidance at the right time. Most
                  traditional coaching focuses only on completing the syllabus,
                  leaving students confused and underprepared.
                </p>
                <p className="mt-15" style={{ textAlign: "justify" }}>
                  This gap in learning inspired us to build something different.
                </p>

                <p
                  className="mt-15 font-weight-bold"
                  style={{ fontWeight: 600, textAlign: "justify" }}
                >
                  We believe that when a student understands the basics clearly,
                  confidence automatically follows, and results improve
                  naturally.
                </p>
                <Link href="/courses" className="main-btn mt-30">
                  Explore
                </Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="about-image mt-50">
                <div className="single-image image-1">
                  <img
                    src="/assets/images/about/about-1.png"
                    width="290"
                    height="290"
                    alt="about"
                  />
                </div>
                <div className="single-image image-2">
                  <img
                    src="/assets/images/about/about-2.png"
                    width="225"
                    height="225"
                    alt="about"
                  />
                </div>
                <div className="single-image image-3">
                  <img
                    src="/assets/images/about/about-3.png"
                    width="190"
                    height="190"
                    alt="about"
                  />
                </div>
                <div className="single-image image-4">
                  <img
                    src="/assets/images/about/about-4.png"
                    width="140"
                    height="140"
                    alt="about"
                  />
                </div>

                <div className="about-icon icon-1">
                  <img
                    src="/assets/images/about/icon/icon-1.webp"
                    width="46"
                    height="46"
                    alt="icon"
                  />
                </div>
                <div className="about-icon icon-2">
                  <img
                    src="/assets/images/about/icon/icon-2.webp"
                    width="46"
                    height="46"
                    alt="icon"
                  />
                </div>
                <div className="about-icon icon-3">
                  <img
                    src="/assets/images/about/icon/icon-3.webp"
                    width="46"
                    height="46"
                    alt="icon"
                  />
                </div>
                <div className="about-icon icon-4">
                  <img
                    src="/assets/images/about/icon/icon-4.webp"
                    width="46"
                    height="46"
                    alt="icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== About Section Ends ====== */}

      {/* ====== Problem & Mission Section Start ====== */}
      <section className="problem-mission-area pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="problem-solving mt-40">
                <h3 className="sub-title">The Problem We Are Solving</h3>
                <span className="line"></span>
                <p className="mt-20">Many students face common challenges:</p>
                <ul className="problem-list mt-20">
                  <li className="d-flex align-items-center mb-10">
                    <i
                      className="fas fa-check-circle me-2"
                      style={{ color: "#ffc600" }}
                    ></i>
                    <span>Weak foundational concepts</span>
                  </li>
                  <li className="d-flex align-items-center mb-10">
                    <i
                      className="fas fa-check-circle me-2"
                      style={{ color: "#ffc600" }}
                    ></i>
                    <span>Lack of personal attention in crowded classrooms</span>
                  </li>
                  <li className="d-flex align-items-center mb-10">
                    <i
                      className="fas fa-check-circle me-2"
                      style={{ color: "#ffc600" }}
                    ></i>
                    <span>No proper system for testing and performance tracking</span>
                  </li>
                  <li className="d-flex align-items-center mb-10">
                    <i
                      className="fas fa-check-circle me-2"
                      style={{ color: "#ffc600" }}
                    ></i>
                    <span>Fear of subjects like Maths, Science, or Accounts</span>
                  </li>
                </ul>
                <p className="mt-20">
                  We are solving this by creating a system where every student
                  is guided step-by-step, their performance is monitored
                  regularly, and their doubts are addressed without delay.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="our-mission mt-40 p-4 rounded shadow-sm"
                style={{
                  background: "linear-gradient(145deg, #07294d 0%, #004d99 100%)",
                  color: "#fff",
                }}
              >
                <h3 className="sub-title text-white">Our Mission</h3>
                <span
                  className="line"
                  style={{ backgroundColor: "#fff" }}
                ></span>
                <p className="mt-20 text-white">
                  To provide structured, concept-driven education in both
                  Science and Commerce streams, helping students build strong
                  foundations and achieve long-term academic success.
                </p>
                <div className="mission-image mt-30 shadow-lg rounded overflow-hidden">
                  <img
                    src="/assets/images/about/mission.png"
                    alt="Mission"
                    className="img-fluid"
                      style={{
                        transition: "transform 0.3s ease",
                        height: "250px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Problem & Mission Section Ends ====== */}

      {/* ====== Best Educational Environment Start ====== */}
      <section className="campus-visit-area-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="about-content mt-40">
                <h2 className="about-title">
                  Best Educational <span>Environment</span>
                </h2>
                <span className="line"></span>
                <p>
                  At Arvindu Classes, we provide a focused and inspiring atmosphere designed for comprehensive academic preparation. Our campus is equipped with modern facilities, distraction-free study zones, and interactive classrooms to maximize your learning potential. <br /> <br /> We ensure every student feels motivated to excel and achieve their career goals under the guidance of our expert educators.
                </p>
                <Link href="/courses" className="main-btn">
                  Explore
                </Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="campus-image-2 mt-50">
                <h4 className="campus-title-2">Image Gallery</h4>
                <div className="image-1">
                  <img src="/assets/images/about/about-grid-1.png" width="585" height="308" style={{ objectFit: 'cover', borderRadius: '8px' }} alt="campus gallery" />
                </div>
                <div className="image-2">
                  <img src="/assets/images/about/about-grid-2.png" width="253" height="220" style={{ objectFit: 'cover', borderRadius: '8px' }} alt="campus gallery" />
                </div>
                <div className="image-3">
                  <img src="/assets/images/about/about-grid-3.png" width="412" height="270" style={{ objectFit: 'cover', borderRadius: '8px' }} alt="campus gallery" />
                </div>
                <Link href="#" className="more">
                  View more <i className="fal fa-long-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Vision & Mission Section Start ====== */}
      <section className="vision-mission-area pt-80 pb-80" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="vision-content mt-40 wow fadeInLeft" data-wow-duration="1s">
                <h2 className="about-title">Our <span>Vision</span></h2>
                <span className="line"></span>
                <p className="mt-20" style={{ fontSize: '18px', lineHeight: '1.8', textAlign: 'justify' }}>
                  To be the most trusted and inspiring educational platform that empowers every student to achieve academic excellence and personal growth. We envision a future where learning is not a burden but a journey of discovery, leading to a generation of confident and skilled leaders.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mission-content mt-40 wow切换 fadeInRight" data-wow-duration="1s" style={{ padding: '40px', background: '#fff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <h2 className="about-title">Our <span>Mission</span></h2>
                <span className="line"></span>
                <ul className="mt-20" style={{ listStyle: 'none', padding: 0 }}>
                  <li className="mb-15 d-flex align-items-start">
                    <i className="fas fa-check-circle mt-1 me-3" style={{ color: '#07294d' }}></i>
                    <span>Providing concept-driven education to build strong academic foundations.</span>
                  </li>
                  <li className="mb-15 d-flex align-items-start">
                    <i className="fas fa-check-circle mt-1 me-3" style={{ color: '#07294d' }}></i>
                    <span>Personalized mentoring to address every student's unique learning needs.</span>
                  </li>
                  <li className="mb-15 d-flex align-items-start">
                    <i className="fas fa-check-circle mt-1 me-3" style={{ color: '#07294d' }}></i>
                    <span>Integrating modern technology with traditional teaching for best results.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Vision & Mission Section Ends ====== */}

      {/* ====== Core Values Start ====== */}
      <section className="core-values-area pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center">
                <h2 className="title">Our Core <span>Values</span></h2>
                <span className="line mx-auto"></span>
                <p className="mt-20">The pillars that define our commitment to excellence in education.</p>
              </div>
            </div>
          </div>
          <div className="row mt-20">
            {[
              { icon: 'fa-lightbulb', title: 'Innovation', desc: 'Constantly evolving our teaching methods.' },
              { icon: 'fa-shield-alt', title: 'Integrity', desc: 'Transparency and honesty in everything we do.' },
              { icon: 'fa-users', title: 'Inclusivity', desc: 'Equal opportunities for every student.' },
              { icon: 'fa-medal', title: 'Excellence', desc: 'Striving for the best results in every exam.' }
            ].map((val, idx) => (
              <div key={idx} className="col-lg-3 col-sm-6">
                <div className="single-value text-center mt-30 p-4 wow fadeInUp" data-wow-delay={`${idx * 0.2}s`} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                  <div className="value-icon mb-3" style={{ fontSize: '40px', color: '#07294d' }}>
                    <i className={`fas ${val.icon}`}></i>
                  </div>
                  <h4 className="value-title">{val.title}</h4>
                  <p className="mt-10" style={{ fontSize: '14px' }}>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ====== Core Values Ends ====== */}

      {/* Sections removed as they are duplicates of homepage sections */}
      {/* ====== Features Ends ====== */}

      {/* ====== Campus Visit Start ====== */}
      <section className="campus-visit-area-3 pt-120">
        <div className="container">
          <div className="campus-visit-wrapper">
            <div className="campus-content-col">
              <div className="campus-content">
                <h2 className="campus-title">
                  Visit our Campus with image gallery
                </h2>
                <span className="line"></span>
                <p>
                  Experience the vibrant learning environment at Arvindu
                  Classes.
                </p>
                <h3 className="video-title">or watch video</h3>
                <a
                  className="play video-popup"
                  href="https://www.youtube.com/watch?v=0qHWub21h5c"
                >
                  <i className="fas fa-play"></i> <span>Play now</span>
                </a>
              </div>
            </div>
            <div className="campus-image-col">
              <div className="campus-image">
                <div className=" single-campus">
                  <img
                    src="/assets/images/campus-1.webp"
                    width="585"
                    height="392"
                    alt="Campus"
                  />
                </div>
                <div className="single-campus">
                  <img
                    src="/assets/images/campus-2.webp"
                    width="585"
                    height="392"
                    alt="Campus"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Campus Visit Ends ====== */}

      {/* ====== Counter Start ====== */}
      <div className="counter-area-2 pt-80">
        <div className="container">
          <div
            className="counter-wrapper-2 bg_cover"
            style={{ backgroundImage: "url(/assets/images/counter-bg-2.webp)" }}
          >
            <div className="row">
              <div className="col-sm-3 col-6 counter-col">
                <div className="single-counter mt-30">
                  <span className="counter-count">
                    <span className="count" data-count="3652">
                      0
                    </span>{" "}
                    +
                  </span>
                  <p>Students</p>
                </div>
              </div>
              <div className="col-sm-3 col-6 counter-col">
                <div className="single-counter mt-30">
                  <span className="counter-count">
                    <span className="count" data-count="105">
                      0
                    </span>{" "}
                    +
                  </span>
                  <p>Faculties</p>
                </div>
              </div>
              <div className="col-sm-3 col-6 counter-col">
                <div className="single-counter mt-30">
                  <span className="counter-count">
                    <span className="count" data-count="120">
                      0
                    </span>{" "}
                    +
                  </span>
                  <p>Branches</p>
                </div>
              </div>
              <div className="col-sm-3 col-6 counter-col">
                <div className="single-counter mt-30">
                  <span className="counter-count">
                    <span className="count" data-count="30">
                      0
                    </span>{" "}
                    +
                  </span>
                  <p>Awards win</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====== Counter Ends ====== */}

      {/* ====== Teachers Start ====== */}
      <section className="teachers-area pt-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title mt-40">
                <h2 className="title">Meet our Teachers</h2>
                <p>
                  Our expert faculty is committed to providing best-in-class
                  education.
                </p>
              </div>
            </div>
          </div>
          <div className="teachers-wrapper">
            <div className="row teachers-row">
              {[1, 2, 3].map((i) => (
                <div key={i} className="col-md-4 col-sm-6 teachers-col">
                  <div className="single-teacher mt-30 text-center">
                    <div className="teacher-social">
                      <ul className="social">
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="teacher-image">
                      <a href="#">
                        <img
                          src={`/assets/images/teachers/teacher-${i}.webp`}
                          width="266"
                          height="359"
                          alt="teacher"
                        />
                      </a>
                    </div>
                    <div className="teacher-content">
                      <h4 className="name">
                        <a href="#">Expert Teacher {i}</a>
                      </h4>
                      <span className="designation">Science/Commerce</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ====== Teachers Ends ====== */}

      {/* ====== Testimonials Start ====== */}
      <section className="testimonials-area pt-80 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="testimonials-title">
                <h2 className="title">Our Students Review</h2>
                <span className="line"></span>
                <p>
                  Hear what our students have to say about their experience at
                  Arvindu Classes.
                </p>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="testimonials-wrapper">
                <div className="testimonials-shape shape-1"></div>
                <div className="testimonials-shape shape-2"></div>
                <div className="testimonials-shape shape-3"></div>

                <div className="row no-gutters">
                  <div className="col-lg-6 col-md-5">
                    <div className="testimonials-image">
                      <div className="single-testimonial-image">
                        <img
                          src="/assets/images/testimonials-1.webp"
                          width="313"
                          height="579"
                          alt="testimonials"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-7">
                    <div className="testimonials-content">
                      <div className="single-testimonial-content">
                        <div className="content-text">
                          <i className="fas fa-quote-right"></i>
                          <p>
                            "Arvindu Classes has completely changed my
                            perspective on studies. The concepts are so clear
                            now."
                          </p>
                        </div>
                        <div className="content-meta">
                          <p className="name">Rahul Sharma</p>
                          <p className="designation">Grade 12 Student</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Testimonials Ends ====== */}

      {/* ====== Newsletter Start ====== */}
      <section className="newsletter-area-3 pb-80">
        <div className="container">
          <div
            className="newsletter-wrapper bg_cover"
            style={{
              backgroundImage: "url(/assets/images/newsletter-bg-1.webp)",
            }}
          >
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="section-title-2 mt-25">
                  <h2 className="title">Subscribe our Newsletter</h2>
                  <span className="line"></span>
                  <p>Stay updated with our latest workshops and study tips.</p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form mt-30">
                  <form action="#">
                    <input type="text" placeholder="Enter your email here" />
                    <button className="main-btn main-btn-2">
                      Subscribe now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Newsletter Ends ====== */}

      <Footer />

      {/* ====== Back To Top ====== */}
      <a href="#" className="back-to-top">
        <i className="fa fa-chevron-up"></i>
      </a>
    </>
  );
}
