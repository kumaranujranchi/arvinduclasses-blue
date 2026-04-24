"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const sessionStr = localStorage.getItem("user_session");
    if (!sessionStr) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(sessionStr);
      const staffRoles = ["super_admin", "admin", "teacher", "counsellor", "accounts", "sales", "operations"];
      if (!staffRoles.includes(parsedUser.role)) {
        router.push("/login");
      } else {
        setUser(parsedUser);
        setIsAuthorized(true);
      }
    } catch (e) {
      router.push("/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    router.push("/login");
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: "fas fa-th-large", roles: ["super_admin", "admin", "teacher", "counsellor", "accounts", "sales", "operations"] },
    { label: "User Management", href: "/admin/users", icon: "fas fa-user-shield", roles: ["super_admin"] },
    { label: "Course Leads", href: "/admin/leads", icon: "fas fa-users", roles: ["super_admin", "admin", "sales", "counsellor"] },
    { label: "Manage Results", href: "/admin/results", icon: "fas fa-trophy", roles: ["super_admin", "admin", "operations"] },
    { label: "Academic Courses", href: "/admin/courses", icon: "fas fa-book", roles: ["super_admin", "admin", "operations"] },
    { label: "Announcements", href: "/admin/notices", icon: "fas fa-bullhorn", roles: ["super_admin", "admin", "operations"] },
    { label: "Blog Posts", href: "/admin/blog", icon: "fas fa-newspaper", roles: ["super_admin", "admin", "operations"] },
  ];

  const visibleMenuItems = user ? menuItems.filter(item => item.roles.includes(user.role)) : [];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#07294d] border-r-transparent"></div>
      </div>
    );
  }

  // If we are on the login page, just render children without the sidebar/layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-wrapper flex h-screen bg-[#f4f6f9] overflow-hidden font-sans">
      <style>{`
        .admin-wrapper h1, .admin-wrapper h2, .admin-wrapper h3, .admin-wrapper h4, .admin-wrapper h5, .admin-wrapper h6, .admin-wrapper p {
          margin: 0 !important;
          padding: 0 !important;
          font-family: inherit !important;
          color: inherit;
        }
        .admin-wrapper th, .admin-wrapper td {
          border: none !important;
          padding: inherit;
        }
        .admin-wrapper * {
          box-sizing: border-box;
        }
      `}</style>
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "w-72" : "w-20"} transition-all duration-300 bg-white shadow-lg flex flex-col z-50`}>
        <div className="p-6 flex items-center gap-3 border-b border-gray-50 mb-4">
          <img src="/assets/images/arvindu-favicon.png" alt="Logo" className="w-10 h-10" />
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#07294d] leading-none">Arvindu</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Admin Panel</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {visibleMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-[#07294d] text-white shadow-md shadow-blue-100" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-[#07294d]"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  isActive ? "bg-white/10" : "bg-gray-50 group-hover:bg-white shadow-sm"
                }`}>
                  <i className={`${item.icon} ${isActive ? "text-white" : "text-gray-400 group-hover:text-[#07294d]"}`}></i>
                </div>
                {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-400 transition-colors"
            >
              <i className={`fas ${isSidebarOpen ? "fa-align-left" : "fa-bars"}`}></i>
            </button>
            <h2 className="text-xl font-bold text-gray-800 ml-2">
              {menuItems.find(item => item.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="pl-12 pr-6 py-2.5 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-blue-100 w-80 text-sm transition-all outline-none"
              />
              <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-none">{user?.name || "Loading..."}</p>
                <p className="text-[10px] text-blue-500 font-bold uppercase mt-1">{user?.role?.replace("_", " ") || "Staff"}</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#07294d] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "A K")}&background=07294d&color=fff&bold=true`} alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
