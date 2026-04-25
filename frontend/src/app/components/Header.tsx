"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  { title: "Foundation Program (Class 6–8)", slug: "foundation-program", category: "Junior", color: "#EAB830", icon: "fas fa-baby" },
  { title: "Science Program (Class 9–10)", slug: "science-program", category: "Secondary", color: "#2F7AD5", icon: "fas fa-microscope" },
  { title: "Commerce (Class 11–12)", slug: "commerce-program", category: "Senior", color: "#0C8B51", icon: "fas fa-chart-line" },
  { title: "Applied Mathematics (9–12)", slug: "applied-mathematics", category: "Mathematics", color: "#27B8A7", icon: "fas fa-square-root-alt" },
  { title: "Physics, Chemistry & Biology", slug: "pcb-program", category: "Science", color: "#2F7AD5", icon: "fas fa-atom" },
  { title: "B.Com Academic Support", slug: "bcom-support", category: "University", color: "#7D2AE8", icon: "fas fa-university" },
];

export default function Header() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      setUser(JSON.parse(session));
    }

    // Sticky nav on mobile scroll
    const handleScroll = () => {
      if (window.innerWidth < 992) {
        // 80px = approx height of NoticeBar (~38px) + header-top (~42px)
        const shouldStick = window.scrollY > 80;
        setIsSticky(shouldStick);
        document.body.classList.toggle("mobile-nav-sticky-active", shouldStick);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="header-area">
      {/* Top Bar - Now visible on mobile too but styled better */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-wrapper d-flex flex-wrap justify-content-between align-items-center">
            <div className="header-top-left d-none d-sm-block">
              <ul className="header-meta">
                <li>
                  <a href="mailto:info@arvinduclasses.in">info@arvinduclasses.in</a>
                </li>
              </ul>
            </div>
            <div className="header-top-right w-100 w-sm-auto">
              <div className="header-link d-flex align-items-center justify-content-center justify-content-sm-end">
                <Link className="notice" href="/notice" style={{ fontSize: '13px', color: '#fff' }}>Notice</Link>
                {user ? (
                  <>
                    <span className="ms-3 me-3 text-white" style={{ fontSize: '13px' }}>Hi, {user.name}</span>
                    <button className="login bg-transparent border-0 p-0 text-white" style={{ fontSize: '13px' }} onClick={() => {
                      localStorage.removeItem("user_session");
                      setUser(null);
                    }}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link className="login" href="/login" style={{ fontSize: '13px', color: '#fff' }}>Login</Link>
                    <Link className="register" href="/register" style={{ fontSize: '13px', color: '#fff' }}>Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div id="navigation" className={`navigation navigation-landscape navigation-padding${isSticky ? " nav-is-sticky" : ""}`}>
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-2 col-6">
              <div className="header-logo">
                <Link href="/">
                  <Image
                    src="/assets/images/Arvindu-logo.png"
                    height={35}
                    width={150}
                    alt="Arvindu Classes Logo"
                    priority
                  />
                </Link>
              </div>
            </div>
            
            <div className="col-lg-8 col-6 position-static">
              {/* Desktop Menu */}
              <nav className="nav-menus-wrapper d-none d-lg-block">
                <ul className="nav-menu">
                  {navLinks.map(({ href, label, hasDropdown, isNew }) => (
                    <li 
                      key={href} 
                      className={`${hasDropdown ? "has-dropdown position-static" : "position-relative"}`}
                      onMouseEnter={() => hasDropdown && setIsHovered(true)}
                      onMouseLeave={() => hasDropdown && setIsHovered(false)}
                    >
                      {isNew && <span className="badge-new">New</span>}
                      <Link href={href} className={`${pathname === href ? "active" : ""} d-flex align-items-center`}>
                        {label}
                        {hasDropdown && <i className="fas fa-chevron-down ms-1 nav-chevron"></i>}
                      </Link>

                      {hasDropdown && (
                        <div className={`mega-menu ${isHovered ? "show" : ""}`}>
                          <div className="container">
                            <div className="row py-4">
                              <div className="col-12 mb-3">
                                <h5 className="mega-menu-title">Our Programs</h5>
                                <div className="line header-accent-line"></div>
                              </div>
                              {courses.map((course, idx) => (
                                <div key={idx} className="col-lg-4 mb-3">
                                  <Link href={`/courses/${course.slug}`} className="mega-course-card d-flex align-items-center p-3 rounded">
                                    <div className="icon-box me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: `${course.color}20`, color: course.color, width: "45px", height: "45px", minWidth: "45px" }}>
                                      <i className={course.icon}></i>
                                    </div>
                                    <div className="course-info">
                                      <span className="text-muted small d-block mb-1">{course.category}</span>
                                      <h6 className="mb-0 text-dark font-weight-bold">{course.title}</h6>
                                    </div>
                                  </Link>
                                </div>
                              ))}
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
                <form action="#">
                  <input type="text" placeholder="Search" />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile UI */}
          <div 
            className={`react-nav-toggle ${isMenuOpen ? "active" : ""} d-lg-none`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>

          <nav className={`react-mobile-nav ${isMenuOpen ? "open" : ""} d-lg-none`}>
            <ul className="mobile-menu-list">
              {navLinks.map(({ href, label, hasDropdown }) => (
                <li key={href} className="mobile-menu-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link href={href} className="mobile-link" onClick={() => !hasDropdown && setIsMenuOpen(false)}>
                      {label}
                    </Link>
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
                          <Link href={`/courses/${course.slug}`} className="mobile-sublink" onClick={() => setIsMenuOpen(false)}>
                            {course.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Added Login/Register to mobile menu for convenience too */}
            <div className="mobile-auth-links mt-40">
                {user ? (
                   <button className="main-btn w-100" onClick={() => {
                     localStorage.removeItem("user_session");
                     setUser(null);
                     setIsMenuOpen(false);
                   }}>Logout</button>
                ) : (
                  <div className="d-flex gap-2">
                    <Link href="/login" className="main-btn w-50 text-center" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    <Link href="/register" className="main-btn w-50 text-center" onClick={() => setIsMenuOpen(false)}>Register</Link>
                  </div>
                )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
