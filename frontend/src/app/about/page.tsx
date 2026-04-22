import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      
      {/* ====== Page Banner Start ====== */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/page-banner.webp)" }}>
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title">About Us</h2>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Page Banner Ends ====== */}

      {/* ====== About Start ====== */}
      <section className="about-area pt-80 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-content mt-40">
                <h2 className="about-title">Best <span>Educational</span> Environment</h2>
                <span className="line"></span>
                <p className="mt-20">
                  Arvindu Classes is dedicated to providing the highest quality education and 
                  creating a supportive learning environment for all our students. 
                  We believe in empowering humanity through knowledge.
                </p>
                <p className="mt-15">
                   Our mission is to guide students towards excellence and help them 
                   achieve their academic and career goals with expert mentorship.
                </p>
                <a href="/courses" className="main-btn mt-30">Our Courses</a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-image mt-50">
                <img src="/assets/images/about/about-1.webp" className="img-fluid rounded shadow" alt="About Arvindu Classes" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== About Ends ====== */}

      <Footer />
    </>
  );
}
