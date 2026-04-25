import Link from "next/link";

export default function Footer() {
  return (
    <section
      className="footer-area footer-02 bg_cover footer-bg"
    >
      <div className="footer-widget">
        <div className="container">
          <div className="row">
            {/* Information */}
            <div className="col-md-3 col-6">
              <div className="footer-link mt-45">
                <h4 className="footer-title">Information</h4>
                <ul className="link-list">
                  <li><a href="#">Admission</a></li>
                  <li><Link href="/tuition-fee">Tuition fee</Link></li>
                  <li><Link href="/scholarship">Scholarship</Link></li>
                  <li><a href="#">Conditions</a></li>
                  <li><Link href="/facilities">Facilities</Link></li>
                </ul>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-md-3 col-6">
              <div className="footer-link mt-45">
                <h4 className="footer-title">Useful Link</h4>
                <ul className="link-list">
                  <li><Link href="/courses">All Courses</Link></li>
                  <li><Link href="/digital-marketing">Digital Marketing</Link></li>
                  <li><a href="#">Our Teachers</a></li>
                  <li><a href="#">Our Events</a></li>
                  <li><Link href="/blog">Blog Posts</Link></li>
                </ul>
              </div>
            </div>


            {/* Contact Info */}
            <div className="col-md-3 col-12">
              <div className="footer-link mt-45">
                <h4 className="footer-title">Contact Info</h4>
                <ul className="link-list">
                  <li>
                    <p>2nd Floor, Nasib Market, Ashiana - Digha Rd, Ashiana, Ram Nagari, More, Patna, Bihar 800025</p>
                  </li>
                  <li>
                    <p><a href="tel:+918051696333">+91 80516 96333</a></p>
                  </li>
                  <li>
                    <p><a href="mailto:info@arvinduclasses.in">info@arvinduclasses.in</a></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-widget-wrapper">
            <div className="footer-social">
              <ul className="social">
                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
              </ul>
            </div>
            <div className="footer-menu d-none d-md-block">
              <ul className="menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/courses">Courses</Link></li>
                <li><Link href="/digital-marketing">Digital Marketing</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/notice">Notice Board</Link></li>
                <li><a href="#">Offers</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="container">
          <div className="copyright text-center">
            <p className="footer-copyright-text">
              &copy; 2026 <span className="footer-brand-name">Arvindu Classes</span> Made with{" "}
              <i className="fa fa-heart footer-heart-icon"></i> by{" "}
              <a href="http://www.synergybrandarchitect.in" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
                Synergy Brand Architect
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
