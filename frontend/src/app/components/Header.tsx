"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <header className="header-area">
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-wrapper d-flex flex-wrap justify-content-sm-between">
            <div className="header-top-left mt-10">
              <ul className="header-meta">
                <li>
                  <a href="mailto:info@arvindclasses.in">info@arvindclasses.in</a>
                </li>
              </ul>
            </div>
            <div className="header-top-right mt-10">
              <div className="header-link">
                <Link className="notice" href="/notice">Notice</Link>
                <Link className="login" href="/login">Login</Link>
                <Link className="register" href="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div id="navigation" className="navigation navigation-landscape" style={{ padding: "10px 0" }}>
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-2">
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
            <div className="col-lg-8 position-static">
              <div className="nav-toggle"></div>
              <nav className="nav-menus-wrapper">
                <ul className="nav-menu">
                  {navLinks.map(({ href, label, hasDropdown, isNew }) => (
                    <li 
                      key={href} 
                      className={`${hasDropdown ? "has-dropdown position-static" : "position-relative"}`}
                      onMouseEnter={() => hasDropdown && setIsHovered(true)}
                      onMouseLeave={() => hasDropdown && setIsHovered(false)}
                    >
                      {isNew && (
                        <span className="badge-new">New</span>
                      )}
                      <Link
                        href={href}
                        className={`${pathname === href ? "active" : ""} d-flex align-items-center`}
                      >
                        {label}
                        {hasDropdown && <i className="fas fa-chevron-down ms-1" style={{ fontSize: "10px" }}></i>}
                      </Link>

                      {hasDropdown && (
                        <div className={`mega-menu ${isHovered ? "show" : ""}`}>
                          <div className="container">
                            <div className="row py-4">
                              <div className="col-12 mb-3">
                                <h5 className="mega-menu-title">Our Programs</h5>
                                <div className="line" style={{ width: "40px", height: "2px", background: "#ffc600" }}></div>
                              </div>
                              {courses.map((course, idx) => (
                                <div key={idx} className="col-lg-4 mb-3">
                                  <Link href={`/courses/${course.slug}`} className="mega-course-card d-flex align-items-center p-3 rounded" style={{ "--delay": `${idx * 0.1}s` } as any}>
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
                              <div className="col-12 mt-3 pt-3 border-top text-center">
                                <Link href="/courses" className="text-primary font-weight-bold">View All Courses <i className="fas fa-arrow-right ms-1"></i></Link>
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
            <div className="col-lg-2 position-static">
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
        </div>
      </div>

      <style jsx>{`
        .badge-new {
          position: absolute;
          top: 5px;
          right: -10px;
          background: #e53e3e;
          color: #fff;
          font-size: 9px;
          padding: 1px 5px;
          border-radius: 10px;
          font-weight: 800;
          text-transform: uppercase;
          z-index: 10;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-5px);}
          60% {transform: translateY(-3px);}
        }
        .mega-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: #fff;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          border-top: 2px solid #ffc600;
          z-index: 999;
          visibility: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .mega-menu.show {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .mega-menu-title {
          font-size: 18px;
          color: #07294d;
          font-weight: 700;
        }
        .mega-course-card {
          text-decoration: none;
          background: #f8f9fa;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          opacity: 0;
          transform: translateY(15px);
        }
        .mega-menu.show .mega-course-card {
          animation: slideUp 0.4s ease forwards;
          animation-delay: var(--delay);
        }
        .mega-course-card:hover {
          background: #fff;
          border-color: #ffc600;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transform: translateY(-3px) !important;
        }
        .mega-course-card .course-info h6 {
          font-size: 14px;
          line-height: 1.4;
          transition: color 0.3s ease;
        }
        .mega-course-card:hover .course-info h6 {
          color: #ffc600 !important;
        }
        
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-menu li {
          margin-right: 15px;
        }
        .nav-menu li a {
          padding: 25px 0;
          font-weight: 600;
          color: #07294d;
          transition: all 0.3s ease;
        }
        .nav-menu li a:hover, .nav-menu li a.active {
          color: #ffc600;
        }
      `}</style>
    </header>
  );
}
