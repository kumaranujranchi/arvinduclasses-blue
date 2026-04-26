"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminClock from "../components/AdminClock";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Close sidebar on navigation (for mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    router.push("/login");
  };

  // Grouped menu items
  const menuGroups = [
    {
      title: "Dashboards",
      items: [
        { label: "Overview", href: "/admin", icon: "fas fa-columns", roles: ["super_admin", "admin", "teacher", "counsellor", "accounts", "sales", "operations"] },
      ]
    },
    {
      title: "Management",
      items: [
        { label: "Users", href: "/admin/users", icon: "fas fa-user-shield", roles: ["super_admin"] },
        { label: "Roles Management", href: "/admin/roles", icon: "fas fa-user-cog", roles: ["super_admin"] },
        { label: "Leads", href: "/admin/leads", icon: "fas fa-users", roles: ["super_admin", "admin", "sales", "counsellor"] },
        { label: "Site Banners", href: "/admin/banners", icon: "fas fa-images", roles: ["super_admin", "admin"] },
        { label: "Subscribers", href: "/admin/subscribers", icon: "fas fa-mail-bulk", roles: ["super_admin", "admin", "sales"] },
        { label: "Blog Management", href: "/admin/posts", icon: "fas fa-blog", roles: ["super_admin", "admin"] },
        { label: "Activity Log", href: "/admin/activity", icon: "fas fa-history", roles: ["super_admin"] },
      ]
    },
    {
      title: "Academic",
      items: [
        { label: "Results", href: "/admin/results", icon: "fas fa-trophy", roles: ["super_admin", "admin", "operations"] },
        { label: "Courses", href: "/admin/courses", icon: "fas fa-book-open", roles: ["super_admin", "admin", "operations"] },
        { label: "Announcements", href: "/admin/notices", icon: "fas fa-bullhorn", roles: ["super_admin", "admin", "operations"] },
      ]
    },
    {
      title: "External",
      items: [
        { label: "Go to Website", href: "/", icon: "fas fa-external-link-alt", roles: ["super_admin", "admin", "teacher", "counsellor", "accounts", "sales", "operations"] },
      ]
    }
  ];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#01228D] border-r-transparent"></div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <>
      <link rel="stylesheet" href="/assets/css/plugins/fontawesome.min.css" />
      <style>{`
        @keyframes admin-fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes admin-pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(1,34,141,0.3); }
          70% { box-shadow: 0 0 0 8px rgba(1,34,141,0); }
          100% { box-shadow: 0 0 0 0 rgba(1,34,141,0); }
        }
        @keyframes admin-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes admin-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .admin-nav-item {
          position: relative;
          overflow: hidden;
        }
        .admin-nav-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(1,34,141,0.08) 0%, rgba(99,102,241,0.08) 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          border-radius: 12px;
        }
        .admin-nav-item:hover::before { opacity: 1; }
        .admin-nav-item.active-nav {
          background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
          box-shadow: inset 3px 0 0 #01228D;
        }
        .admin-nav-item.active-nav .nav-icon {
          animation: admin-float 2s ease-in-out infinite;
        }
        .admin-card-hover {
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .admin-card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(1,34,141,0.10);
        }
        .admin-sidebar-gradient {
          background: linear-gradient(180deg, #fff 0%, #f8faff 100%);
        }
        .admin-header-bar {
          background: linear-gradient(90deg, #fff 60%, #f0f4ff 100%);
        }
        .admin-main-content {
          animation: admin-fadeSlideIn 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .admin-avatar-ring {
          animation: admin-pulse-ring 2.5s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, #01228D, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shimmer-btn {
          background: linear-gradient(90deg, #01228D 0%, #4f46e5 50%, #01228D 100%);
          background-size: 200% auto;
          animation: admin-shimmer 2.5s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        aside a { text-decoration: none !important; }
      `}</style>

      <div className="flex h-screen overflow-hidden font-sans text-slate-900" style={{background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 60%, #fdf4ff 100%)'}}>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* ── SIDEBAR ── */}
        <aside className={`
          fixed inset-y-0 left-0 w-64 flex flex-col h-full z-[70] admin-sidebar-gradient
          border-r border-blue-50 shadow-xl
          transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>

          {/* Logo */}
          <div className="px-6 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{background:'linear-gradient(135deg,#01228D,#4f46e5)'}}>
                <img src="/assets/images/arvindu-favicon.png" alt="L" className="w-5 h-5 brightness-200" />
              </div>
              <span className="font-black text-base tracking-tight gradient-text">Arvindu Classes</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>

          {/* User Card */}
          <div className="mx-4 mb-5 p-3.5 rounded-2xl border border-blue-100/60 flex items-center gap-3 relative overflow-hidden" style={{background:'linear-gradient(135deg,#eef2ff,#f0f4ff)'}}>
            <div className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10" style={{background:'radial-gradient(circle,#4f46e5,transparent)',transform:'translate(20%,-20%)'}}></div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md admin-avatar-ring flex-shrink-0">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "A K")}&background=01228D&color=fff&bold=true`} alt="Avatar" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-800 truncate">{user?.name || "Admin"}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider truncate" style={{color:'#4f46e5'}}>{user?.role?.replace("_", " ")}</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0 shadow-sm shadow-green-300"></div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 overflow-y-auto custom-scrollbar space-y-5 pb-4">
            {menuGroups.map((group, idx) => (
              <div key={idx}>
                <p className="px-4 text-[9px] font-black text-gray-400 uppercase tracking-[2px] mb-2">{group.title}</p>
                <div className="space-y-0.5">
                  {group.items.filter(item => item.roles.includes(user.role)).map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`admin-nav-item flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 no-underline ${isActive ? 'active-nav' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        <span className={`nav-icon w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 transition-all duration-200 ${
                          isActive 
                            ? 'text-white shadow-md shadow-blue-200' 
                            : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                        }`} style={isActive ? {background:'linear-gradient(135deg,#01228D,#4f46e5)'} : {}}>
                          <i className={item.icon}></i>
                        </span>
                        <span className={`text-sm font-semibold tracking-tight ${isActive ? 'text-[#01228D] font-bold' : ''}`}>{item.label}</span>
                        {isActive && <span className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-blue-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-xs group"
            >
              <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-red-100 transition-all">
                <i className="fas fa-sign-out-alt text-xs"></i>
              </span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          {/* Header */}
          <header className="admin-header-bar border-b border-blue-50/60 px-4 lg:px-8 py-3.5 flex items-center justify-between z-20 shadow-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-white shadow-md transition-all active:scale-95"
                style={{background:'linear-gradient(135deg,#01228D,#4f46e5)'}}
              >
                <i className="fas fa-bars text-sm"></i>
              </button>
              <div className="flex items-center gap-2.5 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg,#eef2ff,#e0e7ff)'}}>
                  <i className="far fa-calendar-check text-indigo-500 text-xs"></i>
                </span>
                <div className="truncate"><AdminClock /></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Go to Website link */}
              <Link href="/" className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white text-[#01228D] rounded-full text-xs font-bold border border-blue-100 hover:bg-blue-50 transition-all no-underline shadow-sm">
                <i className="fas fa-external-link-alt"></i>
                <span>Go to Website</span>
              </Link>
              {/* Greeting pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{background:'linear-gradient(135deg,#f0f4ff,#e0e7ff)',color:'#4f46e5'}}>
                <i className="fas fa-bolt text-yellow-400"></i>
                <span>Welcome, {user?.name?.split(' ')[0] || 'Admin'}!</span>
              </div>
              {/* Live badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-300"></span>
                <span className="hidden sm:inline">System Live</span>
                <span className="sm:hidden">Live</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
            <div className="admin-main-content">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
