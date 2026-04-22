import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Courses - Arvindu Classes",
  description: "Browse all courses at Arvindu Classes.",
};

export default function CoursesPage() {
  const courses = [
    { tag: "#Engineering", title: "Bachelor of Engineering", duration: "4 years", fee: "₹50,000" },
    { tag: "#Business", title: "Bachelor of Business Administration", duration: "3 years", fee: "₹45,000" },
    { tag: "#Marketing", title: "Social & Digital Marketing", duration: "1 year", fee: "₹15,000" },
    { tag: "#Science", title: "Applied Mathematics", duration: "3 years", fee: "₹40,000" },
    { tag: "#Science", title: "Computer Science & Engineering", duration: "4 years", fee: "₹55,000" },
    { tag: "#Arts", title: "Bachelor of Fine Arts", duration: "3 years", fee: "₹35,000" },
  ];

  return (
    <>
      <Header />

      {/* Page Banner */}
      <section className="page-banner">
        <div
          className="page-banner-bg bg_cover"
          style={{ backgroundImage: "url(/assets/images/page-banner.webp)" }}
        >
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title">Our Courses</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="top-courses-area">
        <div className="container">
          <div className="courses-wrapper">
            <div className="row courses-row">
              {courses.map(({ tag, title, duration, fee }, index) => (
                <div key={index} className="col-lg-4 col-sm-6 courses-col">
                  <div
                    className="single-courses mt-30 wow fadeInUpBig"
                    data-wow-duration="1s"
                    data-wow-delay={`${0.2 * (index + 1)}s`}
                  >
                    <a href="#" className="category">{tag}</a>
                    <h4 className="courses-title">
                      <a href="#">{title}</a>
                    </h4>
                    <div className="duration-fee">
                      <p className="duration">Duration: <span>{duration}</span></p>
                      <p className="fee">Fee: <span>{fee}</span></p>
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
                      <a className="more" href="#">
                        Read more <i className="fas fa-chevron-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
      <Footer />
    </>
  );
}
