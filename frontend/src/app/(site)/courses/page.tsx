import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Courses - Arvindu Classes",
  description: "Browse all courses at Arvindu Classes.",
};

export default function CoursesPage() {
  const courses = [
    {
      tag: "#Foundation",
      title: "Foundation Program (Class 6–8)",
      duration: "1 Year",
      fee: "₹25,000",
      rating: 5,
      bgColor: "#EAB830",
      slug: "foundation-program",
    },
    {
      tag: "#Science",
      title: "Science Program (Class 9–10)",
      duration: "1 Year",
      fee: "₹35,000",
      rating: 5,
      bgColor: "#2F7AD5",
      slug: "science-program",
    },
    {
      tag: "#Commerce",
      title: "Commerce (Class 11–12)",
      duration: "1 Year",
      fee: "₹40,000",
      rating: 5,
      bgColor: "#0C8B51",
      slug: "commerce-program",
    },
    {
      tag: "#Mathematics",
      title: "Applied Mathematics (9–12)",
      duration: "1 Year",
      fee: "₹20,000",
      rating: 4,
      bgColor: "#27B8A7",
      slug: "applied-mathematics",
    },
    {
      tag: "#Science",
      title: "Physics, Chemistry & Biology",
      duration: "1 Year",
      fee: "₹30,000",
      rating: 5,
      bgColor: "#2F7AD5",
      slug: "pcb-program",
    },
    {
      tag: "#Commerce",
      title: "B.Com Academic Support",
      duration: "3 Years",
      fee: "₹45,000",
      rating: 5,
      bgColor: "#7D2AE8",
      slug: "bcom-support",
    },
  ];

  return (
    <>
      <Header />

      {/* Page Banner */}
      <section className="page-banner">
        <div
          className="page-banner-bg bg_cover"
          style={{ backgroundImage: "url(/assets/images/course-banner.png)" }}
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
              {courses.map(({ tag, title, duration, fee, rating, bgColor, slug }, index) => (
                <div key={index} className="col-lg-4 col-sm-6 courses-col">
                  <div
                    className="single-courses mt-30 wow fadeInUpBig course-card-wrapper"
                    data-wow-duration="1s"
                    data-wow-delay={`${0.2 * (index + 1)}s`}
                    style={{ 
                      backgroundColor: bgColor
                    }}
                  >
                    <div>
                      <a href="#" className="category">
                        {tag}
                      </a>
                      <h4 className="courses-title">
                        <Link href={slug === "#" ? "#" : `/courses/${slug}`}>{title}</Link>
                      </h4>
                      <div className="duration-fee">
                        <p className="duration">
                          Duration: <span>{duration}</span>
                        </p>
                        <p className="fee">
                          Fee: <span>{fee}</span>
                        </p>
                      </div>
                      <div className="rating">
                        <span>Rating: </span>
                        <ul className="star">
                          {[...Array(5)].map((_, i) => (
                            <li key={i}>
                              <i
                                className={
                                  i < rating ? "fas fa-star" : "far fa-star"
                                }
                              ></i>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="courses-link course-link-wrapper">
                      <a className="apply" href="#">
                        Book Demo
                      </a>
                      <Link className="more" href={slug === "#" ? "#" : `/courses/${slug}`}>
                        View Details <i className="fas fa-chevron-right"></i>
                      </Link>
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

