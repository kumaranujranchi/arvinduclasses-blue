import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact Us - Arvindu Classes",
  description: "Get in touch with Arvindu Classes for admissions, courses, and enquiries.",
};

export default function ContactPage() {
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
              <h2 className="title">Contact Us</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="contact-form mt-50">
                <h3 className="contact-title">Send us a Message</h3>
                <form action="#" className="contact-form wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-box mt-20">
                        <input type="text" name="name" placeholder="Full Name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-box mt-20">
                        <input type="email" name="email" placeholder="Email Address" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-box mt-20">
                        <input type="text" name="phone" placeholder="Phone Number" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-box mt-20">
                        <input type="text" name="subject" placeholder="Subject" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-box mt-20">
                        <textarea name="message" placeholder="Your Message"></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="contact-btn mt-20">
                        <button type="submit" className="main-btn">Send Message</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="contact-info mt-50">
                <h3 className="contact-title">Contact Information</h3>
                <ul className="contact-info-list">
                  <li className="d-flex mt-30">
                    <div className="info-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="info-content media-body">
                      <h5>Address</h5>
                      <p>245, New Town, Marklen Street, North City, New York, USA</p>
                    </div>
                  </li>
                  <li className="d-flex mt-30">
                    <div className="info-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="info-content media-body">
                      <h5>Phone</h5>
                      <p><a href="tel:+01254659874">+01254 659 874</a></p>
                      <p><a href="tel:+32145857458">+32145 857 458</a></p>
                    </div>
                  </li>
                  <li className="d-flex mt-30">
                    <div className="info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="info-content media-body">
                      <h5>Email</h5>
                      <p><a href="mailto:info@arvindclasses.in">info@arvindclasses.in</a></p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
      <Footer />
    </>
  );
}
