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
      <div className="flex h-screen bg-[#f4f7fb] overflow-hidden font-sans text-slate-900">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        aside a {
          text-decoration: none !important;
        }
      `}</style>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive Design */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col h-full z-[70] 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}>
        {/* Logo Section */}
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#01228D] rounded-lg flex items-center justify-center">
              <img src="/assets/images/arvindu-favicon.png" alt="L" className="w-5 h-5 brightness-200" />
            </div>
            <span className="font-bold text-lg text-[#1e293b] tracking-tight">Arvindu Classes</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* User Quick Info */}
        <div className="mx-4 mb-6 p-4 bg-gray-50 rounded-2xl flex items-center gap-3 border border-gray-100">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "A K")}&background=01228D&color=fff&bold=true`} alt="Avatar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1e293b] truncate">{user?.name || "Admin"}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">{user?.role?.replace("_", " ")}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar space-y-6 pb-6">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-[1.5px] mb-2">{group.title}</p>
              <div className="space-y-1">
                {group.items.filter(item => item.roles.includes(user.role)).map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group no-underline ${
                        isActive 
                          ? "bg-[#f0f4ff] text-[#01228D]" 
                          : "text-[#64748b] hover:bg-gray-50 hover:text-[#01228D]"
                      }`}
                    >
                      <i className={`${item.icon} text-sm ${isActive ? "text-[#01228D]" : "text-[#94a3b8] group-hover:text-[#01228D]"}`}></i>
                      <span className="font-medium text-sm tracking-tight">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-[#64748b] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group font-bold text-xs"
          >
            <i className="fas fa-sign-out-alt text-sm"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest overflow-hidden">
              <i className="far fa-calendar-check text-blue-500 flex-shrink-0"></i>
              <div className="truncate">
                <AdminClock />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">System Live</span>
              <span className="sm:hidden">Live</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar bg-[#f8fafc]">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
