"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses", hasDropdown: true },
  { href: "/results", label: "Results" },
  { href: "/digital-marketing", label: "Digital Marketing", isNew: true },
  { href: "/contact", label: "Contact" },
];

const courses = [
  { title: "Foundation Program", classRange: "Class 6–8", slug: "foundation-program", category: "Junior", color: "#EAB830", icon: "fas fa-graduation-cap" },
  { title: "Science Program", classRange: "Class 9–10", slug: "science-program", category: "Secondary", color: "#2F7AD5", icon: "fas fa-microscope" },
  { title: "Commerce", classRange: "Class 11–12", slug: "commerce-program", category: "Senior", color: "#0C8B51", icon: "fas fa-chart-line" },
  { title: "Applied Mathematics", classRange: "Class 9–12", slug: "applied-mathematics", category: "Mathematics", color: "#27B8A7", icon: "fas fa-square-root-alt" },
  { title: "Physics, Chemistry & Biology", classRange: "Class 11–12", slug: "pcb-program", category: "Science", color: "#2F7AD5", icon: "fas fa-atom" },
  { title: "B.Com Academic Support", classRange: "Graduation", slug: "bcom-support", category: "University", color: "#7D2AE8", icon: "fas fa-university" },
];

export default function Header() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      setUser(JSON.parse(session));
    }

    const handleScroll = () => {
      if (window.innerWidth < 992) {
        const shouldStick = window.scrollY > 80;
        setIsSticky(shouldStick);
        document.body.classList.toggle("mobile-nav-sticky-active", shouldStick);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="header-area">
      <div className="header-top" style={{ padding: '0', minHeight: '32px', display: 'flex', alignItems: 'flex-end' }}>
        <div className="container">
          <div className="header-top-wrapper d-flex justify-content-between align-items-end w-100" style={{ paddingBottom: '6px' }}>
            <div className="header-top-left d-none d-sm-flex align-items-end">
              <a href="mailto:info@arvinduclasses.in" style={{ fontSize: '13px', color: '#fff', textDecoration: 'none', lineHeight: '1' }}>
                info@arvinduclasses.in
              </a>
            </div>
            <div className="header-top-right">
              <div className="header-link d-flex align-items-end justify-content-end" style={{ lineHeight: '1', gap: '20px' }}>
                <Link className="notice" href="/notice" style={{ fontSize: '13px', color: '#fff', margin: 0 }}>Notice</Link>
                {user ? (
                  <>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                    <Link href="/admin" className="text-white" style={{ fontSize: '13px', textDecoration: 'none' }}>Hi, {user.name}</Link>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                    <button className="login bg-transparent border-0 p-0 text-white" style={{ fontSize: '13px' }} onClick={() => {
                      localStorage.removeItem("user_session");
                      setUser(null);
                    }}>Logout</button>
                  </>
                ) : (
                  <>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                    <Link className="login" href="/login" style={{ fontSize: '13px', color: '#fff', margin: 0 }}>Login</Link>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                    <Link className="register" href="/register" style={{ fontSize: '13px', color: '#fff', margin: 0 }}>Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="navigation" className={`navigation navigation-landscape navigation-padding${isSticky ? " nav-is-sticky" : ""}`}>
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-2 col-6">
              <div className="header-logo">
                <Link href="/">
                  <Image src="/assets/images/Arvindu-logo.png" height={35} width={150} alt="Arvindu Classes Logo" priority />
                </Link>
              </div>
            </div>
            
            <div className="col-lg-8 col-6 position-static">
              <nav className="nav-menus-wrapper d-none d-lg-block">
                <ul className="nav-menu">
                  {navLinks.map(({ href, label, hasDropdown, isNew }) => (
                    <li key={href} className={`${hasDropdown ? "has-dropdown position-static" : "position-relative"}`} onMouseEnter={() => hasDropdown && setIsHovered(true)} onMouseLeave={() => hasDropdown && setIsHovered(false)}>
                      {isNew && <span className="badge-new">New</span>}
                      <Link href={href} className={`${pathname === href ? "active" : ""} d-flex align-items-center`}>
                        {label}
                        {hasDropdown && <i className="fas fa-chevron-down ms-1 nav-chevron"></i>}
                      </Link>

                      {hasDropdown && (
                        <div className={`mega-menu ${isHovered ? "show" : ""}`}>
                          <div className="container">
                            <div className="row py-5">
                              {courses.map((course, idx) => (
                                <div key={idx} className="col-lg-4 mb-4">
                                  <Link href={`/courses/${course.slug}`} className="mega-course-card-premium d-flex align-items-center p-4 rounded-2xl border border-light" style={{ '--blob-color': `${course.color}15` } as any}>
                                    <div className="icon-box-premium me-4 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ backgroundColor: `${course.color}15`, color: course.color, width: "65px", height: "65px", minWidth: "65px" }}>
                                      <i className={`${course.icon} fa-lg`}></i>
                                    </div>
                                    <div className="course-info flex-grow-1">
                                      <span className="category-label d-block mb-1" style={{ color: course.color }}>{course.category}</span>
                                      <h6 className="mb-2 text-dark font-weight-bold" style={{ fontSize: '16px' }}>{course.title}</h6>
                                      <span className="pill-badge" style={{ backgroundColor: `${course.color}10`, color: course.color }}>{course.classRange}</span>
                                    </div>
                                    <div className="arrow-circle" style={{ borderColor: `${course.color}30`, color: course.color }}>
                                      <i className="fas fa-arrow-right"></i>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                              
                              <div className="col-12 mt-4">
                                <Link href="/courses" className="view-all-premium-v2 d-flex align-items-center p-4 rounded-2xl border transition-all" style={{ backgroundColor: '#F3F0FF', borderColor: '#EBE5FF' }}>
                                  <div className="position-relative me-4">
                                     <div className="sparkle s1"><i className="fas fa-sparkles"></i></div>
                                     <div className="sparkle s2"><i className="fas fa-sparkles"></i></div>
                                     <div className="icon-box-premium rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: '#EBE5FF', color: '#7D2AE8', width: "80px", height: "80px", minWidth: "80px" }}>
                                        <i className="fas fa-th-large fa-2x"></i>
                                     </div>
                                  </div>
                                  <div className="view-all-info flex-grow-1">
                                    <span className="text-primary-soft d-block mb-1" style={{ fontSize: '13px', fontWeight: '600', color: '#7D2AE8' }}>Explore</span>
                                    <h4 className="mb-1 text-dark font-weight-bold" style={{ fontSize: '20px' }}>View All Courses</h4>
                                    <p className="text-muted mb-0" style={{ fontSize: '14px' }}>Browse our complete range of courses across all programs.</p>
                                  </div>
                                  <div className="arrow-btn-large-v2 rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: '55px', height: '55px', backgroundColor: '#7D2AE8', color: '#fff' }}>
                                    <i className="fas fa-arrow-right fa-lg"></i>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="col-lg-2 d-none d-lg-block">
              <div className="header-search">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
                }}>
                  <input type="text" placeholder="Search courses" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <button type="submit"><i className="fas fa-search"></i></button>
                </form>
              </div>
            </div>
          </div>

          <div className={`react-nav-toggle ${isMenuOpen ? "active" : ""} d-lg-none`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>

          <nav className={`react-mobile-nav ${isMenuOpen ? "open" : ""} d-lg-none`}>
            <ul className="mobile-menu-list">
              {navLinks.map(({ href, label, hasDropdown }) => (
                <li key={href} className="mobile-menu-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link href={href} className="mobile-link" onClick={() => !hasDropdown && setIsMenuOpen(false)}>{label}</Link>
                    {hasDropdown && (
                      <span className="mobile-dropdown-trigger" onClick={() => setActiveDropdown(activeDropdown === href ? null : href)}>
                        <i className={`fas fa-chevron-down ${activeDropdown === href ? "rotate-180" : ""}`}></i>
                      </span>
                    )}
                  </div>
                  {hasDropdown && activeDropdown === href && (
                    <ul className="mobile-submenu">
                      {courses.map((course, idx) => (
                        <li key={idx}>
                          <Link href={`/courses/${course.slug}`} className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>{course.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
