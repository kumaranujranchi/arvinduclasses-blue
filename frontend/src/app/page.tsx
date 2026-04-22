import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      {/* ====== Header ====== */}
      <Header />

      {/* ====== Slider ====== */}
      <section className="slider-area slider-03 slider-active">
        <div
          className="single-slider d-flex align-items-center bg_cover"
          style={{ backgroundImage: "url(/assets/images/slider-3-1.webp)" }}
        >
          <div className="container">
            <div className="slider-content slider-content-3 text-center">
              <h2 className="title" data-animation="fadeInUp" data-delay="0.2s">
                Education is the power of Humanity
              </h2>
              <ul className="slider-btn">
                <li>
                  <a
                    data-animation="fadeInUp"
                    data-delay="0.6s"
                    className="main-btn main-btn-2"
                    href="/courses"
                  >
                    View Courses
                  </a>
                </li>
                <li>
                  <a
                    data-animation="fadeInUp"
                    data-delay="1s"
                    className="main-btn"
                    href="#"
                  >
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="single-slider d-flex align-items-center bg_cover"
          style={{ backgroundImage: "url(/assets/images/slider-3-2.webp)" }}
        >
          <div className="container">
            <div className="slider-content slider-content-3 text-center">
              <h2 className="title" data-animation="fadeInUp" data-delay="0.2s">
                Education is the power of Humanity
              </h2>
              <ul className="slider-btn">
                <li>
                  <a
                    data-animation="fadeInUp"
                    data-delay="0.6s"
                    className="main-btn main-btn-2"
                    href="/courses"
                  >
                    View Courses
                  </a>
                </li>
                <li>
                  <a
                    data-animation="fadeInUp"
                    data-delay="1s"
                    className="main-btn"
                    href="#"
                  >
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Features ====== */}
      <div className="features-area-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="single-features-item-2 d-flex mt-30 wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.2s">
                <div className="item-icon">
                  <img src="/assets/images/icon/icon-1.webp" width="46" height="46" alt="Icon" />
                </div>
                <div className="item-content media-body">
                  <h5 className="title">Expert Teachers</h5>
                  <p>Quality education from highly qualified instructors.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="single-features-item-2 d-flex mt-30 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="0.4s">
                <div className="item-icon">
                  <img src="/assets/images/icon/icon-2.webp" width="46" height="46" alt="Icon" />
                </div>
                <div className="item-content media-body">
                  <h5 className="title">Monthly Test</h5>
                  <p>Learn from anywhere at your own pace.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="single-features-item-2 d-flex mt-30 wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.6s">
                <div className="item-icon">
                  <img src="/assets/images/icon/icon-3.webp" width="46" height="46" alt="Icon" />
                </div>
                <div className="item-content media-body">
                  <h5 className="title">Certification</h5>
                  <p>Earn certificates after completing each course.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Top Courses ====== */}
      <section className="top-courses-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-9">
              <div className="section-title-2 text-center mt-55">
                <h2 className="title">Top Courses</h2>
                <span className="line"></span>
                <p>Explore our wide range of expertly designed courses.</p>
              </div>
            </div>
          </div>
          <div className="courses-wrapper">
            <div className="row courses-row">
              {[
                { tag: "#Engineering", title: "Bachelor of Engineering", delay: "0.2s" },
                { tag: "#Business", title: "Bachelor of Business Administration", delay: "0.2s" },
                { tag: "#Marketing", title: "Social & Digital Marketing", delay: "0.4s" },
                { tag: "#Science", title: "Computer Science & Engineering", delay: "0.6s" },
              ].map(({ tag, title, delay }) => (
                <div key={title} className="col-lg-3 col-sm-6 courses-col">
                  <div className="single-courses mt-30 wow fadeInUpBig" data-wow-duration="1s" data-wow-delay={delay}>
                    <a href="#" className="category">{tag}</a>
                    <h4 className="courses-title">
                      <a href="/courses">{title}</a>
                    </h4>
                    <div className="duration-fee">
                      <p className="duration">Duration: <span>1 year</span></p>
                      <p className="fee">Fee: <span>₹5,000</span></p>
                    </div>
                    <div className="rating">
                      <span>Rating: </span>
                      <ul className="star">
                        {[...Array(5)].map((_, i) => (
                          <li key={i}><i className="fas fa-star"></i></li>
                        ))}
                      </ul>
                    </div>
                    <div className="courses-link">
                      <a className="apply" href="#">Online Apply</a>
                      <a className="more" href="/courses">Read more <i className="fas fa-chevron-right"></i></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== Counter ====== */}
      <div className="counter-area-2">
        <div className="container">
          <div
            className="counter-wrapper-2 bg_cover"
            style={{ backgroundImage: "url(/assets/images/counter-bg-2.webp)" }}
          >
            <div className="row">
              {[
                { count: "3652", label: "Students" },
                { count: "105", label: "Faculties" },
                { count: "120", label: "Branches" },
                { count: "30", label: "Awards Won" },
              ].map(({ count, label }) => (
                <div key={label} className="col-sm-3 col-6 counter-col">
                  <div className="single-counter mt-30">
                    <span className="counter-count">
                      <span className="count" data-count={count}>0</span> +
                    </span>
                    <p>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
