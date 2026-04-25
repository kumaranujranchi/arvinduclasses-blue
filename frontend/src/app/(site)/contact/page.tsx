import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
        <div className="page-banner-bg bg_cover page-banner-bg-image">
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title">Contact Us</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="premium-contact-area pt-100">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-7 mb-50">
              <div className="premium-card">
                <h3 className="premium-title">Send us a Message</h3>
                <form action="#" className="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="premium-input-box">
                        <input type="text" name="name" className="premium-input" placeholder="Full Name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="premium-input-box">
                        <input type="email" name="email" className="premium-input" placeholder="Email Address" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="premium-input-box">
                        <input type="text" name="phone" className="premium-input" placeholder="Phone Number" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="premium-input-box">
                        <input type="text" name="subject" className="premium-input" placeholder="Subject" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="premium-input-box">
                        <textarea name="message" className="premium-textarea" placeholder="Your Message"></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="premium-btn">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 mb-50">
              <div className="premium-card">
                <h3 className="premium-title">Contact Info</h3>
                <div className="contact-info-wrapper">
                  
                  <div className="premium-info-item wow fadeInUp" data-wow-delay="0.2s">
                    <div className="premium-icon-wrapper">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="premium-info-content">
                      <h5>Address</h5>
                      <p>2nd Floor, Nasib Market, Ashiana - Digha Rd, Ashiana, Ram Nagari, More, Patna, Bihar 800025</p>
                    </div>
                  </div>

                  <div className="premium-info-item wow fadeInUp" data-wow-delay="0.4s">
                    <div className="premium-icon-wrapper">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="premium-info-content">
                      <h5>Phone</h5>
                      <p><a href="tel:+918051696333">+91 80516 96333</a></p>
                    </div>
                  </div>

                  <div className="premium-info-item wow fadeInUp" data-wow-delay="0.6s">
                    <div className="premium-icon-wrapper">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="premium-info-content">
                      <h5>Email</h5>
                      <p><a href="mailto:info@arvinduclasses.in">info@arvinduclasses.in</a></p>
                    </div>
                  </div>

                </div>
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
