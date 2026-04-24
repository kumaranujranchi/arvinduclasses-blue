"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
        { label: "Leads", href: "/admin/leads", icon: "fas fa-users", roles: ["super_admin", "admin", "sales", "counsellor"] },
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
    <div 
      className="admin-wrapper" 
      style={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100vw', 
        backgroundColor: '#f4f7fb', 
        overflow: 'hidden', 
        fontFamily: "'Inter', sans-serif",
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <style>{`
        .admin-wrapper * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .admin-wrapper a {
          text-decoration: none !important;
        }
        .admin-wrapper .sidebar-link {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 12px !important;
          width: 100% !important;
        }
        .admin-wrapper .sidebar-link i {
          width: 20px;
          text-align: center;
        }
        .admin-wrapper .row {
          display: flex !important;
          flex-wrap: wrap !important;
          margin: 0 !important;
          width: 100% !important;
        }
        .admin-wrapper .col-md-6, .admin-wrapper .col-lg-3, .admin-wrapper .col-12 {
          padding: 0 !important;
        }
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
      `}</style>

      {/* Sidebar */}
      <div 
        style={{ 
          width: '260px', 
          backgroundColor: '#fff', 
          borderRight: '1px solid #eef2f6', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          zIndex: 100,
          flexShrink: 0
        }}
      >
        {/* Logo Section */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#01228D', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyItems: 'center', paddingLeft: '6px' }}>
            <img src="/assets/images/arvindu-favicon.png" alt="L" style={{ width: '20px', height: '20px', filter: 'brightness(2)' }} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '18px', color: '#1e293b', letterSpacing: '-0.5px' }}>MaterialM</span>
        </div>

        {/* User Quick Info */}
        <div style={{ margin: '0 16px 24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #f1f5f9' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "A K")}&background=01228D&color=fff&bold=true`} 
              alt="Avatar" 
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || "Admin"}</p>
            <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{user?.role?.replace("_", " ")}</p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: '0 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }} className="custom-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ padding: '0 16px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{group.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {group.items.filter(item => item.roles.includes(user.role)).map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="sidebar-link"
                      style={{
                        padding: '10px 16px',
                        borderRadius: '12px',
                        transition: 'all 0.2s',
                        backgroundColor: isActive ? '#f0f4ff' : 'transparent',
                        color: isActive ? '#01228D' : '#64748b',
                        fontWeight: isActive ? '700' : '500',
                        fontSize: '14px'
                      }}
                    >
                      <i className={item.icon} style={{ fontSize: '16px', color: isActive ? '#01228D' : '#94a3b8' }}></i>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '12px 16px', 
              border: 'none', 
              backgroundColor: 'transparent', 
              color: '#64748b', 
              cursor: 'pointer',
              borderRadius: '12px',
              transition: 'all 0.2s',
              fontSize: '14px',
              fontWeight: '700'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px' }} className="custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
