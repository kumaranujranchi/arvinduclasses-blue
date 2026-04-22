"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

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
      <div id="navigation" className="navigation navigation-landscape">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="header-logo">
                <Link href="/">
                  <Image
                    src="/assets/images/Arvindu-logo.png"
                    height={25}
                    width={120}
                    alt="Arvindu Classes Logo"
                    priority
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-7 position-static">
              <div className="nav-toggle"></div>
              <nav className="nav-menus-wrapper">
                <ul className="nav-menu">
                  {navLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={pathname === href ? "active" : ""}
                      >
                        {label}
                      </Link>
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
    </header>
  );
}
