import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Blog - Arvindu Classes",
  description: "Read the latest news, articles and updates from Arvindu Classes.",
};

const posts = [
  { image: "/assets/images/blog-1.webp", title: "Latest Micro Biological basic Workshop for Research", date: "25 May, 2024" },
  { image: "/assets/images/blog-2.webp", title: "Latest Micro Biological basic Workshop for Research", date: "18 May, 2024" },
  { image: "/assets/images/blog-3.webp", title: "Latest Micro Biological basic Workshop for Research", date: "10 May, 2024" },
];

export default function BlogPage() {
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
              <h2 className="title">Our Blog</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-area">
        <div className="container">
          <div className="row">
            {posts.map(({ image, title, date }, index) => (
              <div key={index} className="col-lg-4 col-sm-6">
                <div className="single-blog mt-30">
                  <div className="blog-image">
                    <a href="#">
                      <img src={image} width={370} height={250} alt="blog" />
                    </a>
                  </div>
                  <div className="blog-content">
                    <ul className="meta">
                      <li><a href="#">{date}</a></li>
                      <li><a href="#">By: Admin</a></li>
                    </ul>
                    <h4 className="blog-title">
                      <a href="#">{title}</a>
                    </h4>
                    <a href="#" className="more">
                      Read more <i className="fas fa-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
      <Footer />
    </>
  );
}
