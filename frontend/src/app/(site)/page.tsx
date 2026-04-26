"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureScrolling from "../components/FeatureScrolling";
import NewsletterForm from "../components/NewsletterForm";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const banners = useQuery(api.banners.getBanners, { onlyActive: true });
  const posts = useQuery(api.posts.getPublishedPosts, { limit: 6 });

  const staticCourses = [
    {
      tag: "#Foundation",
      title: "Foundation Program (Class 6–8)",
      duration: "1 Year",
      fee: "₹25,000",
      slug: "foundation-program",
      category: "School",
      imageUrl: "/assets/images/courses/course-foundation.png"
    },
    {
      tag: "#Science",
      title: "Science Program (Class 9–10)",
      duration: "1 Year",
      fee: "₹35,000",
      slug: "science-program",
      category: "School",
      imageUrl: "/assets/images/courses/course-science.png"
    },
    {
      tag: "#Commerce",
      title: "Commerce (Class 11–12)",
      duration: "1 Year",
      fee: "₹40,000",
      slug: "commerce-program",
      category: "College",
      imageUrl: "/assets/images/courses/course-commerce.png"
    },
    {
      tag: "#Mathematics",
      title: "Applied Mathematics (9–12)",
      duration: "1 Year",
      fee: "₹20,000",
      slug: "applied-mathematics",
      category: "Subject",
      imageUrl: "/assets/images/courses/course-math.png"
    },
    {
      tag: "#Science",
      title: "Physics, Chemistry & Biology",
      duration: "1 Year",
      fee: "₹30,000",
      slug: "pcb-program",
      category: "Subject",
      imageUrl: "/assets/images/courses/courses-5.webp"
    },
    {
      tag: "#Commerce",
      title: "B.Com Academic Support",
      duration: "3 Years",
      fee: "₹45,000",
      slug: "bcom-support",
      category: "Degree",
      imageUrl: "/assets/images/courses/courses-6.webp"
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const initSlick = () => {
      const win = window as any;
      if (typeof window !== "undefined" && win.$ && win.$.fn && win.$.fn.slick) {
        const $ = win.$;

        // Hero Slider
        if ($(".slider-active").length) {
          if ($(".slider-active").hasClass("slick-initialized")) {
            $(".slider-active").slick("unslick");
          }

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
            autoplaySpeed: 2000,
            dots: false,
            arrows: false,
            fade: true,
            infinite: true,
            asNavFor: ".testimonials-content",
          });
        }
        if ($(".testimonials-content").length && !$(".testimonials-content").hasClass("slick-initialized")) {
          $(".testimonials-content").slick({
            autoplay: true,
            autoplaySpeed: 2000,
            dots: false,
            arrows: false,
            fade: true,
            infinite: true,
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
        
        // Trending Banners
        if ($(".trending-banner-active").length) {
          if ($(".trending-banner-active").hasClass("slick-initialized")) {
            $(".trending-banner-active").slick("unslick");
          }
          $(".trending-banner-active").slick({
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
          });
        }
      } else {
        setTimeout(initSlick, 50);
      }
    };
    initSlick();
  }, [banners, posts, mounted]);

  return (
    <>
      {/* ====== Header ====== */}
      <Header />

      {/* ====== Slider ====== */}
      <section 
        key="hero-static"
        className="slider-area slider-03 slider-active"
      >
        <div
          className="single-slider d-flex align-items-center bg_cover home-slider-bg-1"
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
          className="single-slider d-flex align-items-center bg_cover home-slider-bg-2"
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


      {/* ====== Features Start ====== */}
      <div className="features-area-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="features-image-2 mt-minus-45">
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
            <div className="row g-4">
              {staticCourses.map((course, idx) => {
                const bgColors = ["#01228D", "#0C8B51", "#2F7AD5", "#27B8A7", "#EAB830", "#753B76"];
                const bgColor = bgColors[idx % bgColors.length];
                
                return (
                  <div key={idx} className="col-lg-4 col-md-6 col-sm-12 courses-col">
                    <div className="single-courses mt-10 wow fadeInUpBig course-card-wrapper h-full !p-6 rounded-xl" 
                      style={{ backgroundColor: bgColor }}
                    >
                      <div className="courses-content flex flex-col h-full justify-between">
                        <div>
                          <span className="category text-[11px] opacity-80 uppercase tracking-wider font-bold">{course.tag}</span>
                          <h4 className="courses-title !text-[20px] !leading-tight !mt-2 !mb-4">
                            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                          </h4>
                          <div className="duration-fee !mb-0">
                            <p className="duration text-sm">Duration: <span>{course.duration}</span></p>
                            <p className="fee text-sm">Fee: <span>{course.fee}</span></p>
                          </div>
                        </div>
                        <div className="courses-link border-t border-white/20 pt-3 mt-4">
                          <Link className="more text-sm font-bold flex items-center gap-2" href={`/courses/${course.slug}`}>
                            Details <i className="fas fa-chevron-right text-[10px]"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                  <img src="/assets/images/campus-1 copy.webp" width="521" height="392" alt="Campus" />
                </div>
                <div className="single-campus">
                  <img src="/assets/images/campus-2 copy.webp" width="521" height="392" alt="Campus" />
                </div>
                <div className="single-campus">
                  <img src="/assets/images/campus-3.webp" width="521" height="392" alt="Campus" />
                </div>
                <div className="single-campus">
                  <img src="/assets/images/campus-4.webp" width="521" height="392" alt="Campus" />
                </div>
                <div className="single-campus">
                  <img src="/assets/images/campus-5.webp" width="521" height="392" alt="Campus" />
                </div>
                <div className="single-campus">
                  <img src="/assets/images/campus-6.webp" width="521" height="392" alt="Campus" />
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
      
      {/* ====== Trending Banners Start ====== */}
      {mounted && banners && banners.length > 0 && (
        <section 
          key="trending-banners-ready"
          className="trending-banners-area pt-100 pb-100"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Modern Grid Background Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(51, 104, 198, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(51, 104, 198, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle, transparent 20%, black 100%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 20%, black 100%)',
            zIndex: 0,
            pointerEvents: 'none'
          }}></div>

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-title-2 text-center mb-40">
              <h2 className="title" style={{ fontSize: '28px', fontWeight: '600' }}>What&apos;s Trending</h2>
              <span className="line mx-auto"></span>
            </div>
            <div className="trending-banner-active">
              {banners.map((banner) => (
                <div key={banner._id + "-trending"} className="single-trending-banner px-2">
                  <div className="trending-banner-img">
                     <img 
                      src={banner.imageUrl} 
                      alt="Trending Banner" 
                      className="w-full h-auto"
                      style={{ borderRadius: '25px', boxShadow: '0 15px 45px rgba(0,0,0,0.12)', border: '1px solid #eee' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ====== Trending Banners End ====== */}

      <FeatureScrolling />

      {/* ====== Counter ====== */}
      <div className="counter-area-2">
        <div className="container">
          <div
            className="counter-wrapper-2 bg_cover home-counter-bg"
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

      {/* ====== Testimonials Start ====== */}
      <section className="testimonials-area pt-100 pb-100">
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
      <section className="blog-area-2 pt-100 pb-100">
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
            {posts && posts.length > 0 ? (
              <div className="row-wrapper blog-active">
                {posts.map((post) => (
                  <div key={post._id} className="custom-col">
                    <div className="single-blog mt-30" style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                      <div className="blog-image" style={{ borderRadius: '15px 15px 0 0', overflow: 'hidden' }}>
                        <Link href={`/blog/${post.slug}`}>
                          <img 
                            src={post.imageUrl || "/assets/images/blog-1.webp"} 
                            width="370" 
                            height="250" 
                            alt={post.title} 
                            style={{ height: '250px', objectFit: 'cover' }}
                          />
                        </Link>
                      </div>
                      <div className="blog-content" style={{ padding: '25px', backgroundColor: '#f9f9f9' }}>
                        <ul className="meta">
                          <li>
                            <a href="#">
                              {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </a>
                          </li>
                          <li><a href="#">By: {post.author}</a></li>
                        </ul>
                        <h4 className="blog-title">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <Link href={`/blog/${post.slug}`} className="more">Read more <i className="fas fa-chevron-right"></i></Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">
                <p>No published posts yet.</p>
              </div>
            )}
            <Link href="/blog" className="more-post">{posts ? `${posts.length}+ more post` : 'View all posts'}</Link>
          </div>
        </div>
      </section>
      {/* ====== Blog Ends ====== */}

      {/* ====== Lower Side Banner Start ====== */}
      <section 
        className="lower-banner-area pt-80 pb-80" 
        style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#fff' }}
      >
        {/* Modern Grid Background Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(51, 104, 198, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 104, 198, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px',
          maskImage: 'radial-gradient(circle, transparent 15%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 15%, black 100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="banner-img wow fadeInUp" data-wow-delay="0.2s">
                <img 
                  src="/assets/images/lower-side-banner.png" 
                  alt="Special Banner" 
                  style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Lower Side Banner End ====== */}

      {/* ====== Newsletter ====== */}
      <section className="newsletter-area-2">
        <div className="container">
          <div
            className="newsletter-wrapper bg_cover wow zoomIn home-newsletter-bg"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
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
                  <NewsletterForm />
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
