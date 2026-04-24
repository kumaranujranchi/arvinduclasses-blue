"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeatureScrolling from "./components/FeatureScrolling";

export default function HomePage() {
  useEffect(() => {
    const initSlick = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.$ && window.$.fn && window.$.fn.slick) {
        // @ts-ignore
        const $ = window.$;

        // Hero Slider
        if ($(".slider-active").length && !$(".slider-active").hasClass("slick-initialized")) {
          function doAnimations(elements: any) {
            var animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            elements.each(function (this: HTMLElement) {
              var $this = $(this);
              var $animationDelay = $this.data("delay");
              var $animationType = "animated " + $this.data("animation");
              $this.css({
                "animation-delay": $animationDelay,
                "-webkit-animation-delay": $animationDelay,
              });
              $this.addClass($animationType).one(animationEndEvents, function () {
                $this.removeClass($animationType);
              });
            });
          }
          var BasicSlider = $(".slider-active");
          BasicSlider.on("init", function (e: any, slick: any) {
            var $firstAnimatingElements = $(".single-slider:first-child").find("[data-animation]");
            doAnimations($firstAnimatingElements);
          });
          BasicSlider.on("beforeChange", function (e: any, slick: any, currentSlide: any, nextSlide: any) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find("[data-animation]");
            doAnimations($animatingElements);
          });
          BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 10000,
            pauseOnHover: false,
            dots: false,
            fade: true,
            arrows: true,
            prevArrow: '<span class="prev"><i class="fas fa-chevron-left"></i></span>',
            nextArrow: '<span class="next"><i class="fas fa-chevron-right"></i></span>',
            responsive: [{ breakpoint: 767, settings: {} }],
          });
        }

        // Campus slider
        if ($(".campus-image").length && !$(".campus-image").hasClass("slick-initialized")) {
          $(".campus-image").slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          });
        }

        // Testimonials sliders
        if ($(".testimonials-image").length && !$(".testimonials-image").hasClass("slick-initialized")) {
          $(".testimonials-image").slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: false,
            arrows: false,
            fade: true,
            asNavFor: ".testimonials-content",
          });
        }
        if ($(".testimonials-content").length && !$(".testimonials-content").hasClass("slick-initialized")) {
          $(".testimonials-content").slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: false,
            arrows: false,
            fade: true,
            asNavFor: ".testimonials-image",
          });
        }

        // Blog slider
        if ($(".blog-active").length && !$(".blog-active").hasClass("slick-initialized")) {
          $(".blog-active").slick({
            autoplay: true,
            autoplaySpeed: 4000,
            dots: false,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
              { breakpoint: 992, settings: { slidesToShow: 2 } },
              { breakpoint: 576, settings: { slidesToShow: 1 } },
            ],
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
      {/* ====== Header ====== */}
      <Header />

      {/* ====== Slider ====== */}
      <section className="slider-area slider-03 slider-active">
        <div
          className="single-slider d-flex align-items-center bg_cover"
          style={{ backgroundImage: "linear-gradient(rgba(7, 41, 77, 0.7), rgba(7, 41, 77, 0.7)), url(/assets/images/homepage1.png)" }}
        >
          <div className="container">
            <div className="slider-content slider-content-3 text-center">
              <h2 className="title" data-animation="fadeInUp" data-delay="0.2s">
                Education is the power of Humanity
              </h2>
              <ul className="slider-btn">
                <li>
                  <a data-animation="fadeInUp" data-delay="0.6s" className="main-btn main-btn-2" href="/courses">
                    View Courses
                  </a>
                </li>
                <li>
                  <a data-animation="fadeInUp" data-delay="1s" className="main-btn" href="/about">
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="single-slider d-flex align-items-center bg_cover"
          style={{ backgroundImage: "linear-gradient(rgba(7, 41, 77, 0.7), rgba(7, 41, 77, 0.7)), url(/assets/images/homepage2.png)" }}
        >
          <div className="container">
            <div className="slider-content slider-content-3 text-center">
              <h2 className="title" data-animation="fadeInUp" data-delay="0.2s">
                Best Educational Environment for Your Success
              </h2>
              <ul className="slider-btn">
                <li>
                  <a data-animation="fadeInUp" data-delay="0.6s" className="main-btn main-btn-2" href="/courses">
                    View Courses
                  </a>
                </li>
                <li>
                  <a data-animation="fadeInUp" data-delay="1s" className="main-btn" href="/about">
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Slider Ends ====== */}

      {/* ====== About Start ====== */}
      <section className="about-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="about-content mt-40">
                <h2 className="about-title">Best Educational <span>Environment</span></h2>
                <span className="line"></span>
                <p>
                  At Arvindu Classes, we create a focused, inspiring learning atmosphere that helps students excel in competitive exams and board examinations. Our expert faculty and structured curriculum ensure every student reaches their full potential.
                  <br /><br />
                  Join thousands of students who have already transformed their academic journey with Arvindu Classes.
                </p>
                <Link href="/about" className="main-btn">Explore</Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="about-image mt-50">
                <div className="single-image image-1">
                  <img src="/assets/images/about/about-1.png" width="290" height="290" alt="about" />
                </div>
                <div className="single-image image-2">
                  <img src="/assets/images/about/about-2.png" width="225" height="225" alt="about" />
                </div>
                <div className="single-image image-3">
                  <img src="/assets/images/about/about-3.png" width="190" height="190" alt="about" />
                </div>
                <div className="single-image image-4">
                  <img src="/assets/images/about/about-4.png" width="140" height="140" alt="about" />
                </div>
                <div className="about-icon icon-1">
                  <img src="/assets/images/about/icon/icon-1.webp" width="46" height="46" alt="icon" />
                </div>
                <div className="about-icon icon-2">
                  <img src="/assets/images/about/icon/icon-2.webp" width="46" height="46" alt="icon" />
                </div>
                <div className="about-icon icon-3">
                  <img src="/assets/images/about/icon/icon-3.webp" width="46" height="46" alt="icon" />
                </div>
                <div className="about-icon icon-4">
                  <img src="/assets/images/about/icon/icon-4.webp" width="46" height="46" alt="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== About Ends ====== */}

      {/* ====== Top Course (with images) Start ====== */}
      <section className="top-courses-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title mt-40">
                <h2 className="title">Here is our <br /> Top Courses</h2>
                <p>Explore our most popular coaching programs designed for competitive exam success.</p>
              </div>
            </div>
          </div>
          <div className="courses-wrapper wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.3s">
            <div className="row">
              {[
                { img: "courses-1.webp", tag: "#Science", title: "Computer Science & Engineering" },
                { img: "courses-2.webp", tag: "#Science", title: "Bachelor of Business Administration" },
                { img: "courses-3.webp", tag: "#Science", title: "Social & Digital Marketing" },
                { img: "courses-4.webp", tag: "#Science", title: "Bachelor of Applied Mathematics" },
              ].map(({ img, tag, title }) => (
                <div key={title} className="col-lg-3 col-sm-6 courses-col">
                  <div className="single-courses-2 mt-30">
                    <div className="courses-image">
                      <Link href="/courses"><img src={`/assets/images/courses/${img}`} width="270" height="170" alt="courses" /></Link>
                    </div>
                    <div className="courses-content">
                      <a href="#" className="category">{tag}</a>
                      <h4 className="courses-title"><Link href="/courses">{title}</Link></h4>
                      <div className="duration-rating">
                        <div className="duration-fee">
                          <p className="duration">Duration: <span>1 year</span></p>
                          <p className="fee">Fee: <span>₹5,000</span></p>
                        </div>
                        <div className="rating">
                          <span>Rating: </span>
                          <ul className="star">
                            {[...Array(5)].map((_, i) => <li key={i}><i className="fas fa-star"></i></li>)}
                          </ul>
                        </div>
                      </div>
                      <div className="courses-link">
                        <a className="apply" href="#">Online Apply</a>
                        <Link className="more" href="/courses">Read more <i className="fas fa-chevron-right"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ====== Top Course Ends ====== */}

      {/* ====== Features Start ====== */}
      <div className="features-area-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="features-image-2">
                <img className="wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.3s" src="/assets/images/homepage_girl_v2.png" alt="Features" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="features-items">
                <div className="features-items-wrapper">
                  {[
                    { icon: "icon-2-1.webp", text: "250+\n Courses" },
                    { icon: "icon-2-2.webp", text: "Skill Based\n Scholarships" },
                    { icon: "icon-2-3.webp", text: "Online\n Education" },
                  ].map(({ icon, text }) => (
                    <div key={icon} className="single-features-item d-flex align-items-center wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.2s">
                      <div className="item-icon">
                        <img src={`/assets/images/icon/${icon}`} width="70" height="70" alt="Icon" />
                      </div>
                      <div className="item-content media-body">
                        <p>{text.split("\n")[0]}<br />{text.split("\n")[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="features-items-wrapper">
                  {[
                    { icon: "icon-2-4.webp", text: "Expert\n Teachers" },
                    { icon: "icon-2-5.webp", text: "After Course\n Certification" },
                    { icon: "icon-2-6.webp", text: "Download\n Prospectus" },
                  ].map(({ icon, text }) => (
                    <div key={icon} className="single-features-item d-flex align-items-center wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.4s">
                      <div className="item-icon">
                        <img src={`/assets/images/icon/${icon}`} width="70" height="70" alt="Icon" />
                      </div>
                      <div className="item-content media-body">
                        <p>{text.split("\n")[0]}<br />{text.split("\n")[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====== Features Ends ====== */}

      {/* ====== Popular Courses (Slider) Start ====== */}
      <section className="top-courses-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title mt-40">
                <h2 className="title">Our Popular <br /> Courses</h2>
                <p>Our most enrolled and highest-rated preparation programs for students.</p>
              </div>
            </div>
          </div>
          <div className="courses-wrapper">
            <div className="row">
              {[
                { tag: "#Junior", title: "Foundation Program (Class 6–8)", fee: "₹25,000", duration: "1 Year", bgColor: "#EAB830", slug: "foundation-program", delay: "0.2s" },
                { tag: "#Secondary", title: "Science Program (Class 9–10)", fee: "₹35,000", duration: "1 Year", bgColor: "#2F7AD5", slug: "science-program", delay: "0.4s" },
                { tag: "#Senior", title: "Commerce (Class 11–12)", fee: "₹40,000", duration: "1 Year", bgColor: "#0C8B51", slug: "commerce-program", delay: "0.6s" },
                { tag: "#Mathematics", title: "Applied Mathematics (9–12)", fee: "₹20,000", duration: "1 Year", bgColor: "#27B8A7", slug: "applied-mathematics", delay: "0.2s" },
                { tag: "#Science", title: "Physics, Chemistry & Biology", fee: "₹30,000", duration: "1 Year", bgColor: "#2F7AD5", slug: "pcb-program", delay: "0.4s" },
                { tag: "#University", title: "B.Com Academic Support", fee: "₹45,000", duration: "3 Years", bgColor: "#7D2AE8", slug: "bcom-support", delay: "0.6s" },
              ].map(({ tag, title, fee, duration, bgColor, slug, delay }, idx) => (
                <div key={idx} className="col-lg-4 col-sm-6 courses-col">
                  <div className="single-courses mt-30 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay={delay} 
                    style={{ 
                      backgroundColor: bgColor, 
                      minHeight: '330px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between' 
                    }}>
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
                          {[...Array(5)].map((_, i) => <li key={i}><i className="fas fa-star"></i></li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="courses-link" style={{ marginTop: 'auto' }}>
                      <a className="apply" href="#">Online Apply</a>
                      <Link className="more" href={`/courses/${slug}`}>Read more <i className="fas fa-chevron-right"></i></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ====== Popular Courses Ends ====== */}

      {/* ====== Campus Visit Start ====== */}
      <section className="campus-visit-area">
        <div className="container">
          <div className="campus-visit-wrapper">
            <div className="campus-image-col">
              <div className="campus-image">
                <div className="single-campus">
                  <img src="/assets/images/campus-1.webp" width="521" height="392" alt="Campus" />
                </div>
                <div className="single-campus">
                  <img src="/assets/images/campus-2.webp" width="521" height="392" alt="Campus" />
                </div>
              </div>
            </div>
            <div className="campus-content-col">
              <div className="campus-content">
                <h2 className="campus-title">Visit our Campus with image gallery</h2>
                <span className="line"></span>
                <p>Come experience our world-class coaching facilities in person. See our study rooms, digital labs, and mentoring spaces.</p>
                <h3 className="video-title">or watch video</h3>
                <a className="play video-popup" href="https://www.youtube.com/watch?v=0qHWub21h5c">
                  <i className="fas fa-play"></i> <span>Play now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Campus Visit Ends ====== */}

      {/* ====== Counter ====== */}
      <div className="counter-area-2">
        <div className="container">
          <div
            className="counter-wrapper-2 bg_cover"
            style={{ backgroundImage: "url(/assets/images/counter-bg-2.webp)" }}
          >
            <div className="row">
              {[
                { count: "200", label: "Students", plus: true },
                { count: "24", label: "Faculties", plus: true },
                { count: "1", label: "Branches", plus: false },
                { count: "4", label: "Awards Won", plus: true },
              ].map(({ count, label, plus }) => (
                <div key={label} className="col-sm-3 col-6 counter-col">
                  <div className="single-counter mt-30">
                    <span className="counter-count">
                      <span className="count" data-count={count}>0</span> {plus && "+"}
                    </span>
                    <p>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====== Online Library Start ====== */}
      <section className="online-library-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="section-title-2 text-center">
                <h2 className="title">Online Library</h2>
                <span className="line"></span>
                <p>Browse our curated collection of study materials, books, and resources for all competitive exams.</p>
              </div>
            </div>
          </div>
          <div className="online-library-wrapper wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.3s">
            <div className="row">
              {[
                { img: "product-1.webp", title: "JEE Study Kit", price: "₹299" },
                { img: "product-2.webp", title: "NEET Guide Book", price: "₹349" },
                { img: "product-3.webp", title: "Math Workbook", price: "₹199" },
                { img: "product-4.webp", title: "Science Capsule", price: "₹249" },
              ].map(({ img, title, price }) => (
                <div key={title} className="col-lg-3 col-sm-6">
                  <div className="single-library text-center mt-30">
                    <div className="library-image">
                      <a href="#"><img src={`/assets/images/product/${img}`} width="271" height="281" alt="Product" /></a>
                      <span className="discount">-30%</span>
                    </div>
                    <div className="library-content">
                      <h4 className="library-title"><a href="#">{title}</a></h4>
                      <span className="price">Price: {price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ====== Online Library Ends ====== */}

      <FeatureScrolling />

      {/* ====== Testimonials Start ====== */}
      <section className="testimonials-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="testimonial-wrapper-2 mt-40">
                <div className="section-title-2">
                  <h2 className="title">Our Students <br /> Review</h2>
                  <span className="line"></span>
                </div>
                <div className="testimonials-content">
                  <div className="single-testimonial-content">
                    <div className="content-text">
                      <i className="fas fa-quote-right"></i>
                      <p>Arvindu Classes has been the best decision of my academic journey. The structured approach and expert guidance helped me crack JEE with a great rank!</p>
                    </div>
                  </div>
                  <div className="single-testimonial-content">
                    <div className="content-text">
                      <i className="fas fa-quote-right"></i>
                      <p>The teachers here are incredibly dedicated and patient. I improved my NEET score by over 100 marks in just 6 months of coaching at Arvindu Classes.</p>
                    </div>
                  </div>
                  <div className="single-testimonial-content">
                    <div className="content-text">
                      <i className="fas fa-quote-right"></i>
                      <p>Regular mock tests and personalized feedback make this coaching institute stand apart. Highly recommended for any serious competitive exam aspirant!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="testimonial-wrapper-2">
                <div className="testimonials-shape shape-1"></div>
                <div className="testimonials-shape shape-2"></div>
                <div className="testimonials-image">
                  <div className="single-testimonial-image">
                    <img src="/assets/images/testimonial_rohan.png" width="313" height="579" alt="Testimonials" />
                    <div className="content-meta">
                      <p className="name">Rohan Sharma</p>
                      <p className="designation">JEE Advanced, AIR 342</p>
                    </div>
                  </div>
                  <div className="single-testimonial-image">
                    <img src="/assets/images/testimonial_priya.png" width="313" height="579" alt="Testimonials" />
                    <div className="content-meta">
                      <p className="name">Priya Verma</p>
                      <p className="designation">NEET Qualifier, 650+ Score</p>
                    </div>
                  </div>
                  <div className="single-testimonial-image">
                    <img src="/assets/images/testimonial_amit.png" width="313" height="579" alt="Testimonials" />
                    <div className="content-meta">
                      <p className="name">Amit Kumar</p>
                      <p className="designation">Board Topper, 97%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Testimonials Ends ====== */}

      {/* ====== Blog Start ====== */}
      <section className="blog-area-2">
        <h4 className="trending-title">Trending blogs</h4>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-title-2">
                <h2 className="title">Explore top Post</h2>
                <span className="line"></span>
              </div>
            </div>
          </div>
          <div className="blog-wrapper">
            <div className="row-wrapper blog-active">
              <div className="custom-col">
                <div className="single-blog mt-30">
                  <div className="blog-image">
                    <a href="#"><img src="/assets/images/blog-1.webp" width="370" height="250" alt="blog" /></a>
                  </div>
                  <div className="blog-content">
                    <ul className="meta">
                      <li><a href="#">15 Apr, 2025</a></li>
                      <li><a href="#">By: Arvindu Sir</a></li>
                      <li><a href="#">8 Comments</a></li>
                    </ul>
                    <h4 className="blog-title"><a href="#">How to Crack JEE Mains in 3 Months — A Complete Strategy</a></h4>
                    <a href="#" className="more">Read more <i className="fas fa-chevron-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="custom-col">
                <div className="single-blog mt-30">
                  <div className="blog-image">
                    <a href="#"><img src="/assets/images/blog-2.webp" width="370" height="250" alt="blog" /></a>
                  </div>
                  <div className="blog-content">
                    <ul className="meta">
                      <li><a href="#">10 Apr, 2025</a></li>
                      <li><a href="#">By: Arvindu Sir</a></li>
                      <li><a href="#">5 Comments</a></li>
                    </ul>
                    <h4 className="blog-title"><a href="#">Top 5 Time Management Tips for NEET Aspirants</a></h4>
                    <a href="#" className="more">Read more <i className="fas fa-chevron-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="custom-col">
                <div className="single-blog mt-30">
                  <div className="blog-image">
                    <a href="#"><img src="/assets/images/blog-3.webp" width="370" height="250" alt="blog" /></a>
                  </div>
                  <div className="blog-content">
                    <ul className="meta">
                      <li><a href="#">5 Apr, 2025</a></li>
                      <li><a href="#">By: Arvindu Sir</a></li>
                      <li><a href="#">12 Comments</a></li>
                    </ul>
                    <h4 className="blog-title"><a href="#">Why Regular Mock Tests Are Key to Board Exam Success</a></h4>
                    <a href="#" className="more">Read more <i className="fas fa-chevron-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <a href="#" className="more-post">45+ more post</a>
          </div>
        </div>
      </section>
      {/* ====== Blog Ends ====== */}

      {/* ====== Newsletter ====== */}
      <section className="newsletter-area-2">
        <div className="container">
          <div
            className="newsletter-wrapper bg_cover wow zoomIn"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
            style={{ backgroundImage: "url(/assets/images/newsletter-bg-1.webp)" }}
          >
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="section-title-2 mt-25">
                  <h2 className="title">Subscribe our Newsletter</h2>
                  <span className="line"></span>
                  <p>Stay updated with our latest news and course offerings.</p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form mt-30">
                  <form action="#">
                    <input type="text" placeholder="Enter your email here" />
                    <button className="main-btn main-btn-2">Subscribe now</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Back To Top ====== */}
      <a href="#" className="back-to-top">
        <i className="fa fa-chevron-up"></i>
      </a>

      {/* ====== Footer ====== */}
      <Footer />
    </>
  );
}
